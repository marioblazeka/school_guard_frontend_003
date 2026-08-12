<template>
  <div class="unosi-wrapper d-flex align-items-center justify-content-center">
    <div class="mobile-screen p-4 d-flex flex-column text-center position-relative">
      
      <!-- Gumb za povratak -->
      <button @click="$router.push('/dashboard')" class="btn-back shadow-sm" title="Povratak">
        <svg viewBox="0 0 24 24" class="arrow-icon"><path d="M15.41 7.41L14 6l-6 6 6 6-1.41-1.41L15.41 7.41z"/></svg>
      </button>

      <!-- Naslov Modula -->
      <div class="top-section pt-3 mb-3">
        <h3 class="fw-bold text-dark m-0 text-uppercase">{{ naslovModula }}</h3>
        <span :class="['badge', isCustomAdmin ? 'bg-danger' : 'bg-dark', 'mt-1']">
          {{ isCustomAdmin ? 'Admin: Sva povijest' : 'Korisnik: Samo danas' }}
        </span>
      </div>

      <!-- FORMA ZA UPIS (Vidljiva svima osim na modulu 'pregled') -->
      <div v-if="trenutniModul !== 'pregled'" class="content-card p-3 mb-3 text-start shadow-sm">
        <h6 class="fw-bold text-dark mb-3 border-bottom pb-1">Novi unos ({{ danasnjiDatum }})</h6>
        <form @submit.prevent="spremiUnos">
          <div class="mb-3">
            <label class="form-label small fw-bold text-muted">Opis aktivnosti / zabilješke</label>
            <textarea v-model="noviTekst" class="form-control text-area-custom" rows="3" required placeholder="Unesite detalje ovdje..."></textarea>
          </div>
          <button type="submit" class="btn btn-custom-green btn-sm w-100 fw-bold text-white py-2" :disabled="loadingGumb">
            {{ loadingGumb ? 'ZAPREMANJE...' : 'ZAPREMI UNOS' }}
          </button>
        </form>
      </div>

      <!-- PREGLED DOSADAŠNJIH UNOSA IZ FIRESTORE BAZE -->
      <div class="content-card p-3 d-flex flex-column flex-grow-1 shadow-sm overflow-hidden text-start">
        <h6 class="fw-bold text-dark mb-2 border-bottom pb-1">Zapisi iz oblaka</h6>
        
        <div class="list-container overflow-auto flex-grow-1 pr-1">
          <!-- Učitavanje podataka -->
          <div v-if="loadingBaza" class="text-center text-muted small py-4">
            <div class="spinner-border spinner-border-sm text-success me-2" role="status"></div>
            Dohvaćanje podataka s Firebase-a...
          </div>

          <!-- Ako nema podataka -->
          <div v-else-if="unosiIzBaze.length === 0" class="text-center text-muted small py-4">
            Nema zabilježenih unosa za odabrani opseg.
          </div>
          
          <!-- Lista unosa iz Firestore-a -->
          <div v-else v-for="unos in unosiIzBaze" :key="unos.id" class="unos-item border-bottom py-2">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge bg-light text-dark small-time">{{ unos.vrijeme }}</span>
              <span class="text-muted text-date-small">{{ unos.datum }}</span>
            </div>
            <p class="m-0 text-dark small-text-content">{{ unos.tekst }}</p>
            <small class="text-muted d-block text-author">Unio: {{ unos.autor }}</small>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

export default {
  name: 'UnosiView',
  data() {
    return {
      trenutniModul: '',
      pristupOpseg: 'today',
      noviTekst: '',
      danasnjiDatum: new Date().toLocaleDateString('hr-HR'),
      unosiIzBaze: [],
      loadingBaza: false,
      loadingGumb: false
    };
  },
  computed: {
    naslovModula() {
      switch (this.trenutniModul) {
        case 'dnevnik': return 'Dnevnik rada';
        case 'obilazak': return 'Evidencija obilaska';
        case 'neispravnosti': return 'Prijava neispravnosti';
        case 'pregled': return 'Pregled svih unosa';
        default: return 'Pregled modula';
      }
    },
    isCustomAdmin() {
      return this.pristupOpseg === 'all';
    }
  },
  created() {
    this.trenutniModul = this.$route.query.modul || 'dnevnik';
    this.pristupOpseg = this.$route.query.pristup || 'today';
    this.dohvatiUnose(); // Pokretanje upita odmah pri učitavanju stranice
  },
  methods: {
    async dohvatiUnose() {
      this.loadingBaza = true;
      this.unosiIzBaze = [];
      try {
        const unosiRef = collection(db, 'unosi');
        let q;

        // Pravilo struke: Kreiranje dinamičkog Firestore upita na temelju modula i ovlasti
        if (this.isCustomAdmin) {
          if (this.trenutniModul === 'pregled') {
            // Admin na modulu 'pregled' povlači apsolutno sve zapise ikad upisane, poredane po vremenu stvaranja
            q = query(unosiRef, orderBy('timestamp', 'desc'));
          } else {
            // Admin na specifičnom modulu vidi sve datume, ali filtrirano po tom modulu
            q = query(unosiRef, where('modul', '==', this.trenutniModul), orderBy('timestamp', 'desc'));
          }
        } else {
          if (this.trenutniModul === 'pregled') {
            // Običan korisnik na modulu 'pregled' vidi sve module, ali ISKLJUČIVO za tekući dan
            q = query(unosiRef, where('datum', '==', this.danasnjiDatum), orderBy('timestamp', 'desc'));
          } else {
            // Običan korisnik vidi samo svoj modul i samo za današnji datum
            q = query(unosiRef, where('modul', '==', this.trenutniModul), where('datum', '==', this.danasnjiDatum), orderBy('timestamp', 'desc'));
          }
        }

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.unosiIzBaze.push({
            id: doc.id,
            ...doc.data()
          });
        });
      } catch (error) {
        console.error("Greška pri dohvaćanju iz Firestore-a:", error);
      } finally {
        this.loadingBaza = false;
      }
    },
    async spremiUnos() {
      if (!this.noviTekst.trim()) return;
      this.loadingGumb = true;
      
      try {
        const noviZapis = {
          modul: this.trenutniModul,
          tekst: this.noviTekst,
          datum: this.danasnjiDatum,
          vrijeme: new Date().toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' }),
          autor: auth.currentUser ? auth.currentUser.email : 'anonimno@school.hr',
          timestamp: Date.now() // Služi nam za precizno sortiranje najnovijih unosa na vrh lista
        };

        // Slanje i upis dokumenta direktno u Firebase Cloud
        await addDoc(collection(db, 'unosi'), noviZapis);
        
        this.noviTekst = '';
        alert('Unos uspješno zaprimljen u Firebase Cloud Firestore!');
        
        // Osvježavanje popisa kako bi korisnik odmah vidio svoj novi unos
        this.dohvatiUnose();
      } catch (error) {
        alert('Došlo je do greške pri upisu u bazu podataka.');
        console.error(error);
      } finally {
        this.loadingGumb = false;
      }
    }
  }
}
</script>

<style scoped>
.unosi-wrapper { min-height: 100vh; width: 100%; padding: 20px; }
.mobile-screen { width: 100%; max-width: 380px; height: 760px; background-color: #3ca62d; border-radius: 28px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); color: #111111; overflow: hidden; }
.btn-back { position: absolute; top: 25px; left: 20px; width: 32px; height: 32px; background-color: #111111; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; }
.arrow-icon { width: 18px; height: 18px; fill: #ffffff; }
.content-card { background-color: #ffffff; border-radius: 16px; background-image: radial-gradient(#e9ecef 1px, transparent 0); background-size: 16px 16px; }
.text-area-custom { border-radius: 8px; font-size: 0.9rem; border: 1px solid #ced4da; }
.text-area-custom:focus { border-color: #3ca62d; box-shadow: 0 0 0 0.2rem rgba(60, 166, 45, 0.2); }
.btn-custom-green { background-color: #3ca62d !important; border-radius: 8px; transition: background 0.2s; }
.btn-custom-green:hover { background-color: #2d8021 !important; }
.list-container::-webkit-scrollbar { width: 4px; }
.list-container::-webkit-scrollbar-thumb { background: #ced4da; border-radius: 4px; }
.unos-item { font-size: 0.85rem; }
.small-time { font-size: 0.75rem; font-weight: bold; }
.text-date-small { font-size: 0.75rem; }
.small-text-content { line-height: 1.4; color: #222222; }
.text-author { font-size: 0.7rem; font-style: italic; margin-top: 2px; }
</style>

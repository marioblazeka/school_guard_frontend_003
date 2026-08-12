<template>
  <div class="container d-flex align-items-center justify-content-center legal-page">
    <div class="card shadow-lg border-0 p-4 legal-card text-start">
      <div class="card-body">
        
        <!-- Zaglavlje -->
        <div class="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
          <h3 class="fw-bold m-0 text-dark">Uvjeti korištenja</h3>
          <router-link to="/" class="btn-close-custom" title="Zatvori">&times;</router-link>
        </div>

        <!-- Sadržaj -->
        <div class="legal-content text-muted small">
          <p class="fw-bold text-dark">1. Prihvaćanje uvjeta</p>
          <p>Korištenjem aplikacije School Guard Pro pristajete na ove uvjete. Ako se ne slažete s bilo kojim dijelom, nemojte koristiti sustav.</p>
          
          <p class="fw-bold text-dark">2. Prava pristupa</p>
          <p>Ovaj sustav namijenjen je isključivo ovlaštenim administratorima i osoblju za evidenciju dnevnih aktivnosti. Svaki neovlašteni pokušaj pristupa bit će zabilježen.</p>
          
          <p class="fw-bold text-dark">3. Odgovornost korisnika</p>
          <p>Korisnik je u potpunosti odgovoran za čuvanje povjerljivosti svojih pristupnih podataka (email i lozinka) te za sve aktivnosti pod njegovim računom.</p>
        </div>

        <!-- Gumb za povratak -->
        <div class="text-center pt-3 mt-4 border-top">
          <button @click="$router.push('/')" class="btn btn-custom-green text-white fw-bold px-4">
            Zatvori i povratak
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UvjetiKoristenjaView'
}
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  padding: 20px;
}
.legal-card {
  width: 100%;
  max-width: 500px;
  border-radius: 20px !important;
  background-color: #ffffff;
}
.legal-content {
  max-height: 350px;
  overflow-y: auto;
  padding-right: 5px;
}
/* Prilagodba klizača za skrolanje unutar teksta */
.legal-content::-webkit-scrollbar {
  width: 6px;
}
.legal-content::-webkit-scrollbar-thumb {
  background-color: #ced4da;
  border-radius: 4px;
}
.btn-close-custom {
  font-size: 1.8rem;
  color: #6c757d;
  text-decoration: none;
  line-height: 1;
}
.btn-close-custom:hover {
  color: #111111;
}
.btn-custom-green {
  background-color: #3ca62d !important;
  border-color: #3ca62d !important;
  border-radius: 8px;
}
.btn-custom-green:hover {
  background-color: #2d8021 !important;
}
</style>

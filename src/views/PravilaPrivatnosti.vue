<template>
  <div class="container d-flex align-items-center justify-content-center legal-page">
    <div class="card shadow-lg border-0 p-4 legal-card text-start">
      <div class="card-body">
        
        <!-- Zaglavlje -->
        <div class="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
          <h3 class="fw-bold m-0 text-dark">Pravila privatnosti</h3>
          <router-link to="/" class="btn-close-custom" title="Zatvori">&times;</router-link>
        </div>

        <!-- Sadržaj -->
        <div class="legal-content text-muted small">
          <p class="fw-bold text-dark">1. Prikupljanje podataka</p>
          <p>School Guard Pro prikuplja isključivo osnovne identifikacijske podatke (poput email adrese) potrebne za sigurnu autentifikaciju putem Firebase sustava [auth].</p>
          
          <p class="fw-bold text-dark">2. Sigurnost podataka</p>
          <p>Svi podaci obrađuju se i čuvaju prema najvišim standardima struke u šifriranom obliku, sprječavajući neovlašteni pristup trećih strana.</p>
          
          <p class="fw-bold text-dark">3. Kolačići i lokalna pohrana</p>
          <p>Aplikacija koristi isključivo nužne tehničke sesije u pozadini (Firebase tokeni) kako bi vas zadržala prijavljenima i osigurala stabilan rad [auth].</p>
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
  name: 'PravilaPrivatnostiView'
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

<template>
  <div class="splash-wrapper d-flex align-items-center justify-content-center">
    <!-- Zeleno kućište ekrana s vaše slike -->
    <div class="mobile-screen p-4 d-flex flex-column justify-content-between text-center">
      
      <!-- Gornji dio: Logo i Naslov -->
      <div class="top-section pt-4">
        <div class="logo-container mb-2 mx-auto">
          <img src="@/assets/logo.png" alt="School Guard Pro Logo" class="img-fluid splash-logo" />
        </div>
        <h2 class="brand-name fw-bold">School Gard Pro</h2>
      </div>

      <!-- Srednji dio: Tekstovi i Gumb Ulaz -->
      <div class="middle-section my-auto">
        <h4 class="fw-bold text-dark mb-3">Dobrodošli !</h4>
        <p class="subtitle text-dark fw-medium mb-4">
          Sustav za upravljanje<br>i evidenciju dnevnih aktivnosti
        </p>
        
        <!-- Dodani središnji gumb Ulaz prema zahtjevu -->
        <button @click="handleEnter" class="btn btn-enter shadow-sm px-5 py-2.5 fw-bold text-white">
          ULAZ
        </button>
      </div>

      <!-- Donji dio: Pravni i administratorski linkovi točno prema slici -->
      <div class="bottom-section pb-3">
        <p class="legal-text mb-2">
          Nastavkom potvrđujete prihvaćanje 
          <router-link to="/uvjetikoristenja" class="orange-link fw-semibold">Uvjeta korištenja</router-link>
        </p>
        <p class="legal-text mb-4">
          i potvrđujete da ste pročitali 
          <router-link to="/pravilaprivatnosti" class="orange-link fw-semibold">Pravila privatnosti</router-link>
        </p>
        
        <p class="admin-text">
          Admin prijava <router-link to="/login" class="orange-link fw-bold">Login</router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    handleEnter() {
  // Preusmjerava korisnika ravno na novi zeleni Dashboard
  this.$router.push('/dashboard');
}
  }
}
</script>

<style scoped>
/* Centriranje mobilnog zaslona na sredinu monitora */
.splash-wrapper {
  min-height: 100vh;
  width: 100%;
  padding: 20px;
}

/* Točne proporcije i zelena boja ekrana sa slike (#3ca62d) */
.mobile-screen {
  width: 100%;
  max-width: 380px;
  height: 760px;
  background-color: #3ca62d;
  border-radius: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #111111;
  overflow: hidden;
}

/* Stilovi logotipa i naslova brenda */
.logo-container {
  max-width: 110px;
}
.splash-logo {
  max-height: 120px;
  object-fit: contain;
}
.brand-name {
  font-size: 1.45rem;
  color: #111111;
  letter-spacing: 0.5px;
}

/* Središnji tekstovi */
.subtitle {
  font-size: 1.05rem;
  line-height: 1.5;
}

/* Središnji crni gumb ULAZ za izvrstan kontrast na zelenoj pozadini */
.btn-enter {
  background-color: #111111 !important;
  border: 1px solid #111111 !important;
  border-radius: 8px;
  letter-spacing: 1px;
  transition: all 0.2s ease;
}
.btn-enter:hover {
  background-color: #222222 !important;
  transform: scale(1.03);
}

/* Donji tekstovi i žuto/narančasti linkovi točno prateći sliku */
.legal-text {
  font-size: 0.78rem;
  color: #222222;
  margin: 0;
}
.admin-text {
  font-size: 0.85rem;
  color: #111111;
  margin: 0;
}
.orange-link {
  color: #ffb703 !important; /* Točna uočljiva žuto-narančasta boja s vaše slike */
  text-decoration: none;
}
.orange-link:hover {
  text-decoration: underline !important;
  color: #ffa200 !important;
}
</style>

<template>
  <div class="container d-flex align-items-center justify-content-center auth-page">
    <div class="card shadow-lg border-0 p-4 auth-card">
      <div class="card-body">
        
        <!-- Logo i Naslov iz priloga -->
        <div class="text-center mb-4">
          <div class="logo-wrapper mb-3 mx-auto">
            <img src="@/assets/logo.png" alt="School Guard Pro Logo" class="img-fluid project-logo" />
          </div>
          <h3 class="fw-bold project-title mb-1">Registracija</h3>
          <p class="text-muted small">Stvorite novi School Guard Pro račun</p>
        </div>

        <!-- Forma -->
        <form @submit.prevent="handleSignup">
          <div class="form-floating mb-3">
            <input 
              type="email" 
              class="form-control customs-input" 
              id="regEmail" 
              placeholder="name@example.com" 
              v-model="email" 
              required
            >
            <label for="regEmail">Email adresa</label>
          </div>

          <div class="form-floating mb-3">
            <input 
              type="password" 
              class="form-control customs-input" 
              id="regPassword" 
              placeholder="Lozinka" 
              v-model="password" 
              required
            >
            <label for="regPassword">Lozinka (min. 6 znakova)</label>
          </div>

          <div class="form-floating mb-4">
            <input 
              type="password" 
              class="form-control customs-input" 
              id="regConfirmPassword" 
              placeholder="Potvrda lozinke" 
              v-model="confirmPassword" 
              required
            >
            <label for="regConfirmPassword">Potvrdite lozinku</label>
          </div>

          <!-- Prikaz greške na ekranu -->
          <div v-if="errorMessage" class="alert alert-danger py-2 small mb-3" role="alert">
            {{ errorMessage }}
          </div>

          <!-- Gumb za registraciju -->
          <button 
            type="submit" 
            class="btn btn-custom-green w-100 py-2.5 fw-bold text-white shadow-sm mb-3" 
            :disabled="loading"
          >
            {{ loading ? 'Registracija...' : 'Registriraj se' }}
          </button>
        </form>

        <!-- Navigacijski linkovi -->
        <div class="text-center pt-3 border-top">
          <router-link to="/login" class="d-block small text-decoration-none text-primary fw-semibold link-green">
            Već imate račun? Prijavite se
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'SignupView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      loading: false
    };
  },
  methods: {
    async handleSignup() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Lozinke se ne podudaraju!";
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/');
      } catch (error) {
        alert("Firebase greška:\n" + JSON.stringify(error, null, 2));
        
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'Ovaj email se već koristi.';
        } else {
          this.errorMessage = 'Došlo je do greške prilikom registracije.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.auth-page { min-height: calc(100vh - 65px); padding: 20px; }
.auth-card { width: 100%; max-width: 420px; border-radius: 20px !important; background-color: #ffffff; }
.logo-wrapper { max-width: 120px; }
.project-logo { max-height: 140px; object-fit: contain; }
.project-title { color: #111111; font-size: 1.6rem; }
.customs-input:focus { border-color: #3ca62d !important; box-shadow: 0 0 0 0.25rem rgba(60, 166, 45, 0.25) !important; }
.btn-custom-green { background-color: #3ca62d !important; border-color: #3ca62d !important; border-radius: 8px; transition: background-color 0.2s ease; }
.btn-custom-green:hover { background-color: #2d8021 !important; border-color: #2d8021 !important; }
.link-green { color: #3ca62d !important; }
.link-green:hover { color: #2d8021 !important; text-decoration: underline !important; }
</style>

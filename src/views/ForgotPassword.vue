<template>
  <div class="container d-flex align-items-center justify-content-center auth-page">
    <div class="card shadow-lg border-0 p-4 auth-card">
      <div class="card-body">
        
        <!-- Logo i Naslov iz priloga -->
        <div class="text-center mb-3">
          <div class="logo-wrapper mb-3 mx-auto">
            <img src="@/assets/logo.png" alt="School Guard Pro Logo" class="img-fluid project-logo" />
          </div>
          <h3 class="fw-bold project-title mb-1">Zaboravljena lozinka</h3>
          <p class="text-muted small px-2">Unesite email za primitak poveznice za ponovno postavljanje lozinke</p>
        </div>

        <!-- Forma -->
        <form @submit.prevent="handleReset">
          <div class="form-floating mb-4">
            <input 
              type="email" 
              class="form-control customs-input" 
              id="resetEmail" 
              placeholder="name@example.com" 
              v-model="email" 
              required
            >
            <label for="resetEmail">Email adresa</label>
          </div>

          <!-- Prikaz obavijesti -->
          <div v-if="errorMessage" class="alert alert-danger py-2 small mb-3" role="alert">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="alert alert-success py-2 small mb-3" role="alert">
            {{ successMessage }}
          </div>

          <!-- Gumb -->
          <button 
            type="submit" 
            class="btn btn-custom-green w-100 py-2.5 fw-bold text-white shadow-sm mb-3" 
            :disabled="loading"
          >
            {{ loading ? 'Slanje...' : 'Pošalji poveznicu' }}
          </button>
        </form>

        <!-- Navigacijski linkovi -->
        <div class="text-center pt-3 border-top">
          <router-link to="/login" class="d-block small text-decoration-none fw-semibold link-green">
            Vratite se na prijavu
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default {
  name: 'ForgotPasswordView',
  data() {
    return {
      email: '',
      errorMessage: '',
      successMessage: '',
      loading: false
    };
  },
  methods: {
    async handleReset() {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';
      try {
        await sendPasswordResetEmail(auth, this.email);
        this.successMessage = 'Poveznica je poslana! Provjerite vašu dolaznu poštu.';
      } catch (error) {
        this.errorMessage = 'Korisnik s ovim emailom ne postoji ili je unos kriv.';
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

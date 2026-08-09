<template>
  <div class="container d-flex align-items-center justify-content-center auth-page">
    <div class="card shadow-lg border-0 p-4 auth-card">
      <div class="card-body">
        <!-- Logo / Naslov -->
        <div class="text-center mb-3">
          <div class="brand-icon-wrapper mb-2 mx-auto">
            <svg viewBox="0 0 24 24" class="brand-icon"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
          </div>
          <h3 class="fw-bold text-dark mb-1">Zaboravljena lozinka</h3>
          <p class="text-muted small px-2">Unesite email za primitak poveznice za ponovno postavljanje lozinke</p>
        </div>

        <!-- Forma -->
        <form @submit.prevent="handleReset">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="resetEmail" placeholder="name@example.com" v-model="email" required>
            <label for="resetEmail">Email adresa</label>
          </div>

          <!-- Prikaz obavijesti -->
          <div v-if="errorMessage" class="alert alert-danger py-2 small" role="alert">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="alert alert-success py-2 small" role="alert">
            {{ successMessage }}
          </div>

          <!-- Gumb -->
          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold text-white shadow-sm mb-3" :disabled="loading">
            {{ loading ? 'Slanje...' : 'Pošalji poveznicu' }}
          </button>
        </form>

        <!-- Navigacijski linkovi -->
        <div class="text-center pt-2 border-top">
          <router-link to="/login" class="d-block small text-decoration-none text-primary fw-semibold">
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
.auth-card { width: 100%; max-width: 400px; border-radius: 16px !important; background-color: #ffffff; }
.brand-icon-wrapper { width: 55px; height: 55px; background-color: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.brand-icon { width: 28px; height: 28px; fill: #42b983; }
.btn-primary { background-color: #42b983 !important; border-color: #42b983 !important; }
.btn-primary:hover { background-color: #3aa876 !important; }
.text-primary { color: #42b983 !important; }
</style>

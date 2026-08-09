<template>
  <div class="container d-flex align-items-center justify-content-center auth-page">
    <div class="card shadow-lg border-0 p-4 auth-card">
      <div class="card-body">
        <!-- Logo / Naslov -->
        <div class="text-center mb-4">
          <div class="brand-icon-wrapper mb-2 mx-auto">
            <svg viewBox="0 0 24 24" class="brand-icon"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <h3 class="fw-bold text-dark mb-1">Registracija</h3>
          <p class="text-muted small">Stvorite novi School Guard račun</p>
        </div>

        <!-- Forma -->
        <form @submit.prevent="handleSignup">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="regEmail" placeholder="name@example.com" v-model="email" required>
            <label for="regEmail">Email adresa</label>
          </div>

          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="regPassword" placeholder="Lozinka" v-model="password" required>
            <label for="regPassword">Lozinka (min. 6 znakova)</label>
          </div>

          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="regConfirmPassword" placeholder="Potvrda lozinke" v-model="confirmPassword" required>
            <label for="regConfirmPassword">Potvrdite lozinku</label>
          </div>

          <!-- Prikaz greške -->
          <div v-if="errorMessage" class="alert alert-danger py-2 small" role="alert">
            {{ errorMessage }}
          </div>

          <!-- Gumb za registraciju -->
          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold text-white shadow-sm mb-3" :disabled="loading">
            {{ loading ? 'Registracija...' : 'Registriraj se' }}
          </button>
        </form>

        <!-- Navigacijski linkovi -->
        <div class="text-center pt-2 border-top">
          <router-link to="/login" class="d-block small text-decoration-none text-primary fw-semibold">
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
.auth-card { width: 100%; max-width: 400px; border-radius: 16px !important; background-color: #ffffff; }
.brand-icon-wrapper { width: 55px; height: 55px; background-color: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.brand-icon { width: 28px; height: 28px; fill: #42b983; }
.btn-primary { background-color: #42b983 !important; border-color: #42b983 !important; }
.btn-primary:hover { background-color: #3aa876 !important; }
.text-primary { color: #42b983 !important; }
</style>

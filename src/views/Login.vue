<template>
  <div class="container d-flex align-items-center justify-content-center auth-page">
    <div class="card shadow-lg border-0 p-4 auth-card">
      <div class="card-body">
        <!-- Logo / Naslov -->
        <div class="text-center mb-4">
          <div class="brand-icon-wrapper mb-2 mx-auto">
            <svg viewBox="0 0 24 24" class="brand-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          <h3 class="fw-bold text-dark mb-1">School Guard</h3>
          <p class="text-muted small">Prijavite se u sustav</p>
        </div>

        <!-- Forma -->
        <form @submit.prevent="handleLogin">
          <div class="form-floating mb-3">
            <input 
              type="email" 
              class="form-control" 
              id="floatingEmail" 
              placeholder="name@example.com"
              v-model="email"
              required
            >
            <label for="floatingEmail">Email adresa</label>
          </div>

          <div class="form-floating mb-3">
            <input 
              type="password" 
              class="form-control" 
              id="floatingPassword" 
              placeholder="Lozinka"
              v-model="password"
              required
            >
            <label for="floatingPassword">Lozinka</label>
          </div>

          <!-- Prikaz greške -->
          <div v-if="errorMessage" class="alert alert-danger py-2 small" role="alert">
            {{ errorMessage }}
          </div>

          <!-- Gumb za prijavu -->
          <button 
            type="submit" 
            class="btn btn-primary w-100 py-2 fw-bold text-white shadow-sm mb-3"
            :disabled="loading"
          >
            {{ loading ? 'Prijava u tijeku...' : 'Prijavi se' }}
          </button>
        </form>

        <!-- Navigacijski linkovi -->
        <div class="text-center pt-2 border-top">
          <router-link to="/signup" class="d-block small text-decoration-none mb-1 text-primary fw-semibold">
            Nemate račun? Registrirajte se
          </router-link>
          <router-link to="/forgotpassword" class="d-block small text-decoration-none text-muted">
            Zaboravili ste lozinku?
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = '';
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/'); 
      } catch (error) {
        this.errorMessage = 'Kriva lozinka ili email adresa.';
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

<template>
  <div class="container d-flex align-items-center justify-content-center auth-page">
    <div class="card shadow-lg border-0 p-4 auth-card">
      <div class="card-body">
        
        <!-- Logo i Naslov iz priloga -->
        <div class="text-center mb-4">
          <div class="logo-wrapper mb-3 mx-auto">
            <!-- Učitavanje logotipa iz assets mape -->
            <img src="@/assets/logo.png" alt="School Guard Pro Logo" class="img-fluid project-logo" />
          </div>
          <h2 class="fw-bold project-title mb-1">School Guard Pro</h2>
          <p class="text-muted small">Sustav kontrole i sigurnosti</p>
        </div>

        <!-- Unosna forma -->
        <form @submit.prevent="handleLogin">
          <div class="form-floating mb-3">
            <input 
              type="email" 
              class="form-control customs-input" 
              id="floatingEmail" 
              placeholder="name@example.com"
              v-model="email"
              required
            >
            <label for="floatingEmail">Email adresa</label>
          </div>

          <div class="form-floating mb-4">
            <input 
              type="password" 
              class="form-control customs-input" 
              id="floatingPassword" 
              placeholder="Lozinka"
              v-model="password"
              required
            >
            <label for="floatingPassword">Lozinka</label>
          </div>

          <div v-if="errorMessage" class="alert alert-danger py-2 small mb-3" role="alert">
            {{ errorMessage }}
          </div>

          <!-- Gumb u točnoj boji sustava -->
          <button 
            type="submit" 
            class="btn btn-custom-green w-100 py-2.5 fw-bold text-white shadow-sm mb-3"
            :disabled="loading"
          >
            {{ loading ? 'Prijava...' : 'Login' }}
          </button>
        </form>

        <!-- Donji linkovi za Signup i Forgot Password -->
        <div class="text-center pt-3 border-top">
          <router-link to="/signup" class="d-block small text-decoration-none mb-2 link-green fw-semibold">
            Create an Account / Registracija
          </router-link>
          <router-link to="/forgotpassword" class="d-block small text-decoration-none text-muted">
            Forgot Password?
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
/* Strukturiranje razmjera ekrana */
.auth-page {
  min-height: calc(100vh - 65px);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  border-radius: 20px !important;
  background-color: #ffffff;
}

/* Stilovi logotipa */
.logo-wrapper {
  max-width: 120px;
}
.project-logo {
  max-height: 140px;
  object-fit: contain;
}
.project-title {
  color: #111111;
  font-size: 1.6rem;
}

/* Prilagodba unosa */
.customs-input:focus {
  border-color: #3ca62d !important;
  box-shadow: 0 0 0 0.25rem rgba(60, 166, 45, 0.25) !important;
}

/* Custom gumb s točnom zelenom bojom s vaše slike */
.btn-custom-green {
  background-color: #3ca62d !important;
  border-color: #3ca62d !important;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}
.btn-custom-green:hover {
  background-color: #2d8021 !important;
  border-color: #2d8021 !important;
}

.link-green {
  color: #3ca62d !important;
}
.link-green:hover {
  color: #2d8021 !important;
  text-decoration: underline !important;
}
</style>

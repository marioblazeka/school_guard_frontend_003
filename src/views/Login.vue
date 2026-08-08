<template>
  <div class="dropdown-menu">
    <form class="px-4 py-3" @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
        <input 
          type="email" 
          class="form-control" 
          id="exampleDropdownFormEmail1" 
          placeholder="email@example.com"
          v-model="email"
          required
        >
      </div>
      <div class="mb-3">
        <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
        <input 
          type="password" 
          class="form-control" 
          id="exampleDropdownFormPassword1" 
          placeholder="Password"
          v-model="password"
          required
        >
      </div>
      <div class="mb-3">
        <div class="form-check">
          <input 
            type="checkbox" 
            class="form-check-input" 
            id="dropdownCheck"
            v-model="rememberMe"
          >
          <label class="form-check-label" for="dropdownCheck">
            Remember me
          </label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
    
    <div class="dropdown-divider"></div>
    
    <button class="dropdown-item" type="button" @click="navigateToSignup">
      New around here? Sign up
    </button>
    <button class="dropdown-item" type="button" @click="navigateToForgotPassword">
      Forgot password?
    </button>
  </div>
</template>

<script>
export default {
  name: 'LoginDropdown',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false
    };
  },
  methods: {
    handleSubmit() {
      console.log('Pokrenuta prijava za:', this.email);

      // 1. Ovdje obično ide poziv prema API-ju (npr. Axios) za provjeru korisnika
      // Primjer uspješne prijave:
      const loginUspješan = true; 

      if (loginUspješan) {
        // Nakon uspješne prijave, preusmjeri korisnika na Dashboard/Glavnu klasu
        if (this.$router) {
          this.$router.push({ name: 'Dashboard' }); // ili naziv tvoje glavne klase/komponente
        } else {
          this.$emit('change-view', 'Dashboard');
        }
      } else {
        alert('Kriva lozinka ili email!');
      }
    },
    
    navigateToSignup() {
      if (this.$router) {
        this.$router.push({ name: 'Signup' }); 
      } else {
        this.$emit('change-view', 'Signup');
      }
    },
    
    navigateToForgotPassword() {
      if (this.$router) {
        this.$router.push({ name: 'ForgotPassword' });
      } else {
        this.$emit('change-view', 'ForgotPassword');
      }
    }
  }
}
</script>

<style scoped>
.dropdown-item {
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}
</style>

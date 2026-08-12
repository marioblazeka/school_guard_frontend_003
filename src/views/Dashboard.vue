<template>
  <div class="dashboard-wrapper d-flex align-items-center justify-content-center">
    <!-- Zeleno kućište ekrana identično onom s vaše slike -->
    <div class="mobile-screen p-4 d-flex flex-column text-center position-relative">
      
      <!-- Gumb za povratak (Strelica) -->
      <button @click="$router.push('/')" class="btn-back shadow-sm" title="Povratak">
        <svg viewBox="0 0 24 24" class="arrow-icon"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L15.41 7.41z"/></svg>
      </button>

      <!-- Gornji dio: Veliki logotip i naziv brenda iz Figme -->
      <div class="top-section pt-3 mb-4">
        <div class="logo-container mb-2 mx-auto">
          <img src="@/assets/logo.png" alt="School Guard Pro Logo" class="img-fluid dashboard-logo" />
        </div>
        <h2 class="brand-name fw-bold">School Gard Pro</h2>
        
        <!-- Prikaz uloge radi lakšeg testiranja na fakultetu -->
        <span :class="['badge', isAdmin ? 'bg-danger' : 'bg-dark', 'mt-1']">
          {{ isAdmin ? 'Admin Pristup (Svi unosi)' : 'Korisnički Pristup (Danas)' }}
        </span>
      </div>

      <!-- Središnji dio: Mreža velikih bijelih izbornika s ikonama -->
      <div class="menu-section d-flex flex-column gap-3 overflow-auto pr-1">
        
        <!-- 1. DNEVNIK RADA -->
        <div @click="navigateTo('dnevnik')" class="menu-card shadow-sm d-flex align-items-center p-3">
          <div class="icon-box me-3">
            <svg viewBox="0 0 24 24" class="card-icon"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
          </div>
          <div class="text-start">
            <h5 class="fw-bold m-0 text-dark">DNEVNIK RADA</h5>
          </div>
        </div>

        <!-- 2. EVIDENCIJA OBILASKA -->
        <div @click="navigateTo('obilazak')" class="menu-card shadow-sm d-flex align-items-center p-3">
          <div class="icon-box me-3">
            <svg viewBox="0 0 24 24" class="card-icon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
          </div>
          <div class="text-start">
            <h5 class="fw-bold m-0 text-dark">EVIDENCIJA OBILASKA</h5>
          </div>
        </div>

        <!-- 3. PRIJAVA NEISPRAVNOSTI -->
        <div @click="navigateTo('neispravnosti')" class="menu-card shadow-sm d-flex align-items-center p-3">
          <div class="icon-box me-3">
            <svg viewBox="0 0 24 24" class="card-icon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </div>
          <div class="text-start">
            <h5 class="fw-bold m-0 text-dark">PRIJAVA NEISPRAVNOSTI</h5>
          </div>
        </div>

        <!-- 4. PREGLED UNOSA -->
        <div @click="navigateTo('pregled')" class="menu-card shadow-sm d-flex align-items-center p-3">
          <div class="icon-box me-3">
            <svg viewBox="0 0 24 24" class="card-icon"><path d="M19 19H5V8h14v11zM16 1h-2v2h-4V1H8v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.89 2-2V5c0-1.1-.9-2-2-2h-3V1z"/></svg>
          </div>
          <div class="text-start">
            <h5 class="fw-bold m-0 text-dark">PREGLED UNOSA</h5>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'DashboardView',
  data() {
    return {
      isAdmin: false 
    };
  },
  created() {
    this.checkUserRole();
  },
  methods: {
    checkUserRole() {
      const user = auth.currentUser;
      if (user) {
        if (user.email === 'mblazeka@student.unipu.hr' || user.email.endsWith('@admin.com')) {
          this.isAdmin = true;
        }
      }
    },
    navigateTo(section) {
      const scope = this.isAdmin ? 'all' : 'today';
      this.$router.push({ 
        name: 'UnosiView', 
        query: { modul: section, pristup: scope } 
      });
    }
  }
}
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  width: 100%;
  padding: 20px;
}
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
.btn-back {
  position: absolute;
  top: 25px;
  left: 20px;
  width: 32px;
  height: 32px;
  background-color: #111111;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}
.btn-back:hover { transform: scale(1.1); }
.arrow-icon { width: 18px; height: 18px; fill: #ffffff; }
.logo-container { max-width: 110px; }
.dashboard-logo { max-height: 120px; object-fit: contain; mix-blend-mode: multiply; }
.brand-name { font-size: 1.45rem; color: #111111; }
.menu-card {
  background-color: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.menu-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15) !important;
}
.icon-box {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-icon {
  width: 34px;
  height: 34px;
  fill: #111111;
}
.menu-card h5 {
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  color: #333333;
}
.menu-section::-webkit-scrollbar { width: 0px; }
</style>

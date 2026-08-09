<template>
  <div id="app">
    <div class="content-container">
      <router-view/>
    </div>

    <!-- Fiksni izbornik s učitanim SVG ikonama -->
    <nav id="nav">
      <router-link to="/" class="nav-item" title="Home">
        <img src="@/assets/icons/home.svg" alt="Home" class="nav-icon" />
      </router-link>

      <router-link to="/about" class="nav-item" title="About">
        <img src="@/assets/icons/about.svg" alt="About" class="nav-icon" />
      </router-link>

      <router-link to="/login" class="nav-item" title="Login">
        <img src="@/assets/icons/login.svg" alt="Login" class="nav-icon" />
      </router-link>

      <router-link to="/signup" class="nav-item" title="Signup">
        <img src="@/assets/icons/signup.svg" alt="Signup" class="nav-icon" />
      </router-link>

      <router-link to="/forgotpassword" class="nav-item" title="Forgot Password">
        <img src="@/assets/icons/lock.svg" alt="Forgot Password" class="nav-icon" />
      </router-link>
    </nav>
  </div>
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
}

.content-container {
  padding-bottom: 75px; 
}

#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  z-index: 1000;
  background-color: #ffffff;
  box-shadow: 0 -3px 15px rgba(0, 0, 0, 0.08);
  
  display: flex;
  justify-content: space-around; 
  align-items: center;
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.2s ease;

  /* OVDJE SE NALAZI FILTER ZA NEAKTIVNE IKONE */
  .nav-icon {
    width: 26px;
    height: 26px;
    /* Ovaj filter pretvara originalnu boju ikone u neutralnu sivu */
    filter: invert(65%) sepia(10%) saturate(400%) hue-rotate(170deg); 
    transition: filter 0.2s ease;
  }

  &:hover {
    background-color: #f0f2f5;
    
    .nav-icon {
      /* Kada prijeđete mišem, ikona potamni u tamno sivu */
      filter: invert(20%) sepia(10%) saturate(400%) hue-rotate(170deg);
    }
  }

  /* OVDJE SE NALAZI FILTER ZA AKTIVNU (ZELENU) IKONU */
  &.router-link-exact-active {
    background-color: #e8f5e9; /* Svijetlo zelena pozadina kruga */
    
    .nav-icon {
      /* Ovaj komplicirani filter pretvara bilo koju tamnu ikonu u točnu Vue zelenu boju (#42b983) */
      filter: invert(64%) sepia(45%) saturate(545%) hue-rotate(106deg) brightness(93%) contrast(85%);
    }
  }
}
</style>

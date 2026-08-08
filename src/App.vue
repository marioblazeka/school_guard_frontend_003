<template>
  <div id="app">
    <!-- Sadržaj stranica se učitava ovdje -->
    <div class="content-container">
      <router-view/>
    </div>

    <!-- Fiksni izbornik na dnu -->
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/forgotpassword">Forgot Password</router-link>
    </div>
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

/* Kontejner za sadržaj osigurava da fiksni izbornik ne prekrije tekst na dnu stranice */
.content-container {
  padding-bottom: 80px; /* Mora biti malo veći od visine samog izbornika */
}

#nav {
  /* Ključni dio za fiksiranje na dnu */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Osigurava da je izbornik uvijek iznad ostalog sadržaja */
  
  /* Izgled i razmještaj */
  padding: 20px 10px;
  background-color: #ffffff; /* Dodana pozadina da se sadržaj iza ne prozire */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Blaga sjena na vrhu izbornika */
  
  /* Flexbox za automatsko prilagođavanje (skaliranje) širini ekrana */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px; /* Razmak između linkova umjesto ručnih okomitih crta "|" */
  flex-wrap: wrap; /* Ako je ekran premalen, linkovi skaču u novi red umjesto da puknu */

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none; /* Uklanja podcrtavanje linkova radi ljepšeg izgleda */
    padding: 5px 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <div id="app">
    <!-- Uklonjen fiksni navigacijski meni s dnu stranice -->
    <router-view/>
  </div>
</template>

<style lang="scss">
/* Globalni bazični stilovi aplikacije */
#app {
  font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111111;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #1a1a1a; /* Tamna pozadina u ravnini s Figmom oko mobitela */
}

body {
  margin: 0;
  padding: 0;
  background-color: #1a1a1a;
}
</style>

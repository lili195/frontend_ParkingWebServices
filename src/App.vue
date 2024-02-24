<template>
  <h1> ¡Bienvenido! Por favor elija la opción que desee realizar</h1>
  <p>
    <img img :src="require('../src/assets/car.png')" alt="Car logo">
  </p>
  <HomePage />
</template>

<script setup>

import HomePage from './components/HomePage.vue'

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

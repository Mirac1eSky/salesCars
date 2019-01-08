<template>
  <div id="app">
    <img alt="cars log" src="./assets/logo.png">
    <cars msg="大牛二手車"/>
  </div>
</template>

<style src="./assets/css/app.css"></style>

<script>
import cars from './components/cars.vue'

export default {
  name: 'app',
  components: {
    cars
  }
};
</script>


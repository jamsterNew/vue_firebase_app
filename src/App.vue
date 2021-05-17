<template>
  <div id="app">
    <div class="container">
      <NavBar/>
      <router-view/>
      <!-- <Footer/> -->
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import NavBar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
  .padding-lr-0 {
    padding-left: 0;
    padding-right: 0;
  }
</style>

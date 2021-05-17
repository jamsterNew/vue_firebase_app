<template>
    <section class="section">
         <viewUsers/>
    </section>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import ViewUsers from '../components/Users.vue'

@Component({
  components: {
    ViewUsers
  }
})
export default class Home extends Vue {}
</script>

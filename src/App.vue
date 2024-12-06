

<template>
  <div class="main"><router-view></router-view></div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<style scoped>
.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

</style>
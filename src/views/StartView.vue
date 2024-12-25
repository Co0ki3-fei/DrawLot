<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
// import TheWelcome from '../components/TheWelcome.vue'
const next = () => {
  router.push('/PreGround');
}

</script>

<template>
  <main @click="next" style="width: 100%; height: 100%;">
  </main>

</template>

<style scoped>


</style>
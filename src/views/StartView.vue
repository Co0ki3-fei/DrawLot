<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
// import TheWelcome from '../components/TheWelcome.vue'
const next = () => {
  router.push('/PreGround');
}

</script>

<template>
  <main>

    <span @click="next">初始页面，需要一张主图</span>


  </main>

</template>

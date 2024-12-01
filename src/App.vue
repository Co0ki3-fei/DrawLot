<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import FirstRoundView from "@/views/SecondRound/SecondRoundView.vue";
import SecondRoundView from "@/views/SecondRound/SecondRoundView.vue";
</script>

<template>
  <RouterView class="m-main"/>
</template>

<style scoped>
.m-main{
    height: fit-content;
    width: fit-content;
}
</style>

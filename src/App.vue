

<template>
  <div class="main"><router-view></router-view></div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<style>
.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

.fire-text {
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  background: linear-gradient(
    to bottom,
    #fff 5%,
    #ff8a00 20%,
    #ff4d00 40%,
    #ff0000 50%,
    #ff4d00 60%,
    #ff8a00 80%,
    #ff5722 95%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fire 0.8s ease-in-out infinite alternate,
             glow 2s ease-in-out infinite alternate;
  text-shadow: 
    0 0 10px rgba(255, 138, 0, 0.5),
    0 0 20px rgba(255, 77, 0, 0.5),
    0 0 30px rgba(255, 0, 0, 0.5),
    0 0 40px rgba(255, 115, 0, 0.3),
    0 0 70px rgba(255, 98, 0, 0.2);
}

@keyframes fire {
  0% {
    background-position: 0 100%;
    transform: translateY(0);
  }
  100% {
    background-position: 0 0;
    transform: translateY(-5px);
  }
}

@keyframes glow {
  0% {
    text-shadow: 
      0 0 10px rgba(255, 138, 0, 0.5),
      0 0 20px rgba(255, 77, 0, 0.5),
      0 0 30px rgba(255, 0, 0, 0.5),
      0 0 40px rgba(255, 115, 0, 0.3),
      0 0 70px rgba(255, 98, 0, 0.2);
  }
  100% {
    text-shadow: 
      0 0 15px rgba(255, 138, 0, 0.7),
      0 0 25px rgba(255, 77, 0, 0.7),
      0 0 35px rgba(255, 0, 0, 0.7),
      0 0 45px rgba(255, 115, 0, 0.5),
      0 0 75px rgba(255, 98, 0, 0.4);
  }
}

</style>
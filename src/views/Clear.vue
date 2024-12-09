<template>
    <button @click="clearLocalStorage">清除所有比赛进程数据</button>
</template>

<script setup>
const clearLocalStorage = ()=>{
    localStorage.removeItem("vuex")
}
</script>
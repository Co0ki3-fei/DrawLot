<template>
<div class="winner-list-view">
  <div class="title">
    三十二强赛胜者
  </div>
  <div class="winner-list">
    <el-table :data="winnerList" border :show-header="false" >
        <el-table-column prop="winner" align="center">
            <template #default="{row}">
                <span>
                    <span :style="{color:'blue',fontWeight: 'bold',textDecoration:'underline',fontStyle:'italic',fontSize:'18px'}">{{ row.winnerPart1 }}</span>
                    <span :style="{color:'purple',fontWeight: 'bold',fontSize:'18px',paddingLeft:'5%'}">{{ row.winnerPart2.name }}</span>
                </span>
            </template>
        </el-table-column>
    </el-table>
  </div>
  <div class="next-round-bt">
    <el-button @click="nextRound">
        进入下一轮
    </el-button>
  </div>
</div>
</template>

<style>
.winner-list-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5%;
}

.title {
    font-size: 32px;
    font-style: italic;
    text-decoration: underline;
    font-weight: bold;
    padding-bottom: 5%;
}

.winner-list {
    width: 30%;
    padding-bottom: 5%;
}
</style>

<script setup>
import {computed,ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

// 获取第一轮胜者列表
const fistRoundWinnerList = computed(() => store.getters['group/fistRoundWinners']);

// 初始化胜者列表
const winnerList = ref([]);

// 填充胜者列表
for (let index = 0; index < fistRoundWinnerList.value.length; index++) {
  winnerList.value.push({
    winnerPart1: String.fromCharCode(65 + index), // 使用index来生成A、B、C...等
    winnerPart2: fistRoundWinnerList.value[index] || "", // 获取每个胜者的名字
  });
}


// console.log(winnerList)

function nextRound() {
    router.push('/SecondRound/SecondRoundView');
}

</script>
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

const playerList = computed(() => store.getters['group/compGroup'])
console.log(playerList)

// 添加一个计算属性来获取第一轮胜者，并按照分组顺序排序
const fistRoundWinnerList = computed(() => {
  return playerList.value
    .filter(player => player.isFirstWinner === true)
    .sort((a, b) => a.firstRoundGroup - b.firstRoundGroup);
});

const winnerList = ref([]);

// 使用排序后的胜者列表创建显示数据
for (let index = 0; index < fistRoundWinnerList.value.length; index++) {
  winnerList.value.push({
    winnerPart1: String.fromCharCode(65 + fistRoundWinnerList.value[index].firstRoundGroup),
    winnerPart2: fistRoundWinnerList.value[index] || "",
  });
}

function nextRound() {
    router.push('/SecondRound/SecondRoundView');
}

</script>

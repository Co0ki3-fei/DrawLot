<template>
  <div class="second-round">
    <div class="title">八强赛胜者</div>
    <div class="res-table">
      <el-table :data="playerPool" border :header-cell-style="headerCellStyle">
        <el-table-column align="center" label="第一组">
          <template #default="{ row, $index }">
            <div 
              :class="['cell-content', { 'highlighted': highlightedCells[`${$index}-0`] }]"
              @click="toggleHighlight($index, 0)"
            >
              {{ row.fist_group }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="第二组">
          <template #default="{ row, $index }">
            <div 
              :class="['cell-content', { 'highlighted': highlightedCells[`${$index}-1`] }]"
              @click="toggleHighlight($index, 1)"
            >
              {{ row.second_group }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="第三组">
          <template #default="{ row, $index }">
            <div 
              :class="['cell-content', { 'highlighted': highlightedCells[`${$index}-2`] }]"
              @click="toggleHighlight($index, 2)"
            >
              {{ row.third_group }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="第四组">
          <template #default="{ row, $index }">
            <div 
              :class="['cell-content', { 'highlighted': highlightedCells[`${$index}-3`] }]"
              @click="toggleHighlight($index, 3)"
            >
              {{ row.forth_group }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="next-button">
      <el-button @click="nextRound">进入下一轮</el-button>
    </div>
  </div>
</template>
  
<script setup>
/**
 * 测试使用的数据以及secondRoundWinners
 */
const testData = [
 {
    playerId: 1,
    name: "选手A1",
    avatar: "https://example.com/avatar1.jpg",
    group: 0,  // 第一组
    secondRoundOrder: 1,  // 组内第二名
    isSecondWinner: true,
    thirdRoundScore: 0,
    isThirdWinner: true
  },
  {
    playerId: 2,
    name: "选手A2",
    avatar: "https://example.com/avatar2.jpg",
    group: 0,  // 第一组
    secondRoundOrder: 2,  // 组内第二名
    isSecondWinner: true,
    thirdRoundScore: 0,
    isThirdWinner: true
  },
  {
    playerId: 3,
    name: "选手B1",
    avatar: "https://example.com/avatar3.jpg",
    group: 1,  // 第二组
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 0,
    isThirdWinner: true
  },
  {
    playerId: 4,
    name: "选手B2",
    avatar: "https://example.com/avatar4.jpg",
    group: 1,
    secondRoundOrder: 2,
    isSecondWinner: true,
    thirdRoundScore: 0,
    isThirdWinner: true
  },
  {
    playerId: 5,
    name: "选手C1",
    avatar: "https://example.com/avatar5.jpg",
    group: 2,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 0,
    isThirdWinner: false
  },
  {
    playerId: 6,
    name: "选手C2",
    avatar: "https://example.com/avatar6.jpg",
    group: 2,
    secondRoundOrder: 2,
    isSecondWinner: true,
    thirdRoundScore: 0,
    isThirdWinner: false
  },
  {
    playerId: 7,
    name: "选手D1",
    avatar: "https://example.com/avatar7.jpg",
    group: 3,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 0,
    isThirdWinner: false
  },
  {
    playerId: 8,
    name: "选手D2",
    avatar: "https://example.com/avatar8.jpg",
    group: 3,
    secondRoundOrder: 2,
    isSecondWinner: true,
    thirdRoundScore: 0,
    isThirdWinner: false
  }
];
// const secondRoundWinners = computed(() => {
//   return testData
//     .sort((a, b) => {
//       if (a.group !== b.group) {
//         return a.group - b.group;
//     }
//     return a.secondRoundOrder - b.secondRoundOrder;
//   });
// });

import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

const store = useStore()

/**
 * 用于设置高亮，通过点击对手单元格取消或进行高亮
 */
const highlightedCells = ref({})

const toggleHighlight = (rowIndex, colIndex) => {
  const key = `${rowIndex}-${colIndex}`
  highlightedCells.value[key] = !highlightedCells.value[key]
  
  // 获取对应的选手和对手
  const winners = secondRoundWinners.value
  let player, opponent
  
  // 根据点击的位置确定选手和对手
  if (rowIndex === 0) {
    switch(colIndex) {
      case 0:
        player = winners[0]
        opponent = winners[7]
        break
      case 1:
        player = winners[2]
        opponent = winners[5]
        break
      case 2:
        player = winners[4]
        opponent = winners[3]
        break
      case 3:
        player = winners[6]
        opponent = winners[1]
        break
    }
  } else {
    switch(colIndex) {
      case 0:
        player = winners[7]
        opponent = winners[0]
        break
      case 1: 
        player = winners[5]
        opponent = winners[2]
        break
      case 2: 
        player = winners[3]
        opponent = winners[4]
        break
      case 3: 
        player = winners[1]
        opponent = winners[6]
        break
    }
  }

  if (player && opponent) {
    if (highlightedCells.value[key]) {
      // 设置当前选手为胜者 设置对手为败者
      store.dispatch('group/updatePlayerIsThirdWinnerToWin', player.playerId)
      store.dispatch('group/updatePlayerIsThirdWinnerToDefeat', opponent.playerId)
      
      // 取消对手单元格的高亮
      const opponentRowIndex = rowIndex === 0 ? 1 : 0
      const opponentKey = `${opponentRowIndex}-${colIndex}`
      highlightedCells.value[opponentKey] = false
    } else {
      // 取消当前选手的胜者状态
      store.dispatch('group/updatePlayerIsThirdWinnerToDefeat', player.playerId)
    }
  }
}
// 初始化高亮状态
onMounted(() => {
  const winners = secondRoundWinners.value
  winners.forEach((player, index) => {
    if (player.isThirdWinner) {
      // 根据选手在表格中的位置设置高亮
      let rowIndex, colIndex
      if (index < 8) {
        if (index === 0) { rowIndex = 0; colIndex = 0; } 
        else if (index === 2) { rowIndex = 0; colIndex = 1; } 
        else if (index === 4) { rowIndex = 0; colIndex = 2; }
        else if (index === 6) { rowIndex = 0; colIndex = 3; }
        else if (index === 7) { rowIndex = 1; colIndex = 0; }
        else if (index === 5) { rowIndex = 1; colIndex = 1; } 
        else if (index === 3) { rowIndex = 1; colIndex = 2; }
        else if (index === 1) { rowIndex = 1; colIndex = 3; } 
        
        highlightedCells.value[`${rowIndex}-${colIndex}`] = true
      }
    }
  })
})


/**
 *  表格头样式
 */
 const headerCellStyle = () => {
  return {
    backgroundColor: '#c7c7c7',
    color: 'black',
    borderColor: '#c7c7c7'
  }
}

/**
 * 获取从第二轮胜者中选出的选手，并按组和排名排序放入选手池中
 */
const secondRoundWinners = computed(() => {
  return store.getters['group/compGroup']
    .filter(player => player.isSecondWinner === true)
    .sort((a, b) => {
      if (a.group !== b.group) {
        return a.group - b.group
      }
      return a.secondRoundOrder - b.secondRoundOrder
    })
})
const playerPool = computed(() => {
  const winners = secondRoundWinners.value
  if (winners.length !== 8) return []
  
  return [
    {
      fist_group: winners[0]?.name || '', 
      second_group: winners[2]?.name || '',
      third_group: winners[4]?.name || '',
      forth_group: winners[6]?.name || ''
    },
    {
      fist_group: winners[7]?.name || '', 
      second_group: winners[5]?.name || '', 
      third_group: winners[3]?.name || '',
      forth_group: winners[1]?.name || ''  
    }
  ]
})



/**
 * 进入总决赛阶段
 */
const nextRound = () => {
  router.push('/Finals/Finals')
}
</script>
  
<style>
.second-round {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10%;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  font-style: italic;
  padding-bottom: 1%;
}

.res-table {
  width: 60%;
  padding-bottom: 3%;
}

.cell-content {
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.3s ease;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.highlighted {
  background-color: #6d6a6a;
}

.el-table .cell {
  padding: 0 !important;
  height: 100%;
}

/* 添加这些新样式 */
.el-table__cell {
  padding: 0 !important;
}

.el-table .cell {
  height: 100%;
}

.el-table__row td {
  height: 50px;  /* 设置一个固定高度 */
}
</style>
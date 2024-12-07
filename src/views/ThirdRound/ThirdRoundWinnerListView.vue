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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

const store = useStore()

// 存储高亮状态的对象
const highlightedCells = ref({})

// 切换高亮状态的函数
const toggleHighlight = (rowIndex, colIndex) => {
  const key = `${rowIndex}-${colIndex}`
  highlightedCells.value[key] = !highlightedCells.value[key]
}

// 测试数据
const testData = [
 {
    playerId: 1,
    name: "选手A1",
    avatar: "https://example.com/avatar1.jpg",
    group: 0,  // 第一组
    secondRoundOrder: 1,  // 组内第二名
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 2,
    name: "选手A2",
    avatar: "https://example.com/avatar2.jpg",
    group: 0,  // 第一组
    secondRoundOrder: 2,  // 组内第二名
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 3,
    name: "选手B1",
    avatar: "https://example.com/avatar3.jpg",
    group: 1,  // 第二组
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 4,
    name: "选手B2",
    avatar: "https://example.com/avatar4.jpg",
    group: 1,
    secondRoundOrder: 2,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 5,
    name: "选手C1",
    avatar: "https://example.com/avatar5.jpg",
    group: 2,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 6,
    name: "选手C2",
    avatar: "https://example.com/avatar6.jpg",
    group: 2,
    secondRoundOrder: 2,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 7,
    name: "选手D1",
    avatar: "https://example.com/avatar7.jpg",
    group: 3,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 8,
    name: "选手D2",
    avatar: "https://example.com/avatar8.jpg",
    group: 3,
    secondRoundOrder: 2,
    isSecondWinner: true,
    thirdRoundScore: 0
  }
];

// 修改 secondRoundWinners 计算属性为使用测试数据
// const secondRoundWinners = computed(() => {
//   return testData
//     .sort((a, b) => {
//       if (a.group !== b.group) {
//         return a.group - b.group;
//     }
//     return a.secondRoundOrder - b.secondRoundOrder;
//   });
// });


// 获取第二轮胜者并按组和排名排序
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

// 根据对决规则组织选手池数据
const playerPool = computed(() => {
  const winners = secondRoundWinners.value
  if (winners.length !== 8) return []
  
  return [
    {
      fist_group: winners[0]?.name || '', // A1
      second_group: winners[2]?.name || '', // B1
      third_group: winners[4]?.name || '', // C1
      forth_group: winners[6]?.name || ''  // D1
    },
    {
      fist_group: winners[7]?.name || '', // D2
      second_group: winners[5]?.name || '', // C2
      third_group: winners[3]?.name || '', // B2
      forth_group: winners[1]?.name || ''  // A2
    }
  ]
})

const headerCellStyle = () => {
  return {
    backgroundColor: '#c7c7c7',
    color: 'black',
    borderColor: '#c7c7c7'
  }
}

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
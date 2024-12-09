<template>
  <div class="second-round">
    <div class="title fire-text">八强赛胜者</div>
    <div class="res-table">
      <CustomTable 
        :data="playerPool" 
        :columns="columns"
        :show-header="true"
      >
        <template #fist_group="{ row, $index }">
          <div
            :class="['cell-content', { 'highlighted': highlightedCells[`${$index}-0`] }]"
            @click="toggleHighlight($index, 0)"
          >
            <span v-if="highlightedCells[`${$index}-0`]" class="rank-badge rank-winner">Winner</span>
            {{ row.fist_group }}
          </div>
        </template>
        <template #second_group="{ row, $index }">
          <div
            :class="['cell-content', { 'highlighted': highlightedCells[`${$index}-1`] }]"
            @click="toggleHighlight($index, 1)"
          >
            <span v-if="highlightedCells[`${$index}-1`]" class="rank-badge rank-winner">Winner</span>
            {{ row.second_group }}
          </div>
        </template>
        <template #third_group="{ row, $index }">
          <div
            :class="['cell-content', { 'highlighted': highlightedCells[`${$index}-2`] }]"
            @click="toggleHighlight($index, 2)"
          >
            <span v-if="highlightedCells[`${$index}-2`]" class="rank-badge rank-winner">Winner</span>
            {{ row.third_group }}
          </div>
        </template>
        <template #forth_group="{ row, $index }">
          <div
            :class="['cell-content', { 'highlighted': highlightedCells[`${$index}-3`] }]"
            @click="toggleHighlight($index, 3)"
          >
            <span v-if="highlightedCells[`${$index}-3`]" class="rank-badge rank-winner">Winner</span>
            {{ row.forth_group }}
          </div>
        </template>
      </CustomTable>
    </div>
    <div class="next-button">
      <el-button @click="nextRound">进入下一轮</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import CustomTable from '@/components/CustomTable.vue'

const store = useStore()

/**
 * 获取从第二轮胜者中选出的选手，并按组和排名排序放入选手池中
 */
const secondRoundWinners = computed(() => {
  return store.getters['group/compGroup']
    .filter(player => player.secondRoundOrder !== 0)
    .sort((a, b) => {
      if (a.group !== b.group) {
        return a.group - b.group
      }
      return a.secondRoundOrder - b.secondRoundOrder
    })
})


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

const columns = [
  { prop: 'fist_group', label: '第一组' },
  { prop: 'second_group', label: '第二组' },
  { prop: 'third_group', label: '第三组' },
  { prop: 'forth_group', label: '第四组' }
]

/**
 * 进入总决赛阶段
 */
const nextRound = () => {
  router.push('/Finals/Finals')
}
</script>

<style scoped>
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
  transition: all 0.3s ease;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.highlighted {
  background-color: rgba(109, 106, 106, 0.3);
  transform: scale(1.02);
  transition: all 0.3s ease;
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

.rank-badge {
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 8px;
  font-weight: bold;
  font-size: 0.9em;
}

.rank-winner {
  background: linear-gradient(45deg, #FFD700, #FF4500);
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
</style>

<template>
  <div class="winner-list">
    <div class="winner-list-title">总排名</div>
    <el-table :data="podiumData" border :show-header="false" class="winner-list-table">
      <el-table-column align="center">
        <template #default="{ row, $index }">
          <span @click="openSelectDialog($index)">
            {{ row.name }}
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 选择选手对话框 -->
    <el-dialog v-model="selectPlayerDialogVisible" title="选择选手" @close="closeSelectPlayerDialog">
      <div class="button-grid">
        <div v-for="player in availablePlayers" :key="player.playerId" class="button-row">
          <el-button 
            type="text" 
            @click="selectPlayer(player)"
          >
            {{ player.name }}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 测试数据
const testData = ref([
  {
    playerId: 1,
    name: "玩家1",
    isBetter: true,
    avatar: "/src/assets/001.jpg",
    firstRoundGroup: 0,
    isFirstWinner: true,
    secondRoundScore: 2,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 2,
    thirdRoundOrder: 0,
    isThirdWinner: true,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: true
  },
  {
    playerId: 2,
    name: "玩家2",
    isBetter: true,
    avatar: "/src/assets/002.jpg",
    firstRoundGroup: 0,
    isFirstWinner: true,
    secondRoundScore: 2,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 2,
    thirdRoundOrder: 0,
    isThirdWinner: true,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: true
  },
  {
    playerId: 3,
    name: "玩家3",
    isBetter: true,
    avatar: "/src/assets/003.jpg",
    firstRoundGroup: 0,
    isFirstWinner: true,
    secondRoundScore: 2,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 2,
    thirdRoundOrder: 0,
    isThirdWinner: true,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 4,
    name: "玩家4",
    isBetter: true,
    avatar: "/src/assets/004.jpg",
    firstRoundGroup: 0,
    isFirstWinner: true,
    secondRoundScore: 2,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 2,
    thirdRoundOrder: 0,
    isThirdWinner: true,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: true
  },
])


/**
 * 初始化冠亚季军数据
 */
const compGroup = computed(() => {
  return testData.value.filter(player => player.isFinalWinner === true)
  .sort((a, b) => a.playerId - b.playerId)
})
const podiumData = ref([
  { name: '冠军' },
  { name: '亚军' },
  { name: '季军' }
])

/**
 * 选择选手
 */
const selectPlayerDialogVisible = ref(false)
const selectedIndex = ref(null)
const availablePlayers = ref(compGroup.value)

const openSelectDialog = (index) => {
  selectedIndex.value = index
  selectPlayerDialogVisible.value = true
}

const selectPlayer = (player) => {
  if (podiumData.value.some(p => p.name === player.name)) {
    ElMessage.warning("不能选择相同的选手！")
    return
  }
  if (selectedIndex.value !== null) {
    podiumData.value[selectedIndex.value].name = player.name
  }
  closeSelectPlayerDialog()
}

const closeSelectPlayerDialog = () => {
  selectPlayerDialogVisible.value = false
}
</script>

<style>
.winner-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.winner-list-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
}

.winner-list-table {
  width: 30%;
  margin-top: 20px;
}

.button-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.button-row {
  display: flex;
  gap: 20px;
}
</style>
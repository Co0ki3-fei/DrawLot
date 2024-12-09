<template>
  <div class="player-card">
    <!-- 选择选手按钮 -->
    <div v-if="!player && allowPlayerChange" class="select-player" @click="$emit('select-player')">
      选择选手
    </div>

    <!-- 选手信息和分数调整弹窗 -->
    <el-popover
      v-if="player"
      v-model:visible="popoverVisible"
      placement="bottom"
      :width="200"
      trigger="click"
    >
      <template #reference>
        <div class="player-info">
          <el-image :src="player.avatar" style="width: 150px; height: 200px"></el-image>
          <el-text>{{ player.name }}</el-text>
        </div>
      </template>
      <div class="action-buttons">
        <el-button @click="increaseScore">增加胜场</el-button>
        <el-button @click="decreaseScore">减少胜场</el-button>
        <el-button v-if="allowPlayerChange" @click="resetPlayer">重置选手</el-button>
      </div>
    </el-popover>

    <!-- 选技功能，仅在32强赛时显示 -->
    <template v-if="showSkillSelect && player">
      <el-dropdown placement="bottom-start" @command="handleSkillChange">
        <el-button class="skill-button">
          <el-text>选用技:</el-text>
          <el-text>{{ player?.firstRoundSkill || '' }}</el-text>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="skill in skills"
              :key="skill"
              :command="skill"
            >
              {{ skill }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  player: {
    type: Object,
    default: null
  },
  showSkillSelect: {
    type: Boolean,
    default: false
  },
  allowPlayerChange: {
    type: Boolean,
    default: false
  },
  maxScore: {
    type: Number,
    default: 1
  },
  skills: {
    type: Array,
    default: () => []
  },
  fetchScore: {
    type: Function,
    default: p => {
      return p.firstRoundScore ?? 
             p.secondRoundScore ?? 
             p.thirdRoundScore ?? 
             p.finalScore ?? 0
    }
  }
})

const emit = defineEmits([
  'update:player',
  'score-change',
  'skill-change',
  'reset-player',
  'select-player'
])

const popoverVisible = ref(false)

const increaseScore = () => {
  if (!props.player) return
  
  const currentScore = props.fetchScore(props.player)
                      
  if (currentScore >= props.maxScore) {
    ElMessage.warning('已达到最大胜场数')
    return
  }
  
  emit('score-change', props.player.playerId, currentScore + 1)
  popoverVisible.value = false
}

const decreaseScore = () => {
  if (!props.player) return
  
  const currentScore = props.fetchScore(props.player)
                      
  if (currentScore <= 0) {
    ElMessage.warning('胜场数已为0')
    return
  }
  
  emit('score-change', props.player.playerId, currentScore - 1)
  popoverVisible.value = false
}

const resetPlayer = () => {
  emit('reset-player')
  popoverVisible.value = false
}

const handleSkillChange = (skill) => {
  emit('skill-change', skill)
}
</script>

<style scoped>
.player-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 4px solid transparent;
  border-radius: 15px;
  background: linear-gradient(var(--el-bg-color), var(--el-bg-color)) padding-box,
              linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96c93d) border-box;
  padding: 15px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  height: 300px;
  width: 400px;
}

.player-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}

.player-info .el-text {
  font-size: 30px;
  color: var(--text-color);
  font-style: italic;
  font-weight: normal;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skill-button {
  display: flex;
  justify-content: flex-start;
  border: none;
  position: relative;
  width: 100%;
  padding: 10%;
}

.skill-button .el-text {
  font-size: 20px;
  color: var(--text-color);
  font-weight: bold;
  font-style: italic;
  margin-right: 8px;
}

.select-player {
  text-align: center;
  font-size: 24px;
  color: var(--text-color);
  cursor: pointer;
}
</style> 
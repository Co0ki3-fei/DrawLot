<template>
  <div class="winner-list">
    <div class="floating-icons">
      <i class="fas fa-star"></i>
      <i class="fas fa-crown"></i>
      <i class="fas fa-gem"></i>
      <i class="fas fa-trophy"></i>
    </div>
    
    <div class="winner-list-title">
      <i class="fas fa-crown crown-left animate-rotate"></i>
      <span class="title-text fire-text">总排名</span>
      <i class="fas fa-crown crown-right animate-rotate"></i>
    </div>

    <div class="podium-container">
      <div v-for="(winner, index) in podiumData" 
           :key="index" 
           :class="['podium-item', `rank-${index + 1}`, 'animate-float']"
           @click="openSelectDialog(index)">
        <div class="rank-number">#{{'123'[index]}}</div>
        <div class="avatar-container">
          <div class="avatar-frame">
            <img 
              v-if="winner.avatar"
              :src="winner.avatar" 
              :alt="winner.name"
              class="avatar-image"
            >
            <i v-else :class="[getMedalIcon(index), 'animate-pulse']"></i>
          </div>
          <div class="frame-corner top-left"></div>
          <div class="frame-corner top-right"></div>
          <div class="frame-corner bottom-left"></div>
          <div class="frame-corner bottom-right"></div>
        </div>
        <div class="winner-info">
          <div class="winner-name">{{ winner.name }}</div>
          <div class="winner-title">{{ ['冠军得主', '亚军得主', '季军得主'][index] }}</div>
        </div>
      </div>
    </div>

    <el-dialog v-model="selectPlayerDialogVisible" 
               title="选择选手" 
               @close="closeSelectPlayerDialog"
               class="player-select-dialog">
      <div class="button-grid">
        <el-button 
          v-for="player in availablePlayers" 
          :key="player.playerId"
          class="player-button"
          @click="selectPlayer(player)">
          {{ player.name }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import store from '@/store';

// 测试数据

/**
 * 初始化冠亚季军数据
 */
const compGroup = computed(() => {
  return store.getters['group/compGroup'].filter(player => player.isThirdWinner === true)
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
    podiumData.value[selectedIndex.value].avatar = player.avatar
  }
  closeSelectPlayerDialog()
}

const closeSelectPlayerDialog = () => {
  selectPlayerDialogVisible.value = false
}

// 添加获取奖牌图标的方法
const getMedalIcon = (index) => {
  const icons = ['fa-solid fa-trophy', 'fa-solid fa-medal', 'fa-solid fa-award']
  return icons[index]
}
</script>

<style scoped>
.winner-list {
  margin-top: 20px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 1rem;
}

.winner-list-title {
  position: relative;
  margin-bottom: 3rem;
}

.title-text {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(45deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.podium-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
}

.podium-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(30, 30, 30, 0.594);
  clip-path: polygon(
    0 15px,
    15px 0,
    calc(100% - 15px) 0,
    100% 15px,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    15px 100%,
    0 calc(100% - 15px)
  );
  gap: 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.rank-1 {
  background: linear-gradient(135deg, rgba(50, 40, 0, 0.95), rgba(30, 30, 30, 0.95));
  transform: scale(1.05);
}

.rank-2 {
  background: linear-gradient(135deg, rgba(40, 40, 40, 0.95), rgba(30, 30, 30, 0.95));
}

.rank-3 {
  background: linear-gradient(135deg, rgba(50, 30, 20, 0.95), rgba(30, 30, 30, 0.95));
  transform: scale(0.95);
}

.avatar-container {
  position: relative;
  width: 6rem;
  height: 6rem;
  padding: 4px;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
}

.avatar-frame {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.frame-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid;
  z-index: 1;
}

.top-left {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.top-right {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

.bottom-left {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

.rank-1 .frame-corner { 
  border-color: #FFD700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}
.rank-2 .frame-corner { 
  border-color: #E0E0E0;
  box-shadow: 0 0 10px rgba(224, 224, 224, 0.5);
}
.rank-3 .frame-corner { 
  border-color: #CD7F32;
  box-shadow: 0 0 10px rgba(205, 127, 50, 0.5);
}

.winner-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFFFFF;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.winner-title {
  font-size: 1rem;
  margin-top: 0.5rem;
}

.rank-1 .winner-title {
  background: linear-gradient(45deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.rank-2 .winner-title {
  background: linear-gradient(45deg, #E0E0E0, #A0A0A0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 10px rgba(224, 224, 224, 0.5);
}

.rank-3 .winner-title {
  background: linear-gradient(45deg, #CD7F32, #8B4513);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 10px rgba(205, 127, 50, 0.5);
}

/* 霓虹效果增强 */
.rank-1 {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.2),
              0 0 40px rgba(255, 215, 0, 0.1),
              inset 0 0 20px rgba(255, 215, 0, 0.1);
}

.rank-2 {
  box-shadow: 0 0 20px rgba(224, 224, 224, 0.2),
              0 0 40px rgba(224, 224, 224, 0.1),
              inset 0 0 20px rgba(224, 224, 224, 0.1);
}

.rank-3 {
  box-shadow: 0 0 20px rgba(205, 127, 50, 0.2),
              0 0 40px rgba(205, 127, 50, 0.1),
              inset 0 0 20px rgba(205, 127, 50, 0.1);
}

/* 扫光动画增强 */
.podium-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transform: skewX(-25deg);
  animation: shine 4s infinite;
}

@keyframes shine {
  0% { left: -150%; }
  100% { left: 150%; }
}

.rank-number {
  position: absolute;
  top: -1rem;
  left: -1rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFFFFF;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  border: 2px solid rgba(255, 255, 255, 0.2);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  animation: pulse 2s infinite;
}

.rank-1 .rank-number {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), transparent);
  border-color: #FFD700;
}

.rank-2 .rank-number {
  background: linear-gradient(135deg, rgba(224, 224, 224, 0.3), transparent);
  border-color: #E0E0E0;
}

.rank-3 .rank-number {
  background: linear-gradient(135deg, rgba(205, 127, 50, 0.3), transparent);
  border-color: #CD7F32;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.player-select-dialog :deep(.el-dialog) {
  background: var(--el-bg-color);
  border-radius: 1rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.player-button {
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.player-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(var(--el-color-primary-rgb), 0.2);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .podium-item {
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }
  
  .podium-item::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }
}

@keyframes shine {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.floating-icons {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-icons i {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.2;
  animation: float-around 20s linear infinite;
}

.floating-icons i:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.floating-icons i:nth-child(2) { top: 20%; right: 20%; animation-delay: -5s; }
.floating-icons i:nth-child(3) { bottom: 30%; left: 30%; animation-delay: -10s; }
.floating-icons i:nth-child(4) { bottom: 10%; right: 10%; animation-delay: -15s; }

.crown-left, .crown-right {
  font-size: 2.5rem;
  color: #FFD700;
  margin: 0 1rem;
}

.winner-info {
  flex: 1;
}

.decoration-icons {
  position: absolute;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.decoration-icons i {
  font-size: 1rem;
  color: #FFD700;
}

/* 动画效果 */
@keyframes float-around {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, 20px) rotate(90deg); }
  50% { transform: translate(0, 40px) rotate(180deg); }
  75% { transform: translate(-20px, 20px) rotate(270deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.animate-rotate {
  animation: rotate 10s linear infinite;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* 内层跑马灯 */
.podium-item::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--border-color),
    transparent
  );
  background-size: 200% 100%;
  clip-path: polygon(
    0 15px,
    15px 0,
    calc(100% - 15px) 0,
    100% 15px,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    15px 100%,
    0 calc(100% - 15px)
  );
  animation: borderMove 2s linear infinite;
  z-index: -1;
}

/* 外层跑马灯 */
.podium-item::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--border-color-2),
    transparent
  );
  background-size: 200% 100%;
  clip-path: polygon(
    0 15px,
    15px 0,
    calc(100% - 15px) 0,
    100% 15px,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    15px 100%,
    0 calc(100% - 15px)
  );
  animation: borderMove 3s linear infinite reverse;
  z-index: -2;
}

.rank-1 {
  --border-color: rgba(255, 215, 0, 0.5);
  --border-color-2: rgba(255, 180, 0, 0.3);
}

.rank-2 {
  --border-color: rgba(224, 224, 224, 0.5);
  --border-color-2: rgba(192, 192, 192, 0.3);
}

.rank-3 {
  --border-color: rgba(205, 127, 50, 0.5);
  --border-color-2: rgba(184, 115, 51, 0.3);
}

@keyframes borderMove {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 悬停效果增强 */
.podium-item:hover::before,
.podium-item:hover::after {
  --border-color: rgba(255, 255, 255, 0.7);
  --border-color-2: rgba(255, 255, 255, 0.4);
  animation-duration: 1.5s;
}

/* 为不同等级设置不同的动画速度和发光强度 */
.rank-1::before,
.rank-1::after {
  filter: drop-shadow(0 0 5px var(--border-color));
}

.rank-2::before,
.rank-2::after {
  filter: drop-shadow(0 0 3px var(--border-color));
}

.rank-3::before,
.rank-3::after {
  filter: drop-shadow(0 0 2px var(--border-color));
}
</style>
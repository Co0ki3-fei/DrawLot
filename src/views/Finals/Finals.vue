<template>
  <div class="second-round">
    <div class="nextBt">
      <el-button @click="nextGroup" v-if="title === '巅峰对决 — 三局赛'">下一组</el-button>
    </div>
    <div class="stopLoopBt">
      <el-button @click="enterFinals" v-if="title === '巅峰对决 — 三局赛'">进入总决赛阶段</el-button>
      <el-button @click="endGame" v-if="title === '总决赛'">结束比赛</el-button>
    </div>
    <div class="body">
      <div class="title fire-text">{{ title }}</div>
      <div class="bgm" @click="showBgmSelect = true">
        <el-dropdown trigger="click" @command="handleBgmSelect">
          <span class="bgm-text">BGM: {{ currentBGM }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item 
                v-for="bgm in bgmPool" 
                :key="bgm" 
                :command="bgm"
              >
                {{ bgm }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="player-form">
        <div class="left-player">
          <div class="select-player" v-if="!leftPlayer" @click="setLeftPlayerChoose">
            选择选手
          </div>
          <PlayerCard
            v-else
            v-model:player="leftPlayer"
            :allow-player-change="true"
            :max-score="2"
            :fetch-score="player => player.finalScore || 0"
            @score-change="updateLeftPlayerScore"
            @select-player="setLeftPlayerChoose"
            @reset-player="resetLeftPlayer"
          />
        </div>
        <div class="score">
          <div class="score-txt">VS</div>
        </div>
        <div class="right-player">
          <div class="select-player" v-if="!rightPlayer" @click="setRightPlayerChoose">
            选择选手
          </div>
          <PlayerCard
            v-else
            v-model:player="rightPlayer"
            :allow-player-change="true"
            :max-score="2"
            :fetch-score="player => player.finalScore || 0"
            @score-change="updateRightPlayerScore"
            @select-player="setRightPlayerChoose"
            @reset-player="resetRightPlayer"
          />
        </div>
      </div>
      <div class="pool" >
        <div class="player-pool">
          <div class="pp-title">选手池</div>
          <div class="pp-table">
            <el-table :data="playerPool" border :show-header="false">
              <el-table-column align="center">
                <template #default="{ row }">
                  <span>{{ row[0].name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template #default="{ row }">
                  <span>{{ row[1].name }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="bgm-pool">
          <div class="bp-title">BGM池</div>
          <div class="bp-table">
            <el-table :data="formattedBgmPool" border :show-header="false">
              <el-table-column align="center">
                <template #default="{ row }">
                    <span>{{ row[0] }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template #default="{ row }">
                  <span>{{ row[1] }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template #default="{ row }">
                  <span>{{ row[2] }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>


    <!-- choose Left Player -->
    <el-dialog 
      v-model="leftPlayerChooseVisible" 
      title="选择选手" 
      @close="closeLeftPlayerChoose"
      width="30%"
    >
      <div class="player-select-list">
        <el-card 
          v-for="player in compGroup" 
          :key="player.playerId"
          :class="{ 'disabled-card': player.playerId === rightPlayer?.playerId }"
          :shadow="player.playerId === rightPlayer?.playerId ? 'never' : 'hover'"
          @click="player.playerId !== rightPlayer?.playerId && selectLeftPlayer(player)"
        >
          <div class="player-select-item">
            <el-avatar :size="50" :src="player.avatar" />
            <span class="player-name">{{ player.name }}</span>
          </div>
        </el-card>
      </div>
    </el-dialog>

    <!-- choose Right Player -->
    <el-dialog 
      v-model="rightPlayerChooseVisible" 
      title="选择选手" 
      @close="closeRightPlayerChoose"
      width="30%"
    >
      <div class="player-select-list">
        <el-card 
          v-for="player in compGroup" 
          :key="player.playerId"
          :class="{ 'disabled-card': player.playerId === leftPlayer?.playerId }"
          :shadow="player.playerId === leftPlayer?.playerId ? 'never' : 'hover'"
          @click="player.playerId !== leftPlayer?.playerId && selectRightPlayer(player)"
        >
          <div class="player-select-item">
            <el-avatar :size="50" :src="player.avatar" />
            <span class="player-name">{{ player.name }}</span>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { chunkArray } from '@/utils/utils';

/**
 * 初始化
 */
const title = ref("巅峰对决 — 三局赛")
const store = useStore()
const router = useRouter()

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
    isFinalWinner: false
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
    isFinalWinner: false
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
    isFinalWinner: false
  },
])

// BGM 测试数据
const bgmPool = ref([
  "Megalovania - Undertale",
  "One Winged Angel - FF7",
  "The Only Thing I Know For Real - MGR",
  "Bury the Light - DMC5",
  "Red Sun in the Sky - MGR",
  "It Has To Be This Way - MGR",
  "Devil Trigger - DMC5",
  "Rivers in the Desert - P5",
  "Last Surprise - P5",
  "Life Will Change - P5",
  "Take Over - P5R",
  "I Believe - P5R"
])

// 格式化 BGM 池数据
const formattedBgmPool = chunkArray(bgmPool.value, 3);


// 非测试数据来源
const compGroup = computed(() => {
  return store.getters['group/compGroup']
    .filter(player => player.isThirdWinner === true)
    .sort((a, b) => a.playerId - b.playerId)
})
const playerPool = chunkArray(compGroup.value, 2);


/**
 * 对战选手 选择选手 选择BGM 
 */
const leftPlayer = ref(null)
const rightPlayer = ref(null)
const currentBGM = ref("点击选择BGM")
const leftPlayerChooseVisible = ref(false)
const rightPlayerChooseVisible = ref(false)
const selectLeftPlayer = (player) => {
  if (player) {
    if (player === rightPlayer.value) {
      ElMessage.warning("左右两边不能选择相同的选手！")
      return
    }
    leftPlayer.value = player
    leftPlayerChooseVisible.value = false
  } 
}

const resetLeftPlayer = () => {
  leftPlayer.value = null
}

const resetRightPlayer = () => {
  rightPlayer.value = null
}

const selectRightPlayer = (player) => {
  if (player) {
    if (player === leftPlayer.value) {
      ElMessage.warning("左右两边不能选择相同的选手！")
      return
    }
    rightPlayer.value = player
    rightPlayerChooseVisible.value = false
  } 
}

const setLeftPlayerChoose = () => {
  leftPlayerChooseVisible.value = true
}

const setRightPlayerChoose = () => {
  rightPlayerChooseVisible.value = true
}

const closeLeftPlayerChoose = () => {
  leftPlayerChooseVisible.value = false
}

const closeRightPlayerChoose = () => {
  rightPlayerChooseVisible.value = false
}


/**
 * 下一组 清空已选择的选手 关闭对话框
 */
const nextGroup = () => {
  leftPlayer.value = null
  rightPlayer.value = null
  
  leftPlayerChooseVisible.value = false
  rightPlayerChooseVisible.value = false
}



/**
 * 进入总决赛阶段处理函数
 * 更新标题 清空已选择的选手 清空BGM
 */
const enterFinals = () => {
  title.value = "总决赛"

  leftPlayer.value = null
  rightPlayer.value = null

  currentBGM.value = ''

  leftPlayerChooseVisible.value = false
  rightPlayerChooseVisible.value = false
}


/**
 * 处理 BGM 选择
 */
const handleBgmSelect = (bgm) => {
  currentBGM.value = bgm
}

/**
 * 结束比赛
 */
const endGame = () => {
  router.push('/Finals/FinalsWinnerList')
}

</script>

<style>
.nextBt,.stopLoopBt {
  display: flex;
  justify-content: flex-end;
  padding-top: 2%;
  padding-right: 2%;
}

.body {
  padding-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: var(--text-color);
}

.bgm {
  font-size: 25px;
  padding-top: 1%;
  font-weight: bold;
  font-style: italic;
  text-decoration: underline;
  cursor: pointer;
}

.bgm-text:hover {
  color: #409EFF;
}

.el-dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
}

.player-form {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  margin-top: 2%;
  align-items: center
}

.left-player, .right-player {
  display: flex;
  border-style: solid;
  border-color: #e9e8e8;
  border-radius: 5%;
  border-width: 0.5%;
  flex-direction: column;
  box-sizing: border-box;
  width: 300px;
  height: 240px;
  justify-content: center;
}



.lp-part1 {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.lp-part1 .el-text {
  font-size: 30px;
  color: var(--text-color);
  font-style: italic;
  font-weight: normal;
}


.rp-part1 {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: flex-start;
}

.rp-part1 .el-text {
  font-size: 30px;
  color: var(--text-color);
  font-style: italic;
  font-weight: normal;
}

.select-player {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-style: italic;
  text-decoration: underline;
  color: var(--text-color);
}

.score {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}

.score-txt {
  font-size: 50px;
  font-weight: bold;
  font-style: italic;
  color: #cf0a0a;
}

.score-res {
  font-size: 32px;
  color: var(--text-color);
  font-style: italic;
  text-decoration: underline;
}

.pool {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding-top: 5%;
}

.player-pool{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pp-title, .bp-title {
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  text-decoration: underline;
  color: var(--text-color);
}

.pp-table, .bp-table {
  height: 100%;  /* 表格高度自动填充父容器 */
  width: 70%;

}

.bgm-pool {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.button-row .el-button {
  font-size: 16px;
  padding: 10px 20px;
}

.player-select-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.player-select-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
}

.player-name {
  font-size: 16px;
  color: var(--el-text-color-primary);
}

.disabled-card {
  opacity: 0.5;
  cursor: not-allowed;
}

.disabled-card:hover {
  opacity: 0.5;
}

.el-card {
  cursor: pointer;
  transition: all 0.3s;
}

.el-card:not(.disabled-card):hover {
  transform: translateX(10px);
  background-color: var(--el-color-primary-light-9);
}
</style>

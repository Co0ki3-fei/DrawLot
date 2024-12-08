<template>
  <div class="second-round">
    <div class="nextBt">
      <el-select v-model="currentGroup" placeholder="请选择当前组别">
        <el-option
          v-for="i in 4"
          :key="i"
          :label="`第${i}组`"
          :value="i-1"
        />
      </el-select>
      <div style="width: 10px;"></div>
      <el-button @click="finishGroupLoopHandler">结束小组循环</el-button>
    </div>

    <div class="body">
      <div class="title fire-text">十六强对决</div>

      <el-dropdown placement="bottom-start" @command="bgmChooseHandler" style="border: 0">
        <el-button class="bgm" style="border: 0"> {{ currentBGM ? "BGM: "+currentBGM : '请选择BGM' }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(bgm,index) in bgms"
              :key="index"
              :command="bgm"
            >
              {{ bgm }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="player-form">
        <PlayerCard
          v-model:player="leftPlayer"
          :allow-player-change="true"
          :max-score="3"
          :fetch-score="player => player.secondRoundScore || 0"
          @score-change="updateLeftPlayerScore"
          @select-player="setLeftPlayerChoose"
          @reset-player="resetLeftPlayer"
        />

        <div class="score">
          <div class="score-txt">VS</div>
          <div class="total-score" v-if="leftPlayer && rightPlayer">
            {{ leftPlayer.secondRoundScore || 0 }} : {{ rightPlayer.secondRoundScore || 0 }}
          </div>
        </div>

        <PlayerCard
          v-model:player="rightPlayer"
          :allow-player-change="true"
          :max-score="3"
          :fetch-score="player => player.secondRoundScore || 0"
          @score-change="updateRightPlayerScore"
          @select-player="setRightPlayerChoose"
          @reset-player="resetRightPlayer"
        />
      </div>

      <div class="pool">
        <div class="player-pool">
          <div class="pp-title">选手池</div>
          <div class="pp-table">
            <el-table :data="playerPool" border :header-cell-style="headerCellStyle">
              <el-table-column align="center" prop="fist_group" label="第一组">
                <template #default="{ row }">
                  <span>{{ row[0].name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="second_group" label="第二组">
                <template #default="{ row }">
                  <span>{{ row[1].name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="third_group" label="第三组">
                <template #default="{ row }">
                  <span>{{ row[2].name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="forth_group" label="第四组">
                <template #default="{ row }">
                  <span>{{ row[3].name }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="bgm-pool">
          <div class="bp-title">BGM池</div>
          <div class="bp-table">
            <el-table :data="bgmPool" border :show-header="false">
              <el-table-column prop="" align="center">
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

    <el-dialog 
      v-model="leftPlayerChooseVisible" 
      :title="`选择第${currentGroup + 1}组选手`" 
      @close="closeLeftPlayerChoose"
      width="30%"
    >
      <div class="player-select-list">
        <el-card 
          v-for="player in currentGroupPlayers" 
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

    <el-dialog 
      v-model="rightPlayerChooseVisible" 
      :title="`选择第${currentGroup + 1}组选手`" 
      @close="closeRightPlayerChoose"
      width="30%"
    >
      <div class="player-select-list">
        <el-card 
          v-for="player in currentGroupPlayers" 
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { chunkArray } from "@/utils/utils.js";
import { ElMessage } from "element-plus";
import PlayerCard from '@/components/PlayerCard.vue';

const router = useRouter();
const store = useStore();

const bgms = computed(() => store.getters['group/getBgm']);
const compGroup = computed(() => store.getters['group/compGroup']);
console.log(compGroup)

const playerPool = ref([])
for (let i = 0; i < 4; i++) {
  playerPool.value.push(compGroup.value.filter((player) => {
    return player.isFirstWinner && player.firstRoundGroup % 4 === i
  }).sort((a, b) => a.firstRoundGroup - b.firstRoundGroup))
}

const bgmPool = ref([])
bgmPool.value = chunkArray(bgms.value, 3)

const currentBGM = ref('')
const bgmChooseHandler = (bgm)=>{
  currentBGM.value = bgm
}

const leftPlayer = ref(null)
const rightPlayer = ref(null)

const updateLeftPlayerScore = (playerId, newScore) => {
  const totalScore = store.getters['group/compGroup'].find(p => p.playerId === playerId)?.secondRoundScore || 0
  store.dispatch('group/updatePlayerSecondRoundScore', {
    playerId: playerId,
    score: newScore
  });
}

const updateRightPlayerScore = (playerId, newScore) => {
  const totalScore = store.getters['group/compGroup'].find(p => p.playerId === playerId)?.secondRoundScore || 0
  store.dispatch('group/updatePlayerSecondRoundScore', {
    playerId: playerId,
    score: newScore
  });
}

const resetLeftPlayer = () => {
  leftPlayer.value = null;
}

const resetRightPlayer = () => {
  rightPlayer.value = null;
}

const headerCellStyle = () => {
  return {
    backgroundColor: '#c7c7c7',
    color: 'black',
    borderColor: '#c7c7c7'
  }
}

const nextGroupHandler = () =>{
  leftPlayer.value = null
  rightPlayer.value = null
}
const finishGroupLoopHandler = ()=>{
  router.push('/SecondRound/SecondRoundWinnerListView')
  return
}

const leftPlayerChooseVisible = ref(false);
const rightPlayerChooseVisible = ref(false);

function setLeftPlayerChoose() {
  leftPlayerChooseVisible.value = true;
}

function setRightPlayerChoose() {
  rightPlayerChooseVisible.value = true;
}

function closeLeftPlayerChoose() {
  leftPlayerChooseVisible.value = false;
}

function closeRightPlayerChoose() {
  rightPlayerChooseVisible.value = false;
}

function selectLeftPlayer(player) {
  if (player.playerId === rightPlayer.value?.playerId) {
    ElMessage({
      message: '请选择不同的对手',
      type: 'warning'
    })
    return
  }
  if (!player.secondRoundScore) {
    player.secondRoundScore = 0
  }
  leftPlayer.value = player
  closeLeftPlayerChoose()
}

function selectRightPlayer(player) {
  if (player.playerId === leftPlayer.value?.playerId) {
    ElMessage({
      message: '请选择不同的对手',
      type: 'warning'
    })
    return
  }
  if (!player.secondRoundScore) {
    player.secondRoundScore = 0
  }
  rightPlayer.value = player
  closeRightPlayerChoose()
}

// 当前选择的组别
const currentGroup = ref(0)

// 监听组别变化，重置选手
watch(currentGroup, () => {
  leftPlayer.value = null
  rightPlayer.value = null
})

// 获取当前组的选手
const currentGroupPlayers = computed(() => {
  return playerPool.value.map(rows => rows[[currentGroup.value]])
})

</script>

<style>
.nextBt {
  display: flex;
  justify-content: flex-end;
  padding-top: 1%;
  padding-right: 1%;
}


.el-select {
  width: 140px;
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
}

.bgm {
  font-size: 25px;
  padding-top: 1%;
  color: var(--text-color);
  font-weight: bold;
  font-style: italic;
  text-decoration: underline
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
  align-items: center;
  gap: 10px;
}

.score-txt {
  font-size: 50px;
  font-weight: bold;
  font-style: italic;
  color: #cf0a0a;
}

.total-score {
  font-size: 40px;
  font-weight: bold;
  color: #cf0a0a;
  text-align: center;
}

.pool {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding-top: 5%;
}

.player-pool {
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
}

.pp-table, .bp-table {
  height: 100%; /* 表格高度自动填充父容器 */
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
  flex-wrap: nowrap; /* 防止列换行 */
}

.button-column {
  flex: 1; /* 每列占据相等的宽度 */
  margin: 5px;
}
.button-wrapper {
  text-align: center; /* 使按钮居中 */
  margin-bottom: 10px; /* 按钮之间的垂直间距 */
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

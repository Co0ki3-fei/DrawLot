<template>
  <div class="second-round">
    <div class="nextBt">
      <el-button>下一组</el-button>

    </div>
    <div class="stopLoopBt">
      <el-button>结束小组循环</el-button>
    </div>
    <div class="body">
      <div class="title">十六强对决</div>
      <div class="bgm">BGM: {{ currentBGM }}</div>
      <div class="player-form">

        <div class="left-player">
          <div class="select-player" v-if="!leftPlayer" @click="setLeftPlayerChoose">
            选择选手
          </div>
          <div class="lp-part1" v-if="leftPlayer" @click="setLeftPlayerScore">
            <el-image :src="leftPlayer.avatar" style="width: 150px; height: 200px" :fit="none"></el-image>
            <el-text>{{ leftPlayer.name }}</el-text>
          </div>
        </div>
        <div class="score">

          <div class="score-txt">VS</div>

        </div>
        <div class="right-player">
          <div class="select-player" v-if="!rightPlayer" @click="setRightPlayerChoose">
            选择选手
          </div>
          <div class="lp-part1" v-if="rightPlayer" @click="setRightPlayerScore">
            <el-image :src="rightPlayer.avatar" style="width: 150px; height: 200px" :fit="none"></el-image>
            <el-text>{{ rightPlayer.name }}</el-text>
          </div>
        </div>

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

    <!-- dialog for Left Player -->
    <el-dialog v-model="leftPlayerDialogVisible" title="修改胜场" @close="closeLeftPlayerDialog">
      <el-button @click="increaseLeftPlayerScore">增加胜场</el-button>
      <el-button @click="decreaseLeftPlayerScore">减少胜场</el-button>
    </el-dialog>

    <!-- dialog for Right Player -->
    <el-dialog v-model="rightPlayerDialogVisible" title="修改胜场" @close="closeRightPlayerDialog">
      <el-button @click="increaseRightPlayerScore">增加胜场</el-button>
      <el-button @click="decreaseRightPlayerScore">减少胜场</el-button>
    </el-dialog>

    <!-- choose Left Player -->
    <el-dialog v-model="leftPlayerChooseVisible" title="选择选手" @close="closeLeftPlayerChoose">
      <div class="button-grid">
        <div v-for="(group, index) in playerPool" :key="index" class="button-column">
          <div v-for="player in group" :key="player" class="dialog-button-wrapper">
            <el-button type="text" @click="selectLeftPlayer(player)">{{ player.name }}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- dialog for Right Player -->
    <el-dialog v-model="rightPlayerChooseVisible" title="选择选手" @close="closeRightPlayerChoose">
      <div class="button-grid">
        <div v-for="(group, index) in playerPool" :key="index" class="button-column">
          <div v-for="player in group" :key="player" class="dialog-button-wrapper">
            <el-button type="text" @click="selectRightPlayer(player)">{{ player.name }}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>


<script setup>

import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {chunkArray} from "@/utils/utils.js";

const router = useRouter();
const store = useStore();

const bgms = computed(() => store.getters['group/getBgm']);
//const compGroup = computed(() => store.getters['group/compGroup']);
const compGroup = ref([
  {
    playerId: 1,
    name: "玩家1",
    isBetter: true,
    avatar: "/src/assets/001.jpg",
    firstRoundGroup: 0,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 2,
    name: "玩家2",
    isBetter: true,
    avatar: "/src/assets/002.jpg",
    firstRoundGroup: 1,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 3,
    name: "玩家3",
    isBetter: true,
    avatar: "/src/assets/003.jpg",
    firstRoundGroup: 2,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 4,
    name: "玩家4",
    isBetter: true,
    avatar: "/src/assets/004.jpg",
    firstRoundGroup: 3,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 5,
    name: "玩家5",
    isBetter: true,
    avatar: "/src/assets/005.jpg",
    firstRoundGroup: 4,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 6,
    name: "玩家6",
    isBetter: true,
    avatar: "/src/assets/006.jpg",
    firstRoundGroup: 5,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 7,
    name: "玩家7",
    isBetter: true,
    avatar: "/src/assets/007.jpg",
    firstRoundGroup: 6,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 8,
    name: "玩家8",
    isBetter: true,
    avatar: "/src/assets/008.jpg",
    firstRoundGroup: 7,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 9,
    name: "玩家9",
    isBetter: true,
    avatar: "/src/assets/009.jpg",
    firstRoundGroup: 8,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 10,
    name: "玩家10",
    isBetter: true,
    avatar: "/src/assets/010.jpg",
    firstRoundGroup: 9,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 11,
    name: "玩家11",
    isBetter: true,
    avatar: "/src/assets/011.jpg",
    firstRoundGroup: 10,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 12,
    name: "玩家12",
    isBetter: true,
    avatar: "/src/assets/012.jpg",
    firstRoundGroup: 11,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 13,
    name: "玩家13",
    isBetter: true,
    avatar: "/src/assets/013.jpg",
    firstRoundGroup: 12,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 14,
    name: "玩家14",
    isBetter: true,
    avatar: "/src/assets/014.jpg",
    firstRoundGroup: 13,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 15,
    name: "玩家15",
    isBetter: true,
    avatar: "/src/assets/015.jpg",
    firstRoundGroup: 14,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  },
  {
    playerId: 16,
    name: "玩家16",
    isBetter: true,
    avatar: "/src/assets/016.jpg",
    firstRoundGroup: 15,
    isFirstWinner: true,
    secondRoundScore: 0,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  }
])

const playerPool = ref([])
for (let i = 0; i < 4; i++) {
  playerPool.value.push(compGroup.value.filter((player) => {
    return player.isFirstWinner && player.firstRoundGroup % 4 === i
  }).sort((a, b) => a.firstRoundGroup - b.firstRoundGroup))
}

const bgmPool = ref([])
bgmPool.value = chunkArray(bgms.value, 3)

const currentBGM = ref('')

const leftPlayer = ref(null)
const rightPlayer = ref(null)
const selectLeftPlayer = (player) =>{
  leftPlayer.value = player
  closeLeftPlayerChoose()
}
const selectRightPlayer = (player) =>{
  rightPlayer.value = player
  closeRightPlayerChoose()
}


const headerCellStyle = () => {
  return {
    backgroundColor: '#c7c7c7',
    color: 'black',
    borderColor: '#c7c7c7'
  }
}


/**
 * use dialog and dropdown to modify the player's score and selected skill
 */
const leftPlayerDialogVisible = ref(false);
const rightPlayerDialogVisible = ref(false);
const leftPlayerChooseVisible = ref(false);
const rightPlayerChooseVisible = ref(false);

function setLeftPlayerScore() {
  leftPlayerDialogVisible.value = true;
}

function setRightPlayerScore() {
  rightPlayerDialogVisible.value = true;
}

function closeLeftPlayerDialog() {
  leftPlayerDialogVisible.value = false;
}

function closeRightPlayerDialog() {
  rightPlayerDialogVisible.value = false;
}

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

function increaseLeftPlayerScore() {
  leftPlayer.value.firstRoundScore += 1;
  closeLeftPlayerDialog();
}

function decreaseLeftPlayerScore() {
  leftPlayer.value.firstRoundScore -= 1;
  closeLeftPlayerDialog();
}

function increaseRightPlayerScore() {
  rightPlayer.value.firstRoundScore += 1;
  closeRightPlayerDialog();
}

function decreaseRightPlayerScore() {
  rightPlayer.value.firstRoundScore -= 1;
  closeRightPlayerDialog();
}


</script>

<style>
.nextBt, .stopLoopBt {
  display: flex;
  justify-content: flex-end;
  padding-top: 1%;
  padding-right: 1%;
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
  align-items: center
}

.score-txt {
  font-size: 50px;
  font-weight: bold;
  font-style: italic;
  color: #cf0a0a;
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


</style>

<template>
  <div class="page">
    <div class="nextBt">
      <el-button @click="nextGroup">下一组</el-button>
    </div>
    <div class="body">
      <div class="title">三十二强对决 - {{ group }} 组对决</div>
      <div class="bgm">BGM: {{ bgm }}</div>
      <div class="player-form">


        <div class="left-player">
          <div class="lp-part1">
            <el-image :src="leftPlayer.url" style="width: 150px; height: 200px" @click="setLeftPlayerScore"></el-image>
            <el-text @click="setLeftPlayerScore">{{ leftPlayer.name }}</el-text>
          </div>
          <el-dropdown placement="bottom-start" @command="handleLeftPlayerSkillChange">
            <el-button class="rp-skill"> <el-text>选用技:</el-text> {{ leftPlayer.skill }}</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- 使用 v-for 动态生成下拉菜单项 -->
                <el-dropdown-item
                  v-for="(skill,index) in skills"
                  :key="index"
                  :command="skill"
                >
                   {{ skill }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>


        <div class="score">
          <div class="score-txt">VS</div>
          <div class="score-res">{{ leftPlayer.score }}:{{ rightPlayer.score }}</div>
        </div>


        <div class="right-player">
          <div class="rp-part1">
            <el-image :src="rightPlayer.url" style="width: 150px; height: 200px" @click="setRightPlayerScore"></el-image>
          <el-text @click="setRightPlayerScore">{{ rightPlayer.name }}</el-text>
          </div>
          <el-dropdown placement="bottom-start" @command="handleRightPlayerSkillChange">
            <el-button class="rp-skill"> <el-text>选用技:</el-text>{{ rightPlayer.skill }} </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- 使用 v-for 动态生成下拉菜单项 -->
                <el-dropdown-item
                  v-for="(skill,index) in skills"
                  :key="index"
                  :command="skill"
                >
                   {{ skill }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="skill" >
        <div class="skill-title">技池</div>
        <div class="skill-pool">
          <el-table :data="skillPool" border style="width: 100%;" :show-header="false">
            <el-table-column label="Column 1" align="center">
              <template #default="{ row }">
                <span>{{ row[0] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Column 2" align="center">
              <template #default="{ row }">
                <span>{{ row[1] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Column 3"  align="center">
              <template #default="{ row }">
                <span>{{ row[2] }}</span>
              </template>
            </el-table-column>
          </el-table>
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
  </div>

     
</template>


<script setup>
import {ref, computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


/**
 * data from store
 */
const router = useRouter();
const store = useStore();
const compGroupLeft = computed(() => store.getters['group/compGroupLeft']);
const compGroupRight = computed(() => store.getters['group/compGroupRight']);
const bgms = computed(() => store.getters['group/getBgm']);
const skills = computed(() => store.state.skillPool)

// index
const currentIndex = ref(0);

/**
 * dynamic data for UI
 */
const group = ref(String.fromCharCode(65 + currentIndex.value))
const bgm = computed(() => {
  return bgms.value && bgms.value[currentIndex.value] ? bgms.value[currentIndex.value] : "bgm_name";
});

const leftPlayer = computed(() => {
  return compGroupLeft.value && compGroupLeft.value[currentIndex.value] ? compGroupLeft.value[currentIndex.value] : {'name': '123','url':'',"score":0};
});

const rightPlayer = computed(() => {
  return compGroupRight.value && compGroupRight.value[currentIndex.value] ? compGroupRight.value[currentIndex.value] : {'name': '123','url':'',"score":0};
});

const hasWinner = computed(() => leftPlayer.value.score >= 2 || rightPlayer.value.score >= 2)


/**
 * To display the 'Skill Pool' table
 */
const skillPool = ref([])
const chunkSize = 3;
skillPool.value = chunkArray(skills.value, chunkSize);
function chunkArray(arr, size) {
  let result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}


/**
 * proceed to the next group match and determine the winner
 * a total of 16 rounds will be held
 */
function nextGroup() {
  if (!hasWinner.value) return

  // push the winner into the global variable
  if(leftPlayer.value.score > rightPlayer.value.score) {
    store.dispatch('group/addToFistRoundWinners', leftPlayer);
  } else {
    store.dispatch('group/addToFistRoundWinners', rightPlayer);
  }

  // change group
  group.value = String.fromCharCode(65 + currentIndex.value)
  
  if(currentIndex.value === 2) {
    router.push('/FirstRound/FirstRoundWinnerListView');
    return;
  }
  currentIndex.value += 1
}

/**
 * use dialog and dropdown to modify the player's score and selected skill
 */
const leftPlayerDialogVisible = ref(false);
const rightPlayerDialogVisible = ref(false);
function setLeftPlayerScore() {
  leftPlayerDialogVisible.value = true;
  console.log(1)
  console.log(leftPlayerDialogVisible.value)
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

function increaseLeftPlayerScore() {
  leftPlayer.value.score += 1;
  closeLeftPlayerDialog();
}

function decreaseLeftPlayerScore() {
  leftPlayer.value.score -= 1;
  closeLeftPlayerDialog();
}

function increaseRightPlayerScore() {
  rightPlayer.value.score += 1;
  closeRightPlayerDialog();
}

function decreaseRightPlayerScore() {
  rightPlayer.value.score -= 1;
  closeRightPlayerDialog();
}

function handleLeftPlayerSkillChange(skill) {
  leftPlayer.value.skill = skill;
}

function handleRightPlayerSkillChange(skill) {
  rightPlayer.value.skill = skill;
}
</script>

<style>
.nextBt {
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

.left-player {
  display: flex;
  border-style: solid;
  border-color: #e9e8e8;
  border-radius: 5%;
  border-width: 0.5%;
  padding: 10px;
  max-width: 300px;
  width: 100%;
  flex-direction: column;
}

.lp-part1 {
  display: flex;
  justify-content: space-around;
}

.lp-part1 .el-text {
  font-size: 30px;
  color: var(--text-color);
  font-style: italic;
  font-weight: normal;
}

.left-player .el-button {
  margin-top: 5%;
}

.lp-skill {
  display: flex;
  justify-content: flex-start;
  border: none;
  position: relative;
  width: 100%;
  padding: 10%;
}

.lp-skill .el-text {
  font-size: 20px;
  color: var(--text-color);
  display: inline-block;
  position: relative;
  font-weight: bold;
  font-style: italic;
  text-decoration: none; 
  padding-bottom: 2px; 
}

.lp-skill .el-text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px; 
  background-color: currentColor;
}


.right-player {
  display: flex;
  border-style: solid;
  border-color: #e9e8e8;
  border-radius: 5%;
  border-width: 0.5%;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  flex-direction: column;
}

.rp-part1 {
  display: flex;
  justify-content: space-around;
}


.rp-part1 .el-text {
  font-size: 30px;
  color: var(--text-color);
  font-style: italic;
  font-weight: normal;
}

.right-player .el-button {
  margin-top: 5%;
}

.rp-skill {
  display: flex;
  justify-content: flex-start;
  border: none;
  position: relative;
  width: 100%;
  padding:10%;
}

.rp-skill .el-text {
  font-size: 20px;
  color: var(--text-color);
  display: inline-block;
  position: relative;
  font-weight: bold;
  font-style: italic;
  text-decoration: none;
  padding-bottom: 2px; 
}

.rp-skill .el-text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 300%;
  height: 2px; 
  background-color: currentColor;
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

.skill {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 5%;
  padding-bottom: 5%;
  justify-content: center;
  align-items: center;
}

.skill-title {
  font-size: 24px;
  color: var(--text-color);
  font-style: italic;
  text-decoration: underline;
  font-weight: bold;
}

.skill-pool {
  width: 50%;
}
</style>

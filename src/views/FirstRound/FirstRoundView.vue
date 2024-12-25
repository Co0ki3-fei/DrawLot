<template>
  <div class="page">
    <div class="group-selector">
      <el-select 
        v-model="currentIndex" 
        placeholder="选择已完成的对战组"
        :disabled="completedGroups.length === 0"
      >
        <el-option
          v-for="index in completedGroups"
          :key="index"
          :label="`${String.fromCharCode(65 + index)}组`"
          :value="index"
        />
      </el-select>
      <el-button @click="nextGroup">下一组</el-button>
    </div>
    <div class="body">
      <div class="title fire-text">三十二强对决 - {{ String.fromCharCode(65 + currentIndex) }} 组对决</div>
      <div class="bgm">BGM: {{ bgm }}</div>
      <div class="player-form">


        <PlayerCard
          v-model:player="leftPlayer"
          :show-skill-select="true"
          :skills="skills"
          :max-score="1"
          @score-change="handleLeftPlayerScoreChange"
          @skill-change="handleLeftPlayerSkillChange"
        />


        <div class="score">
          <div class="score-txt">VS</div>
          <div class="score-res">{{ leftPlayer.firstRoundScore }}:{{ rightPlayer.firstRoundScore }}</div>
        </div>


        <PlayerCard
          v-model:player="rightPlayer"
          :show-skill-select="true"
          :skills="skills"
          :max-score="1"
          @score-change="handleRightPlayerScoreChange"
          @skill-change="handleRightPlayerSkillChange"
        />
      </div>
      <div class="skill" >
        <div class="skill-title">技池</div>
        <div class="skill-pool">
          <CustomTable 
            :data="skillPool" 
            :columns="skillColumns"
            :show-header="false"
          >
            <template #column1="{ row }">
              <div class="pool-cell">
                <span>{{ row[0] }}</span>
              </div>
            </template>
            <template #column2="{ row }">
              <div class="pool-cell">
                <span>{{ row[1] }}</span>
              </div>
            </template>
            <template #column3="{ row }">
              <div class="pool-cell">
                <span>{{ row[2] }}</span>
              </div>
            </template>
          </CustomTable>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref, computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {chunkArray} from "@/utils/utils.js";
import { ElMessage } from 'element-plus'
import PlayerCard from '@/components/PlayerCard.vue';
import CustomTable from '@/components/CustomTable.vue'


/**
 * data from store
 */
const router = useRouter();
const store = useStore();

const compGroup = computed(() => store.getters['group/compGroup']);

const compGroupLeft = ref([]);
const compGroupRight = ref([]);
const bgms = computed(() => store.getters['group/getBgm']);
const skills = computed(() => store.state.skillPool)

// index
const currentIndex = ref(0);

for (let i = 0; i < 16; i++) {
  compGroup.value.forEach((player)=>{
    if (player.firstRoundGroup === i && player.isBetter){
      compGroupLeft.value.push({...player,firstRoundScore:player.firstRoundScore ?? 0})
    }else if(player.firstRoundGroup === i && !player.isBetter){
      compGroupRight.value.push({...player, firstRoundScore:player.firstRoundScore ?? 0})
    }
  })
}

/**
 * dynamic data for UI
 */
const bgm = computed(() => {
  return bgms.value && bgms.value[currentIndex.value] ? bgms.value[currentIndex.value] : "bgm_name";
});

const leftPlayer = computed(() => {
  return compGroupLeft.value && compGroupLeft.value[currentIndex.value] ? compGroupLeft.value[currentIndex.value] : {'name': 'NULL','avatar':'',"firstRoundScore":0};
});

const rightPlayer = computed(() => {
  return compGroupRight.value && compGroupRight.value[currentIndex.value] ? compGroupRight.value[currentIndex.value] : {'name': 'NULL','avatar':'',"firstRoundScore":0};
});

const hasWinner = computed(() => leftPlayer.value.firstRoundScore >= 1 || rightPlayer.value.firstRoundScore >= 1)


/**
 * To display the 'Skill Pool' table
 */
const skillPool = ref([])
const chunkSize = 3;
skillPool.value = chunkArray(skills.value, chunkSize);



/**
 * proceed to the next group match and determine the winner
 * a total of 16 rounds will be held
 */
function nextGroup() {
  if (!hasWinner.value) {
    ElMessage({
      message: '请先选出胜者，再进行下一组比赛',
      type: 'error',
      duration: 2000
    })
    return
  }

  // push the winner into the global variable
  if(leftPlayer.value.firstRoundScore > rightPlayer.value.firstRoundScore) {
    leftPlayer.value.isFirstWinner = true
    rightPlayer.value.isFirstWinner = false
    store.dispatch('group/updateGroupIsFirstWinnerToWin', leftPlayer.value.playerId);
    store.dispatch('group/updateGroupIsFirstWinnerToDefeat', rightPlayer.value.playerId);
  } else {
    leftPlayer.value.isFirstWinner = false
    rightPlayer.value.isFirstWinner = true
    store.dispatch('group/updateGroupIsFirstWinnerToWin', rightPlayer.value.playerId);
    store.dispatch('group/updateGroupIsFirstWinnerToDefeat', leftPlayer.value.playerId);
  }

  if(currentIndex.value === 15) {
    router.push('/FirstRound/FirstRoundWinnerListView');
    return;
  }
  currentIndex.value += 1
}

function handleLeftPlayerScoreChange(_, v) {
  leftPlayer.value.firstRoundScore = v;
  // 同步到 store
  store.dispatch('group/updatePlayerFirstRoundScore', {
    playerId: leftPlayer.value.playerId,
    score: v
  });
}

function handleRightPlayerScoreChange(_, v) {
  rightPlayer.value.firstRoundScore = v;
  // 同步到 store
  store.dispatch('group/updatePlayerFirstRoundScore', {
    playerId: rightPlayer.value.playerId,
    score: v
  });
}

function handleLeftPlayerSkillChange(skill) {
  leftPlayer.value.firstRoundSkill = skill;
  // 同步到 store
  store.dispatch('group/updatePlayerFirstRoundSkill', {
    playerId: leftPlayer.value.playerId,
    skill: skill
  });
}

function handleRightPlayerSkillChange(skill) {
  rightPlayer.value.firstRoundSkill = skill;
  // 同步到 store
  store.dispatch('group/updatePlayerFirstRoundSkill', {
    playerId: rightPlayer.value.playerId,
    skill: skill
  });
}

// 计算已完成比赛的组
const completedGroups = computed(() => {
  const groups = [];
  for (let i = 0; i < compGroupLeft.value.length; i++) {
    const leftPlayer = compGroupLeft.value[i];
    const rightPlayer = compGroupRight.value[i];
    
    // 检查这一组是否有胜者（即比赛���否完成）
    if (leftPlayer && rightPlayer && 
        (leftPlayer.isFirstWinner || rightPlayer.isFirstWinner)) {
      groups.push(i);
    }
  }
  return groups;
});

// 添加列定义
const skillColumns = [
  { prop: 'column1', label: '第一列' },
  { prop: 'column2', label: '第二列' },
  { prop: 'column3', label: '第三列' }
]

</script>

<style>
.group-selector {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 2%;
  padding-right: 2%;
}

.group-selector .el-select {
  width: 120px;
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
  margin-right: 8px;
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
  margin-right: 8px;
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

.score-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

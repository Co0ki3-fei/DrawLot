<template>
  <div class="second-round">
    <div class="nextBt">
      <el-button @click="nextGroup">下一组</el-button>
    </div>
    <div class="body">
      <div class="title fire-text">八强对决</div>
      <div class="bgm" @click="showBgmSelect = true">
        <el-dropdown trigger="click" @command="handleBgmSelect">
          <span class="bgm-text">BGM: {{ currentBgm }}</span>
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
        <PlayerCard
          v-model:player="leftPlayer"
          :allow-player-change="false"
          :max-score="2"
          :fetch-score="player => player.thirdRoundScore || 0"
          @score-change="updateLeftPlayerScore"
        />

        <div class="score">
          <div class="score-txt">VS</div>
          <div class="score-res">{{ leftPlayer.thirdRoundScore || 0 }}:{{ rightPlayer.thirdRoundScore || 0 }}</div>
        </div>

        <PlayerCard
          v-model:player="rightPlayer"
          :allow-player-change="false" 
          :max-score="2"
          :fetch-score="player => player.thirdRoundScore || 0"
          @score-change="updateRightPlayerScore"
        />
      </div>
      <div class="pool" >
        <div class="player-pool">
          <div class="pp-title">选手池</div>
          <div class="pp-table">
            <CustomTable 
              :data="playerPool" 
              :columns="playerColumns"
              :show-header="false"
            >
              <template #fist_group="{ row }">
                <div class="pool-cell">
                  <span>{{ row.fist_group }}</span>
                </div>
              </template>
              <template #second_group="{ row }">
                <div class="pool-cell">
                  <span>{{ row.second_group }}</span>
                </div>
              </template>
              <template #third_group="{ row }">
                <div class="pool-cell">
                  <span>{{ row.third_group }}</span>
                </div>
              </template>
              <template #forth_group="{ row }">
                <div class="pool-cell">
                  <span>{{ row.forth_group }}</span>
                </div>
              </template>
            </CustomTable>
          </div>
        </div>
        <div class="bgm-pool">
          <div class="bp-title">BGM池</div>
          <div class="bp-table">
            <CustomTable 
              :data="formattedBgmPool" 
              :columns="bgmColumns"
              :show-header="false"
            >
              <template #col1="{ row }">
                <div class="pool-cell">
                  <span>{{ row.col1 }}</span>
                </div>
              </template>
              <template #col2="{ row }">
                <div class="pool-cell">
                  <span>{{ row.col2 }}</span>
                </div>
              </template>
              <template #col3="{ row }">
                <div class="pool-cell">
                  <span>{{ row.col3 }}</span>
                </div>
              </template>
            </CustomTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import PlayerCard from '@/components/PlayerCard.vue'
import CustomTable from '@/components/CustomTable.vue'

const router = useRouter()
const store = useStore()
const bgm = ref("bgm_name")
const isSelect = ref(false)
const leftPlayer = ref({})  // 初始化为空对象
const rightPlayer = ref({}) // 初始化为空对象
const currentGroupIndex = ref(0) // 添加当前组索引


const secondRoundWinners = computed(() => {
  return store.getters['group/compGroup']
    .filter(player => player.secondRoundOrder !== 0)
    .sort((a, b) => {
      if (a.group !== b.group) {
        return a.group - b.group;
    }
    return a.secondRoundOrder - b.secondRoundOrder;
  });
});

// 根据对决规则组织选手池数据
const playerPool = computed(() => {
  const winners = secondRoundWinners.value
  if (winners.length !== 8) return []

  return [
    {
      fist_group: winners[0]?.name || '', // 添加空值判断
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

// 初始化第一组对决选手
onMounted(() => {
  const winners = secondRoundWinners.value
  if (winners.length === 8) {
    leftPlayer.value = winners[0]  // 第一组第一名
    rightPlayer.value = winners[7] // 第四组第二名
    isSelect.value = true
  }
  console.log("clearPlayerIsThirdWinner")
  store.dispatch('group/clearPlayerIsThirdWinner')
})

// 更新选手分数和胜利状态
const updatePlayerScore = (playerId, score) => {
  store.dispatch('group/updatePlayerThirdRoundScore', {
    playerId,
    score
  })

  if (score >= 2) {
    store.dispatch('group/updatePlayerIsThirdWinnerToWin', playerId)
  }
}

// 更新选手分数
const updateLeftPlayerScore = (playerId, score) => {
  updatePlayerScore(playerId, score)
}

const updateRightPlayerScore = (playerId, score) => {
  updatePlayerScore(playerId, score)
}

// 点击下一组按钮的处理函数
const nextGroup = () => {
  // 检查是否有胜者（得分达到2分）
  const hasWinner = leftPlayer.value.thirdRoundScore >= 2 || rightPlayer.value.thirdRoundScore >= 2
  if (!hasWinner) {
    return
  }

  updatePlayerScore(leftPlayer.value.playerId, leftPlayer.value.thirdRoundScore)
  updatePlayerScore(rightPlayer.value.playerId, rightPlayer.value.thirdRoundScore)

  // 如果是最后一组（第4组），可以跳转到下一个页面
  if (currentGroupIndex.value >= 3) {
    router.push('/ThirdRound/ThirdRoundWinnerListView') // 如果需要跳转到下一轮
    return
  }

  // 切换到下一组
  currentGroupIndex.value++

  // 根据新的组索引设置对决选手
  const winners = secondRoundWinners.value
  switch(currentGroupIndex.value) {
    case 1:
      leftPlayer.value = winners[2]  // 第二组第一名
      rightPlayer.value = winners[5] // 第三组第二名
      break
    case 2:
      leftPlayer.value = winners[4]  // 第三组第一名
      rightPlayer.value = winners[3] // 第二组第二名
      break
    case 3:
      leftPlayer.value = winners[6]  // 第四组第一名
      rightPlayer.value = winners[1] // 第一组第二名
      break
  }
}

// BGM相关数据
const currentBgm = ref("点击选择BGM")
const bgmPool = computed(() => store.getters['group/getBgm3'])

// BGM选择处理函数
const handleBgmSelect = (bgm) => {
  currentBgm.value = bgm
}

// BGM池数据格式化
const formattedBgmPool = computed(() => {
  const rows = []
  for (let i = 0; i < bgmPool.value.length; i += 4) {
    rows.push({
      col1: bgmPool.value[i] || '',
      col2: bgmPool.value[i + 1] || '',
      col3: bgmPool.value[i + 2] || '',
      col4:  bgmPool.value[i + 3] || ''
    })
  }
  return rows
})

// 添加列定义
const playerColumns = [
  { prop: 'fist_group', label: '第一组' },
  { prop: 'second_group', label: '第二组' },
  { prop: 'third_group', label: '第三组' },
  { prop: 'forth_group', label: '第四组' }
]

const bgmColumns = [
  { prop: 'col1', label: '第一列' },
  { prop: 'col2', label: '第二列' },
  { prop: 'col3', label: '第三列' },
  { prop: 'col4', label: '第四列' }
]

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
  color: var(--text-color);
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
  color: black;
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

.bp-title {
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  text-decoration: underline;
  color: var(--text-color);
}

.bp-table {
  height: 100%;
  width: 70%;
}

</style>

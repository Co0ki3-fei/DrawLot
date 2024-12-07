<template>
  <div class="second-round">
    <div class="nextBt">
      <el-button @click="nextGroup">下一组</el-button>
    </div>
    <div class="body">
      <div class="title">八强对决</div>
      <div class="bgm">BGM: {{ bgm }}</div>
      <div class="player-form">
        <div class="left-player">
          <div class="lp-part1">
            <el-image :src="leftPlayer.avatar" style="width: 150px; height: 200px" @click="setLeftPlayerScore"></el-image>
            <el-text @click="setLeftPlayerScore">{{ leftPlayer.name }}</el-text>
          </div>
        </div>
        <div class="score">
          <div class="score-txt">VS</div>
          <div class="score-res">{{ leftPlayer.thirdRoundScore }}:{{ rightPlayer.thirdRoundScore }}</div>
        </div>
        <div class="right-player">
          
          <div class="lp-part1">
            <el-image :src="rightPlayer.avatar" style="width: 150px; height: 200px"  @click="setRightPlayerScore"></el-image>
            <el-text @click="setRightPlayerScore">{{ rightPlayer.name }}</el-text>
          </div>
        </div>
      </div>
      <div class="pool" >
        <div class="player-pool">
          <div class="pp-title">选手池</div>
          <div class="pp-table">
            <el-table :data="playerPool" border :show-header="false">
              <el-table-column align="center" prop="fist_group" label="第一组" />
              <el-table-column align="center" prop="second_group" label="第二组" />
              <el-table-column align="center" prop="third_group" label="第三组" />
              <el-table-column align="center" prop="forth_group" label="第四组" />
            </el-table>
          </div>
        </div>
        <div class="bgm-pool">
          <div class="bp-title">BGM池</div>
          <div class="bp-table">
            <el-table :data="bgmPool" border :show-header="false">
              <el-table-column prop="" align="center"></el-table-column>
              <el-table-column align="center"></el-table-column>
              <el-table-column align="center"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <!-- 左选手对话框 -->
    <el-dialog v-model="leftPlayerDialogVisible" title="修改胜场" @close="closeLeftPlayerDialog">
      <el-button @click="increaseLeftPlayerScore">增加胜场</el-button>
      <el-button @click="decreaseLeftPlayerScore">减少胜场</el-button>
    </el-dialog>

    <!-- 右选手对话框 -->
    <el-dialog v-model="rightPlayerDialogVisible" title="修改胜场" @close="closeRightPlayerDialog">
      <el-button @click="increaseRightPlayerScore">增加胜场</el-button>
      <el-button @click="decreaseRightPlayerScore">减少胜场</el-button>
    </el-dialog>
  </div>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const bgm = ref("bgm_name")
const isSelect = ref(false)
const leftPlayer = ref({})  // 初始化为空对象
const rightPlayer = ref({}) // 初始化为空对象
const currentGroupIndex = ref(0) // 添加当前组索引

// 测试数据
const testData = [
 {
    playerId: 1,
    name: "选手A1",
    avatar: "https://example.com/avatar1.jpg",
    group: 0,  // 第一组
    secondRoundOrder: 1,  // 组内第一名
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 2,
    name: "选手A2",
    avatar: "https://example.com/avatar2.jpg",
    group: 0,  // 第一组
    secondRoundOrder: 2,  // 组内第二名
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 3,
    name: "选手B1",
    avatar: "https://example.com/avatar3.jpg",
    group: 1,  // 第二组
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 4,
    name: "选手B2",
    avatar: "https://example.com/avatar4.jpg",
    group: 1,
    secondRoundOrder: 2,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 5,
    name: "选手C1",
    avatar: "https://example.com/avatar5.jpg",
    group: 2,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 6,
    name: "选手C2",
    avatar: "https://example.com/avatar6.jpg",
    group: 2,
    secondRoundOrder: 2,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 7,
    name: "选手D1",
    avatar: "https://example.com/avatar7.jpg",
    group: 3,
    secondRoundOrder: 1,
    isSecondWinner: true,
    thirdRoundScore: 0
  },
  {
    playerId: 8,
    name: "选手D2",
    avatar: "https://example.com/avatar8.jpg",
    group: 3,
    secondRoundOrder: 2,
    isSecondWinner: true,
    thirdRoundScore: 0
  }
];

// 修改 secondRoundWinners 计算属性为使用测试数据
// const secondRoundWinners = computed(() => {
//   return testData
//     .sort((a, b) => {
//       if (a.group !== b.group) {
//         return a.group - b.group;
//     }
//     return a.secondRoundOrder - b.secondRoundOrder;
//   });
// });



const secondRoundWinners = computed(() => {
  return store.getters['group/compGroup']
    .filter(player => player.isSecondWinner === true)
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

// 设置对决选手
const setMatchPlayers = (groupIndex) => {
  const winners = secondRoundWinners.value
  switch(groupIndex) {
    case 0:
      leftPlayer.value = winners[0]  // 第一组第一名
      rightPlayer.value = winners[7] // 第四组第二名
      break
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
  isSelect.value = true
}

// 对话框控制
const leftPlayerDialogVisible = ref(false)
const rightPlayerDialogVisible = ref(false)

// 打开对话框
function setLeftPlayerScore() {
  leftPlayerDialogVisible.value = true
}

function setRightPlayerScore() {
  rightPlayerDialogVisible.value = true
}

// 关闭对话框
function closeLeftPlayerDialog() {
  leftPlayerDialogVisible.value = false
}

function closeRightPlayerDialog() {
  rightPlayerDialogVisible.value = false
}

// 增加/减少分数
function increaseLeftPlayerScore() {
  if (!leftPlayer.value.thirdRoundScore) {
    leftPlayer.value.thirdRoundScore = 0
  }
  leftPlayer.value.thirdRoundScore += 1
  updatePlayerScore(leftPlayer.value.playerId, leftPlayer.value.thirdRoundScore)
  closeLeftPlayerDialog()
}

function decreaseLeftPlayerScore() {
  if (!leftPlayer.value.thirdRoundScore) {
    leftPlayer.value.thirdRoundScore = 0
  }
  leftPlayer.value.thirdRoundScore = Math.max(0, leftPlayer.value.thirdRoundScore - 1)
  updatePlayerScore(leftPlayer.value.playerId, leftPlayer.value.thirdRoundScore)
  closeLeftPlayerDialog()
}

function increaseRightPlayerScore() {
  if (!rightPlayer.value.thirdRoundScore) {
    rightPlayer.value.thirdRoundScore = 0
  }
  rightPlayer.value.thirdRoundScore += 1
  updatePlayerScore(rightPlayer.value.playerId, rightPlayer.value.thirdRoundScore)
  closeRightPlayerDialog()
}

function decreaseRightPlayerScore() {
  if (!rightPlayer.value.thirdRoundScore) {
    rightPlayer.value.thirdRoundScore = 0
  }
  rightPlayer.value.thirdRoundScore = Math.max(0, rightPlayer.value.thirdRoundScore - 1)
  updatePlayerScore(rightPlayer.value.playerId, rightPlayer.value.thirdRoundScore)
  closeRightPlayerDialog()
}

// 点击下一组按钮的处理函数
const nextGroup = () => {
  // 检查是否有胜者（得分达到2分）
  const hasWinner = leftPlayer.value.thirdRoundScore >= 2 || rightPlayer.value.thirdRoundScore >= 2
  if (!hasWinner) {
    return
  }

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



</style>

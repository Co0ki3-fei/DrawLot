<template>
<div class="second-round">
  <div class="title fire-text">小组循环赛胜者</div>
  <div class="res-table">
    <CustomTable 
      :data="playerPool" 
      :columns="columns"
      :show-header="true"
    >
      <template #fist_group="{ row, $index }">
        <div
          :class="['cell-content', { 'highlighted-no1': highlightedCellsNo1[`${$index}-0`] }, { 'highlighted-no2': highlightedCellsNo2[`${$index}-0`] }]"
          @click="toggleHighlight($index, 0)"
        >
          <div class="badge-container">
            <span v-if="highlightedCellsNo1[`${$index}-0`]" class="rank-badge rank-first">1st</span>
            <span v-if="highlightedCellsNo2[`${$index}-0`]" class="rank-badge rank-second">2nd</span>
          </div>
          <span class="player-info">{{ row[0].name }} wins {{ row[0].secondRoundScore }}</span>
        </div>
      </template>

      <template #second_group="{ row, $index }">
        <div
          :class="['cell-content', { 'highlighted-no1': highlightedCellsNo1[`${$index}-1`] }, { 'highlighted-no2': highlightedCellsNo2[`${$index}-1`] }]"
          @click="toggleHighlight($index, 1)"
        >
          <div class="badge-container">
            <span v-if="highlightedCellsNo1[`${$index}-1`]" class="rank-badge rank-first">1st</span>
            <span v-if="highlightedCellsNo2[`${$index}-1`]" class="rank-badge rank-second">2nd</span>
          </div>
          <span class="player-info">{{ row[1].name }} wins {{ row[1].secondRoundScore }}</span>
        </div>
      </template>

      <template #third_group="{ row, $index }">
        <div
          :class="['cell-content', { 'highlighted-no1': highlightedCellsNo1[`${$index}-2`] }, { 'highlighted-no2': highlightedCellsNo2[`${$index}-2`] }]"
          @click="toggleHighlight($index, 2)"
        >
          <div class="badge-container">
            <span v-if="highlightedCellsNo1[`${$index}-2`]" class="rank-badge rank-first">1st</span>
            <span v-if="highlightedCellsNo2[`${$index}-2`]" class="rank-badge rank-second">2nd</span>
          </div>
          <span class="player-info">{{ row[2].name }} wins {{ row[2].secondRoundScore }}</span>
        </div>
      </template>

      <template #forth_group="{ row, $index }">
        <div
          :class="['cell-content', { 'highlighted-no1': highlightedCellsNo1[`${$index}-3`] }, { 'highlighted-no2': highlightedCellsNo2[`${$index}-3`] }]"
          @click="toggleHighlight($index, 3)"
        >
          <div class="badge-container">
            <span v-if="highlightedCellsNo1[`${$index}-3`]" class="rank-badge rank-first">1st</span>
            <span v-if="highlightedCellsNo2[`${$index}-3`]" class="rank-badge rank-second">2nd</span>
          </div>
          <span class="player-info">{{ row[3].name }} wins {{ row[3].secondRoundScore }}</span>
        </div>
      </template>
    </CustomTable>
  </div>
  <div class="next-button">
    <el-button @click="nextRoundHandler">进入下一轮</el-button>
  </div>
</div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { computed, ref } from "vue"
import CustomTable from '@/components/CustomTable.vue'

const columns = [
  { prop: 'fist_group', label: '第一组' },
  { prop: 'second_group', label: '第二组' },
  { prop: 'third_group', label: '第三组' },
  { prop: 'forth_group', label: '第四组' }
]

const router = useRouter();
const store = useStore();

const orderNo1= ref({
  group1: null,
  group2: null,
  group3: null,
  group4: null
})

const orderNo2= ref({
  group1: null,
  group2: null,
  group3: null,
  group4: null
})

const compGroupGlobal = computed(() => store.getters['group/compGroup'])
const compGroup = ref([])
compGroup.value=compGroupGlobal.value.filter((player)=> {
  return player.isFirstWinner
}).sort((a, b)=> a.firstRoundGroup - b.firstRoundGroup)
/*
const compGroup = ref([
  {
    playerId: 1,
    name: "玩家1",
    isBetter: true,
    avatar: "/src/assets/001.jpg",
    firstRoundGroup: 0,
    isFirstWinner: true,
    secondRoundScore: 10,
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
    secondRoundScore: 2,
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
    secondRoundScore: 3,
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
    secondRoundScore: 4,
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
    secondRoundScore: 5,
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
    secondRoundScore: 6,
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
    secondRoundScore: 7,
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
    secondRoundScore: 8,
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
    secondRoundScore: 9,
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
    secondRoundScore: 10,
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
    secondRoundScore: 11,
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
    secondRoundScore: 12,
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
    secondRoundScore: 13,
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
    secondRoundScore: 14,
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
    secondRoundScore: 15,
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
    secondRoundScore: 16,
    secondRoundOrder: 0,
    thirdRoundScore: 0,
    thirdRoundOrder: 0,
    isThirdWinner: false,
    finalScore: 0,
    finalOrder: 0,
    isFinalWinner: false
  }
  ])
*/
const anyBalance = ref(false)

for (let i = 0; i < 16; i++) {

  if (!orderNo1.value['group'+(Math.floor(i/4)+1)] || compGroup.value[i].secondRoundScore >= orderNo1.value['group'+(Math.floor(i/4)+1)].secondRoundScore) {
    if (!orderNo2.value['group'+(Math.floor(i/4)+1)] || orderNo1.value['group'+(Math.floor(i/4)+1)].secondRoundScore >= orderNo2.value['group'+(Math.floor(i/4)+1)].secondRoundScore) {
      orderNo2.value['group'+(Math.floor(i/4)+1)] = orderNo1.value['group'+(Math.floor(i/4)+1)]
    }
    orderNo1.value['group'+(Math.floor(i/4)+1)] = compGroup.value[i]
  }else if (orderNo1.value['group'+(Math.floor(i/4)+1)] && (!orderNo2.value['group'+(Math.floor(i/4)+1)] || compGroup.value[i].secondRoundScore >= orderNo2.value['group'+(Math.floor(i/4)+1)].secondRoundScore)){
    orderNo2.value['group'+(Math.floor(i/4)+1)] = compGroup.value[i]
  }

}

for (let i = 1; i <= 4; i++) {
  if (orderNo1.value['group'+i].secondRoundScore === orderNo2.value['group'+i].secondRoundScore) anyBalance.value = true
}

const playerPool = ref([])
for (let i = 0; i < 4; i++) {
  playerPool.value.push(compGroup.value.filter((player) => {
    return player.isFirstWinner && player.firstRoundGroup % 4 === i
  }).sort((a, b) => a.firstRoundGroup - b.firstRoundGroup))
}


// 存储高亮状态1的对象
const highlightedCellsNo1 = ref({})
// 存储高亮状态2的对象
const highlightedCellsNo2 = ref({})

// 切换高亮状态1的函数
const toggleHighlight = (rowIndex, colIndex) => {
  const key = `${rowIndex}-${colIndex}`
  let isNo1Exist = false
  let isNo2Exist = false
  for (let i = 0; i < 4; i++) {
    if (highlightedCellsNo1.value[`${i}-${colIndex}`]) isNo1Exist = true
    if (highlightedCellsNo2.value[`${i}-${colIndex}`]) isNo2Exist = true
  }
  if (highlightedCellsNo1.value[key]){
    highlightedCellsNo1.value[key] = !highlightedCellsNo1.value[key]
  }else if (highlightedCellsNo2.value[key]) {
    highlightedCellsNo2.value[key] = !highlightedCellsNo2.value[key]
  }else if (!isNo1Exist) {
    highlightedCellsNo1.value[key] = !highlightedCellsNo1.value[key]
  }else if(!isNo2Exist){
    highlightedCellsNo2.value[key] = !highlightedCellsNo2.value[key]
  }
}
if (!anyBalance.value){
  Object.keys(orderNo1.value).forEach((key)=>{
    let firstRoundGroup = orderNo1.value[key].firstRoundGroup
    let rowId = firstRoundGroup % 4
    let colId = Math.floor(firstRoundGroup / 4)
    toggleHighlight(rowId, colId)
  })
  Object.keys(orderNo2.value).forEach((key)=>{
    let firstRoundGroup = orderNo2.value[key].firstRoundGroup
    let rowId = firstRoundGroup % 4
    let colId = Math.floor(firstRoundGroup / 4)
    toggleHighlight(rowId, colId)
  })
}
const nextRoundHandler = () =>{
  let no1 = Object.keys(highlightedCellsNo1.value).filter((key)=>{ return highlightedCellsNo1.value[key]}).map((key)=>{
    return key.split('-')[1]*4+key.split('-')[0]*1
  })
  let no2 = Object.keys(highlightedCellsNo2.value).filter((key)=>{ return highlightedCellsNo2.value[key]}).map((key)=>{
    return key.split('-')[1]*4+key.split('-')[0]*1
  })
  if (no1.length === 4 && no2.length === 4){
    store.dispatch('group/clearPlayerSecondRoundOrder')
    no1.forEach((index)=>{
      store.dispatch('group/updatePlayerSecondRoundOrder',{playerId: compGroup.value[index].playerId, order: 1})
    })
    no2.forEach((index)=>{
      store.dispatch('group/updatePlayerSecondRoundOrder',{playerId: compGroup.value[index].playerId, order: 2})
    })
    router.push('/ThirdRound/ThirdRoundView')
  } else {
    ElMessage.error('请选择胜者')
  }
}


const headerCellStyle = () => {
  return{
    backgroundColor: '#c7c7c7',
    color: 'black',
    borderColor: '#c7c7c7'
  }
}
</script>

<style scoped>
.second-round {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10%;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  font-style: italic;
  padding-bottom: 1%;
  color: #fff;
}

.res-table {
  width: 80%;
  padding-bottom: 3%;
}

.cell-content {
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.badge-container {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
}

.player-info {
  position: relative;
  z-index: 0;
}

.rank-badge {
  position: absolute;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8em;
  white-space: nowrap;
  left: 4px;
}

.rank-first {
  background: linear-gradient(45deg, #FFD700, #FFA500);
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  top: -12px;
}

.rank-second {
  background: linear-gradient(45deg, #C0C0C0, #A9A9A9);
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  top: -12px;
}

.next-button {
  margin-top: 20px;
}

.next-button .el-button {
  background: linear-gradient(45deg, #2c3e50, #3498db);
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.next-button .el-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(52, 152, 219, 0.5);
}
</style>

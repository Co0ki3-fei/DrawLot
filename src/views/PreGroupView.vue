<template>
  <el-row :gutter="20">

    <el-col :span="8" class="part1">
      <div class="body" v-for="(info,index) in infosPartUpper" :key="index"
           :class="{'highlighted': index === highlightedLeftIndex && !info.isSelect, 'gray': info.isSelect}">
        <div class="form">
          <el-image :src="info.avatar" :alt="info.name"></el-image>
          <el-text class="id">{{ index + 1 }}</el-text>
          <el-text class="name">{{ info.name }}</el-text>
        </div>
      </div>
    </el-col>

    <el-col :span="8" class="part2">
      <div class="mid-part" v-for="index in compGroupLeft.length" :key="index">
        <div class="part1_id">{{ compGroupLeft[index - 1]?.name }}</div>
        <div class="group_id">{{ String.fromCharCode(65 + index - 1) }}</div>
        <div class="part3_id">{{ compGroupRight[index - 1]?.name }}</div>
      </div>
      <div>
        <el-button @click="nextGroupHandle" v-if="randomRound < 16">下一组</el-button>
        <el-button @click="fistRound" v-if="randomRound === 16">第一轮·半区对决</el-button>
      </div>
    </el-col>

    <el-col :span="8" class="part3">
      <div class="body" v-for="(info,index) in infosPartDowner"
           :class="{'highlighted': index === highlightedRightIndex && !info.isSelect, 'gray': info.isSelect}"
      >
        <div class="form">
          <el-image :src="info.avatar" :alt="info.name"></el-image>
          <el-text class="id">{{ index + 17 }}</el-text>
          <el-text class="name">{{ info.name }}</el-text>
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<style scoped>

.part2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0;
  padding-top: 0;
}

.body {
  border-style: solid;
  border-width: 2px;
  width: 50%;
  margin: 3px 25%;
  height: 6%;
}

.form {
  margin: 10px 10px;
  display: flex;
  flex-direction: row;
}

.form .el-image {
  width: 50px; /* 设置宽度 */
  height: 50px; /* 设置高度 */
  border-radius: 50%; /* 圆形样式 */
  overflow: hidden; /* 防止图片溢出 */
}

.id {
  padding: 0 10px;
  font-size: larger;
  font-weight: bolder;
  font-style: italic;
  color: rgb(33, 128, 223);
}

.name {
  font-weight: bold;
}

.el-col {
  align-items: center;
}

.mid {
  height: 50px;
  align-items: baseline;
}

.part1_id {
  font-size: larger;
  font-weight: bolder;
  font-style: italic;
}

.group_id {
  font-size: larger;
  font-weight: bolder;
  font-style: italic;
  color: rgb(33, 128, 223);
}

.part3_id {
  font-size: larger;
  font-weight: bolder;
  font-style: italic;
  color: rgb(223, 33, 33);
}

.mid-part {
  display: flex;
  align-content: center;
  justify-content: space-around;
  align-items: center;
  border-style: solid;
  border-width: 2px;
  width: 60%;
  height: 50px;
  margin: 3px 25%;
}

.highlighted {
  border: 3px solid rgb(33, 128, 223); /* 给高亮的元素添加不同的边框颜色 */
  box-shadow: 0 0 10px rgba(33, 128, 223, 0.6); /* 给高亮元素加个阴影 */
  background-color: azure;
}

.gray {
  background-color: gray;
}

</style>

<script setup>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import players from '@/assets/player.json'

defineOptions({
  name: "PreGroupView",
  inheritAttrs: false
})

const router = useRouter();
const store = useStore();

const compGroup = computed(() => store.getters['group/compGroup']);

const compGroupLeft = ref([])
const compGroupRight = ref([])
/**
 * init data
 * get player image
 */
const images = import.meta.glob('@/assets/*.jpg');
const infos = ref([])
const loading = ref(true)
const infosPartUpper = ref([])
const infosPartDowner = ref([])
const randomRound = ref(0)


onMounted(async () => {
  try {
    await Promise.all(
      Object.keys(images).map((path) => {
        const loadImage = images[path];
        return loadImage().then((module) => module.default);
      })
    );

    infos.value = players.map((player) => {
      let info = {
        playerId: player.playerId,
        name: player.name,
        isBetter: player.isBetter,
        avatar: player.avatar,

        firstRoundGroup: -1, /*0~15对应A~P*/
        isFirstWinner: false,

        secondRoundScore: 0,
        secondRoundOrder: 0,
        isSecondWinner: false,

        thirdRoundScore: 0,
        thirdRoundOrder: 0,
        isThirdWinner: false,

        finalScore: 0,
        finalOrder: 0,
        isFinalWinner: false,
      }

      store.dispatch('group/addToGroup', info)

      return info
    });

    infosPartUpper.value = infos.value.filter((item) => {
      return  item.isBetter
    });
    infosPartDowner.value = infos.value.filter((item) => {
      return  !item.isBetter
    });

    loading.value = false;
  } catch (error) {
    console.error('图片加载失败', error);
    loading.value = false;
  }
});


/**
 * 轮换动画
 */
const isRandomScroll = ref(false);
const highlightedLeftIndex = ref(null); // 用于存储当前高亮左侧元素的索引
const highlightedRightIndex = ref(null); // 用于存储当前高亮右侧元素的索引
async function nextGroupHandle() {
  if (randomRound.value === 16 || isRandomScroll.value) {
    return;
  }

  isRandomScroll.value = true;
  console.log('轮播开始');
  randomScroll();
  await delay(300); // 等待 3 秒
  console.log('轮播结束');
  isRandomScroll.value = false;

  store.dispatch('group/updateGroupFirstRoundGroup', {playerId:infosPartUpper.value.at(highlightedLeftIndex.value).playerId, firstRoundGroup: randomRound.value})
  store.dispatch('group/updateGroupFirstRoundGroup', {playerId:infosPartDowner.value.at(highlightedRightIndex.value).playerId, firstRoundGroup: randomRound.value})

  // 随机选择选手
  const selectedFromPartOne = infosPartUpper.value.at(highlightedLeftIndex.value);
  const selectedFromPartTwo = infosPartDowner.value.at(highlightedRightIndex.value);

  // 将选手放入分组中
  compGroupLeft.value.push(selectedFromPartOne)
  compGroupRight.value.push(selectedFromPartTwo)

  // 标志已成组的选手
  infosPartUpper.value.at(highlightedLeftIndex.value).isSelect = true;
  infosPartDowner.value.at(highlightedRightIndex.value).isSelect = true;

  console.log({playerId:highlightedLeftIndex.value, firstRoundGroup: randomRound.value})
  console.log({playerId:highlightedRightIndex.value, firstRoundGroup: randomRound.value})
  console.log(store.getters['group/compGroup'])

  randomRound.value = randomRound.value+1

}

function randomScroll() {
  const interval = setInterval(() => {
    if (!isRandomScroll.value) {
      clearInterval(interval);
      return;
    }

    highlightedLeftIndex.value = getRandomIndex(infosPartUpper.value);
    highlightedRightIndex.value = getRandomIndex(infosPartDowner.value);
  }, 150);
}

function getRandomIndex(arr) {
  let index;
  do {
    index = Math.floor(Math.random() * arr.length);
  } while (arr[index].isSelect);
  return index;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * 页面切换
 */
function fistRound() {
  router.push('/FirstRound/FirstRoundView');
  nextTick(() => {
    const part1 = document.querySelector('.part1');
    const part3 = document.querySelector('.part3');

    if (part1 && part3) {
      part1.style.height = 'auto';
      part3.style.height = 'auto';
    }
  });
}
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="8" class="part1">
      <div class="body" v-for="(info,index) in infosPartOne" :key="index" 
      :class="{'highlighted': index === highlightedLeftIndex && !info.isSelect, 'gray': info.isSelect}">
        <div class="form">
        <el-image :src="info.url" :alt="info.name"></el-image>
        <el-text class="id">{{ index+1 }}</el-text>
        <el-text class="name">{{ info.name }}</el-text>
        </div>
      </div>
    </el-col>
    <el-col :span="8" class="part2">
        <div class="mid-part" v-for="index in compGroupLeft.length" :key="index">
        <div class="part1_id">{{ compGroupLeft[index-1]?.name }}</div>
        <div class="group_id">{{ String.fromCharCode(65 + index - 1) }}</div>
        <div class="part3_id">{{ compGroupRight[index-1]?.name }}</div>
      </div>
      <div>
        <el-button @click="nextGroupHandle" v-if="compGroupLeft.length < 16">下一组</el-button>
        <el-button @click="fistRound" v-if="compGroupLeft.length === 16">第一轮·半区对决</el-button>
      </div>
    </el-col>
    <el-col :span="8" class="part3">
      <div class="body" v-for="(info,index) in infosPartTwo" 
      :class="{'highlighted': index === highlightedRightIndex && !info.isSelect, 'gray': info.isSelect}" 
      >
        <div class="form">
        <el-image :src="info.url" :alt="info.name"></el-image>
        <el-text class="id">{{ index+17 }}</el-text>
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
  width: 50px;      /* 设置宽度 */
  height: 50px;     /* 设置高度 */
  border-radius: 50%;  /* 圆形样式 */
  overflow: hidden;   /* 防止图片溢出 */
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
import {ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

defineOptions({
  name: "PreGroupView",
  inheritAttrs: false
})

const router = useRouter();
const store = useStore();
const images = import.meta.glob('@/assets/*.jpg');
const infos = ref([])
const loading = ref(true); 
const infosPartOne = ref([])
const infosPartTwo = ref([])
const compGroupLeft = computed(() => store.getters['group/compGroupLeft']);
const compGroupRight = computed(() => store.getters['group/compGroupRight']);
const buttonText = ref('下一组')
const highlightedLeftIndex = ref(null); // 用于存储当前高亮左侧元素的索引
const highlightedRightIndex = ref(null); // 用于存储当前高亮右侧元素的索引


const playerNames = Array.from({ length: 32 }, (_, i) => `选手${i + 1}`);

onMounted(async () => {
  try {
    const loadedImages = await Promise.all(
      Object.keys(images).map((path) => {
        const loadImage = images[path];
        return loadImage().then((module) => module.default); 
      })
    );

    infos.value = playerNames.map((name, index) => ({
      name,
      url: loadedImages[index] || '', 
      score: 0
    }));

    infosPartOne.value = infos.value.slice(0, 16).map((item) => ({
      name: item.name,
      url: item.url,
      score: item.score,
      isSelect: false
    }));

    infosPartTwo.value = infos.value.slice(16).map((item) => ({
      name: item.name,
      url: item.url,
      score: item.score,
      isSelect: false
    }));

    loading.value = false;
  } catch (error) {
    console.error('图片加载失败', error);
    loading.value = false; 
  }
});


const isRandomScroll = ref(false);
async function nextGroupHandle() {
  if (store.state.group.compGroupLeft.length === 16) {
    return;
  }

  isRandomScroll.value = true;
  console.log('轮播开始');
  randomScroll();
  await delay(1000); // 等待 3 秒
  console.log('轮播结束');
  isRandomScroll.value = false;
  
  // 随机选择选手
  const selectedFromPartOne = infosPartOne.value.at(highlightedLeftIndex.value);
  const selectedFromPartTwo = infosPartTwo.value.at(highlightedRightIndex.value);

  // 将选手放入分组中

  store.dispatch('group/addToGroupLeft', selectedFromPartOne);
  store.dispatch('group/addToGroupRight', selectedFromPartTwo);

  // 标志已成组的选手
  infosPartOne.value.at(highlightedLeftIndex.value).isSelect = true;
  infosPartTwo.value.at(highlightedRightIndex.value).isSelect = true;


}

function randomScroll() {
  const interval = setInterval(() => {
    if (!isRandomScroll.value) {
      clearInterval(interval); 
      return;
    }

    highlightedLeftIndex.value = getRandomIndex(infosPartOne.value);
    highlightedRightIndex.value = getRandomIndex(infosPartTwo.value);
  }, 300); 
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
  return;
}
</script>
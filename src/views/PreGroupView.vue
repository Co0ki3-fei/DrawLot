<template>
  <el-row :gutter="20">
    <el-col :span="8" class="part1">
      <div class="body" v-for="(info,index) in infosPartOne" :key="index" 
      :class="{'highlighted': index === highlightedLeftIndex}">
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
        <el-button @click="nextGroupHandle">{{ buttonText }}</el-button>
      </div>
    </el-col>
    <el-col :span="8" class="part3">
      <div class="body" v-for="(info,index) in infosPartTwo" 
      :class="{'highlighted': index === highlightedRightIndex}">
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
}

</style>

<script setup>
import {ref, onMounted } from 'vue'

defineOptions({
  name: "PreGroupView",
  inheritAttrs: false
})

const images = import.meta.glob('@/assets/*.jpg');
const infos = ref([])
const loading = ref(true); 
const infosPartOne = ref([])
const infosPartTwo = ref([])
const compGroupLeft = ref([])
const compGroupRight = ref([])
const buttonText = ref('下一组')
const highlightImage = ref(null); 
const partOneTmp = ref([]); // 让 partOneTmp 成为响应式对象
const partTwoTmp = ref([]);
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

    infosPartOne.value = infos.value.slice(0,16);
    infosPartTwo.value = infos.value.slice(16)

    partOneTmp.value = infosPartOne.value.slice();
    partTwoTmp.value = infosPartTwo.value.slice();

    loading.value = false;
  } catch (error) {
    console.error('图片加载失败', error);
    loading.value = false; 
  }
});


const isRandomScroll = ref(false); // 控制是否在随机轮播阶段
const scrollTimer = ref(null); // 控制定时器的引用
function nextGroupHandle() {
  if (compGroupLeft.value.length === 16) {
    buttonText.value = '第一轮·半区对决';
    return;
  }

  isRandomScroll.value = true;

  scrollTimer.value = setTimeout(() => {
    isRandomScroll.value = false; // 停止轮播
    showPart2(); // 显示分组内容
  }, 3000); // 3 秒钟

  randomScroll();

  // 随机选择选手
  const selectedFromPartOne = getRandomItem(partOneTmp.value);
  const selectedFromPartTwo = getRandomItem(partTwoTmp.value);

  // 将选手从列表中移除
  partOneTmp.value = partOneTmp.value.filter((item) => item !== selectedFromPartOne);
  partTwoTmp.value = partTwoTmp.value.filter((item) => item !== selectedFromPartTwo);

  
  // 将选手放入分组中
  compGroupLeft.value.push(selectedFromPartOne);
  compGroupRight.value.push(selectedFromPartTwo);

  console.log(compGroupLeft)
}

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function randomScroll() {
  const interval = setInterval(() => {
    if (!isRandomScroll.value) {
      clearInterval(interval); // 停止定时器
      return;
    }
    
    // 随机选中左侧和右侧元素
    highlightedLeftIndex.value = Math.floor(Math.random() * infosPartOne.value.length);
    highlightedRightIndex.value = Math.floor(Math.random() * infosPartTwo.value.length);
  }, 100); // 每 100 毫秒随机一次
}

</script>
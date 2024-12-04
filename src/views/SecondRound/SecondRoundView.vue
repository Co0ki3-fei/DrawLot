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
      <div class="bgm">BGM: {{ bgm }}</div>
      <div class="player-form">
        <div class="left-player">
          <div class="lp-part1">
            <el-image :src="leftPlayer.url" style="width: 150px; height: 200px" :fit="none"></el-image>
            <el-text>{{ leftPlayer.name }}</el-text>
          </div>
        </div>
        <div class="score">
          <div class="score-txt">VS</div>
          
        </div>
        <div class="right-player">
          <div class="select-player" v-if="!isSelect">
            选择选手
          </div>
          <div class="lp-part1" v-if="isSelect">
            <el-image :src="rightPlayer.url" style="width: 150px; height: 200px" :fit="none"></el-image>
            <el-text>{{ rightPlayer.name }}</el-text>
          </div>
        </div>
      </div>
      <div class="pool" >
        <div class="player-pool">
          <div class="pp-title">选手池</div>
          <div class="pp-table">
            <el-table :data="playerPool" border :header-cell-style="headerCellStyle">
              <el-table-column align="center" prop="fist_group" label="第一组"></el-table-column>
              <el-table-column align="center" prop="second_group" label="第二组"></el-table-column>
              <el-table-column align="center" prop="third_group" label="第三组"></el-table-column>
              <el-table-column align="center" prop="forth_group" label="第四组"></el-table-column>
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
  </div>
</template>

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
  color: black;
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

<script setup>

const bgm = "bgm_name"
const leftPlayer = {'url':'','name':'选手7','score':0, 'skill': ''}
const rightPlayer = {'url':'','name':'选手23','score':0, 'skill': ''}
const skillPool = []
const isSelect = true

console.log(skillPool)

for (let i = 0; i < 12; i++) {
  const rowIndex = Math.floor(i / 3);
  if (!skillPool[rowIndex]) {
    skillPool[rowIndex] = {};
  }
  skillPool[rowIndex][`skill${(i % 3) + 1}`] = i + 1;
}

const headerCellStyle = () => {
  return{
    backgroundColor: '#c7c7c7',
    color: 'black',
    borderColor: '#c7c7c7'
  }
}


const bgmPool = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];
</script>

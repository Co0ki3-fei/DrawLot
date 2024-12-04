<template>
  <div class="page">
    <div class="nextBt">
      <el-button>下一组</el-button>
    </div>
    <div class="body">
      <div class="title">三十二强对决 - {{ group }} 组对决</div>
      <div class="bgm">BGM: {{ bgm }}</div>
      <div class="player-form">
        <div class="left-player">
          <div class="lp-part1">
            <el-image :src="leftPlayer.url" style="width: 150px; height: 200px" :fit="none"></el-image>
            <el-text>{{ leftPlayer.name }}</el-text>
          </div>
          <el-button  class="lp-skill">
            <el-text>选用技:</el-text>
          </el-button>
        </div>
        <div class="score">
          <div class="score-txt">VS</div>
          <div class="score-res">{{ leftPlayer.score }}:{{ rightPlayer.score }}</div>
        </div>
        <div class="right-player">
          <div class="rp-part1">
            <el-image :src="rightPlayer.url" style="width: 150px; height: 200px" :fit="none"></el-image>
          <el-text>{{ rightPlayer.name }}</el-text>
          </div>
          <el-button class="rp-skill">
            <el-text>选用技:</el-text>
          </el-button>
        </div>
      </div>
      <div class="skill" >
        <div class="skill-title">技池</div>
        <div class="skill-pool">
          <el-table :data="skillPool" border style="width: 100%;" :show-header="false">
            <el-table-column prop="skill1"/>
            <el-table-column prop="skill2"/>
            <el-table-column prop="skill3"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

const group = "A"
const bgm = "bgm_name"
const leftPlayer = {'url':'','name':'选手7','score':0, 'skill': ''}
const rightPlayer = {'url':'','name':'选手23','score':0, 'skill': ''}
const skillPool = []

console.log(skillPool)

for (let i = 0; i < 12; i++) {
  const rowIndex = Math.floor(i / 3);
  if (!skillPool[rowIndex]) {
    skillPool[rowIndex] = {};
  }
  skillPool[rowIndex][`skill${(i % 3) + 1}`] = i + 1;
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
  color: black;
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
  padding: 10%
}

.lp-skill .el-text {
  font-size: 20px;
  display: inline-block;
  position: relative;
  font-weight: bold;
  font-style: italic;
  color: black;
  text-decoration: none; 
  padding-bottom: 2px; 
}

.lp-skill .el-text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 300%;
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
  color: black;
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
  display: inline-block;
  position: relative;
  font-weight: bold;
  font-style: italic;
  color: black;
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
  color: black;
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
  color: black;
  font-style: italic;
  text-decoration: underline;
  font-weight: bold;
}

.skill-pool {
  width: 50%;
}
</style>

<template>
  <div class="second-round">
    <div class="title">八强赛胜者</div>
    <div class="res-table">
      <el-table :data="playerPool" border :header-cell-style="headerCellStyle">
                <el-table-column align="center" prop="fist_group" label="第一组"></el-table-column>
                <el-table-column align="center" prop="second_group" label="第二组"></el-table-column>
                <el-table-column align="center" prop="third_group" label="第三组"></el-table-column>
                <el-table-column align="center" prop="forth_group" label="第四组"></el-table-column>
              </el-table>
    </div>
    <div class="next-button">
      <el-button>进入下一轮</el-button>
    </div>
  </div>
  </template>
  
  
  <script setup>
  const headerCellStyle = () => {
    return{
      backgroundColor: '#c7c7c7',
      color: 'black',
      borderColor: '#c7c7c7'
    }
  }
  </script>
  
  <style>
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
  }
  
  .res-table {
    width: 60%;
    padding-bottom: 3%;
  }
  </style>
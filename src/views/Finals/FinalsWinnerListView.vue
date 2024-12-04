<template>
  <div class="second-round">
    <div class="title">总排名</div>
    <div class="res-table">
      <el-table :data="playerPool" border :show-header="false">
                <el-table-column align="center" prop="rank"></el-table-column>
                
              </el-table>
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
    width: 30%;
    padding-bottom: 3%;
  }
  </style>
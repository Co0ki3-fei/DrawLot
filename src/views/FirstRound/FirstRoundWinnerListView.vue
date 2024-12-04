<template>
<div class="winner-list-view">
  <div class="title">
    三十二强赛胜者
  </div>
  <div class="winner-list">
    <el-table :data="winnerList" border :show-header="false" >
        <el-table-column prop="winner" align="center">
            <template #default="{row}">
                <span>
                    <span :style="{color:'blue',fontWeight: 'bold',textDecoration:'underline',fontStyle:'italic',fontSize:'18px'}">{{ row.winnerPart1 }}</span>
                    <span :style="{color:'purple',fontWeight: 'bold',fontSize:'18px',paddingLeft:'5%'}">{{ row.winnerPart2 }}</span>
                </span>
            </template>
        </el-table-column>
    </el-table>
  </div>
  <div class="next-round-bt">
    <el-button>
        进入下一轮
    </el-button>
  </div>
</div>
</template>

<style>
.winner-list-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5%;
}

.title {
    font-size: 32px;
    font-style: italic;
    text-decoration: underline;
    font-weight: bold;
    padding-bottom: 5%;
}

.winner-list {
    width: 30%;
    padding-bottom: 5%;
}
</style>

<script setup>


const winnerList = [
    {"winnerPart1": "A","winnerPart2":"选手1"},
    {"winnerPart1": "B","winnerPart2":"选手18"},
    {"winnerPart1": "C","winnerPart2":"选手3"},
    {"winnerPart1": "D","winnerPart2":"选手19"},
    {"winnerPart1": "E","winnerPart2":"选手5"},
    {"winnerPart1": "……","winnerPart2":""}
]

</script>
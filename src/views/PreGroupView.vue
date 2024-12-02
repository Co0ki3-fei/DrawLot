<template>
  <el-row :gutter="20">
    <el-col :span="8" class="part1">
      <div class="body" v-for="index in 10">
        <div class="form">
        <el-avatar :icon="UserFilled" />
        <el-text class="id">{{ index }}</el-text>
        <el-text class="name">{{ infos[index-1].name }}</el-text>
        </div>
      </div>
    </el-col>
    <el-col :span="8" class="part2">

        <div class="mid-part" v-for="index in 2">
        <div class="part1_id">1</div>
        <div class="group_id">A</div>
        <div class="part3_id">22</div>
      </div>
      <div>
        <el-button>下一组</el-button>
      </div>
    </el-col>
    <el-col :span="8" class="part3">
      <div class="body" v-for="index in 10">
        <div class="form">
        <el-avatar :icon="UserFilled" />
        <el-text class="id">{{ index }}</el-text>
        <el-text class="name">2</el-text>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>

.part2 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: column;
}

.body{
  border-style: solid;
  border-width: 2px;
  width: 50%;
  margin: 12px 25%;
}

.form {
  margin: 10px 10px;
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
  justify-content: center;
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
  margin: 12px 25%;
}
</style>

<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue';

const infos = [{"name":"test1"},{"name":"test2"},{"name":"test3"},{"name":"test4"},{"name":"test5"},{"name":"test6"},{"name":"test7"},{"name":"test8"},{"name":"test9"},{"name":"test10"}]
</script>
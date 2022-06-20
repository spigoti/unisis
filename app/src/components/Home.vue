<template>
  <BaseHeader/>
  <div style="display: flex">
    <BaseSide/>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script >
import axios from "axios";

export default  {
  name: 'Home',
}
</script>

<style>
#app {
  text-align: center;
  color: var(--el-text-color-primary);
  height: 100vh;
}

.el-card__header {
  background-color: #43BDD4;
}

.card-header {
  display: flex;
  justify-content: start;
}

.card-header span{
  color: white;
  font-weight: 700;
  font-size: 20px;
}
.element-plus-logo {
  width: 50%;
}
</style>

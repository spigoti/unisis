<template>
  <el-menu
    default-active="0"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="0">
      <el-icon><star-filled /></el-icon>
      <router-link :to="'/meus-protocolos'">Meus protocolos</router-link>
    </el-menu-item>
    <el-menu-item index="1">
      <el-icon><document-add /></el-icon>
      <router-link :to="'/protocolo'">Novo protocolo</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import {
  Location,
  Document,
  Menu,
  Search,
  Tickets,
  UserFilled,
  StarFilled,
  DocumentAdd,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style>

.el-menu-vertical-demo {
  min-height: 90vh;
}

.el-menu-item.is-active {
  background-color: #dedede;
}

.el-menu a {
  text-decoration: none;
  font-weight: 600;
}

</style>

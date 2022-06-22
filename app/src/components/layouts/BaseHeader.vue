<template>
  <el-menu class="navbar el-menu-demo" mode="horizontal" style="justify-content: space-between">
      <el-menu-item index="1" style="padding: 20px; font-size: 24px; font-weight: 600"><img src="/src/assets/logo.png" height="40" style="margin-right: 12px">UNISIS</el-menu-item>
      <el-sub-menu index="2" style="display: flex; align-items: center; margin-right: 12px">
        <template #title>
          <div style="display: flex">
            <span style="font-weight: 600">{{appUser}}</span>
          </div>
        </template>
        <el-menu-item index="2-1"> <router-link :to="'/minha-conta'">Minha conta</router-link></el-menu-item>
        <el-menu-item index="2-2" style="color: red" @click="userLogout">Sair</el-menu-item>
      </el-sub-menu>
  </el-menu>
</template>

<script>
import router from "../../router";
import {mapState} from "vuex";

export default {
  name: 'Navbar',
  data() {
    return {
    }
  },
  methods: {
    userLogout() {
      this.$store.commit('SIGN_OUT');
      this.$router.push('/');
    },
  },
  computed: {
    ...mapState({appUser: state => state.appUser})
  },
  mounted() {
    console.log(this.appUser);
  }
}
</script>

<style>


</style>
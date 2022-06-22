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

export default  {
  name: 'Home',
  data() {
    return {

    }
  },
  methods: {
    userIsAuthenticated(){
      let user = localStorage.getItem('appUser');

      if (!user) {
        this.$router.push('/');
        this.$store.commit('SIGN_OUT');
        return;
      }

      user = JSON.parse(user);
      this.$store.commit('AUTH_USER', user.email);

    },
  },
  created() {
    this.userIsAuthenticated();
  },
}
</script>

<style>
#app {
  text-align: center;
  color: var(--el-text-color-primary);
  height: 100vh;
}

.el-card__header {
  background-color: #000;
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

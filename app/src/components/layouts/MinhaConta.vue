<template>
  <div>
    <el-row class="">
      <el-col class="" :span="8">
        <el-card>
          <el-form
              label-width="120px"
              label-position="left"
          >
            <el-form-item label="Email" prop="email">
              <el-input type="email" />
            </el-form-item>
            <el-form-item label="Senha" prop="password">
              <el-input type="password" />
            </el-form-item>
            <el-form-item label="Nova senha" prop="newPassword">
              <el-input type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">Alterar senha</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import axios from "axios";
import router from "../../router";

export default {
  name: 'MinhaConta',
  data() {
    return {}
  },
  created() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}

</script>

<style scoped>

</style>
<template>
  <div class="login">
    <el-row>
      <el-col class="card__login" v-if="activeForm === 'login'">
        <el-card>
          <div class="logo__wrapper is-flex">
            <img src="/src/assets/logo.png">
            <span>UNISIS</span>
          </div>
          <el-form
              label-width="120px"
              label-position="top"
              :model="loginForm" :rules="rules" ref="loginForm"
          >
            <el-form-item label="Email" prop="email">
              <el-input type="email" v-model="loginForm.email"/>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="loginForm.password"/>
            </el-form-item>
            <el-form-item>
              <div class="w-100">
                <el-row :gutter="10">
                  <el-col :xs="24" :md="12">
                    <a class="forgot__password" @click="forgotPassword">Esqueceu a senha?</a>
                  </el-col>
                  <el-col :xs="24" :md="12">
                    <el-button type="primary" @click="submitForm('loginForm')">Entrar</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
            <el-divider/>
            <el-form-item>
              <div style="width: 100%; display: flex; justify-content: center">
                <el-button class="new__account" @click="newAccount">Criar nova conta</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col class="card__login" v-if="activeForm === 'passwordRecovery'">
        <el-card>
          <div class="logo__wrapper is-flex">
            <img src="/src/assets/logo.png">
            <span>UNISIS</span>
          </div>
          <h4>Digite seu email no campo abaixo para recuperar sua senha.</h4>
          <el-form
              label-width="120px"
              label-position="top"
              ref="loginForm"
          >
            <el-form-item label="Email" prop="email">
              <el-input type="email" v-model="loginForm.email"/>
            </el-form-item>
            <el-form-item>
              <div class="w-100">
                <el-row :gutter="10">
                  <el-col :xs="24" :md="12">
                    <el-button class="w-100" type="" @click="backToLogin">Voltar</el-button>
                  </el-col>
                  <el-col :xs="24" :md="12">
                    <el-button class="w-100" type="primary" @click="passwordRecovery">Recuperar senha</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col class="card__login" v-if="activeForm === 'passwordChange'">
        <el-card>
          <div class="logo__wrapper is-flex">
            <img src="/src/assets/logo.png">
            <span>UNISIS</span>
          </div>
          <el-form
              label-width="120px"
              label-position="top"
              :model="loginForm" :rules="rules" ref="loginForm"
          >
            <el-form-item label="Senha" prop="password">
              <el-input type="password" v-model="loginForm.password"/>
            </el-form-item>
            <el-form-item label="Confirmar senha" prop="password">
              <el-input type="password" v-model="loginForm.password"/>
            </el-form-item>
            <el-form-item>
              <div class="w-100">
                <el-row :gutter="10">
                  <el-col :xs="24">
                    <el-button type="primary" @click="backToLogin">Salvar senha</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col class="card__login" v-if="activeForm === 'newAccount'">
        <el-card>
          <div class="logo__wrapper is-flex">
            <img src="/src/assets/logo.png">
            <span>UNISIS</span>
          </div>
          <h4>Cadastro</h4>
          <el-form
              label-width="120px"
              label-position="top"
              :model="loginForm" :rules="rules" ref="newAccountForm"
          >
            <el-form-item label="Email" prop="email">
              <el-input type="email" v-model="loginForm.email"/>
            </el-form-item>
            <el-form-item label="Senha" prop="password">
              <el-input type="password" v-model="loginForm.password"/>
            </el-form-item>
            <el-form-item label="Confirmar senha" prop="confirmPassword">
              <el-input type="password" v-model="loginForm.confirmPassword"/>
            </el-form-item>
            <el-form-item>
              <div class="w-100">
                <el-row :gutter="10">
                  <el-col :xs="24">
                    <el-button type="primary" @click="newAccountSubmit('newAccountForm')">Criar conta</el-button>
                  </el-col>
                </el-row>
              </div>
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
  name: 'Login',
  data() {
    let validatePasConfirmation = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        callback(new Error('As senhas devem ser iguais.'));
      }
      callback();
    };
    return {
      rules: {
        email: [
          {required: true, message: 'Insira um email válido.', trigger: 'blur'},
        ],
        password: [
          {min: 4, required: true, message: 'Insira uma senha com no mínimo 4 dígitos. ', trigger: 'blur'}
        ],
        confirmPassword: [
          {validator: validatePasConfirmation, trigger: 'blur'},
        ],
      },
      activeForm: "login",
      loginForm: {
        email: null,
        password: null,
        confirmPassword: null

      },
    }
  },
  created() {
    // pu
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:4000/auth', this.loginForm)
              .then((response) => {
                console.log(response.data);
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('appUser', JSON.stringify(response.data.user));
                router.push('/home');
              })
              .catch(error => {
                alert("Usuário não encontrado");
                console.log(error)
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    newAccountSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:4000/user', this.loginForm)
              .then((response) => {
                if (response){
                  this.$store.dispatch('authUser', this.loginForm).then( (response) => {
                    alert(JSON.stringify(response));
                  }, error => {
                    alert(error)
                  });
                }
                console.log(response.data);
              })
              .catch(error => {
                alert("Erro ao realizar o cadastro");
                console.log(error)
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    newAccount() {
      this.activeForm = 'newAccount';
    },
    forgotPassword() {
      this.activeForm = 'passwordRecovery';
    },
    passwordRecovery() {
      this.activeForm = 'passwordChange';
    },
    passwordChange() {
      this.activeForm = 'passwordChange';
    },
    backToLogin() {
      this.activeForm = 'login';
    }
  }
}

</script>

<style>

.login {
  height: 100vh;
  background-color: #aad7ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 576px) {
  .login {
    /*background-color: #ffffff;*/
  }
}

.card__login {
  max-width: 420px;
  min-width: 420px;
}

@media (max-width: 576px) {
  .card__login {
    min-width: 320px;
    padding: 12px;
  }
}

.card__login .logo__wrapper {
  flex-direction: column;
  margin-bottom: 24px;
}

.card__login .logo__wrapper img{
  width: auto;
  height: 80px;
}

.card__login .logo__wrapper span{
  display: block;
  margin-top: 8px;
  font-size: 24px;
  font-weight: 600;
}


a.forgot__password {
  color: #4545b2;
  font-weight: 600;
  transition: background-color 0.4s ease;
  cursor: pointer;
}

.new__account {
  background-color: #000000;
  color: white;
  transition: background-color 0.4s ease;
}

.new__account:hover {
  background-color: #383838;
  color: white;
}

.w-100 {
  width: 100%;
}


</style>
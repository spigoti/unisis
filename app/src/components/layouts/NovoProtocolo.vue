<template>
  <el-row :gutter="20" :loading="true" >
    <el-col :xs="24" :sm="18" :md="16" :lg="12" :xl="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header" style="">
            <span>Novo protocolo</span>
          </div>

        </template>
        <div>
          <el-form
              ref="protocolForm"
              :model="protocolForm"
              label-width="120px"
              label-position="top"
              :rules="rules"

          >
            <el-form-item label="Nome" prop="name">
              <el-input v-model="protocolForm.name"/>
            </el-form-item>
            <el-form-item v-for="(item, index) in protocolForm.query" prop="query">
              <el-input
                  v-model="protocolForm.query[index]"
                  placeholder="Please input"
                  class="input-with-select"
              >
                <template #append>
                  <el-select v-model="protocolForm.operators[index]" placeholder="Select"
                             @change="onExpressionChange(this)" style="width: 115px">
                    <el-option label="AND" value="AND"/>
                    <el-option label="OR" value="OR"/>
                    <el-option label="NOT" value="NOT"/>
                  </el-select>
                </template>
              </el-input>
              <!--              <el-input v-model="protocolForm.query[index]"/>-->
            </el-form-item>
            <el-form-item label="Base de dados" prop="region">
              <el-select v-model="protocolForm.database" placeholder="Base de dados">
                <el-option label="ACM e IEEE" value="all"/>
                <el-option label="ACM" value="acm"/>
                <el-option label="IEEE" value="ieee"/>
              </el-select>
            </el-form-item>
            <el-form-item label="Publicado entre:" prop="desc">
              <div class="w-100">
                <el-row>
                  <el-col :xs="24" :lg="12">
                    <el-slider class="w-100" v-model="protocolForm.yearRange" range :min="protocolForm.yearMin"
                               :max="protocolForm.yearMax"/>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancelProtocol">Cancelar</el-button>
              <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="submitForm('protocolForm')">Adicionar Protocolo</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col v-for="item in articles" :span="12">
      <div class="grid-content bg-purple"/>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
          </div>
        </template>
        <div class="text item" style="text-align: start">
          <p>{{ item.authors }}</p>
          <p>{{ item.year }}</p>
          <p>{{ item.abstract }}</p>
          <a :href="item.url">{{ item.url }}</a>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>


<script>
import axios from "axios";
import {toRaw} from "vue";
import {ElMessage} from "element-plus";

export default {
  name: 'NovoProtocolo',
  data() {
    return {
      rules: {
        name: [
          {required: true, message: 'Insira um nome para o protocolo.', trigger: 'blur'},
        ],
      },
      protocolForm: {
        name: '',
        query: ['security', 'game'],
        operators: [],
        database: 'all',
        yearMin: 1980,
        yearMax: new Date().getFullYear(),
        yearRange: [2000, new Date().getFullYear()],
      },
      fullscreenLoading: false,
    }
  },
  methods: {
    submitForm(protocolFormRef) {
      this.$refs[protocolFormRef].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          let yearRange = toRaw(this.protocolForm.yearRange);
          let database = toRaw(this.protocolForm.database);
          let payload = {
            name: toRaw(this.protocolForm.name),
            acmQuery: null,
            ieeeQuery: null
          }

          if (database === 'all' || database === 'acm') {
            payload.acmQuery = `https://dl.acm.org/action/doSearch?AllField=${this.generateAcmQuery()}&AfterYear=${yearRange[0]}&BeforeYear=${yearRange[1]}&startPage=0&pageSize=50`;
          }

          if (database === 'all' || database === 'ieee') {
            payload.ieeeQuery = `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${this.generateIeeeQuery()}&ranges=${yearRange[0]}_${yearRange[1]}_Year&rowsPerPage=50&pageNumber=1`;
          }

          this.$store.dispatch('createProtocol', payload).then((response) => {
            let searchParameters = {
              protocol: response.id,
              ieeeQuery: payload.ieeeQuery,
              acmQuery: payload.acmQuery,
            }

            this.$store.dispatch('search', searchParameters).then((response) => {
              this.fullscreenLoading = false;
              ElMessage({
                message: 'Protocolo criado com sucesso!',
                type: 'success'
              });
              this.$router.push('/protocolo/' + searchParameters.protocol);

            }, error => {
              ElMessage({
                message: error ,
                type: 'error'
              });
              this.fullscreenLoading = false;
            })
          }, error => {
            ElMessage({
              message: error ,
              type: 'error'
            });
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formEl) {
      if (!formEl) return
      formEl.resetFields()
    }
    ,
    cancelProtocol(formEl) {
      console.log("O Protocolo foi cancelado");
    }
    ,
    onExpressionChange(el, event) {
      console.log(el, event);
    }
    ,
    generateIeeeQuery() {
      let searchQuery = toRaw(this.protocolForm.query);
      let operators = toRaw(this.protocolForm.operators);
      let query = searchQuery[0];

      if (searchQuery.length === operators.length) {
        operators.pop();
      }

      if (searchQuery.length > 1) {
        query = '';
        searchQuery.forEach((word, index) => {
          query += word;
          console.log(word)
          if (operators[index]) {
            query += '%20' + operators[index] + '%20';
          }
        });
      }
      return query;
    }
    ,
    generateAcmQuery() {
      let searchQuery = toRaw(this.protocolForm.query);
      let operators = toRaw(this.protocolForm.operators);
      let query = searchQuery[0];

      if (searchQuery.length === operators.length) {
        operators.pop();
      }

      if (searchQuery.length > 1) {
        query = '';
        searchQuery.forEach((word, index) => {
          query += word;
          if (operators[index]) {
            query += '+' + operators[index] + '+';
          }
        });
      }

      return query;
    }
  },
  watch: {}

}
</script>

<style>

.el-card__header {
  background-color: black;
}

.w-100 {
  width: 100%;
}
</style>
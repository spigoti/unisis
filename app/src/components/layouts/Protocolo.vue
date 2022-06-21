<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="18" :md="16" :lg="12" :xl="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header" style="">
            <span>Novo protocolo</span>
          </div>

        </template>
        <div>
          <el-form
              ref="searchFormRef"
              :model="searchForm"
              label-width="120px"
              class="demo-searchForm"
              label-position="top"
          >
            <el-form-item label="Nome" prop="name">
              <el-input v-model="searchForm.name"/>
            </el-form-item>
            <el-form-item v-for="(item, index) in searchForm.query" prop="query">
              <el-input
                  v-model="searchForm.query[index]"
                  placeholder="Please input"
                  class="input-with-select"
              >
                <template #append>
                  <el-select v-model="searchForm.expression[index]" placeholder="Select"
                             @change="onExpressionChange(this)" style="width: 115px">
                    <el-option label="AND" value="AND"/>
                    <el-option label="OR" value="OR"/>
                    <el-option label="NOT" value="NOT"/>
                  </el-select>
                </template>
              </el-input>
              <!--              <el-input v-model="searchForm.query[index]"/>-->
            </el-form-item>
            <el-form-item label="Base de dados" prop="region">
              <el-select v-model="searchForm.database" placeholder="Base de dados">
                <el-option label="ACM e IEEE" value="all"/>
                <el-option label="ACM" value="acm"/>
                <el-option label="IEEE" value="ieee"/>
              </el-select>
            </el-form-item>
            <el-form-item label="Publicado entre:" prop="desc">
              <div class="w-100">
                <el-row>
                  <el-col :xs="24" :lg="12">
                    <el-slider class="w-100" v-model="searchForm.yearRange" range :min="searchForm.yearMin"
                               :max="searchForm.yearMax"/>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancelProtocol">Cancelar</el-button>
              <el-button type="primary" @click="submitForm">Adicionar Protocolo</el-button>
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

export default {
  name: 'Protocolo',
  data() {
    return {
      searchForm: {
        query: ['security', 'game'],
        expression: [],
        database: 'ieee',
        yearMin: 1980,
        yearMax: new Date().getFullYear(),
        yearRange: [2000, new Date().getFullYear()],
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      acmUrl: '',
      ieeeUrl: 'https://ieeexplore.ieee.org/search/searchresult.jsp?action=search&newsearch=true&matchBoolean=true&queryText=()',
      articles: [],
    }
  },
  methods: {//%20AND%20 //%20AND%20
    submitForm() {
      console.log(this.searchForm.expression)
      //%22All%20Metadata%22:games)%20AND%20(%22All%20Metadata%22:security)%20AND%20(%22All%20Metadata%22:data)
      // let queryToSearch = `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${this.searchForm.query.replace(' ', '%20')}&ranges=${this.searchForm.yearRange[0]}_${this.searchForm.yearRange[1]}_Year&rowsPerPage=100&pageNumber=1`;
      // // queryToSearch = 'https://dl.acm.org/action/doSearch?AllField=games';
      axios.post('http://localhost:4000/search', {query: this.searchForm})
          .then((response) => {
            this.articles = response.data;
          })
          .catch(error => {
            console.log(error)
          })
    },
    resetForm(formEl) {
      if (!formEl) return
      formEl.resetFields()
    },
    cancelProtocol(formEl) {
      console.log("O Protocolo foi cancelado");
    },
    onExpressionChange(el, event) {
      console.log(el, event);
    }
  },
  watch: {
    searchForm(expression) {
      console.log(expression)
      // if (status == 'a') {
      //   this.alterarStatusAtivo()
      // }
      // if (status == 'i') {
      //   this.alterarStatusInativo()
      // }
    }
  }

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
<template>
  <div style="padding: 20px">
    <el-row>
      <el-col>
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>Artigos</span>
            </div>
          </template>
          <div class="el-card__body">
            <el-row :gutter="20">
              <el-col v-for="article in articles" class="article" :xs="24" :md="12" :lg="8">
                <el-card class="box-card">
                  <div class="protocol__body">
                    <ul style="list-style-type: none; padding: 0; margin: 0">
                      <li><span>Nome:</span> {{ article.title }}</li>
                      <li><span>Autores:</span> {{ article.authors }}</li>
                      <li><span>Ano:</span> {{ article.year }}</li>
                      <li><span>Citações:</span> {{ article.citedBy }}</li>
                      <li><span>Base:</span> {{ article.base }}</li>
                      <li><span>Resumo:</span> {{ article.abstract }}</li>
                    </ul>
                    <el-row style="margin-top: 20px" :gutter="20">
                      <el-col :xs="24" :sm="12">
                        <el-link :href="article.referenceUrl">
                          <el-button class="w-100">Ver na base</el-button>
                        </el-link>
                      </el-col>
                      <el-col :xs="24" :sm="12">
                        <el-button class="w-100" type="success" plain>Selecionar</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Protocolo',
  data() {
    return {
      articles: [{

      }],
      articlesDialog: false,
    }
  },
  methods: {
    readProtocol() {
      let protocolId = this.$route.params.id;

      this.$store.dispatch('readProtocol', protocolId).then((response) => {
        this.articles = response.articles;
      }, error => console.log(error));
    },
    selectArticle(articleId){

    },
  },
  created() {
    this.readProtocol();
  },
  beforeCreate() {

  },
}

</script>

<style>

.mb-3 {
  margin-bottom: 20px;
}

.article {
  margin-bottom: 20px;
  height: 100%;
}

.protocol:hover > a {
  text-decoration: none;
}

.protocol .box-card {
  background-color: #f5f5f5;
}

.protocol__body {
  text-align: start
}

.protocol__body span {
  font-weight: 600;
}

.protocol__body li:not(:last-child) {
  margin-bottom: 8px;
}
</style>
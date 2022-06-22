<template>
  <div style="padding: 20px">
    <el-row>
      <el-col>
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>Meus artigos</span>
            </div>
          </template>
          <div class="el-card__body">
            <el-row :gutter="20">
              <el-col v-for="article in articles" class="article" :xs="24" :md="12" :lg="8">
                <el-card class="box-card">
                  <div class="protocol__body">
                    <ul style="list-style-type: none; padding: 0; margin: 0">
                      <li><span>Nome:</span> {{ article.name }}</li>
                      <li><span>Authors:</span> {{ article.query }}</li>
                      <li><span>Ano:</span> {{ article.base }}</li>
                      <li><span>Resumo:</span> {{ article.year }}</li>
                      <li><span>Citações:</span> {{ article.name }}</li>
                      <li><span>Url:</span> {{ article.updatedAt }}</li>
                    </ul>
                    <el-row style="margin-top: 20px" :gutter="20">
                      <el-col :xs="24" :sm="12">
                            <el-button class="w-100" type="danger" plain>Excluir</el-button>
                      </el-col>
                      <el-col :xs="24" :sm="12">
                        <router-link :to="'/protocolo/' + protocol.id">
                          <el-button class="w-100">Visualizar</el-button>
                        </router-link>
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

  <el-dialog v-model="protocolUsersDialog" title="Protocolo compartilhado com">
    <el-table :data="protocolUsers">
      <el-table-column property="email" label="Email"/>
      <el-table-column property="createdAt" label="Criado em:"/>
    </el-table>
  </el-dialog>
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
  methods: {//%20AND%20 //%20AND%20
    confirmDeleteProtocol(protocolId) {
      // this.$store.dispatch('deleteProtocol', protocolId).then((response) => {
      //   this.protocols = this.protocols.filter(function (protocol) {
      //     return protocol.id !== protocolId;
      //   });
      // }, error => console.log(error));
    },
    cancelDeleteProtocol() {
      console.log('Não foi deletado')
    },
    listProtocols() {
      this.$store.dispatch('listProtocols').then((response) => {
        this.protocols = this.formatProtocols(response);
      }, error => console.log(error));
    },
    formatProtocols(results) {
      let protocols = [];

      results.forEach((result, index) => {
        let protocol = {
          id: result.protocolId,
          name: null,
          query: null,
          base: null,
          year: null,
          updatedAt: null,
        };

        protocol.name = result.name;
        protocol.updatedAt = new Date(result.updatedAt).toLocaleDateString();

        if ((result.ieeeQuery !== null) && (result.ieeeQuery !== 'undefined')) {
          protocol.base = 'IEEE';

          let url = result.ieeeQuery;
          let queryIndexStart = url.indexOf('queryText=');
          let queryIndexEnd = url.indexOf('&', queryIndexStart);
          protocol.query = url.slice(queryIndexStart + 10, queryIndexEnd).replaceAll('%20', ' ');

          let yearIndexStart = url.indexOf('ranges=');
          let yearIndexEnd = url.indexOf('_Year', queryIndexStart);
          protocol.year = url.slice(yearIndexStart + 7, yearIndexEnd).replaceAll('_', ' e ');
        }

        if ((result.acmQuery !== null) && (result.acmQuery !== 'undefined')) {
          protocol.base = protocol.base ? protocol.base + ' e ACM' : 'ACM';
          let url = result.acmQuery;

          if (protocol.query === null) {
            let queryIndexStart = url.indexOf('AllField=');
            let queryIndexEnd = url.indexOf('&', queryIndexStart);
            protocol.query = url.slice(queryIndexStart + 9, queryIndexEnd).replaceAll('+', ' ');
          }

          if (protocol.year === null) {
            let yearIndexAfterStart = url.indexOf('AfterYear=');
            let yearIndexAfterEnd = url.indexOf('&', yearIndexAfterStart);
            let yearIndexBeforeStart = url.indexOf('BeforeYear=');
            let yearIndexBeforeEnd = url.indexOf('&', yearIndexBeforeStart);
            let yearAfter = url.slice(yearIndexAfterStart + 10, yearIndexAfterEnd);
            let yearBefore = url.slice(yearIndexBeforeStart + 11, yearIndexBeforeEnd);
            console.log(yearIndexAfterStart)
            protocol.year = yearAfter + ' e ' + yearBefore;
          }
        }

        protocols.push(protocol);
      });
      return protocols;
    }
  },
  created() {
    this.listProtocols();
  },
  beforeCreate() {

  },
  watch: {}
}

</script>

<style>

.mb-3 {
  margin-bottom: 20px;
}

.protocol {
  margin-bottom: 20px;
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
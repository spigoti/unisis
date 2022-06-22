<template>
  <div style="padding: 20px">
    <el-row>
      <el-col>
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>Meus protocolos</span>
            </div>
          </template>
          <div class="el-card__body">
            <el-row :gutter="20">
              <el-col class="protocol" :xs="24" :md="12" :lg="8">
                <el-link>
                  <el-card class="box-card">
                    <div class="protocol__body">
                      <ul style="list-style-type: none; padding: 0; margin: 0">
                        <li><span>Nome:</span> [protocolo.nome]</li>
                        <li><span>Termos de busca:</span> [protocolo.termos]</li>
                        <li><span>Base de dados:</span> [protocolo.base]</li>
                        <li><span>Publicado entre:</span> [protocolo.criterios]</li>
                        <li><span>Compartilhado com:</span> [protocolo.usuarios]</li>
                        <li><span>Última execução:</span> [protocolo.ultimaExecucao]</li>
                      </ul>
                      <el-row style="margin-top: 20px">
                        <el-col>
                          <el-popconfirm
                              confirm-button-text="Sim"
                              cancel-button-text="Não"
                              title="Você tem certeza que deseja remover este protocolo?"
                              @confirm="confirmDeleteProtocol"
                              @cancel="cancelDeleteProtocol"
                          >
                            <template #reference>
                              <el-button type="danger" plain>Excluir</el-button>
                            </template>
                          </el-popconfirm>
                        </el-col>
                        <el-col :xs="24" :sm="12">
                          <el-button>Executar</el-button>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-link>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <el-dialog v-model="protocolUsersDialog" title="Protocolo compartilhado com">
    <el-table :data="protocolUsers">
      <el-table-column property="email" label="Email" />
      <el-table-column property="createdAt" label="Criado em:"/>
    </el-table>
  </el-dialog>
</template>

<script>

export default {
  name: 'MeusProtocolos',
  data() {
    return {
      protocols: [],
      protocolUsersDialog: false,
      protocolUsers: [
        {
          email: "felipe",
          createdAt: "22/05/2022"
        }
      ],
    }
  },
  methods: {//%20AND%20 //%20AND%20
    confirmDeleteProtocol() {
      console.log("foi deletado");
    },
    cancelDeleteProtocol() {
      console.log('Não foi deletado')
    }
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

.protocol:hover > a {
  text-decoration: none;
}

.protocol .box-card{
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
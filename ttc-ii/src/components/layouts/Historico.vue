<template>
  <div style="padding: 20px">
    <el-row>
      <el-col>
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>Pesquisar documentos</span>
            </div>
          </template>
          <div class="el-card__body">
            <el-table :data="documents" stripe style="width: 100%">
              <el-table-column prop="name" label="Nome"/>
              <el-table-column prop="authors" label="Autores" width="180" />
              <el-table-column prop="publishedAt" label="Ano de publicação" />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Pesquisar',
  data () {
    return {
      resultado: [],
      documents: [
        {
          name: 'Estudo de caso: as máquinas estão dominando o mundo?',
          authors: 'Jared Cow, Pietra Marin',
          publishedAt: '2021'
        },
        {
          name: 'Estudo de caso: as máquinas estão dominando o mundo?',
          authors: 'Jared Cow, Pietra Marin',
          publishedAt: '2021'
        },
        {
          name: 'Estudo de caso: as máquinas estão dominando o mundo?',
          authors: 'Jared Cow, Pietra Marin',
          publishedAt: '2021'
        },
        {
          name: 'Estudo de caso: as máquinas estão dominando o mundo?',
          authors: 'Jared Cow, Pietra Marin',
          publishedAt: '2021'
        },
        {
          name: 'Estudo de caso: as máquinas estão dominando o mundo?',
          authors: 'Jared Cow, Pietra Marin',
          publishedAt: '2021'
        },
      ],
    }
  },
  created() {
    // pu
  },
  methods: {
    // buscar(){
    //   this.resultado = this.$store.dispatch('crawler/getIe')
    // }
  }
}

</script>

<style scoped>

</style>
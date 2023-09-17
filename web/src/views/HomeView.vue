<template>
  <Navbar />
  <div class="dashboard">
    <h1 class="dashboard_title">Painel de Controle</h1>
    <div class="table">
      <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Bairro</th>
                <th>Tipo</th>
                <th>Reciclável</th>
                <th>Radioativo</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="lixo in lixos" :key="lixo.id">
                <td>{{ lixo.nome }}</td>
                <td>{{ lixo.bairro }}</td>
                <td>{{ lixo.tipo }}</td>
                <td>{{ lixo.reciclavel }}</td>
                <td>{{ lixo.radioativo }}</td>
            </tr>
        </tbody>
    </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from '@/utils/axios'
import { Lixo } from '../models/Lixo'
import Navbar from '../components/navbar.vue';

export default defineComponent({

  components: {
        Navbar,
    },

  data() {
    return {
      lixos: [] as Lixo[],
      form: {
        nome: '',
        bairro: '',
        tipo: '',
        reciclavel: '',
        organico: '',
        radioativo: '',
      }
    }
  },

  created(){
    this.fetchLixos()
  },

  methods:{
    async fetchLixos(){
      try {
        const { data } = await axios.get('/lixos')
        this.lixos = data
      } catch (error) {
        console.warn(error)
      }
    },
  }
})
</script>

<style scoped>

.dashboard{
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
}

.dashboard_title{
  color: #086A35;
}

.table {
  border-collapse: collapse;
  margin-top: 15px;
  box-shadow: 0 0.5rem 2rem rgba(128, 128, 128, 0.639);
  
  background-color: white;

  height: 400px;
  overflow-y: scroll;
  transition: max-height 0.5s ease;
}

.table::-webkit-scrollbar {
  display: none;
}

.table th, .table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding: 20px;
}

.table th {
  background-color: #086A35;
  color: white;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tr:hover {
  background-color: #f1f1f1;
}

</style>
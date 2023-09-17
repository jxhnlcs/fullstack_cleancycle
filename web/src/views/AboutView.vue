  <template>
    <Navbar />

    <div class="dashboard">
      <h1 class="dashboard_title">Estatísticas</h1>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>Bairro</th>
              <th>Plástico</th>
              <th>Metal</th>
              <th>Papel</th>
              <th>Vidro</th>
              <th>Orgânico</th>
              <th>Lixo Eletrônico</th>
              <th>Total(cm³)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bairroData, bairro) in sortedBairrosData" :key="bairro">
              <td>{{ bairro }}</td>
              <td>{{ bairroData['Plástico'] }}</td>
              <td>{{ bairroData['Metal'] }}</td>
              <td>{{ bairroData['Papel'] }}</td>
              <td>{{ bairroData['Vidro'] }}</td>
              <td>{{ bairroData['Orgânico'] }}</td>
              <td>{{ bairroData['Lixo Eletrônico'] }}</td>
              <td>{{ totalPorBairro(bairroData) }}</td>
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

  interface BairroData {
    [bairro: string]: {
      'Plástico': number;
      'Metal': number;
      'Papel': number;
      'Vidro': number;
      'Orgânico': number;
      'Lixo Eletrônico': number;
      [tipo: string]: number;
    };
  }

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

    created() {
      this.fetchLixos()
    },

    computed: {
      bairrosData(): BairroData {
        const bairroData: BairroData = {};

        this.lixos.forEach(lixo => {
          if (!bairroData[lixo.bairro]) {
            bairroData[lixo.bairro] = {
              'Plástico': 0,
              'Metal': 0,
              'Papel': 0,
              'Vidro': 0,
              'Orgânico': 0,
              'Lixo Eletrônico': 0
            };
          }
          bairroData[lixo.bairro][lixo.tipo]++;
        });

        return bairroData;
      },

      sortedBairrosData(): BairroData {
        const bairros = Object.keys(this.bairrosData);

        bairros.sort((a, b) => {
          const totalA = this.totalPorBairro(this.bairrosData[a]);
          const totalB = this.totalPorBairro(this.bairrosData[b]);
          return totalB - totalA;
        });

        const sortedData: BairroData = {};
        bairros.forEach(bairro => {
          sortedData[bairro] = this.bairrosData[bairro];
        });

        return sortedData;
      },
    },

    methods: {
      async fetchLixos() {
        try {
          const { data } = await axios.get('/lixos')
          this.lixos = data
        } catch (error) {
          console.warn(error)
        }
      },

      totalPorBairro(bairroData: { [tipo: string]: number }) {
        return Object.values(bairroData).reduce((total, valor) => total + valor, 0);
      },
    }
  })
  </script>

  <style scoped>
  .dashboard {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;
  }

  .dashboard_title {
    color: #086A35;
  }

  .table {
    border-collapse: collapse;
    margin-top: 15px;
    box-shadow: 0 0.5rem 2rem rgba(128, 128, 128, 0.639);

    background-color: white;

    max-height: 70vh;
    overflow-y: scroll;
    transition: max-height 0.5s ease;
  }

  .table::-webkit-scrollbar {
    display: none;
  }

  .table th,
  .table td {
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
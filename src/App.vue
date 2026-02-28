<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Highcharts from 'highcharts'
import GoodBadBillionaireCoverImg from './components/GoodBadBillionaireCoverImg.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useBillionaireStore } from './stores/billionaireStore'

const billionaireStore = useBillionaireStore()
const billionaires = billionaireStore.getBillionaires()

const chartContainer = ref<HTMLElement>()
const chartOptions: Highcharts.Options = {
  chart: {
    type: 'bar',
    backgroundColor: '#f3ecdd',
  },
  title: {
    text: '',
  },
  series: [{
    name: 'Net Worth (B$)',
    type: 'bar',
    data: [100, 200, 300, 400, 500],
  }],
  xAxis: {
    categories: [],
  },
  credits: {
    enabled: false,
  },
}

const chartInstance = ref<Highcharts.Chart>()

onMounted(async () => {
  Highcharts.setOptions({

  })

  await nextTick()

  if (chartContainer.value) {
    chartInstance.value = Highcharts.chart(chartOptions)
  }
})
</script>

<template>
  <div>
    <header style="display: flex; justify-content: center;">
      <!-- <GoodBadBillionaireCoverImg /> -->
    </header>

    <main>
      <div class="content">
        <h1 class="text-3xl text-9xl text-center">GOOD BAD BILLIONAIRE</h1>

        <div>
          <DataTable :value="billionaires" tableStyle="min-width: 50rem" class="">
            <Column header="" class="justify-center">
              <template #body="slotProps">
                <img :src="slotProps.data.profilePic" class="w-12 h-12 rounded-full object-cover" />
              </template>
            </Column>
            <Column field="name" header="Name"></Column>
            <Column field="gbb.timeOfRecording.netWorth" header="Net Worth (B$)"></Column>
            <Column field="industry" header="Industry"></Column>
          </DataTable>
        </div>

        <div ref="chartContainer" style="width: 100%; height: 400px; margin-top: 20px"></div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.content {
  margin: 20px;
  padding: 5%;
  border: 3px solid #320a2d;
  background-color: #f3ecdd;
}
</style>

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

// Map FinalVerdict to x-axis positions
const verdictToX = {
  GOOD: 0,
  BILLIONAIRE: 1,
  BAD: 2,
}
const verdictLabels = ['GOOD', 'BILLIONAIRE', 'BAD']

// For each billionaire, use Simon's verdict for plotting (or first available)
const scatterData = billionaires.map((b) => {
  // Try to get Simon's verdict, fallback to first judge
  const judges = Object.keys(b.gbb.verdict)
  const simonVerdict = b.gbb.verdict['Simon Jack'] || b.gbb.verdict[judges[0]]
  return {
    x: verdictToX[simonVerdict.good_bad_billionaire],
    y: b.gbb.timeOfRecording.netWorth,
    name: b.name,
    profilePic: b.profilePic,
    verdict: simonVerdict.good_bad_billionaire,
  }
})

const scatterOptions: Highcharts.Options = {
  chart: {
    type: 'scatter',
    backgroundColor: '#f3ecdd',
  },
  title: {
    text: 'Billionaires: Verdict vs Net Worth',
  },
  xAxis: {
    categories: verdictLabels,
    title: { text: 'Final Verdict' },
    tickInterval: 1,
    min: 0,
    max: 2,
    labels: {
      formatter: function () {
        return verdictLabels[this.value as number] || ''
      },
    },
  },
  yAxis: {
    title: { text: 'Net Worth (B$)' },
    min: 0,
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      // @ts-ignore
      return `<b>${this.point.name}</b><br/>Verdict: ${verdictLabels[this.point.x]}<br/>Net Worth: ${this.point.y} B$<br/><img src='${this.point.profilePic}' style='width:40px;height:40px;border-radius:50%;object-fit:cover;' />`
    },
  },
  series: [
    {
      name: 'Billionaires',
      type: 'scatter',
      data: scatterData,
      marker: {
        symbol: 'circle',
        radius: 8,
      },
      showInLegend: false,
    },
  ],
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
}

const chartInstance = ref<Highcharts.Chart>()

onMounted(async () => {
  Highcharts.setOptions({})
  await nextTick()
  if (chartContainer.value) {
    chartInstance.value = Highcharts.chart(chartContainer.value, scatterOptions)
  }
})
</script>

<template>
  <div>
    <header style="display: flex; justify-content: center">
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

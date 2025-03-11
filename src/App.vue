<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Highcharts from 'highcharts';
import GoodBadBillionaireCoverImg from './components/GoodBadBillionaireCoverImg.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useBillionaireStore } from './stores/billionaireStore';

const billionaireStore = useBillionaireStore();
const billionaires = billionaireStore.getBillionaires();

const chartContainer = ref<HTMLElement | null>(null);
const chartOptions = {
  chart: {
    type: 'column',
  },
  title: {
    text: 'Sample Chart',
  },
  series: [],
};

const chartInstance = ref<Highcharts.Chart | null>(null);

onMounted(async () => {
  Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ',',
    },
  });

  await nextTick();

  if (chartContainer.value) {
    chartInstance.value = Highcharts.chart(chartContainer.value, chartOptions);
  }
});
</script>

<template>
  <div>
    <header>
      <GoodBadBillionaireCoverImg />
    </header>

    <main>
      <div class="content">
        <h1 class="text-3xl text-9xl text-center">GOOD BAD BILLIONAIRE</h1>

        <div>
          <DataTable
            :value="billionaires"
            tableStyle="min-width: 50rem"
          >
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="gbb.timeOfRecording.netWorth" header="Net Worth (B$)"></Column>
            <Column field="industry" header="Industry"></Column>
          </DataTable>
        </div>


        <div ref="chartContainer" style="width: 80%; height: 400px; margin-top: 20px;"></div>
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

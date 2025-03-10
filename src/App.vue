<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Highcharts from 'highcharts';
import GoodBadBillionaireCoverImg from './components/GoodBadBillionaireCoverImg.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useBillionaireStore } from './stores/billionaireStore';

const billionaireStore = useBillionaireStore();
const billionaires = billionaireStore.getBillionaires();

const chartContainer = ref(null);
const chartInstance = ref<Highcharts.Chart | null>(null);

onMounted(async () => {
  Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ',',
    },
  });

  await nextTick(); // Ensure DOM is ready before mounting Highcharts

  chartInstance.value = Highcharts.chart(chartContainer.value as HTMLElement, {
    chart: { type: 'bar' },
    title: { text: 'Billionaire Net Worth (in Billion $)' },
    xAxis: { categories: billionaires.map(b => b.name) },
    yAxis: { title: { text: 'Net Worth (Billion $)' } },
    series: [
      {
        name: 'Net Worth',
        data: billionaires.map(b => b.gbb.timeOfRecording.netWorth),
      },
    ],
  });
});
</script>

<template>
  <div>
    <header>
      <GoodBadBillionaireCoverImg />
    </header>

    <main>
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

      <div ref="chartContainer" style="width: 100%; height: 400px; margin-top: 20px;"></div>
    </main>
  </div>
</template>

<style scoped></style>

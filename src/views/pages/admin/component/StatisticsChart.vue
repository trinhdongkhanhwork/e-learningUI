<template>
  <div class="">
    <div class="icon-form mb-0">
      <input
          type="text"
          class="form-control bookingrange"
          placeholder="01 Jan 2024 - 01 Feb 2024"
          ref="dateRangeInput"
      />
      <span class="form-icon"
      ><i class="bx bx-calendar-edit"></i
      ></span>
    </div>

    <div v-if="validationError" class="error-message">{{ validationError }}</div>

    <canvas ref="chartCanvas"></canvas>
  </div>

</template>

<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import DateRangePicker from "daterangepicker";
import { Chart, registerables } from 'chart.js'
import baseApi from "@/axios";
Chart.register(...registerables)

export default {
  name: 'StatisticsChart',
  data() {
    return {
      startDate: null,
      endDate: null,
      validationError: null,
      chartInstance: null,
      selectedFilter: 'month',
      chartData: {
        month: {
          labels: [],
          soldCourses: [],
          buyers: [],
          revenue: []
        }
      },
      dateRangeInput: null
    }
  },

  mounted() {
    this.dateRangeInput = this.$refs.dateRangeInput;

    if (this.dateRangeInput) {
      new DateRangePicker(this.dateRangeInput, {
        autoUpdateInput: false
      }, (start, end) => {
        this.booking_range(start, end);
      });
    }

    this.fetchData();
  },

  methods:{
    booking_range(start, end) {
      if (start.isAfter(end)) {
        this.validationError = "Start date must be before the end date.";
        this.dateRangeInput.value = ""; // Clear the input
        return;
      }

      this.startDate = start.startOf('day').format("YYYY-MM-DDTHH:mm:ss");
      this.endDate = end.endOf('day').format("YYYY-MM-DDTHH:mm:ss");
      this.validationError = null; // Clear any previous error

      // Fetch data after selecting a valid date range
      this.fetchData();

      // Update the input value
      this.dateRangeInput.value = `${start.format("DD MMM YYYY")} - ${end.format("DD MMM YYYY")}`;
    },

    fetchData() {
      console.log('Fetching data with date range:', this.startDate, this.endDate)
       baseApi
        .get('/api/v1/statistics',
            {
              params: {
                startDate: this.startDate,
                endDate: this.endDate
              }
          }
        )
        .then((response) => {
          const data = response.data
          this.chartData.month.labels = data.map(item => item.month)
          this.chartData.month.soldCourses = data.map(item => item.totalCoursesSold)
          this.chartData.month.buyers = data.map(item => item.totalBuyers)
          this.chartData.month.revenue = data.map(item => item.totalRevenue)

          console.log('Chart data:', this.chartData.month)

          this.createChart(this.chartData.month)
        })
        .catch((error) => {
          console.error('Error fetching data:', error.response.data)
        })
    },
    createChart(data) {
      if (this.chartInstance) this.chartInstance.destroy()

      const ctx = this.$refs.chartCanvas.getContext('2d')
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Courses Sold',
              data: data.soldCourses,
              borderColor: 'rgb(8,255,0)',
              backgroundColor: 'rgba(54, 162, 235, 0.3)',
              fill: true,
              tension: 0.4,
              pointRadius: 4
            },
            {
              label: 'Buyers',
              data: data.buyers,
              borderColor: 'rgb(255,0,0)',
              backgroundColor: 'rgba(255, 206, 86, 0.3)',
              fill: true,
              tension: 0.4,
              pointRadius: 4
            },
            {
              label: 'Revenue ($)',
              data: data.revenue,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.3)',
              fill: true,
              tension: 0.4,
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback(value) {
                  return value.toLocaleString() + ' $'
                }
              }
            }
          },
          plugins: {
            tooltip:{
              callbacks:{
                label(context){
                  const label = context.dataset.label || ''
                  const value = context.formattedValue
                  if(label.includes('Revenue')) return `${label}: ${value} $`
                  return `${label}: ${value}`
                }
              }
            }
          }
        }
      })
    },
  },
}
</script>

<style scoped>
select {
  margin: 1rem 0;
  padding: 6px 10px;
  font-size: 16px;
}
</style>

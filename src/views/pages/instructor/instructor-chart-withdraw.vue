<template>
    <layouts></layouts>
    <student-breadcrumb :title="title" :text="text" :text1="text1" />
    <div class="page-content">
      <div class="container">
        <div class="row">
          <instructor-sidebar></instructor-sidebar>
          <div class="col-xl-9 col-lg-9">
            <div class="settings-widget card-details">
              <div class="settings-menu p-0">
                <div class="profile-heading">
                  <h3>Rút Tiền</h3>
                </div>
                <div class="checkout-form">
                  <div class="withdrawel-head">
                    <div class="title-withdrawel">
                      <span class="file-text-icon">
                        <i class="bx bxs-wallet"></i>
                      </span>
                      <div class="info-withdraw">
                        <h6>Số Dư Hiện Tại</h6>
                        <h5>Bạn có <span>{{ totalEarnings }}$</span> sẵn sàng để rút ngay bây giờ</h5>
                      </div>
                    </div>
                  </div>
                  <!-- Bar Chart for Withdrawal Summary -->
                  <div class="chart-container" style="margin-top: 30px;">
                    <h4>Tóm Tắt Tiền Rút</h4>
                    <div class="timeframe-selector">
                      <label for="withdrawalTimeframe">Chọn khoảng thời gian: </label>
                      <select v-model="withdrawalTimeframe" @change="renderCharts">
                        <option value="hour">Theo giờ</option>
                        <option value="day">Theo ngày</option>
                        <option value="month">Theo tháng</option>
                        <option value="year">Theo năm</option>
                      </select>
                    </div>
                    <canvas id="withdrawalChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="settings-widget card-details">
              <div class="settings-menu p-0">
                <div class="profile-heading">
                  <h3>Tóm Tắt Tiền Vào</h3>
                </div>
                <div class="checkout-form">
                  <!-- Line Chart for Income Summary -->
                  <div class="chart-container">
                    <div class="timeframe-selector">
                      <label for="incomeTimeframe">Chọn khoảng thời gian: </label>
                      <select v-model="incomeTimeframe" @change="renderCharts">
                        <option value="hour">Theo giờ</option>
                        <option value="day">Theo ngày</option>
                        <option value="month">Theo tháng</option>
                        <option value="year">Theo năm</option>
                      </select>
                    </div>
                    <canvas id="incomeChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <instructor-withdraw-modal 
        @withdrawal-requested="fetchWithdrawalData"
        @withdrawal-success="fetchEarnings" 
      ></instructor-withdraw-modal>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from "vue";
  import { useStore } from "vuex";
  import Chart from "chart.js/auto"; // Import Chart.js
  import useEarnings from "../../../service/instructor/withdrawService";
  import withdrawlChart from "../../../service/instructor/withdrawal-statistics"; // Import the new service
  import "bootstrap";
  import "bootstrap/dist/css/bootstrap.min.css";
  
  export default {
    setup() {
      const store = useStore();
      const { totalEarnings, fetchEarnings } = useEarnings();
      const { withdrawlSummary, fetchWithdrawlSummary, withdrawlSummaryPayment, fetchWithdrawlSummaryPayment } = withdrawlChart();
  
      // Chart references
      let withdrawalChartInstance = null;
      let incomeChartInstance = null;
  
      // Timeframe selections
      const withdrawalTimeframe = ref("day"); 
      const incomeTimeframe = ref("day"); 
  
      const fetchWithdrawalData = async () => {
        await fetchEarnings();
        await fetchWithdrawlSummary();
        await fetchWithdrawlSummaryPayment();
        renderCharts();
      };
  
      const renderCharts = () => {
        // Destroy existing charts if they exist
        if (withdrawalChartInstance) withdrawalChartInstance.destroy();
        if (incomeChartInstance) incomeChartInstance.destroy();
  
        // Prepare data for Withdrawal Chart (Tiền Rút)
        const withdrawalData = withdrawlSummary.value?.[withdrawalTimeframe.value] || [];
        const withdrawalLabels = withdrawalData.map(item => item.timeFrame);
        const withdrawalAmounts = withdrawalData.map(item => item.totalAmount);

  
        // Bar Chart for Withdrawal Summary (Tiền Rút)
        const withdrawalCtx = document.getElementById("withdrawalChart").getContext("2d");
        withdrawalChartInstance = new Chart(withdrawalCtx, {
          type: "bar",
          data: {
            labels: withdrawalLabels,
            datasets: [
              {
                label: "Số Tiền Rút",
                data: withdrawalAmounts,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Số Tiền Rút ($)",
                },
              },
            },
            plugins: {
              legend: {
                display: true,
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
          },
        });
  
        // Prepare data for Income Chart (Tiền Vào)
        const incomeData = withdrawlSummaryPayment.value?.[incomeTimeframe.value] || [];
        const incomeLabels = incomeData.map(item => item.timeFrame);
        const incomeAmounts = incomeData.map(item => item.totalAmount);
  
        // Line Chart for Income Summary (Tiền Vào)
        const incomeCtx = document.getElementById("incomeChart").getContext("2d");
        incomeChartInstance = new Chart(incomeCtx, {
          type: "line",
          data: {
            labels: incomeLabels,
            datasets: [
              {
                label: "Số Tiền Vào",
                data: incomeAmounts,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Số Tiền Vào ($)",
                },
              },
            },
            plugins: {
              legend: {
                display: true,
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
          },
        });
      };
  
      onMounted(() => {
        fetchWithdrawalData();
      });
  
      return {
        totalEarnings,
        withdrawlSummary,
        withdrawlSummaryPayment,
        fetchWithdrawalData,
        fetchEarnings,
        withdrawalTimeframe,
        incomeTimeframe,
        renderCharts
      };
    },
  };
  </script>
  
  <style>
  .chart-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .timeframe-selector {
    margin-bottom: 15px;
  }
  
  .timeframe-selector label {
    margin-right: 10px;
  }
  
  .timeframe-selector select {
    padding: 5px;
    font-size: 14px;
  }
  
  .badge-soft-warning {
    background-color: #f8d7da;
    color: #721c24;
    border-radius: 10px;
    border: 1px solid #721c24;
  }
  
  .badge-soft-success {
    background-color: #d4edda;
    color: #155724;
    border-radius: 10px;
    border: 1px solid #155724;
  }
  </style>
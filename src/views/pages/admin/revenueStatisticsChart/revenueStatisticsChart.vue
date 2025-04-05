<template>
  <admin-headerborder></admin-headerborder>
  <admin-breadcrumb :title="title" :text="text" :text1="text1"></admin-breadcrumb>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <admin-sidebar></admin-sidebar>
        <div class="col-xl-10 col-lg-10">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Rút Tiền</h4>
              <div class="withdrawel-head">
                <div class="title-withdrawel">
                  <span class="file-text-icon">
                    <i class="bx bxs-wallet"></i>
                  </span>
                  <div class="info-withdraw">
                    <h6>Số Dư Hiện Tại </h6>
                    <h5>Tổng số tiền trong ví: <span style="color: #f16f7c;">{{ formattedBalance }}$</span></h5>
                  </div>
                </div>
              </div>

              <!-- Thống kê tiền vào -->
              <h4 class="card-title mt-4">Thống kê tiền vào</h4>
              <div class="timeframe-selector mb-3">
                <label for="timeframePayment">Chọn thời gian: </label>
                <select v-model="selectedTimeframePayment" @change="updateChartDataPayment(selectedTimeframePayment)" id="timeframePayment" class="form-select w-auto d-inline-block" style="margin-left: 10px;">
                  <option value="hour">Giờ</option>
                  <option value="day">Ngày</option>
                  <option value="month">Tháng</option>
                  <option value="year">Năm</option>
                </select>
              </div>
              <div class="chart-container">
                <Line 
                  v-if="isChartReadyPayment && validChartDataPayment" 
                  :data="chartDataPayment" 
                  :options="chartOptionsPayment"
                ></Line>
                <div v-else>Loading chart... (Debug: {{ debugChartStatusPayment }})</div>
              </div>

              <!-- Thống kê tiền rút -->
              <h4 class="card-title mt-4">Thống kê rút tiền</h4>
              <div class="timeframe-selector mb-3">
                <label for="timeframeWithdraw">Chọn thời gian: </label>
                <select v-model="selectedTimeframe" @change="updateChartData(selectedTimeframe)" id="timeframeWithdraw" class="form-select w-auto d-inline-block" style="margin-left: 10px;">
                  <option value="hour">Giờ</option>
                  <option value="day">Ngày</option>
                  <option value="month">Tháng</option>
                  <option value="year">Năm</option>
                </select>
              </div>
              <div class="chart-container">
                <Line 
                  v-if="isChartReady && validChartData" 
                  :data="chartData" 
                  :options="chartOptions"
                ></Line>
                <div v-else>Loading chart... (Debug: {{ debugChartStatusWithdraw }})</div>
              </div>

              <h4 class="card-title mt-4">Tất Cả Lịch Sử Rút Tiền</h4>
              <div class="role-filter mb-3">
                <label for="roleFilter">Chọn role: </label>
                <select v-model="selectedRole" id="roleFilter" class="form-select w-auto d-inline-block" style="margin-left: 10px;">
                  <option value="all">Tất cả</option>
                  <option value="admin">Admin</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
              <div class="table-responsive custom-table">
                <table class="table table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Phương Thức Rút Tiền</th>
                      <th>Yêu Cầu Vào Ngày</th>
                      <th>Số Tiền</th>
                      <th>Trạng Thái</th>
                      <th style="font-weight: bold;">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="transaction in filteredWithdrawalHistory" :key="transaction.id">
                      <td>
                        <div class="payment-method-data">
                          <span>
                            <img src="@/assets/img/icon/paypal-icon.svg" alt="Img" />
                          </span>
                          <div class="payment-name">
                            {{ transaction.fullname }} <br />
                            {{ transaction.email }}
                          </div>
                        </div>
                      </td>
                      <td>
                        {{ formatDate(transaction.createdAt) }}
                      </td>
                      <td>{{ transaction.amount }}$</td>
                      <td>
                        <span :class="{'badge-soft-warning': transaction.status === 'PENDING', 'badge-soft-success': transaction.status === 'COMPLETED'}">
                          {{ transaction.status }}
                        </span>
                      </td>
                      <td>
                        <span :class="{
                          'badge-soft-danger': transaction.type === 'ADMIN_WITHDRAWN',
                          'badge-soft-primary': transaction.type === 'EARNING_WITHDRAWN'
                        }">
                          {{ transaction.type === 'ADMIN_WITHDRAWN' 
                              ? 'Admin' 
                              : transaction.type === 'EARNING_WITHDRAWN' 
                                ? 'Instructor' 
                                : transaction.type }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <instructor-withdraw-modal 
      @withdrawal-requested="fetchWithdrawAllHistory"
      @withdrawal-success="fectAllEarningAdmin" 
    ></instructor-withdraw-modal>
  </div>
</template>

<script>
import { onMounted, ref, watch, computed, reactive } from "vue";
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale 
} from 'chart.js';
import { Line } from 'vue-chartjs';
import useEarnings from "../../../../service/instructor/withdrawService";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeaderborder from "@/views/layouts/admin-headerborder.vue";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default {
  name: 'WithdrawalDashboard',
  components: {
    AdminHeaderborder,
    AdminBreadcrumb,
    AdminSidebar,
    Line 
  },
  setup() {
    const { 
      walletAdmin, 
      withdrawAllHistory, 
      fectAllEarningAdmin, 
      fetchWithdrawAllHistory, 
      fetchTransactionSummary, 
      transactionSummary,
      fetchTransactionSummaryPayment,
      transactionSummaryPayment
    } = useEarnings();

    const formattedBalance = computed(() => {
      const balance = Number(walletAdmin.value.balance);
      if (isNaN(balance)) return '0';
      return balance.toLocaleString('en-US', { maximumFractionDigits: 0 });
    });

    const chartData = reactive({
      labels: [],
      datasets: []
    });

    const chartDataPayment = reactive({
      labels: [],
      datasets: []
    });

    const chartOptions = ref({});
    const chartOptionsPayment = ref({});
    const debugChartStatusWithdraw = ref('Không có dữ liệu'); // Debug cho rút tiền
    const debugChartStatusPayment = ref('Không có dữ liệu');
    const isChartReady = ref(false);
    const isChartReadyPayment = ref(false);
    const selectedTimeframe = ref('day'); 
    const selectedTimeframePayment = ref('month'); // Giá trị mặc định là 'month'
    const selectedRole = ref('all');

    const timeframeColors = {
      hour: { borderColor: '#007aff', backgroundColor: 'rgba(0, 122, 255, 0.2)' },
      day: { borderColor: '#00cc00', backgroundColor: 'rgba(0, 204, 0, 0.2)' },
      month: { borderColor: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.2)' },
      year: { borderColor: '#ffaa00', backgroundColor: 'rgba(255, 170, 0, 0.2)' }
    };

    const title = ref('Thống Kê Doanh Thu');
    const text = ref('Trang Chủ');
    const text1 = ref('Rút Tiền');

    const validChartData = computed(() => {
      return chartData.labels?.length > 0 && chartData.datasets?.length > 0;
    });

    const validChartDataPayment = computed(() => {
      return chartDataPayment.labels?.length > 0 && chartDataPayment.datasets?.length > 0;
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN");
    };

    const filteredWithdrawalHistory = computed(() => {
      let filtered = withdrawAllHistory.value.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (selectedRole.value === 'admin') {
        filtered = filtered.filter(t => t.type === 'ADMIN_WITHDRAWN');
      } else if (selectedRole.value === 'instructor') {
        filtered = filtered.filter(t => t.type === 'EARNING_WITHDRAWN');
      }
      return filtered;
    });

    const createChartData = (summaryData, chartTarget, optionsTarget, isReadyTarget, debugTarget, labelText, timeFrame) => {
      if (!summaryData || !Array.isArray(summaryData) || summaryData.length === 0) {
        debugTarget.value = 'Dữ liệu không hợp lệ hoặc rỗng';
        Object.assign(chartTarget, { labels: [], datasets: [] });
        isReadyTarget.value = false;
        return;
      }

      const labels = summaryData.map(item => item.timeFrame);
      const data = summaryData.map(item => item.totalAmount);
      const currentColors = timeframeColors[timeFrame] || timeframeColors.day;

      Object.assign(chartTarget, {
        labels,
        datasets: [{
          label: labelText,
          data,
          borderColor: currentColors.borderColor,
          backgroundColor: currentColors.backgroundColor,
          borderWidth: 2,
          fill: true,
          tension: 0.1
        }]
      });

      optionsTarget.value = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Số tiền ($)' } },
          x: { title: { display: true, text: `Thời gian (${timeFrame})` } }
        }
      };

      setTimeout(() => {
        isReadyTarget.value = true;
      }, 100);
    };

    const updateChartData = async (timeFrame) => {
      console.log('Calling updateChartData with timeFrame:', timeFrame);
      debugChartStatusWithdraw.value = `Đang tải dữ liệu cho ${timeFrame}...`;
      isChartReady.value = false;
      try {
        await fetchTransactionSummary(timeFrame);
        console.log('fetchTransactionSummary response:', transactionSummary.value);
        if (transactionSummary.value?.length > 0) {
          createChartData(
            transactionSummary.value,
            chartData,
            chartOptions,
            isChartReady,
            debugChartStatusWithdraw,
            'Số Tiền Rút',
            timeFrame
          );
          debugChartStatusWithdraw.value = `Đã tải dữ liệu cho ${timeFrame}`;
        } else {
          debugChartStatusWithdraw.value = `Không có dữ liệu cho ${timeFrame}`;
          Object.assign(chartData, { labels: [], datasets: [] });
          isChartReady.value = false;
        }
      } catch (error) {
        debugChartStatusWithdraw.value = `Lỗi khi tải dữ liệu: ${error.message}`;
        Object.assign(chartData, { labels: [], datasets: [] });
        isChartReady.value = false;
      }
    };

    const updateChartDataPayment = async (timeFrame) => {
      console.log('Calling updateChartDataPayment with timeFrame:', timeFrame);
      debugChartStatusPayment.value = `Đang tải dữ liệu cho ${timeFrame}...`;
      isChartReadyPayment.value = false;
      try {
        await fetchTransactionSummaryPayment(timeFrame);
        console.log('fetchTransactionSummaryPayment response:', transactionSummaryPayment.value);
        if (transactionSummaryPayment.value?.length > 0) {
          createChartData(
            transactionSummaryPayment.value,
            chartDataPayment,
            chartOptionsPayment,
            isChartReadyPayment,
            debugChartStatusPayment,
            'Số Tiền Vào',
            timeFrame
          );
          debugChartStatusPayment.value = `Đã tải dữ liệu cho ${timeFrame}`;
        } else {
          debugChartStatusPayment.value = `Không có dữ liệu cho ${timeFrame}`;
          Object.assign(chartDataPayment, { labels: [], datasets: [] });
          isChartReadyPayment.value = false;
        }
      } catch (error) {
        debugChartStatusPayment.value = `Lỗi khi tải dữ liệu: ${error.message}`;
        Object.assign(chartDataPayment, { labels: [], datasets: [] });
        isChartReadyPayment.value = false;
      }
    };

    onMounted(async () => {
      console.log('Component mounted, calling initial data fetch...');
      try {
        await Promise.all([
          fectAllEarningAdmin(),
          fetchWithdrawAllHistory(),
          updateChartData(selectedTimeframe.value),
          updateChartDataPayment(selectedTimeframePayment.value),
        ]);
        console.log('Initial data fetch completed');
      } catch (error) {
        console.error('Error during mount:', error);
        debugChartStatusWithdraw.value = 'Lỗi khi mount: ' + error.message;
        debugChartStatusPayment.value = 'Lỗi khi mount: ' + error.message;
      }
    });

    watch(selectedTimeframe, (newTimeframe) => {
      console.log('selectedTimeframe changed to:', newTimeframe);
      updateChartData(newTimeframe);
    });

    watch(selectedTimeframePayment, (newTimeframe) => {
      console.log('selectedTimeframePayment changed to:', newTimeframe);
      updateChartDataPayment(newTimeframe);
    });

    return {
      walletAdmin,
      withdrawAllHistory,
      fetchWithdrawAllHistory,
      fectAllEarningAdmin,
      chartData,
      chartDataPayment,
      chartOptions,
      chartOptionsPayment,
      transactionSummary,
      transactionSummaryPayment,
      updateChartData,
      updateChartDataPayment,
      debugChartStatusWithdraw,
      debugChartStatusPayment,
      isChartReady,
      isChartReadyPayment,
      validChartData,
      validChartDataPayment,
      title,
      text,
      text1,
      selectedTimeframe,
      selectedTimeframePayment,
      selectedRole,
      formattedBalance,
      formatDate,
      filteredWithdrawalHistory,
      timeframeColors
    };
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  margin-top: 20px;
}
.timeframe-selector {
  margin-bottom: 20px;
}
.role-filter {
  margin-bottom: 20px;
}

.badge-soft-warning {
  background-color: #f8d7da;
  color: #721c24; 
  border-radius: 10px;
  padding: 4px 8px;
}

.badge-soft-success {
  background-color: #d4edda; 
  color: #155724;
  border-radius: 10px;
  padding: 4px 8px;
}

.badge-soft-danger {
  background-color: #f8f6f7;
  color: #f16f7c;
  border-radius: 10px;
  padding: 4px 8px;
}

.badge-soft-primary {
  background-color: #f8f9fa;
  color: #004085;
  border-radius: 10px;
  padding: 4px 8px;
}
</style>
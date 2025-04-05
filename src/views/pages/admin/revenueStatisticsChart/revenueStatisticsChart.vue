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

              <h4 class="card-title mt-4">Thống kê</h4>
              <div class="timeframe-selector mb-3">
                <label for="timeframe">Chọn thời gian: </label>
                <select v-model="selectedTimeframe" @change="updateChartData(selectedTimeframe)" id="timeframe" class="form-select w-auto d-inline-block" style="margin-left: 10px;">
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
                <div v-else>Loading chart... (Debug: {{ debugChartStatus }})</div>
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
      transactionSummary 
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
    const chartOptions = ref({});
    const debugChartStatus = ref('Không có dữ liệu');
    const isChartReady = ref(false);
    const selectedTimeframe = ref('day'); 
    const selectedRole = ref('all');

    // Định nghĩa màu sắc cho từng timeframe
    const timeframeColors = {
      hour: {
        borderColor: '#007aff',    // Xanh dương
        backgroundColor: 'rgba(0, 122, 255, 0.2)'
      },
      day: {
        borderColor: '#00cc00',    // Xanh lá
        backgroundColor: 'rgba(0, 204, 0, 0.2)'
      },
      month: {
        borderColor: '#ff4444',    // Đỏ
        backgroundColor: 'rgba(255, 68, 68, 0.2)'
      },
      year: {
        borderColor: '#ffaa00',    // Cam
        backgroundColor: 'rgba(255, 170, 0, 0.2)'
      }
    };

    const title = ref('Thống Kê Doanh Thu');
    const text = ref('Trang Chủ');
    const text1 = ref('Rút Tiền');

    const validChartData = computed(() => {
      return (
        chartData.labels &&
        Array.isArray(chartData.labels) &&
        chartData.labels.length > 0 &&
        chartData.datasets &&
        Array.isArray(chartData.datasets) &&
        chartData.datasets.length > 0
      );
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN");
    };

    const filteredWithdrawalHistory = computed(() => {
      let filtered = withdrawAllHistory.value.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      if (selectedRole.value === 'admin') {
        filtered = filtered.filter(transaction => transaction.type === 'ADMIN_WITHDRAWN');
      } else if (selectedRole.value === 'instructor') {
        filtered = filtered.filter(transaction => transaction.type === 'EARNING_WITHDRAWN');
      }
      
      return filtered;
    });

    const createChartData = (summaryData) => {
      if (!summaryData || !Array.isArray(summaryData) || summaryData.length === 0) {
        debugChartStatus.value = 'Dữ liệu không hợp lệ hoặc rỗng';
        Object.assign(chartData, { labels: [], datasets: [] });
        isChartReady.value = false;
        return;
      }

      const labels = summaryData.map(item => item.timeFrame);
      const data = summaryData.map(item => item.totalAmount);
      
      // Lấy màu sắc dựa trên timeframe hiện tại
      const currentColors = timeframeColors[selectedTimeframe.value] || timeframeColors.day;

      Object.assign(chartData, {
        labels: labels,
        datasets: [{
          label: 'Số Tiền Rút',
          data: data,
          borderColor: currentColors.borderColor,
          backgroundColor: currentColors.backgroundColor,
          borderWidth: 2,
          fill: true,
          tension: 0.1
        }]
      });

      chartOptions.value = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Số tiền ($)' } },
          x: { title: { display: true, text: `Thời gian (${selectedTimeframe.value})` } }
        }
      };

      setTimeout(() => {
        isChartReady.value = true;
      }, 100);
    };

    const updateChartData = async (timeFrame) => {
      debugChartStatus.value = `Đang tải dữ liệu cho ${timeFrame}...`;
      isChartReady.value = false;
      try {
        await fetchTransactionSummary(timeFrame);
        if (transactionSummary.value && transactionSummary.value.length > 0) {
          createChartData(transactionSummary.value);
          debugChartStatus.value = `Đã tải dữ liệu cho ${timeFrame}`;
        } else {
          debugChartStatus.value = `Không có dữ liệu cho ${timeFrame}`;
          Object.assign(chartData, { labels: [], datasets: [] });
          isChartReady.value = false;
        }
      } catch (error) {
        debugChartStatus.value = `Lỗi khi tải dữ liệu cho ${timeFrame}: ${error.message}`;
        Object.assign(chartData, { labels: [], datasets: [] });
        isChartReady.value = false;
      }
    };
    
    onMounted(async () => {
      try {
        await Promise.all([
          fectAllEarningAdmin(),
          fetchWithdrawAllHistory(),
          updateChartData(selectedTimeframe.value)
        ]);
      } catch (error) {
        debugChartStatus.value = 'Lỗi khi mount: ' + error.message;
        isChartReady.value = false;
      }
    });

    watch(selectedTimeframe, (newTimeframe) => {
      updateChartData(newTimeframe);
    });

    watch(transactionSummary, (newValue) => {
      if (newValue && newValue.length > 0) {
        createChartData(newValue);
      } else {
        debugChartStatus.value = 'transactionSummary rỗng';
        Object.assign(chartData, { labels: [], datasets: [] });
        isChartReady.value = false;
      }
    });

    return {
      walletAdmin,
      withdrawAllHistory,
      fetchWithdrawAllHistory,
      fectAllEarningAdmin,
      chartData,
      chartOptions,
      transactionSummary,
      updateChartData,
      debugChartStatus,
      isChartReady,
      validChartData,
      title,
      text,
      text1,
      selectedTimeframe,
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
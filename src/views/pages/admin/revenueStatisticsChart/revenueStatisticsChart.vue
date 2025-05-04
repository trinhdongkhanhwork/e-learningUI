<template>
  <layouts-index></layouts-index>
  <student-breadcrumb title="Revenue Statistics" text="Home" text1="Revenue Statistics" />
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
                    <h6>Số Dư Hiện Tại</h6>
                    <h5>Tổng số tiền trong ví: <span style="color: #f16f7c;">{{ formattedBalance }}$</span></h5>
                  </div>
                </div>
                <div class="add-announcement-btn">
                  <a
                      href="#"
                      class="btn btn-primary me-2"
                      @click.prevent="openExportModal('payment')"
                  >Xuất Lịch Sử Tiền Vào</a>
                </div>
              </div>
              <!-- Existing chart and table sections remain unchanged -->
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
              <div class="role-filter mb-3 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <label for="roleFilter" class="me-2">Chọn role: </label>
                  <select v-model="selectedRole" id="roleFilter" class="form-select w-auto d-inline-block" style="margin-left: 10px;">
                    <option value="all">Tất cả</option>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>
                <a href="#" class="btn btn-primary" @click.prevent="openExportModal('withdraw')">
                  Xuất Lịch Sử Rút Tiền
                </a>
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
                    <td>{{ formatDate(transaction.createdAt) }}</td>
                    <td>{{ transaction.amount }}$</td>
                    <td>
                        <span :class="{
                          'badge-soft-warning': transaction.status === 'PENDING',
                          'badge-soft-success': transaction.status === 'COMPLETED'
                        }">
                          {{ transaction.status }}
                        </span>
                    </td>
                    <td>
                        <span :class="{
                          'badge-soft-danger': transaction.type === 'ADMIN_WITHDRAWN',
                          'badge-soft-primary': transaction.type === 'EARNING_WITHDRAWN'
                        }">
                          {{ transaction.type === 'ADMIN_WITHDRAWN' ? 'Admin' : 'Instructor' }}
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

    <!-- Export Modal -->
    <div v-if="showExportModal" class="custom-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ exportType === 'withdraw' ? 'Xuất Lịch Sử Rút Tiền' : 'Xuất Lịch Sử Tiền Vào' }}</h5>
          <button class="close-btn" @click="closeExportModal">×</button>
        </div>
        <div class="modal-body">
          <form id="export-history-form">
            <div class="form-group">
              <label for="startDate">Ngày bắt đầu</label>
              <input
                  type="datetime-local"
                  class="form-control"
                  id="startDate"
                  v-model="exportForm.startDate"
                  required
              />
            </div>
            <div class="form-group">
              <label for="endDate">Ngày kết thúc</label>
              <input
                  type="datetime-local"
                  class="form-control"
                  id="endDate"
                  v-model="exportForm.endDate"
                  required
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeExportModal">Đóng</button>
          <button class="btn btn-primary" @click="exportHistory">Xuất Excel</button>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { onMounted, ref, computed, reactive } from "vue";
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
import AdminHeaderborder from "@/views/layouts/admin-headerborder.vue";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";
import useEarnings from "../../../../service/instructor/withdrawService";
import  {exportAllMoneyHistory, exportWithdrawHistory}  from "../../../../service/exportWithdrawHistory/exportWithdrawHistory";
import { showError, showSuccess } from '@/utils/confirmDialogs.js';
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
    Line,
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

    // Export modal state
    const showExportModal = ref(false);
    const exportForm = reactive({
      startDate: '',
      endDate: '',
    });
    const exportType = ref('withdraw'); // 'withdraw' or 'payment'

    // Chart state (your existing logic)
    const chartData = reactive({ labels: [], datasets: [] });
    const chartDataPayment = reactive({ labels: [], datasets: [] });
    const chartOptions = ref({});
    const chartOptionsPayment = ref({});
    const debugChartStatusWithdraw = ref('Không có dữ liệu');
    const debugChartStatusPayment = ref('Không có dữ liệu');
    const isChartReady = ref(false);
    const isChartReadyPayment = ref(false);
    const selectedTimeframe = ref('day');
    const selectedTimeframePayment = ref('month');
    const selectedRole = ref('all');

    const timeframeColors = {
      hour: { borderColor: '#007aff', backgroundColor: 'rgba(0, 122, 255, 0.2)' },
      day: { borderColor: '#00cc00', backgroundColor: 'rgba(0, 204, 0, 0.2)' },
      month: { borderColor: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.2)' },
      year: { borderColor: '#ffaa00', backgroundColor: 'rgba(255, 170, 0, 0.2)' }
    };

    // Page metadata
    const title = ref('Thống Kê Doanh Thu');
    const text = ref('Trang Chủ');
    const text1 = ref('Rút Tiền');

    // Computed properties
    const formattedBalance = computed(() => {
      const balance = Number(walletAdmin.value.balance);
      return isNaN(balance) ? '0' : balance.toLocaleString('en-US', { maximumFractionDigits: 0 });
    });

    const validChartData = computed(() => {
      return chartData.labels?.length > 0 && chartData.datasets?.length > 0;
    });

    const validChartDataPayment = computed(() => {
      return chartDataPayment.labels?.length > 0 && chartDataPayment.datasets?.length > 0;
    });

    const filteredWithdrawalHistory = computed(() => {
      let filtered = withdrawAllHistory.value.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (selectedRole.value === 'admin') {
        filtered = filtered.filter(t => t.type === 'ADMIN_WITHDRAWN');
      } else if (selectedRole.value === 'instructor') {
        filtered = filtered.filter(t => t.type === 'EARNING_WITHDRAWN');
      }
      return filtered;
    });

    // Utility functions
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN");
    };

    // Modal control
    const openExportModal = (type) => {
      exportType.value = type;
      showExportModal.value = true;
    };

    const closeExportModal = () => {
      showExportModal.value = false;
      exportForm.startDate = '';
      exportForm.endDate = '';
      exportType.value = 'withdraw';
    };

    // Export history function
    const exportHistory = async () => {
      if (!exportForm.startDate || !exportForm.endDate) {
        showError('Vui lòng chọn ngày bắt đầu và kết thúc!');
        return;
      }

      const startDate = new Date(exportForm.startDate);
      const endDate = new Date(exportForm.endDate);

      if (endDate < startDate) {
        showError('Ngày kết thúc không thể sớm hơn ngày bắt đầu!');
        return;
      }

      const payload = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      try {
        let result;
        if (exportType.value === 'withdraw') {
          // Export withdrawal history
          result = await exportWithdrawHistory(payload);
        } else if (exportType.value === 'payment') {
          // Export payment history
          result = await exportAllMoneyHistory(payload);
        }

        if (result.success) {
          showSuccess(`Xuất file Excel ${exportType.value === "withdraw" ? "rút tiền" : "tiền vào"} thành công!`);
          closeExportModal();
        } else {
          showError(result.error || "Có lỗi xảy ra khi xuất file. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error(`Error exporting ${exportType.value} history:`, error);
        showError("Có lỗi xảy ra khi xuất file. Vui lòng thử lại.");
      }
    };

    // Chart data creation (your existing logic)
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
      debugChartStatusWithdraw.value = `Đang tải dữ liệu cho ${timeFrame}...`;
      isChartReady.value = false;
      try {
        await fetchTransactionSummary(timeFrame);
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
      debugChartStatusPayment.value = `Đang tải dữ liệu cho ${timeFrame}...`;
      isChartReadyPayment.value = false;
      try {
        await fetchTransactionSummaryPayment(timeFrame);
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

    // Initial data fetch
    onMounted(async () => {
      try {
        await Promise.all([
          fectAllEarningAdmin(),
          fetchWithdrawAllHistory(),
          updateChartData(selectedTimeframe.value),
          updateChartDataPayment(selectedTimeframePayment.value),
        ]);
      } catch (error) {
        console.error('Error during mount:', error);
        debugChartStatusWithdraw.value = 'Lỗi khi mount: ' + error.message;
        debugChartStatusPayment.value = 'Lỗi khi mount: ' + error.message;
      }
    });

    return {
      walletAdmin,
      withdrawAllHistory,
      fectAllEarningAdmin,
      fetchWithdrawAllHistory,
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
      timeframeColors,
      showExportModal,
      exportForm,
      exportType,
      openExportModal,
      closeExportModal,
      exportHistory,
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
.timeframe-selector, .role-filter {
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

/* Modal styles */
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #e0e0e0;
  text-align: right;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-secondary {
  background: #6c757d;
  color: #fff;
  margin-right: 10px;
}

.btn-primary {
  background: #007bff;
  color: #fff;
}

.btn:hover {
  opacity: 0.9;
}

.add-announcement-btn .btn.me-2 {
  margin-right: 8px;
}
</style>
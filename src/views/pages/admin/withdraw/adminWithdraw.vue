<template>
  <admin-headerborder />
  <admin-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <admin-sidebar />
        <!-- /Sidebar -->
        <div class="col-xl-10 col-lg-10">
          <div class="card">
            <div class="card-body">
              <!-- Balance and actions -->
              <div class="withdrawel-head d-flex justify-content-between align-items-start">
                <div class="title-withdrawel d-flex align-items-center">
                  <span class="file-text-icon me-2">
                    <i class="bx bxs-wallet"></i>
                  </span>
                  <div class="info-withdraw">
                    <h6>Số Dư Hiện Tại</h6>
                    <h5>Bạn có <span>{{ totalEarnings }}$</span> sẵn sàng để rút ngay bây giờ</h5>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <button
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#withdraw-request"
                  >Yêu Cầu Rút Tiền</button>
                  <button
                      class="btn btn-primary"
                      @click.prevent="openExportModal('payment')"
                  >Xuất excel</button>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-4">
                <h4 class="card-title mb-0">Lịch Sử Rút Tiền</h4>
                <button
                    class="btn btn-primary"
                    @click.prevent="openExportModal('withdraw')"
                >Xuất excel</button>
              </div>

              <!-- History table -->
              <div class="table-responsive custom-table mt-3">
                <table class="table table-nowrap mb-0">
                  <thead>
                  <tr>
                    <th>Phương Thức Rút Tiền</th>
                    <th>Yêu Cầu Vào Ngày</th>
                    <th>Số Tiền</th>
                    <th>Trạng Thái</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="transaction in sortedWithdrawalHistory" :key="transaction.id">
                    <td>
                      <div class="payment-method-data d-flex align-items-center">
                        <img
                            src="@/assets/img/icon/paypal-icon.svg"
                            alt="Img"
                            class="me-2"
                        />
                        <div class="payment-name">
                          {{ transaction.fullname }}<br />
                          {{ transaction.email }}
                        </div>
                      </div>
                    </td>
                    <td>{{ formatDate(transaction.createdAt) }}</td>
                    <td>${{ transaction.amount.toFixed(2) }}</td>
                    <td>
                        <span
                            :class="{
                            'badge-soft-warning': transaction.status === 'PENDING',
                            'badge-soft-success': transaction.status === 'COMPLETED'
                          }"
                        >
                          {{ transaction.status }}
                        </span>
                    </td>
                    <td><i class="bx bx-info-circle"></i></td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div class="dash-pagination mt-3">
                <div class="row align-items-center">
                  <div class="col-6">
                    <p>Trang 1 của 2</p>
                  </div>
                  <div class="col-6">
                    <ul class="pagination justify-content-end mb-0">
                      <li class="page-item active"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item">
                        <a class="page-link" href="#"><i class="bx bx-chevron-right"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <instructor-withdraw-modal
        @withdrawal-requested="fetchWithdrawalHistory"
        @withdrawal-success="fetchEarnings"
    />

    <!-- Export modal -->
    <div v-if="showExportModal" class="custom-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ exportType === 'withdraw' ? 'Xuất Lịch Sử Rút Tiền' : 'Xuất Lịch Sử Tiền Vào' }}
          </h5>
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
import { onMounted, computed, reactive, ref } from "vue";
import useEarnings from "../../../../service/instructor/withdrawService";
import {exportWithdrawHistory, exportAllMoneyHistory} from "../../../../service/exportWithdrawHistory/exportWithdrawHistory";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeaderborder from "@/views/layouts/admin-headerborder.vue";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";
import { showError, showSuccess } from '@/utils/confirmDialogs.js';

export default {
  components: { AdminHeaderborder, AdminBreadcrumb, AdminSidebar },
  setup() {
    const { totalEarnings, withdrawalHistory, fetchEarnings, fetchWithdrawalHistory } = useEarnings();

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN");
    };

    const sortedWithdrawalHistory = computed(() => {
      return withdrawalHistory.value.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    });

    // State cho form xuất lịch sử
    const exportForm = reactive({
      startDate: '',
      endDate: '',
    });

    // State cho modal và loại xuất
    const showExportModal = ref(false);
    const exportType = ref('withdraw');

    // Hàm mở/đóng modal với loại xuất
    const openExportModal = (type) => {
      exportType.value = type;
      showExportModal.value = true;
    };

    const closeExportModal = () => {
      showExportModal.value = false;
      exportForm.startDate = '';
      exportForm.endDate = '';
    };

    // Hàm gọi API xuất lịch sử
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
        startDate: startDate.toISOString().slice(0, 19),
        endDate: endDate.toISOString().slice(0, 19),
      };

      let result;
      if (exportType.value === 'withdraw') {
        result = await exportWithdrawHistory(payload);
      } else if (exportType.value === 'payment') {
        result = await exportAllMoneyHistory(payload);
      }

      if (result.success) {
        showSuccess(`Xuất file Excel ${exportType.value === 'withdraw' ? 'rút tiền' : 'tiền vào'} thành công!`);
        closeExportModal();
      } else {
        showError(result.error || "Có lỗi xảy ra khi xuất file. Vui lòng thử lại.");
      }
    };

    onMounted(() => {
      fetchEarnings();
      fetchWithdrawalHistory();
    });

    return {
      totalEarnings,
      sortedWithdrawalHistory,
      formatDate,
      fetchWithdrawalHistory,
      fetchEarnings,
      exportForm,
      showExportModal,
      openExportModal,
      closeExportModal,
      exportHistory,
      exportType,
    };
  }
};
</script>

<style>
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

/* CSS cho modal tùy chỉnh */
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
</style>
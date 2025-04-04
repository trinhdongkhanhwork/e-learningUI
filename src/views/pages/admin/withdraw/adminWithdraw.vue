<template>
    <admin-headerborder></admin-headerborder>
    <admin-breadcrumb :title="title" :text="text" :text1="text1"></admin-breadcrumb>
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <!-- Sidebar -->
          <admin-sidebar></admin-sidebar>
          <!-- /Sidebar -->
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
                      <h5>Bạn có <span>{{ totalEarnings }}$</span> sẵn sàng để rút ngay bây giờ</h5>
                    </div>
                  </div>
                  <div class="add-announcement-btn">
                    <a
                      href="#"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#withdraw-request"
                    >Yêu Cầu Rút Tiền</a>
                  </div>
                </div>
  
                <h4 class="card-title mt-4">Lịch Sử Rút Tiền</h4>
                <div class="table-responsive custom-table">
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
                        <td>${{ transaction.amount.toFixed(2) }}</td>
                        <td>
                          <span :class="{'badge-soft-warning': transaction.status === 'PENDING', 'badge-soft-success': transaction.status === 'COMPLETED'}">
                            {{ transaction.status }}
                          </span>
                        </td>
                        <td><i class="bx bx-info-circle"></i></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
  
                <div class="dash-pagination">
                  <div class="row align-items-center">
                    <div class="col-6">
                      <p>Trang 1 của 2</p>
                    </div>
                    <div class="col-6">
                      <ul class="pagination">
                        <li class="active">
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#"><i class="bx bx-chevron-right"></i></a>
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
      ></instructor-withdraw-modal>
    </div>
  </template>
  
  <script>
  import { onMounted, computed } from "vue";
  import useEarnings from "../../../../service/instructor/withdrawService";
  import 'bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import AdminHeaderborder from "@/views/layouts/admin-headerborder.vue";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";
  
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
      };
    }
  };
  </script>
  
  <style>
  .badge-soft-warning {
    background-color: #f8d7da;
    color: #721c24; 
    border-radius: 10px;
    border: 1 solid #721c24;
  }
  
  .badge-soft-success {
    background-color: #d4edda; 
    color: #155724;
    border-radius: 10px;
    border: 1 solid #155724;
  }
  </style>
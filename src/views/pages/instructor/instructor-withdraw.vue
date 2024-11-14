<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Instructor Withdrawal -->
        <div class="col-xl-9 col-lg-9">
          <!-- Display current balance -->
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Withdrawal</h3>
              </div>
              <div class="checkout-form">
                <div class="withdrawal-header">
                  <div class="title-withdrawal">
                    <span class="file-text-icon">
                      <i class="bx bxs-wallet"></i>
                    </span>
                    <div class="info-withdraw">
                      <h6>Current Balance</h6>
                      <h5>You have <span>{{ formatCurrency(currentBalance) }}</span> available for withdrawal</h5>
                    </div>
                  </div>
                  <div class="add-announcement-btn">
                    <button class="btn btn-primary" @click="showWithdrawalModal">Request Withdrawal</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Display withdrawal history -->
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Withdrawal History</h3>
              </div>
              <div class="checkout-form">
                <div class="table-responsive custom-table">
                  <table class="table table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th>Withdrawal Method</th>
                        <th>Request Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="withdrawal in withdrawals.slice(0, 10)" :key="withdrawal.id">
                        <td>
                          <div class="payment-method-data">
                            <span>
                              <img src="@/assets/img/icon/paypal-icon.svg" alt="Paypal Icon" />
                            </span>
                            <div class="payment-name">
                              Paypal <br />
                              {{ withdrawal.email }}
                            </div>
                          </div>
                        </td>
                        <td>
                          {{ formatDate(withdrawal.requestDate) }} <br />
                          {{ formatTime(withdrawal.requestDate) }}
                        </td>
                        <td>{{ formatCurrency(withdrawal.price) }}</td>
                        <td>
                          <span :class="['badge', getStatusClass(withdrawal.status)]">{{ withdrawal.status }}</span>
                        </td>
                        <td><i class="bx bx-info-circle"></i></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Request Withdrawal Modal -->
  <div class="modal fade" id="withdraw-request" ref="withdrawModal" tabindex="-1" aria-labelledby="withdrawRequestLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered withdraw-modal">
      <div class="modal-content">
        <div class="modal-header border-0 custom-modal-header">
          <h4 class="modal-title" id="withdrawRequestLabel">Withdrawal Request</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body custom-modal-body">
          <form @submit.prevent="submitWithdrawal"> <!-- Sửa thành @submit.prevent -->
            <div class="withdraw-request-info">
              <div class="settings-inner-blk add-course-info p-0">
                <p>Please check your transaction notification on your connected withdrawal method</p>
                <div class="row">
                  <div class="col-md-6">
                    <div class="info-request">
                      <span>Withdrawal Balance</span>
                      <h6>{{ formatCurrency(currentBalance) }}</h6> <!-- Dùng currentBalance -->
                    </div>
                  </div>
                  <!-- ... (Nội dung khác của modal) ... -->
                  <div class="col-md-12">
                    <div class="input-block">
                      <label class="form-label">Amount</label>
                      <input type="number" class="form-control" v-model="withdrawAmount" placeholder="$" required
                        :max="maxWithdrawAmount" />
                      <!-- Thêm v-model -->
                    </div>
                  </div>
                  <div class="col-md-12">
      <p>Maximum amount you can withdraw: {{ formatCurrency(currentBalance) }}</p>
      <p class="text-muted">Minimum withdrawal amount is $1.</p>
    </div>
    
                  <!-- ... -->
                </div>
              </div>
            </div>
            <div class="modal-footer-btn">
              <button type="submit" class="btn btn-primary">Submit Request</button>
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  <!-- OTP Confirmation Modal (Bootstrap Modal) -->
  <div class="modal fade" id="otp-modal" ref="otpModal" tabindex="-1" aria-labelledby="otpModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="otpModalLabel">OTP Confirmation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="confirmWithdrawal">
            <div class="mb-3">
              <label for="otp" class="form-label">Enter OTP</label>
              <input type="text" id="otp" v-model="otp" class="form-control" required />
            </div>
            <div v-if="countdown > 0" class="countdown-timer">
              Time remaining: {{ formatCountdown(countdown) }}
            </div>
            <button type="submit" class="btn btn-primary">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Full-Screen Notification -->
  <div v-if="notification" class="alert alert-primary alert-dismissible fade show full-screen-alert" role="alert"
    @click.stop>
    {{ notification }}
    <button type="button" class="btn-close" @click="dismissNotification" aria-label="Close"></button>
  </div>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';
export default {
  data() {
    return {
      title: "Withdrawal",
      text: "Home",
      text1: "Withdrawal",
      userId: `a0352f96-5c51-46c5-b311-c9f03de46ba2`,
      currentBalance: 0,
      withdrawals: [],
      withdrawAmount: 0,
      otp: '',
      notification: null,
      isModalVisible: false,
      isOtpModalVisible: false,
      withdrawId: null,
      countdown: 0,
      countdownInterval: null,
    };
  },
  created() {
    this.fetchWithdrawalHistory();
    this.fetchCurrentBalance();
  },
  mounted() {
    this.withdrawModal = new Modal(this.$refs.withdrawModal);
    this.otpModal = new Modal(this.$refs.otpModal); // Khởi tạo otpModal
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  computed: {
    maxWithdrawAmount() {
      return this.currentBalance;
    },
  },
  methods: {
    fetchWithdrawalHistory() {
      axios.get(`http://localhost:8080/api/withdraw/history/${this.userId}`)
        .then(response => {
          this.withdrawals = response.data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate)).slice(0, 10);
        })
        .catch(error => {
          console.error('Error fetching withdrawal history:', error);
          this.notification = 'Error fetching withdrawal history: ' + error.message;
        });
    },
    fetchCurrentBalance() {
      axios.get(`http://localhost:8080/api/withdraw/total-payments/${this.userId}`)
        .then(response => {
          this.currentBalance = response.data;
        })
        .catch(error => {
          console.error('Error fetching current balance:', error);
          this.notification = 'Error fetching current balance: ' + error.message;
        });
    },
    dismissNotification() {
      this.notification = null;
    },
    handleClickOutside(event) {
      const alertElement = document.querySelector('.full-screen-alert');
      if (alertElement && !alertElement.contains(event.target)) {
        this.dismissNotification();
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString();
    },
    // Định dạng tiền USD thay vì VND
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    },
    getStatusClass(status) {
      switch (status) {
        case 'CONFIRMED':
          return 'badge-soft-success';
        case 'PENDING':
          return 'badge-soft-warning';
        case 'CANCELLED':
          return 'badge-soft-danger';
        case 'COMPLETED':
          return 'badge-soft-completed';
        default:
          return '';
      }
    },
    submitWithdrawal() {
      if (this.withdrawAmount > this.currentBalance) {
        this.notification = 'Withdrawal amount cannot exceed current balance.';
        return;
      }
      if (this.withdrawAmount < 1) {
        this.notification = 'Withdrawal amount must be greater than 1 USD.';
        return;
      }

      const requestData = {
        userId: this.userId,
        price: this.withdrawAmount,
      };

      axios.post('http://localhost:8080/api/withdraw/request', null, { params: requestData })
        .then(response => {
          if (response.data && response.data.id) {
            this.withdrawId = response.data.id;
            this.fetchWithdrawalHistory(); // Cập nhật lịch sử rút tiền
            this.withdrawModal.hide(); // Ẩn modal rút tiền (withdrawModal)

            this.otpModal.show(); // Hiển thị modal OTP (otpModal)
            this.startCountdown();

            this.notification = 'Redirecting to enter OTP!';
          }
        })
        .catch(error => {
          console.error('Error sending withdrawal request:', error);
          this.notification = 'Error sending withdrawal request: ' + error.message;
        });
    },
    confirmWithdrawal() {
      axios.post('http://localhost:8080/api/withdraw/confirm', null, {
        params: {
          withdrawId: this.withdrawId,
          otp: this.otp,
        },
      })
        .then(response => {
          this.notification = 'Withdrawal confirmed successfully!';

          this.otpModal.hide();

          this.resetForm();
          this.fetchWithdrawalHistory(); // Cập nhật lịch sử rút tiền
          this.fetchCurrentBalance();    // Cập nhật số dư hiện tại
        })
        .catch(error => {
          console.error('Error confirming withdrawal:', error);
          this.notification = 'Error confirming withdrawal: ' + error.message;
        });
    },
    startCountdown() {
      this.countdown = 120; // 2 minutes countdown
      this.countdownInterval = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown <= 0) {
          clearInterval(this.countdownInterval);
          this.otpModal.hide();
          this.notification = 'OTP has expired. Please request a new withdrawal.';
        }
      }, 1000);
    },
    resetForm() {
      this.withdrawAmount = 0;
      this.otp = '';
      this.withdrawId = null;
      this.countdown = 0;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
    },
    formatCountdown(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    },
    showWithdrawalModal() {
      this.withdrawModal.show();
    },
    hideModal() {
      this.isModalVisible = false;
    },
    hideOtpModal() {
      this.isOtpModalVisible = false;
      this.resetForm();
    },
  },
};
</script>

<style scoped>
/* Retain old styles */
.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

/* Hide the increment/decrement arrows on input type="number" */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.badge-soft-completed {
  background-color: #007bff;
  /* Blue background */
  color: white;
  /* White text */
  padding: 0.5em 0.75em;
  /* Padding */
  border-radius: 0.25em;
  /* Rounded corners */
  font-weight: bold;
  /* Bold text */
}

.countdown-timer {
  margin-top: 10px;
  color: red;
  /* Change the color of the countdown timer */
  font-weight: bold;
}

.full-screen-alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;
  padding: 1rem;
  margin: 0;
}

.no-arrows {
  -moz-appearance: textfield;
}

.no-arrows::-webkit-outer-spin-button,
.no-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.full-screen-alert {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 90%;
  max-width: 400px;
}
</style>

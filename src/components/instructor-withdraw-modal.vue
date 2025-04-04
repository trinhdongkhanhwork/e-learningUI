<template>
  <div class="modal fade" id="withdraw-request">
    <div class="modal-dialog modal-dialog-centered withdraw-modal">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Yêu Cầu Rút Tiền</h4>
              </div>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="feather-x"></i>
              </button>
            </div>
            <div class="modal-body custom-modal-body">
              <!-- Form nhập số tiền -->
              <form v-if="!showOtpForm && !showSuccessMessage" @submit.prevent="handleWithdraw">
                <div class="withdraw-request-info">
                  <div class="settings-inner-blk add-course-info p-0">
                    <p>
                      Vui lòng kiểm tra thông báo giao dịch trên phương thức rút tiền đã kết nối của bạn.
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="info-request">
                          <span>Số Dư Rút Tiền</span>
                          <h6>${{ totalEarnings }}</h6>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="info-request">
                          <span>Phương Thức Đã Chọn</span>
                          <h6>Paypal</h6>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-block">
                          <label class="form-label">Số Tiền</label>
                          <input
                            v-model="amount"
                            type="number"
                            class="form-control"
                            placeholder="$"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <p class="info-text-withdraw">
                          <i class="bx bx-info-circle me-2"></i>Số tiền rút tối thiểu là $1
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer-btn">
                  <button type="submit" class="btn btn-primary">
                    Gửi Yêu Cầu
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    data-bs-dismiss="modal"
                  >
                    Hủy
                  </button>
                </div>
              </form>

              <!-- Form nhập OTP -->
              <form v-if="showOtpForm" @submit.prevent="handleOtpSubmit">
                <div class="input-block">
                  <label class="form-label">Nhập OTP</label>
                  <input
                    v-model="otp"
                    type="text"
                    class="form-control"
                    placeholder="Nhập OTP"
                  />
                </div>
                <div class="input-block">
                  <p>OTP sẽ hết hạn trong: {{ remainingTime }} giây</p>
                </div>
                <div class="modal-footer-btn">
                  <button type="submit" class="btn btn-primary">
                    Xác Thực OTP
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="cancelOtp"
                  >
                    Hủy
                  </button>
                </div>
              </form>

              <!-- Thông báo yêu cầu đã gửi -->
              <p v-if="withdrawResponse" class="alert alert-success mt-2">
                Yêu cầu đã được gửi! Kiểm tra email của bạn để nhận OTP.
              </p>

              <!-- Thông báo rút tiền thành công -->
              <div v-if="showSuccessMessage" class="alert alert-success mt-2">
                <h5>Rút tiền thành công!</h5>
                <p>Số tiền ${{ amount }} đã được rút thành công qua Paypal. Cảm ơn bạn!</p>
              </div>

              <!-- Thông báo lỗi -->
              <p v-if="errorMessage" class="alert alert-danger mt-2">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import useEarnings from '../service/instructor/withdrawService';

export default {
  setup(props, { emit }) { 
    const { totalEarnings, fetchEarnings, requestWithdrawal, confirmWithdrawal, fetchWithdrawalHistory } = useEarnings();
    const amount = ref('');
    const otp = ref('');
    const errorMessage = ref('');
    const withdrawResponse = ref(null);
    const showOtpForm = ref(false);
    const showSuccessMessage = ref(false);
    const remainingTime = ref(120);
    let timer = null;

    onMounted(() => {
      fetchEarnings();
    });

    const handleWithdraw = async () => {
      errorMessage.value = '';

      if (!amount.value || amount.value < 1) {
        errorMessage.value = "Số tiền rút tối thiểu là 1$.";
        return;
      }

      try {
        withdrawResponse.value = await requestWithdrawal(amount.value);
        showOtpForm.value = true;
        startTimer();

        setTimeout(() => {
          withdrawResponse.value = null; 
        }, 3000);

        //phát sự kiện
        emit('withdrawal-success');
        emit('withdrawal-requested');
      } catch (error) {
        errorMessage.value = "Gửi yêu cầu không thành công. Vui lòng thử lại.";
      }
    };

    const handleOtpSubmit = async () => {
      errorMessage.value = '';

      if (!otp.value) {
        errorMessage.value = "Vui lòng nhập OTP.";
        return;
      }

      try {
        const confirmResponse = await confirmWithdrawal(otp.value);

        if (confirmResponse.success) {
          showOtpForm.value = false;
          showSuccessMessage.value = true; 
          clearTimer(); 


          setTimeout(() => {
            showSuccessMessage.value = false;
            fetchWithdrawalHistory();
            fetchEarnings();
            emit('withdrawal-requested'); 
            emit('withdrawal-success');
            amount.value = '';
          }, 10000); 
        } else {
          errorMessage.value = confirmResponse.message;
        }
      } catch (error) {
        errorMessage.value = error.message || "Lỗi xác thực OTP.";
      } finally {
        otp.value = ''; 
      }
    };

    const cancelOtp = () => {
      showOtpForm.value = false;
      otp.value = '';
      clearTimer();
    };

    const startTimer = () => {
      timer = setInterval(() => {
        if (remainingTime.value > 0) {
          remainingTime.value--;
        } else {
          clearTimer();
          errorMessage.value = "OTP đã hết hạn. Vui lòng yêu cầu một cái mới.";
          showOtpForm.value = false;
        }
      }, 1000);
    };

    const clearTimer = () => {
      clearInterval(timer);
      remainingTime.value = 120;
    };

    onBeforeUnmount(() => {
      clearTimer();
    });

    return {
      amount,
      otp,
      totalEarnings,
      withdrawResponse,
      errorMessage,
      handleWithdraw,
      handleOtpSubmit,
      showOtpForm,
      showSuccessMessage,
      cancelOtp,
      remainingTime,
    };
  },
};
</script>
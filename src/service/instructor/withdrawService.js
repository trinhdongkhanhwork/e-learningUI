import { ref } from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';

export default function useEarnings() {
  const store = useStore();
  const user = ref(store.state.userInfo);
  const totalEarnings = ref(0);
  const withdrawalHistory = ref([]);
  const withdrawResponse = ref(null);
  const withdrawId = ref(null);

  //Tổng tiền thực nhận
  const fetchEarnings = async () => {
    if (!user.value?.id) return;

    try {
      const response = await baseApi.get(`/api/transactions/user/${user.value.id}/earnings-summary`);
      totalEarnings.value = response.data.totalEarnings;
    } catch (error) {
      console.error("Lỗi khi lấy earnings:", error);
    }
  };

  //lịch sử rút tiền
  const fetchWithdrawalHistory = async () => {
    if (!user.value?.id) return;

    try {
      const response = await baseApi.get(`/api/withdraw/withdrawal-history/${user.value.id}`);
      withdrawalHistory.value = response.data; 
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử rút tiền:", error);
    }
  };

  //gửi yêu cầu rút tiền
  const requestWithdrawal = async (amount) => {
    //kiểm tra user
    if (!user.value?.id) return;
  
    try {
      const response = await baseApi.post('/api/withdraw', {
        userId: user.value.id,
        amount: amount,
      });
  
      withdrawResponse.value = response.data; 
      withdrawId.value = response.data.withdrawId;
      return response.data; 
    } catch (error) {
      console.error("Lỗi khi yêu cầu rút tiền:", error);
      throw error;
    }
  };

  //xác nhận OTP
  const confirmWithdrawal = async (otp) => {
    if (!user.value?.id) {
      return { success: false, message: "Người dùng không hợp lệ." };
    }
  
    if (!withdrawId.value) {
      return { success: false, message: "Không tìm thấy yêu cầu rút tiền." };
    }
  
    try {
      const response = await baseApi.post('/api/withdraw/confirm', {
        userId: user.value.id,
        otp: otp,
        withdrawId: withdrawId.value,
      });
  
      if (response.data && response.data.status === "COMPLETED") {
        await fetchWithdrawalHistory();
        return { success: true, message: "Xác nhận OTP thành công!" };
      } else {
        return {
          success: false,
          message: response.data.message || "OTP không hợp lệ hoặc đã hết hạn.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại.",
      };
    }
  };
  

  return {
    totalEarnings,
    withdrawalHistory,
    fetchEarnings,
    fetchWithdrawalHistory,
    withdrawResponse,
    requestWithdrawal,
    confirmWithdrawal
  };
}

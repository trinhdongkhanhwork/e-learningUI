import { ref } from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';

export default function useEarnings() {
  const store = useStore();
  const user = ref(store.state.userInfo);
  const walletAdmin = ref({});
  const totalEarnings = ref(0);
  const withdrawalHistory = ref([]);
  const withdrawAllHistory = ref([]);
  const withdrawResponse = ref(null);
  const withdrawId = ref(null);
  const transactionSummary = ref([]);
  const transactionSummaryPayment = ref([]);

  //tiền trong ví admin
  const fectAllEarningAdmin = async () => {
    const userId = user.value.id;
    if (!userId) return;
    try {
      const response = await baseApi.get(`/api/wallet/balance/${userId}`);
      walletAdmin.value = response.data; // Gán toàn bộ object từ response.data
    } catch (error) {
      console.error("Lỗi khi lấy ví admin", error);
    }
  };

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

  //tất cả lịch sử rút tiền
  const fetchWithdrawAllHistory = async () => {
    try{
      const response = await baseApi.get(`/api/transactions/withdrawlTransaction`);
      withdrawAllHistory.value = response.data || [];
    }catch(error){
      console.log("Lỗi khi lấy lịch sử rút tiền admin: ", error);
      withdrawAllHistory.value = [];
    }
  }

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

  //thống kê tiền ra
  const fetchTransactionSummary = async (timeFrame) => {
    try {
      let endpoint;
      switch (timeFrame) {
        case 'hour': endpoint = `/api/transactions/summary/hour`; break;
        case 'day': endpoint = `/api/transactions/summary/day`; break;
        case 'month': endpoint = `/api/transactions/summary/month`; break;
        case 'year': endpoint = `/api/transactions/summary/year`; break;
        default:
          return;
      }
      const response = await baseApi.get(endpoint);
  
      if (response.data && response.data.length > 0) {
        transactionSummary.value = response.data; // Gán trực tiếp dữ liệu từ API
        console.log('Đã cập nhật transactionSummary:', transactionSummary.value);
      } else {
        console.warn('Không có dữ liệu từ API');
      }
    } catch (error) {
      console.error("Lỗi khi lấy tóm tắt giao dịch:", error);
    }
  };

  //thống kê tiền vào
  const fetchTransactionSummaryPayment = async (timeFrame) => {
    try {
      let endpoint;
      switch (timeFrame) {
        case 'hour': endpoint = `/api/transactions/summaryPayment/hour`; break;
        case 'day': endpoint = `/api/transactions/summaryPayment/day`; break;
        case 'month': endpoint = `/api/transactions/summaryPayment/month`; break;
        case 'year': endpoint = `/api/transactions/summaryPayment/year`; break;
        default:
          return;
      }
      const response = await baseApi.get(endpoint);
  
      if (response.data && response.data.length > 0) {
        transactionSummaryPayment.value = response.data; // Gán trực tiếp dữ liệu từ API
        console.log('Đã cập nhật transactionSummaryPayment:', transactionSummaryPayment.value);
      } else {
        console.warn('Không có dữ liệu từ API');
      }
    } catch (error) {
      console.error("Lỗi khi lấy tóm tắt giao dịch:", error);
    }
  };
  

  return {
    totalEarnings,
    withdrawalHistory,
    fetchEarnings,
    fetchWithdrawalHistory,
    withdrawResponse,
    requestWithdrawal,
    confirmWithdrawal, 
    fectAllEarningAdmin,
    fetchTransactionSummary,
    transactionSummary,
    walletAdmin,
    fetchWithdrawAllHistory,
    withdrawAllHistory,
    fetchTransactionSummaryPayment,
    transactionSummaryPayment
  };
}

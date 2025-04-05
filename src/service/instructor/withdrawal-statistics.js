import { ref } from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';

export default function withdrawlChart() {
  const store = useStore();
  const user = ref(store.state.userInfo);
  const withdrawlSummary = ref({});
  const withdrawlSummaryPayment = ref({});



  const fetchWithdrawlSummary = async () => {
    const userId = user.value.id;
    try{
        const enpoint = `/api/transactions/withdrawl-summary/${userId}`;
        const response = await baseApi.get(enpoint);
        if(response.data){
            withdrawlSummary.value = response.data;
            console.log("Đã cập nhật withdrawlSummary", withdrawlSummary.value);
        }else {
            console.warn('Không có dữ liệu rút tiền từ API');
          }
    }catch(error){
        console.error("Lỗi khi lấy tóm tắt rút tiền:", error);
    }
  };

  const fetchWithdrawlSummaryPayment = async () => {
    const userId = user.value.id;
    try{
        const enpoint = `/api/transactions/withdrawl-summary-payment/${userId}`;
        const response = await baseApi.get(enpoint);
        if(response.data){
            withdrawlSummaryPayment.value = response.data;
            console.log("Đã cập nhật withdrawlSummary", withdrawlSummaryPayment.value);
        }else {
            console.warn('Không có dữ liệu rút tiền từ API');
          }
    }catch(error){
        console.error("Lỗi khi lấy tóm tắt rút tiền:", error);
    }
  };
  

  return {
    withdrawlSummary,
    fetchWithdrawlSummary,
    withdrawlSummaryPayment,
    fetchWithdrawlSummaryPayment
  };
}

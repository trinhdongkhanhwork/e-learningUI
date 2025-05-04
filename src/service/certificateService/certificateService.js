import baseApi from '@/axios';
import { ref } from 'vue';
import { useStore } from 'vuex';

export function useCertificates() {
  const store = useStore();
  const user = ref(store.state.userInfo);
  const certificates = ref([]);

  const fetchCertificates = async () => {
    try {
      const token = user.value?.token;
      if (!token) {
        throw new Error('Token không tồn tại.');
      }

      const response = await baseApi.get('/api/certificates', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Dữ liệu chứng chỉ từ API:', response.data);
      certificates.value = response.data; 
    } catch (error) {
      console.error('Lỗi khi lấy danh sách chứng chỉ:', error);
    }
  };

  return {
    certificates,
    fetchCertificates,
  };
}
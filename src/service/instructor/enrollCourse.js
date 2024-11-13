import { ref, computed} from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';

export default function useCourses() {
  const store = useStore();
  const user = ref(store.state.userInfo);
  const courses = ref([]);
  const paidCourses = ref([]);

  const fetchCoursesEnroll = async () => {
    try {
      const response = await baseApi.get("/api/v1/courses");
      if (Array.isArray(response.data.content)) {
        courses.value = response.data.content.map(course => ({
          ...course,
          isPayment: false // Khởi tạo trạng thái thanh toán
        }));    
        // Kiểm tra thanh toán cho từng khóa học
        await Promise.all(courses.value.map(async (course) => {
          await isPayment(course.id);
        }));
      } else {
        console.error("Dữ liệu không phải là mảng:", response.data);
      }
      filterPaidCourses();
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
    }
  };

  const isPayment = async (idCourse) => {
    const userId = user.value.id;
    try {
      const response = await baseApi.get(`/api/payment/isPayment/${idCourse}/${userId}`);
      const isPaid = response.data;
      const course = courses.value.find(course => course.id === idCourse);
      if (course) {
        course.isPayment = isPaid;
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái thanh toán:", error);
    }
  };

  const filterPaidCourses = () => {
    paidCourses.value = courses.value.filter(course => course.isPayment);
  };
  // Tính toán số lượng khóa học đã thanh toán
  const totalCoursesIsPayment = computed(() => {
    return courses.value.filter(course => course.isPayment).length; // Đếm các khóa học đã thanh toán
  });

  return {
    courses,
    totalCoursesIsPayment,
    paidCourses,
    fetchCoursesEnroll,
    user
  };
}

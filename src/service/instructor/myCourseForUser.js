import baseApi from '@/axios';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export function useCourses() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    const courses = ref([]);
  
    const totalCourses = computed(() => {
      return courses.value.length; // Tính tổng số khóa học
    });
  
    const fetchCourses = async () => {
      try {
        const response = await baseApi.get("/api/v1/courses/getCourses");
        console.log("Dữ liệu từ API:", response.data); 
        const userId = user.value.id; 
        if (Array.isArray(response.data.content)) {
          courses.value = response.data.content.filter(course => {
            return course.instructor && course.instructor.id === userId;
          });
        } else {
          console.error("Dữ liệu không phải là mảng:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    };
  
    return {
      courses,
      totalCourses,
      fetchCourses
    };
  }
  

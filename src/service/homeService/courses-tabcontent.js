// courseFunctions.js

import baseApi from '@/axios';
import { useStore } from 'vuex';
import { ref} from "vue";
import { router } from "@/router";

export default function useCourseFunctions() {
  const store = useStore();
  const user = ref(store.state.userInfo);
  const courses = ref([]);
  const wishlist = ref([]);

  async function fetchWishlist() {
    const userId = user.value?.id
    console.log("userId", userId);
    try {
      const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
      wishlist.value = response.data || [];
      updateFavoriteStatus();
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  async function fetchCourses() {
    try {
      const response = await baseApi.get("/api/v1/courses");
      if (Array.isArray(response.data.content)) {
        // Lọc chỉ những khóa học có published = true
        courses.value = response.data.content
          .filter(course => course.published) // Lọc theo điều kiện published
          .map(course => ({
            ...course,
            isFavorite: wishlist.value.some(wish => wish.courseId === course.id),
          }));
        updateFavoriteStatus();
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
    }
  }
  

  function toggleFavorites(course) {
    const userId = user.value?.id;
    if (!userId) {
      console.warn("User chưa đăng nhập. Chuyển hướng đến trang login.");
      router.push("/");
      return;
    }
    const wishlistItem = wishlist.value.find(wish => wish.courseId === course.id);
    if (course.isFavorite && wishlistItem?.id) {
      baseApi.delete(`/api/v1/wishlist/${wishlistItem.id}`)
        .then(() => {
          course.isFavorite = false;
          wishlist.value = wishlist.value.filter(wish => wish.courseId !== course.id);
        })
        .catch(error => console.error("Lỗi khi xóa khỏi danh sách yêu thích:", error));
    } else {
      const wishlistData = { userId, courseId: course.id };
      baseApi.post("/api/v1/wishlist/addWishlist", wishlistData)
        .then(response => {
          course.isFavorite = true;
          wishlist.value.push(response.data);
        })
        .catch(error => console.error("Lỗi khi thêm vào danh sách yêu thích:", error));
    }
  }

  function updateFavoriteStatus() {
    courses.value.forEach(course => {
      course.isFavorite = wishlist.value.some(wish => wish.courseId === course.id);
    });
  }

  async function unWishlist(courseId) {
    try {
      await baseApi.delete(`/api/v1/wishlist/${courseId}`);
      wishlist.value = wishlist.value.filter(course => course.id !== courseId);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  }

  return {
    user,
    courses,
    wishlist,
    fetchWishlist,
    fetchCourses,
    toggleFavorites,
    updateFavoriteStatus,
    unWishlist
  };
}

<template>
  <div class="row">
    <!-- Wishlist Course Grid -->
    <div class="col-xxl-4 col-md-6 d-flex" v-for="wishlistItem in wishlist" :key="wishlistItem.courseId">
      <div class="course-box flex-fill">
        <div class="product">
          <div class="product-img">
            <router-link :to="{ path: '/course/course-details', query: { id: wishlistItem.courseId } }">
              <img v-if="wishlistItem.coverImage" :src="`${wishlistItem.coverImage}`"
                   alt="Img" class="img-fluid" style="width: 300px;height: 270px;"/>
            </router-link>
            <div class="price">
              <h3>{{ wishlistItem.price }}</h3>
            </div>
          </div>
          <div class="product-content">
            <div class="course-group d-flex">
              <div class="course-share d-flex align-items-center justify-content-center">
                <a @click.prevent="toggleFavorites(wishlistItem)">
                  <i :class="wishlistItem.isFavorite ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'"></i>
                </a>
              </div>
            </div>
            <h3 class="title instructor-text">
              <router-link :to="{ path: '/course/course-details', query: { id: wishlistItem.courseId } }">
                {{ wishlistItem.title }}
              </router-link>
            </h3>
            <div class="course-info d-flex align-items-center">
              <div class="rating-img d-flex align-items-center">
                <img src="@/assets/img/icon/icon-01.svg" alt="Img" />
                <p>12+ Lesson</p>
              </div>
              <div class="course-view d-flex align-items-center">
                <img src="@/assets/img/icon/icon-02.svg" alt="Img" />
                <p>70hr 30min</p>
              </div>
            </div>
            <div class="rating mb-0">
              <i class="fas fa-star filled me-1"></i>
              <i class="fas fa-star filled me-1"></i>
              <i class="fas fa-star filled me-1"></i>
              <i class="fas fa-star filled me-1"></i>
              <i class="fas fa-star filled me-1"></i>
              <span class="d-inline-block average-rating"><span>5.0</span> (20)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Wishlist Course Grid -->
  </div>
</template>

<script>
import baseApi from '@/axios';
import { useStore } from 'vuex';
import { ref, onMounted } from "vue";

export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    return {
      wishlist: [],
      user
    };
  },
  mounted() {
    this.fetchWishlist();
  },
  methods: {
    async fetchWishlist() {
      const userId = this.user.id;
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        this.wishlist = response.data.map(item => ({
          ...item,
          isFavorite: true
        }));
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích:", error);
      }
    },

    async toggleFavorites(wishlistItem) {
      const userId = this.user.id;
      if (!userId) {
        console.error("User ID không khả dụng");
        return;
      }

      if (wishlistItem.isFavorite) {
        // Xóa khỏi wishlist
        try {
          await baseApi.delete(`/api/v1/wishlist/${wishlistItem.id}`);
          wishlistItem.isFavorite = false;
          this.wishlist = this.wishlist.filter(item => item.courseId !== wishlistItem.courseId);
        } catch (error) {
          console.error("Lỗi khi xóa khỏi danh sách yêu thích:", error);
        }
      } else {
        // Thêm vào wishlist
        try {
          const wishlistData = { userId, courseId: wishlistItem.courseId };
          const response = await baseApi.post("/api/v1/wishlist/addWishlist", wishlistData);
          wishlistItem.isFavorite = true;
          this.wishlist.push({ ...response.data, isFavorite: true });
        } catch (error) {
          console.error("Lỗi khi thêm vào danh sách yêu thích:", error);
        }
      }
    }
  }
};
</script>

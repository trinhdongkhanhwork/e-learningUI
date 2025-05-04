<template>
  <layouts-index></layouts-index>
  <!-- Course -->
  <section class="course-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <course-filter @filter-changed="handleFilterChange"></course-filter>
          <div class="row">
            <div class="col-lg-12 col-md-12 d-flex" v-for="course in filteredCourses" :key="course.id">
              <div class="course-box course-design list-course d-flex">
                <div class="product">
                  <div class="product-img">
                    <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                      <img v-if="course.coverImage" :src="`${course.coverImage}`" alt="Img" class="img-fluid" />
                    </router-link>
                    <div class="price">
                      <h3>${{course.price}}</h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="head-course-title">
                      <h3 class="title">
                        <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">{{ course.title }}</router-link>
                      </h3>
                      <div class="all-btn all-category d-flex align-items-center">
                      <router-link
                        v-if="!course.isPayment"
                        to="#"
                        class="btn btn-primary"
                        @click.prevent="handleEnroll(course)">
                        BUY NOW
                      </router-link>
                      <router-link
                        v-else
                        :to="{ path: '/course/course-details', query: { id: course.id } }"
                        class="btn btn-primary">
                        VIEW DETAIL
                      </router-link>
                    </div>
                    </div>
                    <div class="course-info border-bottom-0 pb-0 d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="@/assets/img/icon/icon-01.svg" alt="Img" />
                        <p>{{ course.level }}</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="@/assets/img/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="rating">
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star"></i>
                      <span class="d-inline-block average-rating"><span>4.0</span> (15)</span>
                    </div>
                    <div class="course-group d-flex mb-0">
                      <div class="course-group-img d-flex">
                        <router-link to="/instructor/instructor-profile">
                          <img :src="`${course.instructor.avatarUrl}`" alt="Img" class="img-fluid" />
                        </router-link>
                        <div class="course-name">
                          <h4>
                            <router-link to="/instructor/instructor-profile">{{course.instructor.fullname}}</router-link>
                          </h4>
                          <p>{{ course.instructor.roleEntity.roleName}}</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a @click.prevent="toggleFavorites(course)">
                          <i :class="course.isFavorite ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <pagination></pagination> -->
        </div>
        <course-sidebar :onFilterChange="handleFilterChange"></course-sidebar>
      </div>
    </div>
  </section>
  <!-- /Course -->

  <layouts1></layouts1>
</template>

<script>
import baseApi from '@/axios';
import { useStore } from 'vuex';
import { ref, onMounted } from "vue";
import { router } from "@/router";
import { showError, showSuccess } from '@/utils/confirmDialogs';

export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    return {
      courses: [],
      filteredCourses: [],
      wishlist: [],
      user,
      selectedCategories: [],
      selectedInstructors: [],
      selectedPriceRange: { min: 0, max: 0 },
    };
  },
  async mounted() {
    await this.fetchWishlist();
    await this.fetchCourses();
  },
  methods: {
    async fetchWishlist() {
      const userId = this.user?.id;
      if (!userId) return;
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        this.wishlist = response.data || [];
        this.updateFavoriteStatus();
      } catch (error) {
        showError("Lỗi khi lấy danh sách yêu thích!");
      }
    },
    async fetchCourses() {
      try {
        const response = await baseApi.get("/api/v1/courses");
        if (Array.isArray(response.data.content)) {
          this.courses = response.data.content
              .filter(course => course.published)
              .map(course => ({
                ...course,
                isFavorite: this.wishlist.some(wish => wish.courseId === course.id),
                isPayment: false,
              }));

          for (const course of this.courses) {
            await this.isPayments(course.id);
          }

          this.updateFavoriteStatus();
          this.applyFilters();
        } else {
          showError("Dữ liệu khóa học không hợp lệ!");
        }
      } catch (error) {
        showError("Lỗi khi lấy danh sách khóa học!");
      }
    },
    async isPayments(courseId) {
      const userId = this.user?.id;
      if (!userId) return;
      try {
        const response = await baseApi.get(`/api/payment/isPayment/${courseId}/${userId}`);
        const course = this.courses.find(course => course.id === courseId);
        if (course) {
          course.isPayment = response.data;
        }
      } catch (error) {
        showError("Lỗi khi kiểm tra trạng thái thanh toán!");
      }
    },
    async checkCart(courseId) {
      const userId = this.user?.id;
      if (!userId) return false;
      try {
        const response = await baseApi.get(`/api/v1/cart/getAllCart/${userId}`);
        const carts = response.data;
        return carts.some(cart => cart.courseId === courseId);
      } catch (error) {
        showError("Lỗi khi kiểm tra giỏ hàng!");
        return false;
      }
    },
    async addToCart(courseId) {
      const userId = this.user?.id;
      if (!userId) {
        throw new Error("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      }
      const cartRequest = { userId: userId, courseId: courseId, addAt: new Date().toISOString() };
        const response = await baseApi.post('/api/v1/cart/addCart', cartRequest);
        return response.data;

    },
    async handleEnroll(course) {
      const userId = this.user?.id;
      if (!userId) {
        showError("Vui lòng đăng nhập để mua khóa học!");
        router.push("/");
        return;
      }

      if (course.isPayment) {
        router.push({ path: '/course/course-lesson/', query: { id: course.id } });
      } else {
        try {
          const isInCart = await this.checkCart(course.id);
          if (!isInCart) {
            await this.addToCart(course.id);
            showSuccess("Đã thêm khóa học vào giỏ hàng!");
          } else {
            showError("Khóa học đã có trong giỏ hàng!");
          }
          router.push({ path: '/pages/cart', query: { id: course.id } });
        } catch (error) {
          showError("Không thể thêm vào giỏ hàng. Vui lòng thử lại!");
        }
      }
    },
    handleFilterChange({ categories, instructors, priceRange, filters }) {
      this.selectedCategories = categories || [];
      this.selectedInstructors = instructors || [];
      this.selectedPriceRange = priceRange || { min: 0, max: 0 };
      if (filters) {
        this.searchQuery = filters.searchQuery || '';
        this.selectedCategory = filters.selectedCategory || null;
      } else {
        this.searchQuery = '';
        this.selectedCategory = null;
      }
      this.applyFilters();
    },
    applyFilters() {
      const selectedCategories = this.selectedCategories.map(category => category.toString());
      const selectedInstructors = this.selectedInstructors.map(instructor => instructor.toString());

      this.filteredCourses = this.courses.filter(course => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(course.categoryId.toString());
        const instructorMatch = selectedInstructors.length === 0 || selectedInstructors.includes(course.instructor.fullname);
        const priceMatch =
            (this.selectedPriceRange.min === 0 && this.selectedPriceRange.max === 0) ||
            (course.price >= this.selectedPriceRange.min && course.price <= this.selectedPriceRange.max);
        const searchQueryMatch = !this.searchQuery || (course.title && course.title.toLowerCase().includes(this.searchQuery.toLowerCase()));

        return categoryMatch && instructorMatch && priceMatch && searchQueryMatch;
      });
    },
    async toggleFavorites(course) {
      const userId = this.user?.id;
      if (!userId) {
        showError("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
        return;
      }

      const wishlistItem = this.wishlist.find(wish => wish.courseId === course.id);

      if (course.isFavorite) {
        if (wishlistItem && wishlistItem.id) {
          try {
            await baseApi.delete(`/api/v1/wishlist/${wishlistItem.id}`);
            course.isFavorite = false;
            this.wishlist = this.wishlist.filter(wish => wish.courseId !== course.id);
            showSuccess("Đã xóa khóa học khỏi danh sách yêu thích!");
          } catch (error) {
            showError("Lỗi khi xóa khỏi danh sách yêu thích!");
          }
        } else {
          showError("Không tìm thấy mục yêu thích!");
        }
      } else {
        const wishlistData = { userId, courseId: course.id };
        try {
          const response = await baseApi.post("/api/v1/wishlist/addWishlist", wishlistData);
          if (response && response.data) {
            course.isFavorite = true;
            this.wishlist.push(response.data);
            showSuccess("Đã thêm vào danh sách yêu thích!");
          } else {
            showError("Phản hồi không hợp lệ khi thêm vào danh sách yêu thích!");
          }
        } catch (error) {
          showError("Lỗi khi thêm vào danh sách yêu thích!");
        }
      }
    },
    updateFavoriteStatus() {
      this.courses.forEach(course => {
        course.isFavorite = this.wishlist.some(wish => wish.courseId === course.id);
      });
    },
    async addToWishlist(course) {
      const userId = this.user?.id;
      const wishlistData = { userId: userId, courseId: course.id };
      try {
        const response = await baseApi.post('/api/v1/wishlist/addWishlist', wishlistData);
        if (response && response.data) {
          showSuccess("Đã thêm vào danh sách yêu thích!");
        } else {
          showError("Phản hồi không hợp lệ khi thêm vào danh sách yêu thích!");
        }
      } catch (error) {
        showError("Lỗi khi thêm vào danh sách yêu thích!");
      }
    },
    async unWishlist(courseId) {
      try {
        await baseApi.delete(`/api/v1/wishlist/${courseId}`);
        showSuccess("Đã xóa khỏi danh sách yêu thích!");
        this.wishlist = this.wishlist.filter(course => course.id !== courseId);
      } catch (error) {
        showError("Lỗi khi xóa khỏi danh sách yêu thích!");
      }
    },
  },
};
</script>
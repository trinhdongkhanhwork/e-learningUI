<template>
  <page-header></page-header>
  <coursegrid-breadcrumb></coursegrid-breadcrumb>
  <!-- Course -->
  <section class="course-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <course-filter @filter-changed="handleFilterChange"></course-filter>
          <div class="row">
            <div class="col-lg-4 col-md-6 d-flex" v-for="course in filteredCourses" :key="course.id">
              <div class="course-box course-design d-flex">
                <div class="product">
                  <div class="product-img">
                    <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                      <img v-if="course.coverImage" :src="`${course.coverImage}`" alt="Img" class="img-fluid" style="width: 300px; height: 270px;" />
                    </router-link>
                    <div class="price">
                      <h3>{{course.price}}$</h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <router-link to="/instructor/instructor-profile"
                        ><img
                            :src="`${course.instructor.avatarUrl}`"
                            alt=""
                            class="img-fluid"
                        /></router-link>
                        <div class="course-name">
                          <h4>
                            <router-link to="/instructor/instructor-profile"
                            >{{course.instructor.fullname}}</router-link
                            >
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
                    <h3 class="title">
                      <router-link :to="{ path: '/course/course-details', query: { id: course.id } }"
                      >{{course.title }}</router-link
                      >
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="@/assets/img/icon/icon-01.svg" alt="" />
                        <p>{{course.level }}</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="@/assets/img/icon/icon-02.svg" alt="" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="rating">
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star me-1"></i>
                      <span class="d-inline-block average-rating"
                      ><span>4.0</span> (15)</span
                      >
                    </div>
                    <div class="all-btn all-category d-flex align-items-center">
                      <router-link to="/pages/checkout" class="btn btn-primary"
                      >BUY NOW</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <pagination></pagination>
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

export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    console.log(user);
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
    this.fetchWishlist(); // Lấy dữ liệu wishlist trước khi lấy danh sách khóa học
    this.fetchCourses();
  },
  methods: {
    async fetchWishlist() {

      const userId = this.user.id;
      console.log("Fetching wishlist for user ID:", userId);
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        this.wishlist = response.data || [];
        console.log("Wishlist data:", this.wishlist); // Kiểm tra dữ liệu
        this.updateFavoriteStatus();
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    },
    fetchCourses() {
      baseApi
          .get("/api/v1/courses")
          .then((response) => {
            if (Array.isArray(response.data.content)) {
              this.courses = response.data.content.map(course => ({
                ...course,
                isFavorite: this.wishlist.some(wish => wish.id === course.id)
              }));
              this.updateFavoriteStatus();
              this.applyFilters();
            } else {
              console.error("Dữ liệu không phải là mảng:", response.data);
            }
          })
          .catch((error) => {
            console.error("Lỗi khi lấy danh sách khóa học:", error);
          });
    },
    handleFilterChange({ categories, instructors, priceRange,filters}) {
      this.selectedCategories = categories || [];
      this.selectedInstructors = instructors || [];
      this.selectedPriceRange = priceRange || { min: 0, max: 0 };
      // Kiểm tra sự tồn tại của filters trước khi sử dụng
      if (filters) {
        this.searchQuery = filters.searchQuery || '';
        this.selectedCategory = filters.selectedCategory || null;
      } else {
        // Nếu filters không tồn tại, gán giá trị mặc định
        this.searchQuery = '';
        this.selectedCategory = null;
      }
      this.applyFilters();
    },

    applyFilters() {
      const selectedCategories = this.selectedCategories.map(category => category.toString());
      const selectedInstructors = this.selectedInstructors.map(instructor => instructor.toString());

      this.filteredCourses = this.courses.filter(course => {
        // Lọc theo danh mục
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(course.categoryId.toString());
        
        // Lọc theo giảng viên
        const instructorMatch = selectedInstructors.length === 0 || selectedInstructors.includes(course.instructor.fullname);
        
        // Lọc theo khoảng giá
        const priceMatch =
          (this.selectedPriceRange.min === 0 && this.selectedPriceRange.max === 0) ||
          (course.price >= this.selectedPriceRange.min && course.price <= this.selectedPriceRange.max);
        
        // Lọc theo từ khóa tìm kiếm
        const searchQueryMatch = !this.searchQuery || (course.title && course.title.toLowerCase().includes(this.searchQuery.toLowerCase()));

        return categoryMatch && instructorMatch && priceMatch && searchQueryMatch;
      });

      console.log("Filtered Courses:", this.filteredCourses);
    },

    toggleFavorites(course) {
      const userId = this.user.id;
      if (!userId) {
        console.error("User ID is not available");
        return;
      }

      // Tìm `wishlistItem` từ `wishlist` dựa vào `course.id`
      const wishlistItem = this.wishlist.find(wish => wish.courseId === course.id);

      if (course.isFavorite) {
        // Kiểm tra `wishlistItem` tồn tại trước khi xóa
        if (wishlistItem && wishlistItem.id) {
          baseApi
              .delete(`/api/v1/wishlist/${wishlistItem.id}`)
              .then(() => {
                // Cập nhật trạng thái yêu thích và xóa khỏi `wishlist`
                course.isFavorite = false;
                this.wishlist = this.wishlist.filter(wish => wish.courseId !== course.id);
                console.log(`Đã xóa khóa học ${course.id} khỏi wishlist`);
              })
              .catch((error) => {
                console.error("Lỗi khi xóa khỏi danh sách yêu thích:", error);
              });
        } else {
          console.error("Wishlist item không tồn tại hoặc không có ID.");
        }
      } else {
        // Thêm vào wishlist nếu chưa có
        const wishlistData = { userId, courseId: course.id };
        baseApi
            .post("/api/v1/wishlist/addWishlist", wishlistData)
            .then((response) => {
              if (response && response.data) {
                course.isFavorite = true;
                this.wishlist.push(response.data); // Thêm vào `wishlist` mới
                console.log("Đã thêm vào danh sách yêu thích:", response.data);
              } else {
                console.error("Định dạng phản hồi không như mong đợi:", response);
              }
            })
            .catch((error) => {
              console.error("Lỗi khi thêm vào danh sách yêu thích:", error);
            });
      }
    },
    async addToWishlist(course) {
      const userId = this.user.id;
      console.log(userId);
      const wishlistData = {
        userId: userId,
        courseId: course.id
      };

      try {
        const response = await baseApi.post('/api/v1/wishlist/addWishlist', wishlistData);
        if (response && response.data && response.data.code === 9898) {
          console.log("Khóa học đã được thêm vào wishlist:", response.data);
        } else {
          console.error("Định dạng phản hồi không như mong đợi:", response);
        }
      } catch (error) {
        console.error("Lỗi khi thêm vào wishlist:", error);
      }
    },

    updateFavoriteStatus() {
      // Duyệt qua từng khóa học và đánh dấu `isFavorite` nếu có trong `wishlist`
      this.courses.forEach(course => {
        course.isFavorite = this.wishlist.some(wish => wish.courseId === course.id);
      });
    },

    async unWishlist(courseId) {
      try {
        await baseApi.delete(`/api/v1/wishlist/${courseId}`);
        console.log("Khóa học đã bị xóa khỏi wishlist");
        this.wishlist = this.wishlist.filter(course => course.id !== courseId); // Cập nhật danh sách wishlist
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    },
  },
};

</script>

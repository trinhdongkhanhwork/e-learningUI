<template>
  <!-- Favourite Course -->
  <section class="home-three-favourite">
    <div class="container">
      <div class="row">
        <div class="container">
          <div class="home-three-head section-header-title">
            <div class="row align-items-center d-flex justify-content-between">
              <div class="col-lg-8 col-sm-12">
                <h2>Choose favourite Course from top Category</h2>
              </div>
              <div class="col-lg-4 col-sm-12">
                <div class="see-all">
                  <router-link to="/course/course-details">
                    See all<span class="see-all-icon"><i class="fas fa-arrow-right"></i></span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <Carousel
              class="home-three-favourite-carousel"
              :settings="settings"
              :breakpoints="breakpoints"
              ref="favouriteCarousel"
              @slide-change="updateFavouriteSlide"
          >
            <Slide
                v-for="category in categories"
                :key="category.categoryName"
                class="favourite-box"
            >
              <div class="carousel__item favourite-item flex-fill text-start">
                <div class="categories-icon">
                  <img
                      class="img-fluid"
                      :src="`${category.coverImage}`"
                      :alt="category.categoryName"
                  />
                </div>
                <div class="categories-content course-info">
                  <h3>{{ category.categoryName }}</h3>
                </div>
                <div class="course-instructors">
                  <div class="instructors-info">
                    <p class="me-4">Courses</p>
                    <ul class="instructors-list">
                      <li
                          v-for="course in filteredCoursesByCategory(category.id).firstThreeCourses"
                          :key="course.id"
                      >
                        <a
                            href="javascript:;"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            :title="`Instructor: ${course.instructor?.name || 'Unknown'}`"
                        >
                          <img :src="`${course.coverImage}`" alt="Instructor" />
                        </a>
                      </li>
                    </ul>
                    <li
                        class="more-set"
                        v-if="filteredCoursesByCategory(category.id).remainingCoursesCount > 0"
                    >
                      <a href="javascript:;">+{{ filteredCoursesByCategory(category.id).remainingCoursesCount }}</a>
                    </li>
                  </div>
                </div>
              </div>
            </Slide>

            <!-- Tùy chỉnh pagination, chỉ giữ chấm tròn -->
            <template #addons>
              <div class="custom-pagination">
                <!-- Chỉ giữ chấm tròn -->
                <div class="pagination-dots">
                  <span
                      v-for="index in totalFavouriteSlides"
                      :key="index"
                      class="pagination-dot"
                      :class="{ active: currentFavouriteSlide === index - 1 }"
                      @click="goToSlide('favouriteCarousel', index - 1)"
                  ></span>
                </div>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
    </div>
  </section>
  <!-- /Favourite Course -->

  <!-- Courses Section -->
  <section class="home-three-courses">
    <div class="container">
      <div class="favourite-course-sec">
        <div class="row">
          <div class="home-three-head section-header-title" data-aos="fade-up">
            <div class="row align-items-center d-flex justify-content-between">
              <div class="col-lg-6 col-sm-8">
                <h2>Courses</h2>
              </div>
              <div class="col-lg-6 col-sm-4">
                <div class="see-all">
                  <a href="javascript:void(0);">
                    See all<span class="see-all-icon"><i class="fas fa-arrow-right"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Category Carousel -->
          <div v-if="categories && categories.length" class="category-carousel-wrapper">
            <Carousel
                :settings="categorySettings"
                :breakpoints="categoryBreakpoints"
                :wrap-around="true"
                :autoplay="0"
                ref="categoryCarousel"
                @slide-change="updateCategorySlide"
            >
              <Slide v-for="category in categories" :key="category.id">
                <div
                    class="category-box"
                    :class="{ active: activeFilter === category.id }"
                    @click="setActiveFilter(category.id)"
                >
                  <div class="category-icon">
                    <img
                        class="img-fluid"
                        :src="category.coverImage"
                        :alt="category.categoryName"
                    />
                  </div>
                  <div class="category-content">
                    <h4>{{ category.categoryName }}</h4>
                  </div>
                </div>
              </Slide>
            </Carousel>
          </div>

          <!-- Danh sách khóa học -->
          <div class="all-corses-main" data-aos="fade-up">
            <div class="tab-content mt-4">
              <div class="all-course">
                <div class="row">
                  <div class="col-xl-3 col-lg-6 col-md-6 col-12"
                       v-for="course in filteredCourses"
                       :key="course.id">
                    <div class="course-box-three">
                      <div class="course-three-item">
                        <div class="course-three-img">
                          <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                            <img v-if="course.coverImage"
                                 :src="course.coverImage"
                                 alt="Img"
                                 class="img-fluid"
                                 style="width: 300px; height: 270px;" />
                          </router-link>
                          <div class="heart-three">
                            <a @click.prevent="toggleFavorites(course)">
                              <i :class="course.isFavorite ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'"></i>
                            </a>
                          </div>
                        </div>
                        <div class="course-three-content">
                          <div class="course-group-three">
                            <div class="group-three-img">
                              <router-link to="/instructor/instructor-profile">
                                <img :src="course.instructor?.avatarUrl || '@/assets/img/user/user1.jpg'"
                                     alt=""
                                     class="img-fluid" />
                              </router-link>
                            </div>
                          </div>
                          <div class="course-three-text">
                            <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                              <p>{{ course.level || "Unknown" }}</p>
                              <h3 class="title instructor-text">{{ course.title }}</h3>
                            </router-link>
                          </div>
                          <div class="student-counts-info d-flex align-items-center">
                            <div class="students-three-counts d-flex align-items-center">
                              <img src="@/assets/img/icon-three/student.svg" alt="" />
                              <p>{{ course.enrolledUserCount || 0 }} Students</p>
                            </div>
                          </div>
                          <div class="rating mt-2">
                            <i class="fas fa-star filled me-1"
                               v-for="n in Math.floor(course.averageRating || 0)"
                               :key="n"></i>
                            <i class="fas fa-star-half-alt filled me-1"
                               v-if="(course.averageRating || 0) % 1 >= 0.5"></i>
                            <i class="fas fa-star me-1"
                               v-for="n in (5 - Math.ceil(course.averageRating || 0))"
                               :key="n + 'empty'"></i>
                            <span class="d-inline-block average-rating">
                              {{ (course.averageRating || 0).toFixed(1) }} ({{ course.ratingCount || 0 }})
                            </span>
                          </div>
                          <div class="price-three-group d-flex align-items-center justify-content-between">
                            <div class="price-three-view d-flex align-items-center">
                              <div class="course-price-three">
                                <h3>{{ course.price ? `${course.price}$` : "Free" }}</h3>
                              </div>
                            </div>
                            <div class="price-three-time d-inline-flex align-items-center">
                              <i class="fa-regular fa-clock me-2"></i>
                              <span>{{ course.duration || "6hr 30min" }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="filteredCourses.length === 0" class="col-12 text-center">
                    <p>No courses available.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Danh sách khóa học -->
        </div>
      </div>
    </div>
  </section>
  <!-- /Courses Section -->

  <!-- Call to Action -->
  <section class="home-three-transform">
    <div class="container" data-aos="fade-up">
      <div class="row align-items-center">
        <div class="col-lg-9 col-md-8 col-sm-12">
          <div class="cta-content">
            <h2>Transform Access To Education</h2>
            <p>
              Create an account to receive our newsletter, course recommendations and promotions.
            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="transform-button-three">
            <router-link to="/register" class="btn btn-action">Get Started Now</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Call to Action -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Slide } from "vue3-carousel"; // Xóa Pagination khỏi import
import "vue3-carousel/dist/carousel.css";
import baseApi from "@/axios";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  name: "CoursePage",
  components: {
    Carousel,
    Slide,
    // Xóa Pagination khỏi danh sách components vì không sử dụng
  },
  setup() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    const categories = ref([]);
    const courses = ref([]);
    const categoryCourses = ref({});
    const wishlist = ref([]);
    const activeFilter = ref("all");

    // Thêm ref để theo dõi slide hiện tại
    const favouriteCarousel = ref(null);
    const categoryCarousel = ref(null);
    const currentFavouriteSlide = ref(0);
    const currentCategorySlide = ref(0);
    const totalFavouriteSlides = computed(() => categories.value.length || 1);
    const totalCategorySlides = computed(() => categories.value.length || 1);

    // Settings cho carousel Favourite Course
    const settings = {
      itemsToShow: 1,
      snapAlign: "center",
      transition: 500,
    };

    const breakpoints = {
      700: { itemsToShow: 2, snapAlign: "center" },
      1024: { itemsToShow: 5.4, snapAlign: "start" },
    };

    // Settings cho carousel danh mục (Category)
    const categorySettings = {
      itemsToShow: 4,
      snapAlign: "start",
      transition: 500,
    };

    const categoryBreakpoints = {
      576: { itemsToShow: 2, snapAlign: "center" },
      768: { itemsToShow: 3, snapAlign: "center" },
      1024: { itemsToShow: 5, snapAlign: "start" },
    };

    const filteredCourses = computed(() => {
      if (activeFilter.value === "all") {
        return courses.value;
      }
      return categoryCourses.value[activeFilter.value] || [];
    });

    const fetchCategories = async () => {
      try {
        const response = await baseApi.get("/api/category/getCategorys");
        categories.value = response.data || [];
      } catch (error) {
        console.error("Lỗi khi lấy danh sách categories:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await baseApi.get("/api/v1/courses");
        if (Array.isArray(response.data.content)) {
          courses.value = response.data.content;
          await updateFavoriteStatus();
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    };

    const fetchCoursesByCategories = async () => {
      try {
        const categoryPromises = categories.value.map(async (category) => {
          const response = await baseApi.get(`/api/v1/courses/by-category/${category.id}`);
          categoryCourses.value[category.id] = response.data || [];
        });
        await Promise.all(categoryPromises);
        await updateFavoriteStatus();
      } catch (error) {
        console.error("Lỗi khi lấy khóa học theo danh mục:", error);
      }
    };

    const fetchWishlist = async () => {
      const userId = user.value?.id;
      if (!userId) return;
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        wishlist.value = response.data || [];
        await updateFavoriteStatus();
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    const fetchCourseRatings = async () => {
      try {
        const promises = courses.value.map(async (course) => {
          const response = await baseApi.get(`/api/ratings/course/${course.id}/average`);
          course.averageRating = response.data || 0;
          const countResponse = await baseApi.get(`/api/ratings/course/${course.id}`);
          course.ratingCount = countResponse.data.length || 0;
        });

        const categoryPromises = Object.keys(categoryCourses.value).map(async (categoryId) => {
          const categoryCoursesList = categoryCourses.value[categoryId];
          return Promise.all(categoryCoursesList.map(async (course) => {
            const response = await baseApi.get(`/api/ratings/course/${course.id}/average`);
            course.averageRating = response.data || 0;
            const countResponse = await baseApi.get(`/api/ratings/course/${course.id}`);
            course.ratingCount = countResponse.data.length || 0;
          }));
        });
        await Promise.all([...promises, ...categoryPromises]);
      } catch (error) {
        console.error("Error fetching course ratings:", error);
      }
    };

    const updateFavoriteStatus = async () => {
      courses.value.forEach((course) => {
        course.isFavorite = wishlist.value.some((wish) => wish.courseId === course.id);
      });
      Object.keys(categoryCourses.value).forEach((categoryId) => {
        categoryCourses.value[categoryId].forEach((course) => {
          course.isFavorite = wishlist.value.some((wish) => wish.courseId === course.id);
        });
      });
    };

    const isInWishlist = (courseId) => wishlist.value.some((wish) => wish.courseId === courseId);

    const addToWishlist = async (course) => {
      const userId = user.value?.id;
      if (!userId) {
        alert("Please log in to add to wishlist!");
        return;
      }
      if (isInWishlist(course.id)) {
        alert("This course is already in your wishlist!");
        return;
      }
      const wishlistData = { userId: userId, courseId: course.id };
      try {
        const response = await baseApi.post('/api/v1/wishlist/addWishlist', wishlistData);
        if (response && response.data) {
          wishlist.value.push(response.data);
          course.isFavorite = true;
        }
      } catch (error) {
        console.error("Lỗi khi thêm vào wishlist:", error);
        alert("Failed to add to wishlist. Please try again.");
      }
    };

    const unWishlist = async (courseId) => {
      const wishlistItem = wishlist.value.find((wish) => wish.courseId === courseId);
      if (!wishlistItem) {
        console.error("Wishlist item không tồn tại với courseId:", courseId);
        return;
      }
      try {
        const response = await baseApi.delete(`/api/v1/wishlist/${wishlistItem.id}`);
        if (response.status === 200) {
          wishlist.value = wishlist.value.filter((course) => course.id !== wishlistItem.id);
          await updateFavoriteStatus();
        }
      } catch (error) {
        console.error("Lỗi khi xóa khỏi wishlist:", error);
      }
    };

    const toggleFavorites = async (course) => {
      if (course.isFavorite) {
        await unWishlist(course.id);
      } else {
        await addToWishlist(course);
      }
    };

    const filteredCoursesByCategory = (categoryId) => {
      const coursesByCategory = categoryCourses.value[categoryId] || [];
      const firstThreeCourses = coursesByCategory.slice(0, 3);
      const remainingCoursesCount = coursesByCategory.length - 3;
      return { firstThreeCourses, remainingCoursesCount };
    };

    const setActiveFilter = (filter) => {
      activeFilter.value = filter;
    };

    // Hàm để chuyển slide khi click vào chấm
    const goToSlide = (carouselRef, index) => {
      if (carouselRef === 'favouriteCarousel' && favouriteCarousel.value) {
        favouriteCarousel.value.slideTo(index);
      } else if (carouselRef === 'categoryCarousel' && categoryCarousel.value) {
        categoryCarousel.value.slideTo(index);
      }
    };

    // Cập nhật slide hiện tại
    const updateFavouriteSlide = (event) => {
      currentFavouriteSlide.value = event.currentSlide;
    };

    const updateCategorySlide = (event) => {
      currentCategorySlide.value = event.currentSlide;
    };

    onMounted(async () => {
      AOS.init();
      await fetchCategories();
      await fetchCourses();
      await fetchWishlist();
      await fetchCoursesByCategories();
      await fetchCourseRatings();
    });

    return {
      categories,
      courses,
      categoryCourses,
      activeFilter,
      settings,
      breakpoints,
      categorySettings,
      categoryBreakpoints,
      filteredCourses,
      filteredCoursesByCategory,
      setActiveFilter,
      toggleFavorites,
      fetchCourseRatings,
      favouriteCarousel,
      categoryCarousel,
      currentFavouriteSlide,
      currentCategorySlide,
      totalFavouriteSlides,
      totalCategorySlides,
      goToSlide,
      updateFavouriteSlide,
      updateCategorySlide,
    };
  },
};
</script>

<style scoped>
.rating {
  margin-top: 10px;
  font-size: 14px;
}

.rating .filled {
  color: #f4c150;
}

.rating .average-rating {
  margin-left: 5px;
  color: #666;
}

/* CSS cho Category Carousel trong Courses Section */
.category-carousel-wrapper {
  margin-bottom: 20px;
}

.category-box {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  text-align: center;
  background-color: #fff;
  padding: 10px;
}

.category-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-box.active {
  border-color: #007bff;
  background-color: #f0f8ff;
}

.category-icon img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.category-content {
  padding: 8px 0;
}

.category-content h4 {
  font-size: 16px;
  margin: 0;
  color: #333;
}

.carousel__slide {
  padding: 0 5px;
}

/* CSS cho thanh pagination tùy chỉnh */
.custom-pagination {
  margin-top: 15px;
  text-align: center;
}

/* Chấm tròn */
.pagination-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.pagination-dot {
  width: 10px;
  height: 10px;
  background-color: #d3d3d3;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-dot.active {
  background-color: #6a0dad;
}
</style>
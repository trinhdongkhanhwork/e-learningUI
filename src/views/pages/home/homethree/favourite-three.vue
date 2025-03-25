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
          >
            <Slide v-for="category in categories" :key="category.categoryName" class="favourite-box">
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
                      <li v-for="course in filteredCoursesByCategory(category.id).firstThreeCourses" :key="course.id">
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
                    <li class="more-set" v-if="filteredCoursesByCategory(category.id).remainingCoursesCount > 0">
                      <a href="javascript:;">+{{ filteredCoursesByCategory(category.id).remainingCoursesCount }}</a>
                    </li>
                  </div>
                </div>
              </div>
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
      </div>
    </div>
  </section>
  <!-- /Favourite Course -->

  <!-- Courses -->
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

          <div class="all-corses-main">
            <div class="tab-content">
              <!-- Dynamic tabs from categories -->
              <div class="nav tablist-three" role="tablist">
                <a
                    class="nav-tab active me-3"
                    data-bs-toggle="tab"
                    href="#alltab"
                    role="tab"
                    @click="setActiveFilter('all')"
                >All</a>
                <a
                    v-for="(category, index) in categories"
                    :key="index"
                    class="nav-tab me-3"
                    :data-bs-toggle="'tab'"
                    :href="'#' + category.categoryName.toLowerCase().replace(/\s+/g, '') + 'tab'"
                    role="tab"
                    @click="setActiveFilter(category.id)"
                >{{ category.categoryName }}</a>
              </div>

              <!-- Tab Content -->
              <div class="tab-content mt-4">
                <!-- All Courses Tab -->
                <div class="tab-pane fade show active" id="alltab" role="tabpanel">
                  <div class="all-course">
                    <div class="row">
                      <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up" v-for="course in filteredCourses" :key="course.id">
                        <div class="course-box-three">
                          <div class="course-three-item">
                            <div class="course-three-img">
                              <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                                <img v-if="course.coverImage" :src="course.coverImage" alt="Img" class="img-fluid" style="width: 300px; height: 270px;" />
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
                                    <img :src="course.instructor?.avatarUrl || '@/assets/img/user/user1.jpg'" alt="" class="img-fluid" />
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

                <!-- Dynamic Category Tabs -->
                <div
                    v-for="category in categories"
                    :key="category.categoryName"
                    class="tab-pane fade"
                    :id="category.categoryName.toLowerCase().replace(/\s+/g, '') + 'tab'"
                    role="tabpanel"
                >
                  <div class="all-course">
                    <div class="row">
                      <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up" v-for="course in filteredCourses" :key="course.id">
                        <div class="course-box-three">
                          <div class="course-three-item">
                            <div class="course-three-img">
                              <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                                <img v-if="course.coverImage" :src="course.coverImage" alt="Img" class="img-fluid" style="width: 300px; height: 270px;" />
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
                                    <img :src="course.instructor?.avatarUrl || '@/assets/img/user/user1.jpg'" alt="" class="img-fluid" />
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
                        <p>No courses available in this category.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Courses -->

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
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import baseApi from "@/axios";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  setup() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    const categories = ref([]);
    const courses = ref([]);
    const categoryCourses = ref({});
    const activeFilter = ref("all");
    const wishlist = ref([]);

    const settings = {
      itemsToShow: 1,
      snapAlign: "center",
    };

    const breakpoints = {
      700: {
        itemsToShow: 2,
        snapAlign: "center",
      },
      1024: {
        itemsToShow: 5.4,
        snapAlign: "start",
      },
    };

    // Computed property để lọc khóa học theo danh mục
    const filteredCourses = computed(() => {
      if (activeFilter.value === "all") {
        return courses.value;
      }
      return categoryCourses.value[activeFilter.value] || [];
    });

    // Lấy danh sách danh mục
    const fetchCategories = async () => {
      try {
        const response = await baseApi.get("/api/category/getCategorys");
        categories.value = response.data || [];
      } catch (error) {
        console.error("Lỗi khi lấy danh sách categories:", error);
      }
    };

    // Lấy danh sách tất cả khóa học
    const fetchCourses = async () => {
      try {
        const response = await baseApi.get("/api/v1/courses");
        if (Array.isArray(response.data.content)) {
          courses.value = response.data.content;
          await updateFavoriteStatus(); // Cập nhật trạng thái yêu thích
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    };

    // Lấy danh sách khóa học theo danh mục
    const fetchCoursesByCategories = async () => {
      try {
        const categoryPromises = categories.value.map(async (category) => {
          const response = await baseApi.get(`/api/v1/courses/by-category/${category.id}`);
          categoryCourses.value[category.id] = response.data || [];
        });
        await Promise.all(categoryPromises);
        await updateFavoriteStatus(); // Cập nhật trạng thái yêu thích
      } catch (error) {
        console.error("Lỗi khi lấy khóa học theo danh mục:", error);
      }
    };

    // Lấy danh sách wishlist
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

    // Cập nhật trạng thái yêu thích của các khóa học
    const updateFavoriteStatus = async () => {
      // Cập nhật trạng thái yêu thích cho danh sách courses
      courses.value.forEach((course) => {
        course.isFavorite = wishlist.value.some((wish) => wish.courseId === course.id);
      });

      // Cập nhật trạng thái yêu thích cho danh sách categoryCourses
      Object.keys(categoryCourses.value).forEach((categoryId) => {
        categoryCourses.value[categoryId].forEach((course) => {
          course.isFavorite = wishlist.value.some((wish) => wish.courseId === course.id);
        });
      });
    };

    // Kiểm tra xem khóa học đã có trong wishlist chưa
    const isInWishlist = (courseId) => {
      return wishlist.value.some((wish) => wish.courseId === courseId);
    };

    // Thêm vào wishlist
    const addToWishlist = async (course) => {
      const userId = user.value?.id;
      if (!userId) {
        alert("Please log in to add to wishlist!");
        return;
      }

      // Kiểm tra xem khóa học đã có trong wishlist chưa
      if (isInWishlist(course.id)) {
        alert("This course is already in your wishlist!");
        return;
      }

      const wishlistData = {
        userId: userId,
        courseId: course.id,
      };

      try {
        const response = await baseApi.post('/api/v1/wishlist/addWishlist', wishlistData);
        if (response && response.data) {
          console.log("Khóa học đã được thêm vào wishlist:", response.data);
          wishlist.value.push(response.data); // Thêm vào danh sách wishlist
          course.isFavorite = true; // Cập nhật trạng thái
        }
      } catch (error) {
        console.error("Lỗi khi thêm vào wishlist:", error);
        alert("Failed to add to wishlist. Please try again.");
      }
    };

    // Xóa khỏi wishlist
    const unWishlist = async (courseId) => {
      const wishlistItem = wishlist.value.find((wish) => wish.courseId === courseId);
      if (!wishlistItem) {
        console.error("Wishlist item không tồn tại với courseId:", courseId);
        return;
      }

      try {
        const response = await baseApi.delete(`/api/v1/wishlist/${wishlistItem.id}`);
        if (response.status === 200) {
          console.log("Khóa học đã bị xóa khỏi wishlist");
          wishlist.value = wishlist.value.filter((course) => course.id !== wishlistItem.id);
          await updateFavoriteStatus(); // Cập nhật lại trạng thái yêu thích
        }
      } catch (error) {
        console.error("Lỗi khi xóa khỏi wishlist:", error);
      }
    };

    // Toggle yêu thích
    const toggleFavorites = async (course) => {
      if (course.isFavorite) {
        await unWishlist(course.id);
      } else {
        await addToWishlist(course);
      }
    };
    // Lọc khóa học theo danh mục để hiển thị trong carousel
    const filteredCoursesByCategory = (categoryId) => {
      const coursesByCategory = categoryCourses.value[categoryId] || [];
      const firstThreeCourses = coursesByCategory.slice(0, 3);
      const remainingCoursesCount = coursesByCategory.length - 3;
      return { firstThreeCourses, remainingCoursesCount };
    };

    // Đặt bộ lọc danh mục
    const setActiveFilter = (filter) => {
      activeFilter.value = filter;
    };

    // Mounted hook
    onMounted(async () => {
      AOS.init();
      await fetchCategories();
      await fetchCourses();
      await fetchWishlist();
      await fetchCoursesByCategories();
    });

    return {
      categories,
      courses,
      categoryCourses,
      activeFilter,
      settings,
      breakpoints,
      filteredCourses,
      fetchCategories,
      fetchCourses,
      fetchCoursesByCategories,
      fetchWishlist,
      filteredCoursesByCategory,
      setActiveFilter,
      toggleFavorites,
    };
  },
};
</script>
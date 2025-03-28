<template>
  <!-- Favourite Course -->
  <section class="home-three-favourite">
    <div class="container">
      <div class="row">
        <div class="container">
          <div class="home-three-head section-header-title">
            <div class="align-items-center d-flex justify-content-between">
              <div class="col-sm-12">
                <h2>Choose favourite Course from top Category</h2>
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
                      <!-- Lặp qua các giảng viên của khóa học trong danh mục -->
                      <li v-for="course in filteredCoursesByCategory(category.id).firstThreeCourses" :key="course.id">
                        <a href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          :title="`Instructor: ${course.instructor.name}`">
                          <img :src="`${course.coverImage}`" alt="Instructor" />
                        </a>
                      </li>
                    </ul>
                    <!-- Hiển thị số lượng khóa học trong danh mục -->
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
      <!-- /Favourite Course -->
    </div>
  </section>
  <!-- Feature Course -->

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
                  <a href="javascript:void(0);"
                    >See all<span class="see-all-icon"
                      ><i class="fas fa-arrow-right"></i></span
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="all-corses-main">
            <div class="tab-content">
              <div class="nav tablist-three" role="tablist">
                <a
                  class="nav-tab active me-3"
                  data-bs-toggle="tab"
                  href="#alltab"
                  role="tab"
                  >All</a
                >

                <a
                  class="nav-tab me-3"
                  data-bs-toggle="tab"
                  href="#mostpopulartab"
                  role="tab"
                  >Most popular</a
                >

                <a
                  class="nav-tab me-3"
                  data-bs-toggle="tab"
                  href="#businesstab"
                  role="tab"
                  >Business</a
                >

                <a class="nav-tab me-3" data-bs-toggle="tab" href="#designtab" role="tab"
                  >Design</a
                >

                <a class="nav-tab me-3" data-bs-toggle="tab" href="#designtab" role="tab"
                  >Music</a
                >

                <a
                  class="nav-tab me-3"
                  data-bs-toggle="tab"
                  href="#programmingtab"
                  role="tab"
                  >Programming</a
                >

                <a
                  class="nav-tab me-3"
                  data-bs-toggle="tab"
                  href="#databasetab"
                  role="tab"
                  >Database</a
                >
              </div>
              <coursestab-content></coursestab-content>
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
              Create an account to receive our newsletter, course recommendations and
              promotions.
            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="transform-button-three">
            <router-link to="/register" class="btn btn-action"
              >Get Started Now</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Call to Action -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import baseApi from "@/axios";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      categories: [], // Thay thế coursethree bằng categories
      courses: [],
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        700: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 5.4,
          snapAlign: "start",
        },
      },
    };
  },
  async mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
    await this.fetchCategories(); // Gọi hàm fetchCategories khi component mounted
    await this.fetchCourses();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await baseApi.get('/api/category/getCategorys');
        this.categories = response.data || []; // Lưu dữ liệu từ API vào categories
      } catch (error) {
        console.error('Lỗi khi lấy danh sách categories:', error);
      }
    },
    async fetchCourses() {
      try {
        const response = await baseApi.get("/api/v1/courses");
        if (Array.isArray(response.data.content)) {
          this.courses = response.data.content.map(course => ({
            ...course,
          }));
          console.log("Dữ liệu khóa học:", this.courses); // Log dữ liệu khóa học
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    },
    // Lọc các khóa học theo categoryId
    filteredCoursesByCategory(categoryId) {
  const coursesByCategory = this.courses.filter(course => course.categoryId === categoryId);
  const firstThreeCourses = coursesByCategory.slice(0, 3);
  const remainingCoursesCount = coursesByCategory.length - 3;
  return { firstThreeCourses, remainingCoursesCount };
}
  },
};
</script>

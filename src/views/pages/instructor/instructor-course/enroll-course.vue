<template>
  <div class="row">
    <!-- Course Grid -->
    <div class="col-xxl-4 col-md-6 d-flex" v-for="course in courses" :key="course.id">
      <div class="course-box flex-fill">
        <div class="product">
          <div class="product-img">
            <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
              <img v-if="course.coverImage" :src="`${course.coverImage}`"
                   alt="Img" class="img-fluid" style="width: 300px; height: 270px;" />
            </router-link>
            <div class="price">
              <h3>{{ course.price }}</h3>
            </div>
          </div>
          <div class="product-content">
            <h3 class="title instructor-text">
              <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                {{ course.title }}
              </router-link>
            </h3>
            <div class="course-info d-flex align-items-center">
              <div class="rating-img d-flex align-items-center">
                <img src="@/assets/img/icon/icon-01.svg" alt="Img" />
                <p>{{ course.level }}</p>
              </div>
              <div class="course-view d-flex align-items-center">
                <img src="@/assets/img/icon/icon-02.svg" alt="Img" />
                <p>70hr 30min</p>
              </div>
            </div>
            <div class="course-edit-btn d-flex align-items-center justify-content-between">
              <a :href="`/instructor/instructor-qa?id=${course.id}`"><i class="bx bx-edit me-2"></i>Edit</a>
              <a href="#"><i class="bx bx-trash me-2"></i>Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Course Grid -->
  </div>
  <!-- Modal -->
  <edit-course :sections="sections"></edit-course>
</template>

<script>
import { useCourses } from '@/service/instructor/myCourseForUser'; // Import hàm useCourses
import baseApi from '@/axios';
export default {
  setup() {
    const { courses, totalCourses, fetchCourses } = useCourses();
    fetchCourses(); // Gọi hàm fetchCourses khi component được khởi tạo
    return {
      courses,
      totalCourses
    };
  },
  data() {
    return {
      sections: [],
    }
  },
  methods: {
    getCourse(idCourse){
      baseApi.get(`/api/v1/courses/getCourseById/2`)
      .then((c) => {
        this.sections = c.data.sections;
        console.log("Tải dữ liệu hóa học lên thành công",this.sections);
      })
      .catch((error) => {
        console.error("Lỗi khi tìm khóa học: ", error);
      })
    },
  }
};
</script>

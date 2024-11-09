<template>
  <layouts-instructorborder></layouts-instructorborder>

  <student-breadcrumb :title="title" :text="text" :text1="text1" />

  <!-- Page Content -->
  <div class="page-content">
    <div class="container">
      <div class="row">

        <!-- sidebar -->
        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Student Dashboard -->
        <div class="col-xl-9 col-lg-9">

          <!-- Dashboard Grid -->
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Enrolled Courses</h5>
                  <h2>{{ totalCoursesIsPayment }}</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Recently Created Courses</h5>
                  <h2>{{ courses.length }}</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Completed Courses</h5>
                  <h2>06</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Total Students</h5>
                  <h2>{{ getTotalEnrolledUserCount() }}</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Total Courses</h5>
                  <h2>11</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Total Earnings</h5>
                  <h2>$486</h2>
                </div>
              </div>
            </div>
          </div>
          <!-- /Dashboard Grid -->

          <div class="instructor-course-table">
            <div class="dashboard-title">
              <h4>Recently Created Courses</h4>
            </div>
            <div class="table-responsive custom-table">

              <!-- Referred Users-->
              <table class="table table-nowrap mb-0">
                <thead>
                <tr>
                  <th>Courses</th>
                  <th>Enrolled</th>
                  <th>Date</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="course in courses" :key="course.id">
                  <td>
                    <div class="table-course-detail">
                      <router-link :to="{ path: '/course/course-details', query: { id: course.id } }" class="course-table-img">
                        <img v-if="course.coverImage" :src="require(`@/assets/img/course-list/${course.coverImage}`)"
                             alt="Img" class="img-fluid" style="width: 100px;"/>
                        {{ course.title }}
                      </router-link>
                    </div>
                  </td>
                  <td>{{ course.enrolledUserCount }} Students</td>
                  <td>{{ formatCreatedAt(course.createdAt) }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>



          <div class="dash-pagination">
            <div class="row align-items-center">
              <div class="col-6">
                <p>Page 1 of 2</p>
              </div>
              <div class="col-6">
                <ul class="pagination">
                  <li class="active">
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#"><i class="bx bx-chevron-right"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Student Dashboard -->

      </div>
    </div>
  </div>
  <!-- /Page Content -->

  <layouts1></layouts1>
</template>

<script>
import useCourses from '@/service/instructor/enrollCourse';
import baseApi from '@/axios';
import { useStore } from 'vuex';
import { ref, onMounted } from "vue";
export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    return {
      title: "Dashboard",
      text: "Home",
      text1: "Dashboard",
      totalCoursesIsPayment:0,
      courses: [],
      user
    }
  },
  async mounted() {
    const { totalCoursesIsPayment, fetchCoursesEnroll } = useCourses();
    await fetchCoursesEnroll();
    this.totalCoursesIsPayment = totalCoursesIsPayment.value;
    this.fetchCourses();
  },
  methods: {
    fetchCourses() {
      baseApi
          .get("/api/v1/courses/getCourses")
          .then((response) => {
            if (Array.isArray(response.data.content)) {
              const userId = this.user.id; // Giả sử bạn có user ID ở đây
              this.courses = response.data.content
                  .filter(course => course.instructor && course.instructor.id === userId) // Lọc khóa học theo userId
                  .sort((a, b) => {
                    const dateComparison = new Date(b.createdAt) - new Date(a.createdAt);
                    if (dateComparison === 0) {
                      return a.id - b.id;
                    }
                    return dateComparison;
                  })
                  .slice(0, 10); // Lấy 10 khóa học mới nhất

              this.courses = [...this.courses];
            } else {
              console.error("Dữ liệu không phải là mảng:", response.data);
            }
          })
          .catch((error) => {
            console.error("Lỗi khi lấy danh sách khóa học:", error);
          });
    },

    formatCreatedAt(createdAt) {
      const date = new Date(createdAt);
      return date.toLocaleDateString(); // Hiển thị ngày tháng theo định dạng hệ thống
    },
    getTotalEnrolledUserCount() {
      return this.courses.reduce((total, course) => {
        return total + (course.enrolledUserCount || 0);
      }, 0);
    }
  }
}
</script>
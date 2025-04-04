<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <student-sidebar></student-sidebar>
        <!-- /Sidebar -->

        <!-- Student Dashboard -->
        <div class="col-xl-9 col-lg-9">
          <!-- Dashboard Grid -->
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Enrolled Courses</h5>
                  <h2>{{ totalCourses }}</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Active Courses</h5>
                  <h2>03</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Completed Courses</h5>
                  <h2>13</h2>
                </div>
              </div>
            </div>
          </div>
          <!-- /Dashboard Grid -->

          <div class="dashboard-title">
            <h4>Recently Enrolled Courses</h4>
          </div>
          <div class="row">
            <!-- Course Grid -->
            <div class="col-xxl-4 col-md-6 d-flex" v-for="course in paidCourses"
            :key="course.id">
              <div class="course-box flex-fill">
                <div class="product">
                  <div class="product-img">
                    <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                      <img v-if="course.coverImage" :src="`${course.coverImage}`"
                          alt="Img" class="img-fluid" style="width: 300px;height: 270px;"/>
                    </router-link>
                    <div class="price">
                      <h3>{{ course.price }}</h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <router-link to="/instructor/instructor-profile"
                        ><img
                            :src="`${course.instructor.avatarUrl}`"
                            alt="Img"
                            class="img-fluid"
                        /></router-link>
                        <div class="course-name">
                          <h4><router-link to="/instructor/instructor-profile">{{ course.instructor.fullname }}</router-link></h4>
                          <p>{{ course.instructor.roleEntity.roleName }}</p>
                        </div>
                      </div>
                      <!-- <div
                          class="course-share d-flex align-items-center justify-content-center"
                      >
                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                      </div> -->
                    </div>
                    <h3 class="title instructor-text">
                      <router-link to="/course/course-details"
                      >{{ course.title }}</router-link
                      >
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
                    <div class="rating mb-0">
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <span class="d-inline-block average-rating"
                      ><span>5.0</span> (20)</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Course Grid -->
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
  <layouts1></layouts1>
</template>
<script>
import useCourses from '@/service/student/enrollCourse';

export default {
  data() {
    return {
      title: "Dashboard",
      text: "Home",
      text1: "Dashboard",
      totalCourses: 0, // Khởi tạo biến tổng số khóa học
      paidCourses: [],
    };
  },
  async mounted() {
    const { totalCourses, fetchCourses, paidCourses } = useCourses(); // Gọi useCourses ở đây
    await fetchCourses(); // Gọi fetchCourses để lấy danh sách khóa học
    this.totalCourses = totalCourses.value; // Cập nhật tổng số khóa học vào data
    this.paidCourses = paidCourses.value;
  },
};
</script>

<template>
  <layouts></layouts>
  <admin-breadcrumb :title="title" :text="text" :text1="text1"></admin-breadcrumb>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <!-- sidebar -->
        <admin-sidebar></admin-sidebar>
        <!-- /Sidebar -->

        <!-- Instructor Referral -->
        <div class="col-xl-10 col-lg-10">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Revenue Statistics</h3>
              </div>
              <div class="checkout-form pb-0">
                <div class="row">
                  <div class="col d-flex">
                    <div class="card link-box flex-fill">
                      <StatisticsChart></StatisticsChart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Top 5 Courses Best Selling</h3>
              </div>
              <div class="checkout-form">
                <div class="table-responsive custom-table">
                  <!-- Referred Users-->
                  <table class="table table-nowrap mb-0">
                    <thead>
                    <tr>
                      <th>Courses</th>
                      <th>Sales</th>
                      <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(course, index) in top5Courses" :key="index">
                      <td>
                        <div
                            class="sell-table-group d-flex align-items-center"
                        >
                          <div class="sell-group-img">
                            <router-link :to="{ path: '/course/course-details', query: { id: course.courseId } }">
                              <img
                                  :src="course.imageUrl"
                                  class="img-fluid"
                                  alt="Img"
                                  width="250px"
                              />
                            </router-link>
                          </div>
                          <div class="sell-tabel-info">
                            <p>
                              <router-link :to="{ path: '/course/course-details', query: { id: course.courseId } }"
                              >{{course.courseName}}</router-link
                              >
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{{course.totalSold}}</td>
                      <td>{{course.totalRevenue}} $</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Top Best Instructors</h3>
              </div>
              <div class="checkout-form">

              </div>
            </div>
          </div>
        </div>
        <!-- /Instructor Referral -->
      </div>
    </div>
  </div>

  <layouts1></layouts1>
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";
import StatisticsChart from "@/views/pages/admin/component/StatisticsChart.vue";
import baseApi from "@/axios";
export default {
  components: {AdminSidebar, AdminBreadcrumb, StatisticsChart},
  data() {
    return {
      top5Courses: [],
    };
  },
  methods: {
    fetchTop5Courses() {
      baseApi
        .get("/api/v1/topCourses")
        .then((response) => {
          this.top5Courses = response.data;
          console.log("Top 5 courses:", this.top5Courses);
        })
        .catch((error) => {
          console.error("Error fetching top 5 courses:", error);
        });
    },
  },
  mounted() {
    this.fetchTop5Courses();
  },
};
</script>

<template>
  <layouts-index></layouts-index>
  <student-breadcrumb title="Certificate" text="Home" text1="Certificate"/>
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <student-sidebar></student-sidebar>
        <!-- /Sidebar -->

        <!-- Student Order History -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Certificate</h3>
              </div>
              <div class="checkout-form">
                <div class="tab-content">
                  <div class="table-responsive custom-table">
                    <table class="table table-nowrap mb-0">
                      <thead>
                      <tr>
                        <th>Certificate Id</th>
                        <th>Name</th>
                        <th>áhgbáhdg</th>
                        <th>dhdsf</th>
                        <th>sdfgsdfg</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="order in filteredOrders" :key="order.id">
                        <td>{{ order.id }}</td>
                        <td>
                          <span class="title-course">{{ order.courseTitle }}</span>
                        </td>
                        <td>{{ formatDate(order.paymentDate) }}</td>
                        <td>{{ order.price }}</td>
                        <td>{{ getStatusLabel(order.paymentStatusId) }}</td>
                        <td>
                          <a href="javascript:void(0);" class="action-icon" @click="downloadOrder(order.courseId)">
                            <i class="bx bxs-download"></i>
                          </a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dashboard-title">
            <h4>certificate</h4>
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
                          <p>{{ course.instructor.roles.map(role => role.roleName).join(', ') }}</p>
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
        <!-- /Student Order History -->
      </div>
    </div>
  </div>
  <layouts1></layouts1>
</template>
<script setup>

</script>
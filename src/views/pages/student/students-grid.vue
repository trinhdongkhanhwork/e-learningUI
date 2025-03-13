<template>
  <layouts></layouts>
    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-12">
                    <div class="breadcrumb-list">
                        <nav aria-label="breadcrumb" class="page-breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/home/">Home</router-link></li>
                                <li class="breadcrumb-item">Pages</li>
                                <li class="breadcrumb-item">Students Grid</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Breadcrumb -->

    <!-- Page Wrapper -->
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <!-- Filter -->
            <div class="showing-list">
              <div class="row">
                <div class="col-lg-6">
                  <div class="d-flex align-items-center">
                    <div class="view-icons">
                      <router-link to="students-grid" class="grid-view active"
                        ><i class="feather-grid"></i
                      ></router-link>
                      <router-link to="/student/students-list" class="list-view"
                        ><i class="feather-list"></i
                      ></router-link>
                    </div>
                    <div class="show-result">
                      <h4>Showing 1-9 of 50 results</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Filter -->

            <div class="row">
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user1.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5>
                      <router-link to="/student/student-profile">Charles Dickens</router-link>
                    </h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>Iceland</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user2.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5>
                      <router-link to="/student/student-profile">Gabriel Palmer</router-link>
                    </h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>France</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user3.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5><router-link to="/student/student-profile">James Lemire</router-link></h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>Italy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user4.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5><router-link to="/student/student-profile">Olivia Murphy</router-link></h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>Brazil</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user5.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5>
                      <router-link to="/student/student-profile">Rebecca Swartz</router-link>
                    </h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>Louisiana</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user6.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5>
                      <router-link to="/student/student-profile">Betty Richards</router-link>
                    </h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>Iceland</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user14.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5>
                      <router-link to="/student/student-profile">Jeffrey Montgomery</router-link>
                    </h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>United Kingdom</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user11.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5><router-link to="/student/student-profile">Brooke Hayes</router-link></h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>United States</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user12.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5>
                      <router-link to="/student/student-profile">Gertrude D. Shorter</router-link>
                    </h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>Louisiana</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user13.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5>
                      <router-link to="/student/student-profile">David L. Garza</router-link>
                    </h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>Spain</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user4.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5>
                      <router-link to="/student/student-profile">Vivian E. Winders</router-link>
                    </h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>Tunisia</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="student-box flex-fill">
                  <div class="student-img">
                    <router-link to="/student/student-profile">
                      <img
                        class="img-fluid"
                        alt="Students Info"
                        src="@/assets/img/user/user5.jpg"
                      />
                    </router-link>
                  </div>
                  <div class="student-content pb-0">
                    <h5><router-link to="/student/student-profile">Sean K. Leon</router-link></h5>
                    <h6>Student</h6>
                    <div class="loc-blk d-flex align-items-center justify-content-center">
                      <img src="@/assets/img/students/loc-icon.svg" class="me-1" alt="" />
                      <p>United States</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <pagination></pagination>
          </div>
        </div>
      </div>
    </div>

  <layouts1></layouts1>
</template>
<script setup lang="ts">
</script>

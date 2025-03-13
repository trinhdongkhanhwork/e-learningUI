<template>
  <student-header></student-header>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <student-sidebar></student-sidebar>
        <!-- /Sidebar -->

        <!-- Student Courses -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-info">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Enrolled Courses</h3>
              </div>
              <div class="checkout-form pb-0">
                <div class="wishlist-tab">
                  <ul class="nav">
                    <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        class="active"
                        data-bs-toggle="tab"
                        data-bs-target="#enroll-courses"
                        >Enrolled Courses (06)</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="tab"
                        data-bs-target="#active-courses"
                        >Active Courses (03)</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="tab"
                        data-bs-target="#complete-courses"
                        >Completed Courses (03)</a
                      >
                    </li>
                  </ul>
                </div>

                <div class="tab-content">
                  <div class="tab-pane fade show active" id="enroll-courses">
                    <enrolled-courses></enrolled-courses>
                  </div>

                  <div class="tab-pane fade" id="active-courses">
                    <active-courses></active-courses>
                  </div>

                  <div class="tab-pane fade" id="complete-courses">
                    <complete-courses></complete-courses>
                  </div>
                </div>
              </div>
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
        <!-- /Student Courses -->
      </div>
    </div>
  </div>
  <layouts1></layouts1>
</template>
<script>
export default {
  data() {
    return {
      title: "Enrolled Courses",
      text: "Home",
      text1: "Enrolled Courses",
    };
  },
};
</script>

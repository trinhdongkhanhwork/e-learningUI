<template>
  <layouts></layouts>
  <instructorbreadcrumb :title="title" :text="text" :text1="text1"></instructorbreadcrumb>
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->

        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Instructor Q & A -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Edit Courses</h3>
              </div>
              <div class="checkout-form">
                <div class="table-responsive custom-table">
                  
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="dash-pagination">
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
          </div> -->
        </div>
        <!-- /Instructor Q & A -->
      </div>
    </div>
  </div>

  <layouts1></layouts1>
</template>
<script>
export default {
  data() {
    return {
      title: "Question & Answer",
      text: "Home",
      text1: "Question & Answer",
    };
  },
};
</script>

<template>
  <student-header></student-header>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <student-sidebar></student-sidebar>
        <!-- /Sidebar -->

        <!-- Student Wishlist -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-info">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Wishlist</h3>
              </div>
              <div class="checkout-form pb-0">
                <wishlist-grid></wishlist-grid>
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
        <!-- /Student Wishlist -->
      </div>
    </div>
  </div>
  <layouts1></layouts1>
</template>
<script>
export default {
  data() {
    return {
      title: "Wishlist",
      text: "Home",
      text1: "Wishlist",
    };
  },
};
</script>

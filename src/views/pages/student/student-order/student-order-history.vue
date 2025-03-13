<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
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
                <h3>Order History</h3>
              </div>
              <div class="checkout-form">
                <!-- Order Tabs -->
                <div class="wishlist-tab order-tab">
                  <ul class="nav">
                    <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        class="active"
                        data-bs-toggle="tab"
                        data-bs-target="#today"
                        >History</a
                      >
                    </li>
                    <!-- <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="tab"
                        data-bs-target="#month"
                        >Monthly</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="tab"
                        data-bs-target="#year"
                        >Yearly</a
                      >
                    </li> -->
                  </ul>
                </div>
                <!-- /Order Tabs -->

                <!-- Tab Content -->
                <div class="tab-content">
                  <!-- Today -->
                  <today-history></today-history>
                  <!-- /Today -->

                  <!-- Month -->
                  <div class="tab-pane fade" id="month">
                    <month-history></month-history>
                  </div>
                  <!-- /Month -->

                  <!-- Yearly -->
                  <div class="tab-pane fade" id="year">
                    <year-history></year-history>
                  </div>
                  <!-- /Yearly -->
                </div>
                <!-- /Tab Content -->
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
        <!-- /Student Order History -->
      </div>
    </div>
  </div>
  <layouts1></layouts1>
</template>
<script>
export default {
  data() {
    return {
      title: "Order History",
      text: "Home",
      text1: "Order History",
    };
  },
};
</script>

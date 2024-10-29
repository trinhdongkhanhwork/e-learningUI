<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Student Tickets -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Support Tickets</h3>
              </div>
              <div class="checkout-form">
                <!-- Support Information -->
                <div class="row">
                  <div class="col-md-4 col-sm-6">
                    <div class="card support-box">
                      <div class="card-body">
                        <h3>50</h3>
                        <p>Total Tickets</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="card support-box">
                      <div class="card-body">
                        <h3>30</h3>
                        <p>Opened Tickets</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="card support-box">
                      <div class="card-body">
                        <h3>20</h3>
                        <p>Closed Tickets</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /Support Information -->

                <div
                  class="filter-grp ticket-grp d-flex align-items-center justify-content-between"
                >
                  <div>
                    <h3>Support Tickets</h3>
                    <p>You can find all of your order Invoices.</p>
                  </div>
                  <div class="ticket-btn-grp">
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#add-tickets"
                      >Add New Ticket</a
                    >
                  </div>
                </div>

                <div class="wishlist-tab">
                  <ul class="nav">
                    <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        class="active"
                        data-bs-toggle="tab"
                        data-bs-target="#all"
                        >All(30)</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="tab"
                        data-bs-target="#open"
                        >Open(10)</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="tab"
                        data-bs-target="#inprogress"
                        >Inprogress(10)</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="tab"
                        data-bs-target="#closed"
                        >Closed(10)</a
                      >
                    </li>
                  </ul>
                </div>

                <!-- Tab Contant -->
                <div class="tab-content">
                  <!-- All -->
                  <div class="tab-pane show active" id="all">
                    <instructor-all-tickets></instructor-all-tickets>
                  </div>
                  <!-- /All -->

                  <!-- Open -->
                  <div class="tab-pane fade" id="open">
                    <instructor-open-tickets></instructor-open-tickets>
                  </div>
                  <!-- /Open -->

                  <!-- Inprogress -->
                  <div class="tab-pane fade" id="inprogress">
                    <instructor-inprogress-tickets></instructor-inprogress-tickets>
                  </div>
                  <!-- /Inprogress -->

                  <!-- Close -->
                  <div class="tab-pane fade" id="closed">
                    <instructor-closed-tickets></instructor-closed-tickets>
                  </div>
                  <!-- /Close -->
                </div>
                <!-- Tab Contant -->
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
        <!-- Student Tickets -->
      </div>
    </div>
  </div>

  <layouts1></layouts1>
</template>
<script>
export default {
  data() {
    return {
      title: "Announcements",
      text: "Home",
      text1: "Announcements",
    };
  },
};
</script>
<template>
  <layouts-index></layouts-index>
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
        <!-- /Student Order History -->
      </div>
    </div>
  </div>
  <layouts1></layouts1>
</template>
<script setup>

</script>

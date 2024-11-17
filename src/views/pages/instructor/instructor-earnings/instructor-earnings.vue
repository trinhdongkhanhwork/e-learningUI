<template>
  <layouts></layouts>

  <instructorbreadcrumb :title="title" :text="text" :text1="text1"></instructorbreadcrumb>
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Instructor Dashboard -->
        <div class="col-xl-9 col-lg-8 col-md-12">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Earnings</h3>
              </div>
              <div class="checkout-form instructor-earnings-card">
                <!-- Dashboard Grid -->
                <div class="row justify-content-center">
                  <div class="col-lg-4 col-md-6 d-flex">
                    <div class="card dash-info flex-fill">
                      <div class="card-body">
                        <h5>Revenue</h5>
                        <h2>$467</h2>
                        <p>Earning this month</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 d-flex">
                    <div class="card dash-info flex-fill">
                      <div class="card-body">
                        <h5>Students Enrollments</h5>
                        <h2>12000</h2>
                        <p>New this month</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 d-flex">
                    <div class="card dash-info flex-fill">
                      <div class="card-body">
                        <h5>Courses Ratings</h5>
                        <h2>4.8</h2>
                        <p>Rating this month</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="earning-chart-header">
                      <h5>Earnings by Year</h5>
                      <div class="icon-form mb-0">
                        <input
                          type="text"
                          class="form-control bookingrange"
                          placeholder="01 Jan 2024 - 01 Feb 2024"
                          ref="dateRangeInput"
                        />
                        <span class="form-icon"
                          ><i class="bx bx-calendar-edit"></i
                        ></span>
                      </div>
                    </div>
                    <div class="chart-body">
                      <div id="earnigs_chart">
                        <apexchart
                          type="area"
                          height="273"
                          :options="earnigsChart.earnChart"
                          :series="earnigsChart.series"
                        >
                        </apexchart>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /Dashboard Grid -->
              </div>
            </div>
          </div>

          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Best Selling Courses</h3>
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
                      <tr>
                        <td>
                          <div
                            class="sell-table-group d-flex align-items-center"
                          >
                            <div class="sell-group-img">
                              <router-link to="/course/course-details">
                                <img
                                  src="@/assets/img/course/course-28.jpg"
                                  class="img-fluid"
                                  alt="Img"
                                />
                              </router-link>
                            </div>
                            <div class="sell-tabel-info">
                              <p>
                                <router-link to="/course/course-details"
                                  >Build Responsive Websites with HTML5 and
                                  CSS3</router-link
                                >
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>35</td>
                        <td>4,620</td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            class="sell-table-group d-flex align-items-center"
                          >
                            <div class="sell-group-img">
                              <router-link to="/course/course-details">
                                <img
                                  src="@/assets/img/course/course-29.jpg"
                                  class="img-fluid"
                                  alt="Img"
                                />
                              </router-link>
                            </div>
                            <div class="sell-tabel-info">
                              <p>
                                <router-link to="/course/course-details"
                                  >C# Developers Double Your Coding with Visual
                                  Studio</router-link
                                >
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>35</td>
                        <td>4,620</td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            class="sell-table-group d-flex align-items-center"
                          >
                            <div class="sell-group-img">
                              <router-link to="/course/course-details">
                                <img
                                  src="@/assets/img/course/course-30.jpg"
                                  class="img-fluid"
                                  alt="Img"
                                />
                              </router-link>
                            </div>
                            <div class="sell-tabel-info">
                              <p>
                                <router-link to="/course/course-details"
                                  >Information About UI/UX Design
                                  Degree</router-link
                                >
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>35</td>
                        <td>4,620</td>
                      </tr>
                    </tbody>
                  </table>
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
        <!-- /Instructor Dashboard -->
      </div>
    </div>
  </div>
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
import { earnigsChart } from "./data";
export default {
  data() {
    return {
      earnigsChart: earnigsChart,
      title: "Settings",
      text: "Home",
      text1: "Change Password",
    };
  },
  setup() {
    const dateRangeInput = ref(null);

    // Move the function declaration outside of the onMounted callback
    function booking_range(start, end) {
      return start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY");
    }

    onMounted(() => {
      if (dateRangeInput.value) {
        const start = moment().subtract(6, "days");
        const end = moment();

        new DateRangePicker(
          dateRangeInput.value,
          {
            startDate: start,
            endDate: end,
            ranges: {
              Today: [moment(), moment()],
              Yesterday: [
                moment().subtract(1, "days"),
                moment().subtract(1, "days"),
              ],
              "Last 7 Days": [moment().subtract(6, "days"), moment()],
              "Last 30 Days": [moment().subtract(29, "days"), moment()],
              "This Month": [
                moment().startOf("month"),
                moment().endOf("month"),
              ],
              "Last Month": [
                moment().subtract(1, "month").startOf("month"),
                moment().subtract(1, "month").endOf("month"),
              ],
            },
          },
          booking_range
        );

        booking_range(start, end);
      }
    });

    return {
      dateRangeInput,
    };
  },
};
</script>

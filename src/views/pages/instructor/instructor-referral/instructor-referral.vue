<template>
  <layouts></layouts>
  <instructorbreadcrumb :title="title" :text="text" :text1="text1"></instructorbreadcrumb>
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Instructor Referral -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Referrals</h3>
              </div>
              <div class="checkout-form pb-0">
                <div class="row">
                  <div class="col-xl-3 col-sm-6">
                    <div class="card refer-card">
                      <div class="card-body">
                        <h6>Net Earnings</h6>
                        <h3>$12,000</h3>
                        <p>Earning this month</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-sm-6">
                    <div class="card refer-card">
                      <div class="card-body">
                        <h6>Balance</h6>
                        <h3>$15,000</h3>
                        <p>In the Wallet</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-sm-6">
                    <div class="card refer-card">
                      <div class="card-body">
                        <h6>Avg Deal Size</h6>
                        <h3>$2,000</h3>
                        <p>Earning this month</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-sm-6">
                    <div class="card refer-card">
                      <div class="card-body">
                        <h6>No of Referrals</h6>
                        <h3>10</h3>
                        <p>In this month</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-6 d-flex">
                    <div class="card link-box flex-fill">
                      <div class="card-body">
                        <h5>Your Referral Link</h5>
                        <p>
                          You can earn easily money by copy and share the below
                          link to your friends
                        </p>
                        <div class="input-block">
                          <input
                            type="text"
                            class="form-control"
                            value="https://dreamslmscourse.com/reffer/?refid=345re667877k9"
                          />
                        </div>
                        <a href="javascript:void(0);">Copy link</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 d-flex">
                    <div class="card link-box flex-fill">
                      <div class="card-body">
                        <h5>Withdraw Money</h5>
                        <ul>
                          <li>Withdraw money securily to your bank account.</li>
                          <li>
                            Commision is $25 per transaction under $10,000
                          </li>
                        </ul>
                        <a href="javascript:void(0);">Withdraw Money</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div
                class="profile-heading d-flex align-items-center justify-content-between"
              >
                <h3>Referred Users</h3>
                <div class="icon-form mb-0">
                  <input
                    type="text"
                    class="form-control bookingrange"
                    placeholder=""
                    ref="dateRangeInput"
                  />
                  <span class="form-icon"
                    ><i class="bx bx-calendar-edit"></i
                  ></span>
                </div>
              </div>
              <div class="checkout-form">
                <instructor-referral-table></instructor-referral-table>
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
        <!-- /Instructor Referral -->
      </div>
    </div>
  </div>

  <layouts1></layouts1>
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
export default {
  data() {
    return {
      title: "Referrals",
      text: "Home",
      text1: "Referrals",
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

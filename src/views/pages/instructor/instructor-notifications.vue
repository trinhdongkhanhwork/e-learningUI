<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Instructor profile -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details mb-0">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Notifications</h3>
              </div>
              <div class="checkout-form personal-address">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="d-flex instructor-noti-head align-items-center">
                      <div class="icon-form mb-0">
                        <span class="form-icon"
                          ><i class="bx bx-calendar-edit"></i
                        ></span>
                        <input
                          type="text"
                          class="form-control bookingrange"
                          placeholder="01 Jan 2024 - 01 Feb 2024"
                          ref="dateRangeInput"
                        />
                      </div>
                      <div class="noti-mark-btns">
                        <ul>
                          <li>
                            <a href="#" class="btn"
                              ><i class="feather-check me-2"></i> Mark all as
                              read</a
                            >
                          </li>
                          <li>
                            <a href="#" class="btn btn-delete"
                              ><i class="feather-trash-2 me-2"></i> Delete
                              all</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="notication-list">
                      <div class="notication-item">
                        <div class="row">
                          <div class="col-md-9">
                            <div class="notication-content">
                              <span>
                                <img
                                  src="@/assets/img/user/user2.jpg"
                                  class="img-fluid"
                                  alt="img"
                                />
                              </span>
                              <div class="notication-info">
                                <p>
                                  <span>Thompson</span> Hicks enroll a new
                                  course on Programming
                                </p>
                                <p class="notify-time">10 mins ago</p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="notification-btn text-end">
                              <a
                                href="javascript:void(0);"
                                class="btn btn-danger"
                                >Delete</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="notication-item">
                        <div class="row">
                          <div class="col-md-9">
                            <div class="notication-content">
                              <span>
                                <img
                                  src="@/assets/img/user/user1.jpg"
                                  class="img-fluid"
                                  alt="img"
                                />
                              </span>
                              <div class="notication-info">
                                <p>
                                  <span>Shirley</span> Lis submitted the
                                  assignent on Complete
                                  <span> HTML, CSS and Javascript Course </span>
                                </p>
                                <p class="notify-time">12 mins ago</p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="notification-btn text-end">
                              <a
                                href="javascript:void(0);"
                                class="btn btn-danger"
                                >Delete</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="notication-item">
                        <div class="row">
                          <div class="col-md-9">
                            <div class="notication-content">
                              <span>
                                <img
                                  src="@/assets/img/user/user12.jpg"
                                  class="img-fluid"
                                  alt="img"
                                />
                              </span>
                              <div class="notication-info">
                                <p>
                                  <span>James </span> Schulte replied to your
                                  comment
                                </p>
                                <p class="notify-time">15 mins ago</p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="notification-btn text-end">
                              <a
                                href="javascript:void(0);"
                                class="btn btn-danger"
                                >Delete</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Instructor profile -->
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
      title: "Notifications",
      text: "Home",
      text1: "Notifications",
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

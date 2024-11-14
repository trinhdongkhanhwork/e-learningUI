<template>
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
          <span class="form-icon"><i class="bx bx-calendar-edit"></i></span>
        </div>
      </div>
      <div class="checkout-form">
        <div class="table-responsive custom-table">
          <table class="table table-nowrap mb-0">
            <thead>
              <tr>
                <th>Referred ID</th>
                <th>Referrals</th>
                <th>URL</th>
                <th></th>
                <th>Visits</th>
                <th>Total Earned</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09341</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user2.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >Thompson Hicks</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>10</td>
                <td>$45.00</td>
              </tr>
              <tr>
                <td>09342</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user4.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >Jennifer Tovar</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>15</td>
                <td>$75.00</td>
              </tr>
              <tr>
                <td>09343</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user3.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >James Schulte</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>20</td>
                <td>$100.00</td>
              </tr>
              <tr>
                <td>09344</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user1.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >Kristy Cardona</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>1</td>
                <td>$44.00</td>
              </tr>
              <tr>
                <td>09345</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user14.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >William Aragon</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>5</td>
                <td>$25.00</td>
              </tr>
              <tr>
                <td>09346</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user8.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >Shirley Lis</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>500</td>
                <td>$160.00</td>
              </tr>
              <tr>
                <td>09347</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user2.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >John Brewer</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>187</td>
                <td>$150.00</td>
              </tr>
              <tr>
                <td>09348</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user5.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >Doris Hughes</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>10</td>
                <td>$45.00</td>
              </tr>
              <tr>
                <td>09349</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user13.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >Arthur Nalley</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>15</td>
                <td>$10.00</td>
              </tr>
              <tr>
                <td>09350</td>
                <td>
                  <h2 class="table-avatar d-flex align-items-center">
                    <router-link to="/student/student-profile" class="avatar">
                      <img
                        class="avatar-img"
                        src="@/assets/img/user/user6.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <router-link to="/student/student-profile"
                      >Sarah Martinez</router-link
                    >
                  </h2>
                </td>
                <td>
                  <span class="text-wrap"
                    >https://dreamslmscourse.com/reffer/?refid=345re667877k9</span
                  >
                </td>
                <td>
                  <a href="javascript:void(0);" class="action-icon"
                    ><i class="bx bx-paste"></i
                  ></a>
                </td>
                <td>98</td>
                <td>$10.00</td>
              </tr>
            </tbody>
          </table>
        </div>
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
export default {
  data() {
    return {};
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

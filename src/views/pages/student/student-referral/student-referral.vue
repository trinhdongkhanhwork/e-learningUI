<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <student-sidebar></student-sidebar>
        <!-- /Sidebar -->

        <!-- Student Referral -->
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
                          You can earn easily money by copy and share the below link to
                          your friends
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
                          <li>Commision is $25 per transaction under $10,000</li>
                        </ul>
                        <a href="javascript:void(0);">Withdraw Money</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <referral-table></referral-table>

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
        <!-- /Student Referral -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Referrals",
      text: "Home",
      text1: "Referrals",
    };
  },
};
</script>

<template>
  <student-header></student-header>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <student-sidebar></student-sidebar>
        <!-- /Sidebar -->

        <!-- Student Settings -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Settings</h3>
                <p>You have full control to manage your own account settings</p>
              </div>
              <settings-sidebar></settings-sidebar>
              <div class="checkout-form settings-wrap">
                <ul class="lined-accounts-list">
                  <li>
                    <div class="account-icon">
                      <img src="@/assets/img/icon/fb-icon.svg" alt="Img" />
                    </div>
                    <div class="account-info">
                      <div class="account-name"><h5>Facebook</h5></div>
                      <p>
                        Enable one - click login and receive more personalized
                        course recommendations
                      </p>
                      <a href="#" class="linked-btn"
                        >Remove my facebook account</a
                      >
                    </div>
                  </li>
                  <li>
                    <div class="account-icon">
                      <img src="@/assets/img/icon/google-icon.svg" alt="Img" />
                    </div>
                    <div class="account-info">
                      <div class="account-name"><h5>Google</h5></div>
                      <p>
                        Enable one - click login and receive more personalized
                        course recommendations
                      </p>
                      <a href="#" class="linked-btn">Link my google account</a>
                    </div>
                  </li>
                  <li>
                    <div class="account-icon">
                      <img src="@/assets/img/icon/github-icon.svg" alt="Img" />
                    </div>
                    <div class="account-info">
                      <div class="account-name"><h5>Github</h5></div>
                      <p>
                        Enable one - click login and receive more personalized
                        course recommendations
                      </p>
                      <a href="#" class="linked-btn">Link my github account</a>
                    </div>
                  </li>
                  <li>
                    <div class="account-icon">
                      <img
                        src="@/assets/img/icon/twitter-x-icon.svg"
                        alt="Img"
                      />
                    </div>
                    <div class="account-info">
                      <div class="account-name"><h5>Twitter</h5></div>
                      <p>
                        Enable one - click login and receive more personalized
                        course recommendations
                      </p>
                      <a href="#" class="linked-btn">Link my twitter account</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- /Student Settings -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Settings",
      text: "Home",
      text1: "Linked Accounts",
    };
  },
};
</script>

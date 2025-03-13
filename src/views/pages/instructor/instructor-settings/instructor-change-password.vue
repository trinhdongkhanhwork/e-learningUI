<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Instructor Settings -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Settings</h3>
                <p>You have full control to manage your own account settings</p>
              </div>
              <instructor-settings-sidebar></instructor-settings-sidebar>
              <form action="/instructor-change-password">
                <div class="checkout-form settings-wrap">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="input-block">
                        <label class="form-label">Current Password</label>
                        <input type="password" class="form-control" />
                      </div>
                      <div class="input-block">
                        <label class="form-label">New Password</label>
                        <input type="password" class="form-control" />
                      </div>
                      <div class="input-block">
                        <label class="form-label">Re-type New Password</label>
                        <input type="password" class="form-control" />
                      </div>
                      <button class="btn btn-primary" type="submit">
                        Reset Password
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /Instructor Settings -->
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
      text1: "Change Password",
    };
  },
};
</script>

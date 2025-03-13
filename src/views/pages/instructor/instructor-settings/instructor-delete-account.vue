<template>
  <layouts></layouts>
  <instructorbreadcrumb :title="title" :text="text" :text1="text1"></instructorbreadcrumb>
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
              <div class="checkout-form settings-wrap">
                <div class="edit-profile-info">
                  <h5>Select a withdraw method</h5>
                </div>
                <div class="del-acc">
                  <h6>Warning</h6>
                  <p>
                    If you close your account, you will be unsubscribed from all
                    your 0 courses, and will lose access forever.
                  </p>
                </div>
                <router-link to="/home/" class="btn btn-primary"
                  >Delete My Account</router-link
                >
              </div>
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
      text1: "Delete Account",
    };
  },
};
</script>

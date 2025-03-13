<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <!-- Course Content -->
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <student-sidebar></student-sidebar>
        <!-- /Sidebar -->

        <!-- Student Profile -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details mb-0">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>My Profile</h3>
              </div>
              <div class="checkout-form personal-address">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="contact-info">
                      <h6>Full Name</h6>
                      <p>{{ this.user.fullname }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="contact-info">
                      <h6>Role</h6>
                      <p>{{ this.user.roleEntity.roleName }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="contact-info">
                      <h6>User Name</h6>
                      <p>{{ this.user.username }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="contact-info">
                      <h6>Email</h6>
                      <p>{{ this.user.email }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="contact-info">
                      <h6>Phone Number</h6>
                      <p>{{ this.user.phone }}</p>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="contact-info mb-0">
                      <h6>Bio</h6>
                      <p>
                        Hello! I'm Ronald Richard. I'm passionate about developing
                        innovative software solutions, analyzing classic literature. I
                        aspire to become a software developer, work as an editor. In my
                        free time, I enjoy coding, reading, hiking etc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Student Profile -->
      </div>
    </div>
    <!-- /Pricing Plan -->
  </div>

  <layouts1></layouts1>
</template>
<script>
import { useStore } from 'vuex';
import { ref, onMounted } from "vue";
export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    return {
      title: "My Profile",
      text: "Home",
      text1: "My Profile",
      user
    };
  },
};
</script>

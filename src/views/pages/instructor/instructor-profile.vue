<template>
  <layouts-instructorborder></layouts-instructorborder>

  <student-breadcrumb :title="title" :text="text" :text1="text1" />

  <!-- Page Content -->
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
                      <h6>Registerion Date</h6>
                      <p>{{ this.user.createdDate }} AM</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="contact-info">
                      <h6>Birthday</h6>
                      <p>{{ this.user.birthday }}</p>
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
                      <p> Very well thought out and articulate communication. Clear milestones,
                        deadlines and fast work. Patience. Infinite patience. No shortcuts. Even
                        if the client is being careless. Some quick example text to build on the
                        card title and bulk the card's content Moltin gives you platform. As a
                        highly skilled and successfull product development and design specialist
                        with more than 4 Years of My experience lies in successfully
                        conceptualizing, designing, and modifying consumer products specific to
                        interior design and home furnishings.</p>
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
  <!-- /Page Content -->

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
    }
  },
}
</script>
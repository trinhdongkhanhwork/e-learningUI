<template>
  <!-- sidebar -->
  <div class="col-xl-3 col-lg-3 theiaStickySidebar">
    <div class="stickysidebar">
      <div class="settings-widget dash-profile">
        <div class="settings-menu">
          <div class="profile-bg">
            <div class="profile-img">
              <router-link to="/student/student-profile"
              ><img :src="`${this.user.avatarUrl}`" alt="Img"
              /></router-link>
            </div>
          </div>
          <div class="profile-group">
            <div class="profile-name text-center">
              <h4>
                <router-link to="/student/student-profile"
                >{{ this.user.fullname }}</router-link
                >
              </h4>
              <p>{{ this.user.roleEntity.roleName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="settings-widget account-settings">
        <div class="settings-menu">
          <h3>Dashboard</h3>
          <ul>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-dashboard') }"
            >
              <router-link to="/student/student-dashboard" class="nav-link">
                <i class="bx bxs-tachometer"></i>Dashboard
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-profile') }"
            >
              <router-link to="/student/student-profile" class="nav-link">
                <i class="bx bxs-user"></i>My Profile
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-courses') }"
            >
              <router-link to="/student/student-courses" class="nav-link">
                <i class="bx bxs-graduation"></i>Enrolled Courses
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-wishlist') }"
            >
              <router-link to="/student/student-wishlist" class="nav-link">
                <i class="bx bxs-heart"></i>Wishlist
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-reviews') }"
            >
              <router-link to="/student/student-reviews" class="nav-link">
                <i class="bx bxs-star"></i>Reviews
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{
                active:
                  isActive('/student/student-quiz') ||
                  isActive('/student/student-quiz-details'),
              }"
            >
              <router-link to="/student/student-quiz" class="nav-link">
                <i class="bx bxs-shapes"></i>My Quiz Attempts
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-order-history') }"
            >
              <router-link to="/student/student-order-history" class="nav-link">
                <i class="bx bxs-cart"></i>Order History
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-qa') }"
            >
              <router-link to="/student/student-qa" class="nav-link">
                <i class="bx bxs-bookmark-alt"></i>Question & Answer
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-referral') }"
            >
              <router-link to="/student/student-referral" class="nav-link">
                <i class="bx bxs-user-plus"></i>Referrals
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-messages') }"
            >
              <router-link to="/student/student-messages" class="nav-link">
                <i class="bx bxs-chat"></i>Messages
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-tickets') }"
            >
              <router-link to="/student/student-tickets" class="nav-link">
                <i class="bx bxs-coupon"></i>Support Tickets
              </router-link>
            </li>
          </ul>
          <h3>Account Settings</h3>
          <ul>
            <li
                class="nav-item"
                :class="{ active: isActive('/student/student-settings') }"
            >
              <router-link to="/student/student-settings" class="nav-link">
                <i class="bx bxs-cog"></i>Settings
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/home/" class="nav-link">
                <i class="bx bxs-log-out"></i>Logout
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- /sidebar -->
</template>
<script>
import { useStore } from 'vuex';
import { ref, onMounted } from "vue";
export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    return {
      activeClass: "active",
      Available: ["I am Available Now", "Not Available"],
      user
    };
  },
  methods: {
    isActive(paths) {
      return paths.includes(this.$route.path);
    },
  },
};
</script>

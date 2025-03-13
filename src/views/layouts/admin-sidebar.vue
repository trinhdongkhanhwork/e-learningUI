<template>
  <div class="col-xl-2 col-lg-2 theiaStickySidebar">
    <div class="stickysidebar">
      <div class="settings-widget account-settings">
        <div class="settings-menu">
          <h3>Dashboard</h3>
          <ul>
            <li
                class="nav-item"
                :class="{ active: isActive('/instructor/instructor-dashboard') }"
            >
              <router-link
                  to="/instructor/instructor-dashboard"
                  class="nav-link"
              >
                <i class="bx bxs-tachometer"></i>Dashboard
              </router-link>
            </li>
            <li
                class="nav-item"
                :class="{ active: isActive('/instructor/instructor-profile') }"
            >
              <router-link to="/instructor/instructor-profile" class="nav-link">
                <i class="bx bxs-user"></i>My Profile
              </router-link>
            </li>
          </ul>
          <h3>Admin</h3>
          <ul>
            <li
                class="nav-item"
                :class="{ active: isActive('/instructor/instructor-earnings') }"
            >
              <router-link
                  to="/instructor/instructor-earnings"
                  class="nav-link"
              >
                <i class="bx bxs-badge-dollar"></i>Earnings
              </router-link>
            </li>

            <li
                class="nav-item"
                :class="{ active: isActive('/admin/approval-course') }"
            >
              <router-link
                  to="/admin/approval-course"
                  class="nav-link"
              >
                <i class="bx bxs-badge-dollar"></i>Approve Course
              </router-link>
            </li>

            <li
                class="nav-item"
                :class="{ active: isActive('/admin/approval-instructors') }"
            >
              <router-link
                  to="/admin/approval-instructors"
                  class="nav-link"
              >
                <i class="bx bxs-badge-dollar"></i>Approve Instructor
              </router-link>
            </li>
          </ul>
          <h3>Account Settings</h3>
          <ul>
            <li
                class="nav-item"
                :class="{ active: isActive('/instructor/instructor-settings') }"
            >
              <router-link
                  to="/instructor/instructor-settings"
                  class="nav-link"
              >
                <i class="bx bxs-cog"></i>Settings
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                <i class="bx bxs-log-out"></i>Logout
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {ref, onMounted} from "vue";
import baseApi from "@/axios";

export default {
  data() {
    const user = ref(null);

    function getUserInfo() {
      baseApi
          .get("/users/myInfo")
          .then((response) => {
            user.value = response.data.result;
          })
          .catch((error) => {
            console.error("Error during introspection:", error);
          });
      return user;
    }

    onMounted(() => {
      getUserInfo()
    });

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

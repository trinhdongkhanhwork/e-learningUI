<template>
  <ul class="nav header-navbar-rht align-items-center">
    <li class="nav-item">
      <div>
        <a
            href="#"
            id="dark-mode-toggle"
            ref="darkModeToggle"
            class="dark-mode-toggle"
            @click="enableDarkMode"
        >
          <i class="fa-solid fa-moon"></i>
        </a>
        <a
            href="#"
            id="light-mode-toggle"
            class="dark-mode-toggle"
            ref="lightModeToggle"
            @click="disableDarkMode"
        >
          <i class="fa-solid fa-sun"></i>
        </a>
      </div>
    </li>
    <li class="nav-item" v-if="!user">
      <router-link class="nav-link login-three-head button" to="/">
        <span>Login</span>
      </router-link>
    </li>
    <li class="nav-item" v-if="!user">
      <router-link class="nav-link signin-three-head" to="/register">Register</router-link>
    </li>
    <li class="nav-item" v-else>
      <span class="nav-link">{{ user.fullname }}</span>
      <ul class="nav header-navbar-rht">
        <li class="nav-item user-nav">
          <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
        <span class="user-img">
          <img :src="user?.avatarUrl" alt="Img">
          <span class="status online"></span>
        </span>
          </a>
          <div class="users dropdown-menu dropdown-menu-right" data-popper-placement="bottom-end">
            <div class="user-header">
              <div class="avatar avatar-sm">
                <img :src="user?.avatarUrl" alt="User Image" class="avatar-img rounded-circle">
              </div>
              <div class="user-text">
                <h6> {{user?.fullname}} </h6>
                <p class="text-muted mb-0"> {{user?.roleEntity.roleName}} </p>
              </div>
            </div>
            <router-link
                v-if="user?.roleEntity.roleName === 'INSTRUCTOR'"
                class="dropdown-item"
                to="/instructor/instructor-dashboard"
            ><i class="feather-home me-1"></i>Instructor Dashboard</router-link>
            <router-link
                v-if="user?.roleEntity.roleName === 'STUDENT'"
                class="dropdown-item"
                to="/student/student-dashboard"
            ><i class="feather-home me-1"></i>Student Dashboard</router-link>
            <router-link
                v-if="user?.roleEntity.roleName === 'ADMIN'"
                class="dropdown-item"
                to="/admin/admin-dashboard"
            ><i class="feather-home me-1"></i>Admin Dashboard</router-link>

            <router-link
                v-if="user?.roleEntity.roleName === 'INSTRUCTOR'"
                class="dropdown-item"
                to="/instructor/instructor-settings"
            ><i class="feather-star me-1"></i> Edit Instructor Profile</router-link>
            <router-link
                v-if="user?.roleEntity.roleName === 'STUDENT'"
                class="dropdown-item"
                to="/student/student-settings"
            ><i class="feather-star me-1"></i> Edit Student Profile</router-link>
            <router-link
                v-if="user?.roleEntity.roleName === 'ADMIN'"
                class="dropdown-item"
                to="/admin/admin-settings"
            ><i class="feather-star me-1"></i> Edit Admin Profile</router-link>
            <div class="dropdown-item night-mode">
              <span><i class="feather-moon me-1"></i> Night Mode </span>
              <div class="form-check form-switch check-on m-0">
                <input class="form-check-input" type="checkbox" id="night-mode">
              </div>
            </div>
            <button class="dropdown-item" @click="logout"><i class="feather-log-out me-1"></i> Logout</button>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
import {ref, onMounted} from "vue";
import baseApi from "@/axios";
import {confirmLogout} from "@/utils/confirmDialogs";
import {useStore} from "vuex";

export default {
  setup() {
    const darkModeToggle = ref(null);
    const lightModeToggle = ref(null);
    const store = useStore();
    const user = ref(store.state.userInfo);

    function logout() {
        confirmLogout(store)
    }

    function enableDarkMode() {
      document.documentElement.setAttribute("class", "light dark");
      darkModeToggle.value.classList.remove("activate");
      lightModeToggle.value.classList.add("activate");
      localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
      document.documentElement.setAttribute("class", "light");
      lightModeToggle.value.classList.remove("activate");
      darkModeToggle.value.classList.add("activate");
      localStorage.removeItem("darkMode");
    }

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
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode === "enabled") {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
      getUserInfo()
    });

    return {
      darkModeToggle,
      lightModeToggle,
      enableDarkMode,
      disableDarkMode,
      user,
      logout,
    };
  },
};
</script>


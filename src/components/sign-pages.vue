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
                <h6> {{ user?.fullname }} </h6>
                <p class="text-muted mb-0"> {{ user?.roleEntity.roleName }} </p>
              </div>
            </div>
            <router-link class="dropdown-item" to="/instructor/instructor-dashboard"><i class="feather-home me-1"></i>
              Dashboard
            </router-link>
            <router-link class="dropdown-item" to="/instructor/instructor-settings"><i class="feather-star me-1"></i>
              Edit Profile
            </router-link>
            <div class="dropdown-item night-mode">
              <span><i class="feather-moon me-1"></i> Night Mode </span>
              <div class="form-check form-switch check-on m-0">
                <input class="form-check-input" type="checkbox" id="night-mode">
              </div>
            </div>
            <button @click="logout" class="nav-link">Logout</button>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
import {ref, onMounted} from "vue";
import axios from "axios";

export default {
  setup() {
    const darkModeToggle = ref(null);
    const lightModeToggle = ref(null);
    const user = ref(null);

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

    async function fetchUserInfo() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8080/users/myInfo", {
          headers: {Authorization: `Bearer ${token}`},
        });
        if (response.data.code === 1000) {
          user.value = response.data.result;
          console.log(user.value);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    }

    function logout() {
      user.value = null;
      localStorage.removeItem("token");
    }

    onMounted(() => {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode === "enabled") {
        enableDarkMode();
      } else {
        disableDarkMode();
      }

      fetchUserInfo();
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
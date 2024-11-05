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
      <button @click="logout" class="nav-link">Logout</button>
    </li>
  </ul>
</template>
<script>
import { ref, onMounted } from "vue";
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
          headers: { Authorization: `Bearer ${token}` },
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


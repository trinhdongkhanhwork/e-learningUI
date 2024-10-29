<template>
  <ul class="nav header-navbar-rht" v-if="isHometwoRoute">
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
    <li class="nav-item">
      <router-link class="login-head button" to="/">Login</router-link>
    </li>
    <li class="nav-item">
      <router-link class="signin-head" to="/register">Sign up</router-link>
    </li>
  </ul>
  <ul class="nav header-navbar-rht align-items-center" v-else-if="isHomethreeRoute">
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
    <li class="nav-item">
      <router-link class="nav-link login-three-head button" to="/"
        ><span>Login</span></router-link
      >
    </li>
    <li class="nav-item">
      <router-link class="nav-link signin-three-head" to="/register">Register</router-link>
    </li>
  </ul>
  <ul class="nav header-navbar-rht header-navbar-five" v-else-if="isHomefourRoute">
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
    <li class="nav-item">
      <router-link class="login-five" to="/">Login</router-link>
    </li>
    <li class="nav-item">
      <router-link class="signup-five" to="/register">Signup</router-link>
    </li>
  </ul>
  <ul class="nav header-navbar-rht" v-else>
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
    <li class="nav-item">
      <router-link class="nav-link header-sign" to="/">Signin</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link header-login" to="/register">Signup</router-link>
    </li>
  </ul>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  computed: {
    isHometwoRoute() {
      return this.$route.path === "/home/index-two";
    },
    isHomethreeRoute() {
      return this.$route.path === "/home/index-three";
    },
    isHomefourRoute() {
      return this.$route.path === "/home/index-four";
    },
  },
  setup() {
    const darkModeToggle = ref(null);
    const lightModeToggle = ref(null);

    // Function to enable dark mode
    function enableDarkMode() {
      document.documentElement.setAttribute("class", "light dark");
      darkModeToggle.value.classList.remove("activate");
      lightModeToggle.value.classList.add("activate");
      localStorage.setItem("darkMode", "enabled");
    }

    // Function to disable dark mode
    function disableDarkMode() {
      document.documentElement.setAttribute("class", "light");
      lightModeToggle.value.classList.remove("activate");
      darkModeToggle.value.classList.add("activate");
      localStorage.removeItem("darkMode");
    }

    // Check the current mode on page load
    onMounted(() => {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode === "enabled") {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    });

    return {
      darkModeToggle,
      lightModeToggle,
      enableDarkMode,
      disableDarkMode,
    };
  },
};
</script>

<template>
  <!-- Header -->
  <header class="header header-page">
    <div class="header-fixed">
      <nav
        class="navbar navbar-expand-lg header-nav scroll-sticky"
        :class="{ 'add-header-bg': isSticky }"
      >
        <div class="container-fluid">
          <div class="navbar-header">
            <a
              id="mobile_btn"
              href="javascript:void(0);"
              @click="toggleSidebar"
            >
              <span class="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </a>
            <router-link to="/" class="navbar-brand logo">
              <img src="@/assets/img/logo.svg" class="img-fluid" alt="Logo" />
            </router-link>
          </div>
          <div class="main-menu-wrapper">
            <div class="menu-header">
              <router-link to="/" class="menu-logo">
                <img src="@/assets/img/logo.svg" class="img-fluid" alt="Logo" />
              </router-link>
              <a
                id="menu_close"
                class="menu-close"
                href="javascript:void(0);"
                @click="closeSidebar"
              >
                <i class="fas fa-times"></i>
              </a>
            </div>
<!--            <main-nav></main-nav>-->
          </div>

          <ul class="nav header-navbar-rht">
            <li class="nav-item user-nav">
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
            <li class="nav-item user-nav">
              <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                <span class="user-img">
                  <img src="@/assets/img/user/user16.jpg" alt="Img" />
                  <span class="status online"></span>
                </span>
              </a>
              <div
                class="users dropdown-menu dropdown-menu-right"
                data-popper-placement="bottom-end"
              >
                <div class="user-header">
                  <div class="avatar avatar-sm">
                    <img
                      src="@/assets/img/user/user16.jpg"
                      alt="User Image"
                      class="avatar-img rounded-circle"
                    />
                  </div>
                  <div class="user-text">
                    <h6>Rolands R</h6>
                    <p class="text-muted mb-0">Student</p>
                  </div>
                </div>
                <router-link
                  class="dropdown-item"
                  to="/student/student-dashboard"
                  ><i class="feather-home me-1"></i> Dashboard</router-link
                >
                <router-link
                  class="dropdown-item"
                  to="/student/student-settings"
                  ><i class="feather-user me-1"></i> Profile</router-link
                >
                <router-link
                  class="dropdown-item"
                  to="/student/setting-student-subscription"
                  ><i class="feather-star me-1"></i> Subscription</router-link
                >
                <div class="dropdown-item night-mode">
                  <span><i class="feather-moon me-1"></i> Night Mode </span>
                  <div class="form-check form-switch check-on m-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="night-mode"
                    />
                  </div>
                </div>
                <router-link class="dropdown-item" to="/"
                  ><i class="feather-log-out me-1"></i> Logout</router-link
                >
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div
        class="sidebar-overlay"
        :class="{ opened: isSidebarOpen }"
        @click="closeSidebar"
      ></div>
    </div>
  </header>
  <!-- /Header -->
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  data() {
    return {
      isSticky: false,
      isSidebarOpen: true,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scroll = window.pageYOffset;

      if (scroll >= 100) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      document.documentElement.classList.toggle("menu-opened");
    },
    closeSidebar() {
      this.isSidebarOpen = false;
      document.documentElement.classList.remove("menu-opened");
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

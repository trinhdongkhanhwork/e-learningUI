<template>
  <!-- Header -->
  <header v-bind:class="$route.meta.headerClass">
    <div class="header-fixed">
      <nav
        class="navbar navbar-expand-lg scroll-sticky"
        v-bind:class="$route.meta.NavbarClass"
        :class="{ 'add-header-bg': isSticky }"
      >
        <div class="container">
          <div class="navbar-header">
            <a id="mobile_btn" href="javascript:void(0);" @click="toggleSidebar">
              <span class="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </a>
            <router-link to="/home/" class="navbar-brand logo" v-if="isHomethreeRoute">
              <img src="@/assets/img/logo/logo.png" class="img-fluid" alt="Logo" />
            </router-link>
            <router-link to="/home/" class="navbar-brand logo" v-else-if="isHomefourRoute">
              <img src="@/assets/img/logo/logo-five.png" class="img-fluid" alt="Logo" />
            </router-link>
            <router-link to="/home/" class="navbar-brand logo" v-else>
              <img src="@/assets/img/logo.svg" class="img-fluid" alt="Logo" />
            </router-link>
          </div>
          <div class="main-menu-wrapper">
            <div class="menu-header">
              <router-link to="/home/" class="menu-logo">
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
            <main-nav></main-nav>
          </div>

          <sign-pages></sign-pages>
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
export default {
  data() {
    return {
      isSticky: false,
      isSidebarOpen: true,
    };
  },
  computed: {
    isHomethreeRoute() {
      return this.$route.path === "/home/index-three";
    },
    isHomefourRoute() {
      return this.$route.path === "/home/index-four";
    },
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
};
</script>

<template>
  <!-- Header -->
  <header class="header header-page">
    <div class="header-fixed">
      <nav
        class="navbar navbar-expand-lg header-nav scroll-sticky"
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
            <router-link to="/home/" class="navbar-brand logo">
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
                v-show="isSidebarOpen"
                @click="closeSidebar"
              >
                <i class="fas fa-times"></i>
              </a>
            </div>
            <main-nav></main-nav>
          </div>

          <header-page1></header-page1>
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

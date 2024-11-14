<template>
  <ul class="nav header-navbar-rht align-items-center">
    <!-- Quản lý khóa học hoặc Đăng ký làm giảng viên -->
    <li class="nav-item" v-if="user">
      <router-link v-if="user.roleEntity.roleName === 'INSTRUCTOR'" class="nav-link" to="/instructor/instructor-dashboard">
        <i class="feather-home me-1"></i> Quản lý khóa học
      </router-link>
      <button v-else @click="openRegisterInstructorDialog" class="nav-link">
        <i class="feather-star me-1"></i> Đăng ký làm giảng viên
      </button>
    </li>

    <!-- Nút chuyển chế độ Dark Mode -->
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

    <li class="nav-item" v-if="user">
      <span class="nav-link">{{ user.fullname }}</span>
      <ul class="nav header-navbar-rht">
        <li class="nav-item user-nav">
          <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
            <span class="user-img">
              <img :src="user?.avatarUrl" alt="Img">
              <span class="status online"></span>
            </span>
          </a>
          <div class="users dropdown-menu dropdown-menu-right">
            <div class="user-header">
              <div class="avatar avatar-sm">
                <img :src="user?.avatarUrl" alt="User Image" class="avatar-img rounded-circle">
              </div>
              <div class="user-text">
                <h6>{{ user?.fullname }}</h6>
                <p class="text-muted mb-0">{{ user?.roleEntity.roleName }}</p>
              </div>
            </div>
            <router-link class="dropdown-item" to="/instructor/instructor-dashboard"><i class="feather-home me-1"></i>
              Dashboard
            </router-link>
            <router-link class="dropdown-item" to="/instructor/instructor-settings"><i class="feather-star me-1"></i>
              Edit Profile
            </router-link>
            <button @click="logout" class="nav-link">Logout</button>
          </div>
        </li>
      </ul>
    </li>
  </ul>

  <!-- Dialog đăng ký làm giảng viên -->
  <div v-if="showRegisterDialog" class="dialog-backdrop">
    <div class="dialog">
      <h3>Đăng ký làm giảng viên</h3>
      <p>Bạn có chắc chắn muốn đăng ký làm giảng viên không?</p>
      <label>
        <input type="checkbox" v-model="agreedToTerms" /> Tôi đồng ý với điều khoản và điều kiện
      </label>
      <button :disabled="!agreedToTerms" @click="registerAsInstructor">Đăng ký</button>
      <button @click="closeRegisterInstructorDialog">Đóng</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const darkModeToggle = ref(null);
    const lightModeToggle = ref(null);
    const user = ref(null);
    const showRegisterDialog = ref(false);
    const agreedToTerms = ref(false);

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
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    }

    function openRegisterInstructorDialog() {
      showRegisterDialog.value = true;
    }

    function closeRegisterInstructorDialog() {
      showRegisterDialog.value = false;
      agreedToTerms.value = false;
    }

    async function registerAsInstructor() {
      if (!user.value || !user.value.id) return;

      try {
        await axios.put(`http://localhost:8080/users/updateRoles/${user.value.id}`, null, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        user.value.roleEntity.roleName = "INSTRUCTOR";
        closeRegisterInstructorDialog();
        alert("Đăng ký làm giảng viên thành công!");
      } catch (error) {
        console.error("Lỗi khi đăng ký làm giảng viên:", error);
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
      showRegisterDialog,
      agreedToTerms,
      openRegisterInstructorDialog,
      closeRegisterInstructorDialog,
      registerAsInstructor,
    };
  },
};
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>

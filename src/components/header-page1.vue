<template>
  <ul class="nav header-navbar-rht">
    <li class="nav-item user-nav">
      <div>
        <a href="#" id="dark-mode-toggle" ref="darkModeToggle" class="dark-mode-toggle" @click="enableDarkMode">
          <i class="fa-solid fa-moon"></i>
        </a>
        <a href="#" id="light-mode-toggle" class="dark-mode-toggle" ref="lightModeToggle" @click="disableDarkMode">
          <i class="fa-solid fa-sun"></i>
        </a>
      </div>
    </li>
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
            <p class="text-muted mb-0"> {{ userRoles }} </p>
          </div>
        </div>
        <router-link v-if="userRoles === 'INSTRUCTOR'" class="dropdown-item" to="/instructor/instructor-dashboard"><i
            class="feather-home me-1"></i>Instructor Dashboard</router-link>

        <router-link v-if="isRegisterInstructor === false" class="dropdown-item"
          @click.prevent="showConfirmPopup = true">
          <i class="feather-home me-1"></i>Register Instructor
        </router-link>

        <router-link v-if="userRoles === 'STUDENT'" class="dropdown-item" to="/student/student-dashboard"><i
            class="feather-home me-1"></i>Student Dashboard</router-link>
        <router-link v-if="userRoles === 'ADMIN'" class="dropdown-item" to="/admin/admin-dashboard"><i
            class="feather-home me-1"></i>Admin Dashboard</router-link>

        <router-link v-if="userRoles === 'INSTRUCTOR'" class="dropdown-item" to="/instructor/instructor-settings"><i
            class="feather-star me-1"></i> Edit Instructor Profile</router-link>
        <router-link v-if="userRoles === 'STUDENT'" class="dropdown-item" to="/student/student-settings"><i
            class="feather-star me-1"></i> Edit Student Profile</router-link>
        <router-link v-if="userRoles === 'ADMIN'" class="dropdown-item" to="/admin/admin-settings"><i
            class="feather-star me-1"></i> Edit Admin Profile</router-link>
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
  <div v-if="showConfirmPopup" class="popup-overlay">
    <div class="popup-content">
      <p>Bạn có chắc chắn muốn trở thành giảng viên?</p>
      <button @click="confirmRegisterInstructor">Xác nhận</button>
      <button @click="showConfirmPopup = false">Hủy</button>
    </div>
  </div>

  <div v-if="showSuccessPopup" class="popup-overlay">
    <div class="popup-content">
      <p>Cảm ơn bạn đã đăng ký trở thành giảng viên!</p>
      <button @click="showSuccessPopup = false">OK</button>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { confirmLogout } from "@/utils/confirmDialogs";
import { useStore } from "vuex";
import axios from 'axios';


export default {
  setup() {
    const darkModeToggle = ref(null);
    const lightModeToggle = ref(null);
    const store = useStore();
    const user = ref(store.state.userInfo);
    const userRoles = computed(() => user.value?.roles.map(role => role.roleName).join(', '));
    const isRegisterInstructor = ref(true);
    const showConfirmPopup = ref(false);
    const showSuccessPopup = ref(false);

    // Function to enable dark mode
    function enableDarkMode() {
      document.documentElement.setAttribute("class", "light dark");
      darkModeToggle.value.classList.remove("activate");
      lightModeToggle.value.classList.add("activate");
      localStorage.setItem("darkMode", "enabled");
    }

    function logout() {
      confirmLogout(store);
    }

    // Function to disable dark mode
    function disableDarkMode() {
      document.documentElement.setAttribute("class", "light");
      lightModeToggle.value.classList.remove("activate");
      darkModeToggle.value.classList.add("activate");
      localStorage.removeItem("darkMode");
    }

    async function checkRegisterInstructor() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/users/isRegisterInstructor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        isRegisterInstructor.value = response.data === true;
      } catch (error) {
        console.error("Error checking instructor registration:", error);
        isRegisterInstructor.value = true;
      }
    }

    async function confirmRegisterInstructor() {
      try {
        const token = localStorage.getItem("token");
        await axios.put("http://localhost:8080/users/registerInstructor", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showConfirmPopup.value = false;
        showSuccessPopup.value = true;
        isRegisterInstructor.value = true; // cập nhật để ẩn mục menu
      } catch (error) {
        console.error("Đăng ký giảng viên thất bại:", error);
        alert("Đăng ký thất bại, vui lòng thử lại!");
      }
    }

    // Check the current mode on page load
    onMounted(() => {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode === "enabled") {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
      checkRegisterInstructor();
    });

    return {
      darkModeToggle,
      lightModeToggle,
      enableDarkMode,
      disableDarkMode,
      logout,
      user,
      userRoles,
      isRegisterInstructor,
      showConfirmPopup,
      showSuccessPopup,
      confirmRegisterInstructor,
    };
  },
};
</script>
<style scoped>
.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.popup-content button {
  margin: 5px;
}
</style>


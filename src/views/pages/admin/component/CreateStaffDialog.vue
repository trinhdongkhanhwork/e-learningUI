<template>
  <transition name="fade">
    <div v-if="visible" class="dialog-overlay" @click.self="closeDialog">
      <transition name="fade">
        <div v-if="visible" class="dialog-content"  >
          <header class="dialog-header">
            <h2>Staff Information</h2>
            <button @click="closeDialog" class="close-button">&times;</button>
          </header>

          <form class="dialog-body">
            <div class="card mb-3">
              <div class="row g-0 d-flex align-items-center">
                <div class="col-md-4">
                  <div class="align-self-center">
                    <img :src="staffInfo.avatarUrl" class="img-fluid rounded-start" style="width: 400px; height: 500px; overflow: hidden;"/>
                    <input type="file" class="mt-2" @change="handleFileUpload" accept="image/*">
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card-body scrollable-form">
                    <form @submit.prevent="saveStaff" class="form-control text-start">
                      <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" v-model="staffInfo.username" placeholder="Enter Staff Name" required>
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" v-model="staffInfo.password" placeholder="Enter Staff Password" required>
                      </div>
                      <div class="mb-3">
                        <label for="fullname" class="form-label">Full Name</label>
                        <input type="text" class="form-control" v-model="staffInfo.fullname" placeholder="Enter Staff Username" required>
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" v-model="staffInfo.email" placeholder="Enter Staff Email" required>
                      </div>
                      <div class="mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" v-model="staffInfo.phone" placeholder="Enter Staff Phone" required>
                      </div>
                      <div class="mb-3">
                        <label for="birthday" class="form-label">Birthday</label>
                        <input type="text" class="form-control" v-model="staffInfo.birthday" placeholder="Enter Staff Birthday" required>
                      </div>
                      <div class="mb-3">
                        <label for="gender" class="form-label">Gender</label>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" id="genderMale" value="MALE" v-model="staffInfo.gender">
                          <label class="form-check-label" for="genderMale">Male</label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" id="genderFemale" value="FEMALE" v-model="staffInfo.gender">
                          <label class="form-check-label" for="genderFemale">Female</label>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="permissions" class="form-label">Permissions</label>
                        <multiselect
                            v-model="staffInfo.permissions"
                            :options="options"
                            :multiple="true"
                            placeholder="Search and select multiple"
                            label="name"
                            track-by="name">
                        </multiselect>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <footer class="dialog-footer">
            <div class="d-flex justify-content-between">
              <input type="submit" class="button btn-outline-primary m-2" @click="saveStaff" value="Save">
              <button @click="closeDialog" class="btn btn-outline-secondary m-2">Close</button>
            </div>
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>

import baseApi from "@/axios";
import toast from "@/utils/Toast";
import Multiselect from 'vue-multiselect'


export default {
  name: "CreateStaffDialog",
  data() {
    return {
      staffInfo: {
        username: "",
        password: "",
        fullname: "",
        email: "",
        phone: "",
        birthday: "",
        gender: null,
        avatarUrl: null,
        permissions: [],
      },
      selected: null,
      options: [

      ]
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    Multiselect
  },
  emits: ["close"],
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    },
    handleFileUpload(event) {
      const avatarUrl = event.target.files[0];
      // Tải ảnh lên S3
      const formData = new FormData();
      formData.append("img", avatarUrl);
      baseApi.post("/api/s3/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
          .then(response => {
            this.staffInfo.avatarUrl = response.data.result.urlImg;
            console.log("Avatar URL:", this.staffInfo.avatarUrl);
            toast.success("Uploaded cover image successfully.");
          })
          .catch(error => {
            console.error("Error occurred while uploading file:", error);
            toast.error("Error occurred while uploading cover image.");
          });
    },
    saveStaff() {
      // Validate form fields
      if (!this.staffInfo.username) {
        toast.error("Username is required.");
        return;
      }
      if (!this.staffInfo.password) {
        toast.error("Password is required.");
        return;
      }
      if (!this.staffInfo.fullname) {
        toast.error("Full Name is required.");
        return;
      }
      if (!this.staffInfo.email) {
        toast.error("Email is required.");
        return;
      }
      if (!this.staffInfo.phone) {
        toast.error("Phone is required.");
        return;
      }
      if (!this.staffInfo.birthday) {
        toast.error("Birthday is required.");
        return;
      }
      if (!this.staffInfo.gender) {
        toast.error("Gender is required.");
        return;
      }

      // Map permissions and send API request
      this.staffInfo.permissions = this.staffInfo.permissions.map(permission => permission.name);
      console.log("Staff Info:", this.staffInfo);
      baseApi.post("/api/v1/CreatAccountStaff", this.staffInfo)
          .then(response => {
            if (response.status === 200) {
              toast.success("Staff created successfully.");
              this.$emit("staff-added");
              this.closeDialog();
            } else {
              toast.error("Failed to create staff.");
            }
          })
          .catch(error => {
            console.error("Error occurred while creating staff:", error);
            toast.error("Error occurred while creating staff.");
          });
    },
    getAllPermissions() {
      baseApi.get("/api/v1/getAllPermissions")
          .then(response => {
            console.log("Response:", response.data);
            if (response.status === 200) {
              this.options = response.data;
            } else {
              toast.error("Failed to fetch permissions.");
            }
          })
          .catch(error => {
            console.error("Error occurred while fetching permissions:", error);
            toast.error("Error occurred while fetching permissions.");
          });
    }
  },
  mounted() {
    this.getAllPermissions();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

.scrollable-form {
  height: 80vh;        /* chiều cao bằng 80% chiều cao màn hình */
  overflow-y: scroll;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: scale(0.80);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Transition Styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.dialog-body {
  padding: 10px 0;
}

.dialog-row {
  display: flex;
  gap: 20px;
}

/* Footer Button */

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #45a049;
}

</style>

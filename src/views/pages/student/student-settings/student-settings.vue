<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <student-sidebar></student-sidebar>
        <!-- /Sidebar -->

        <!-- Student Settings -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Settings</h3>
                <p>You have full control to manage your own account settings</p>
              </div>
              <settings-sidebar></settings-sidebar>
              <form @submit.prevent="saveChanges">
                <div class="course-group profile-upload-group mb-0 d-flex">
                  <div class="course-group-img profile-edit-field d-flex align-items-center">
                    <router-link to="/student/student-profile" class="profile-pic">
                      <img :src="user.avatarUrl || '/default-avatar.png'" alt="Avatar" class="img-fluid" />
                    </router-link>
                    <div class="profile-upload-head">
                      <h4>
                        <router-link to="/student/student-profile">Your avatar</router-link>
                      </h4>
                      <p>PNG or JPG no bigger than 800px width and height</p>
                      <div class="new-employee-field">
                        <div class="d-flex align-items-center mt-2">
                          <div class="image-upload mb-0">
                            <input type="file" @change="handleAvatarChange" />
                            <div class="image-uploads">
                              <i class="bx bx-cloud-upload"></i>
                            </div>
                          </div>
                          <!-- Xóa phần icon thùng rác -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="checkout-form settings-wrap">
                  <div class="edit-profile-info">
                    <h5>Personal Details</h5>
                    <p>Edit your personal information</p>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="input-block">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" v-model="editedUser.fullname" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="input-block">
                        <label class="form-label">User Name</label>
                        <input type="text" class="form-control" v-model="editedUser.username" disabled />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="input-block">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" v-model="editedUser.email" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="input-block">
                        <label class="form-label">Phone Number</label>
                        <input type="text" class="form-control" v-model="editedUser.phone" />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <button class="btn btn-primary" type="submit">Update Profile</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /Student Settings -->
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import baseApi from '@/axios';
import{confirmSave} from'@/utils/confirmDialogs'
import Swal from 'sweetalert2'; // Import SweetAlert2 for success/error messages

export default {
  setup() {
    const store = useStore();
    const user = ref(store.state.userInfo || {});
    return { user, store };
  },
  data() {
    return {
      title: 'Settings',
      text: 'Home',
      text1: 'Settings',
      editedUser: {},
      avatarFile: null,
    };
  },
  created() {
    this.editedUser = { ...this.user };
  },
  methods: {
    handleAvatarChange(event) {
      this.avatarFile = event.target.files[0];
    },
    async saveChanges() {
      // Show confirmation dialog before saving
      const result = await confirmSave();
      if (!result.isConfirmed) return; // Exit if user cancels

      try {
        // Validate email
        const email = this.editedUser.email || this.user.email;
        if (!email) {
          Swal.fire('Error!', 'Email cannot be empty!', 'error');
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check
        if (!emailRegex.test(email)) {
          Swal.fire('Error!', 'Please enter a valid email address!', 'error');
          return;
        }

        // Validate phone number
        const phone = this.editedUser.phone || this.user.phone || '';
        if (!phone) {
          Swal.fire('Error!', 'Phone number cannot be empty!', 'error');
          return;
        }
        const phoneRegex = /^\d{10}$/; // Exactly 10 digits
        if (!phoneRegex.test(phone)) {
          Swal.fire('Error!', 'Phone number must be exactly 10 digits!', 'error');
          return;
        }

        let avatarUrl = this.user.avatarUrl; // Default to existing avatar URL

        // Upload new avatar if a file is selected
        if (this.avatarFile) {
          const formData = new FormData();
          formData.append('img', this.avatarFile);

          const uploadResponse = await baseApi.post('/api/s3/upload/image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          avatarUrl = uploadResponse.data.result.urlImg;
          console.log('Uploaded avatar URL:', avatarUrl);
        }

        // Prepare profile data
        const profileData = new FormData();
        profileData.append('fullname', this.editedUser.fullname || this.user.fullname || '');
        profileData.append('email', email);
        profileData.append('phone', phone);
        if (avatarUrl) {
          profileData.append('avatarUrl', avatarUrl);
        }

        console.log('Sending profileData:', Object.fromEntries(profileData));

        // Update profile
        const response = await baseApi.put(`/users/profile/${this.user.id}`, profileData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const updatedUser = response.data.result;
        console.log('Received updatedUser:', updatedUser);

        // Update Vuex store and local state
        this.store.commit('setUserInfo', updatedUser);
        this.user = updatedUser;
        this.editedUser = { ...updatedUser };
        this.avatarFile = null;

        // Show success message
        Swal.fire('Success!', 'Profile updated successfully!', 'success');
      } catch (error) {
        console.error('Error updating profile:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
        Swal.fire('Error!', 'Failed to update profile: ' + (error.message || 'Unknown error'), 'error');
      }
    },
  },
};
</script>
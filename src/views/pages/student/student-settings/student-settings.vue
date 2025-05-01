<template>
  <layouts-index></layouts-index>
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
                        <input type="text" class="form-control" v-model.trim="editedUser.fullname" @input="validateFullName" />
                        <span v-if="errors.fullname" class="text-danger">{{ errors.fullname }}</span>
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
                        <input type="email" class="form-control" v-model.trim="editedUser.email" @input="validateEmail" />
                        <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="input-block">
                        <label class="form-label">Phone Number</label>
                        <input type="text" class="form-control" v-model.trim="editedUser.phone" @input="validatePhone" />
                        <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <button class="btn btn-primary" type="submit" :disabled="hasErrors">Update Profile</button>
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
import { ref, computed } from 'vue';
import baseApi from '@/axios';
import { confirmSave } from '@/utils/confirmDialogs';
import Swal from 'sweetalert2';

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
      errors: {
        fullname: '',
        email: '',
        phone: '',
      },
    };
  },
  created() {
    this.editedUser = { ...this.user };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some(error => error !== '');
    },
  },
  methods: {
    handleAvatarChange(event) {
      this.avatarFile = event.target.files[0];
    },
    validateFullName() {
      const value = this.editedUser.fullname || '';
      this.errors.fullname = value.trim() ? '' : 'Full Name is required';
    },
    validateEmail() {
      const value = this.editedUser.email || '';
      if (!value.trim()) {
        this.errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        this.errors.email = 'Please enter a valid email address';
      } else {
        this.errors.email = '';
      }
    },
    validatePhone() {
      const value = this.editedUser.phone || '';
      if (!value.trim()) {
        this.errors.phone = 'Phone Number is required';
      } else if (!/^\d{10}$/.test(value)) {
        this.errors.phone = 'Phone Number must be exactly 10 digits';
      } else {
        this.errors.phone = '';
      }
    },
    async saveChanges() {
      // Validate tất cả trước khi gửi
      this.validateFullName();
      this.validateEmail();
      this.validatePhone();

      if (this.hasErrors) {
        return;
      }

      const result = await confirmSave();
      if (!result.isConfirmed) return;

      try {
        let avatarUrl = this.user.avatarUrl;

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

        const profileData = new FormData();
        profileData.append('fullname', this.editedUser.fullname);
        profileData.append('email', this.editedUser.email);
        profileData.append('phone', this.editedUser.phone);
        if (avatarUrl) {
          profileData.append('avatarUrl', avatarUrl);
        }

        console.log('Sending profileData:', Object.fromEntries(profileData));

        const response = await baseApi.put(`/users/profile/${this.user.id}`, profileData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const updatedUser = response.data.result;
        console.log('Received updatedUser:', updatedUser);

        this.store.commit('setUserInfo', updatedUser);
        this.user = updatedUser;
        this.editedUser = { ...updatedUser };
        this.avatarFile = null;
        this.errors = { fullname: '', email: '', phone: '' };

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

<style scoped>
.text-danger {
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}
</style>
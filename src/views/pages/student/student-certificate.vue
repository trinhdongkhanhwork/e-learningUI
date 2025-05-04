<template>
  <layouts-index></layouts-index>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <student-sidebar></student-sidebar>
        <!-- /Sidebar -->

        <!-- Student Certificate History -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Certificate</h3>
              </div>
              <div class="checkout-form">
                <div class="tab-content">
                  <div class="table-responsive custom-table">
                    <table class="table table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Course name</th>
                          <th>Completion date</th>
                          <th>Instructor</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="certificate in certificates" :key="certificate.id">
                          <td>{{ certificate.id }}</td>
                          <td>
                            <span class="title-course">{{ certificate.courseResponse.title }}</span>
                          </td>
                          <td>{{ formatDate(certificate.issuedAt) }}</td>
                          <td>{{ certificate.courseResponse.instructor.fullname }}</td>
                          <td>
                            <a href="javascript:void(0);" class="action-icon" @click="showCertificateDialog(certificate)">
                              <i class="bx bxs-show"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Student Certificate History -->
      </div>
    </div>
  </div>

  <!-- Dialog hiển thị thông tin chứng chỉ -->
  <div v-if="showDialog" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
    <div style="background: white; padding: 24px; border-radius: 8px; max-width: 700px; width: 100%; position: relative;">
      <!-- Dấu X ở góc trên bên phải -->
      <button @click="closeDialog" style="position: absolute; top: 8px; right: 8px; background: transparent; border: none; font-size: 24px; cursor: pointer; color: #6b7280;">&times;</button>
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Certificate of Completion</h2>
      <div style="margin-bottom: 16px;">
        <strong>Course:</strong> {{ selectedCertificate?.courseResponse.title || 'N/A' }}
      </div>
      <div style="margin-bottom: 16px;">
        <img :src="selectedCertificate?.courseResponse.coverImage" alt="Course Cover" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-top: 8px;" @error="handleImageError" />
      </div>
      <div style="margin-bottom: 16px;">
        <strong>Level:</strong> {{ selectedCertificate?.courseResponse.level || 'N/A' }}
      </div>
      <div style="margin-bottom: 16px;">
        <strong>Instructor:</strong> {{ selectedCertificate?.courseResponse.instructor.fullname || 'N/A' }}
      </div>
      <div style="margin-bottom: 16px;">
        <strong>Completion date:</strong> {{ formatDate(selectedCertificate?.issuedAt) }}
      </div>
    </div>
  </div>

  <layouts1></layouts1>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCertificates } from '@/service/certificateService/certificateService';
import moment from 'moment';

const title = 'Certificates';
const text = 'Home';
const text1 = 'Certificates';

// Sử dụng composable useCertificates
const { certificates, fetchCertificates } = useCertificates();

const showDialog = ref(false);
const selectedCertificate = ref(null);

const formatDate = (date) => {
  return date ? moment(date).format('DD/MM/YYYY') : 'N/A';
};

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/150'; 
};

const showCertificateDialog = (certificate) => {
  console.log('Clicked show icon for certificate:', certificate);
  selectedCertificate.value = certificate;
  showDialog.value = true;
  console.log('showDialog:', showDialog.value);
};

const closeDialog = () => {
  showDialog.value = false;
  selectedCertificate.value = null;
};

onMounted(() => {
  console.log('Fetching certificates...');
  fetchCertificates();
});
</script>

<style scoped>
.action-icon {
  cursor: pointer;
}
</style>
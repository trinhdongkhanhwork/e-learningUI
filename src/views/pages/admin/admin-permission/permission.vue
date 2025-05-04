<template>
  <layouts></layouts>
  <admin-breadcrumb :title="title" :text="text" :text1="text1"></admin-breadcrumb>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <!-- sidebar -->
        <admin-sidebar></admin-sidebar>
        <!-- /Sidebar -->
        <div class="col-xl-10 col-lg-10">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Permission</h4>
              <button
                  class="btn btn-outline-info m-3"
                  @click="showAddModal"
              >
                <i class="bx bx-plus"></i> Add New Staff
              </button>
              <div class="table-responsive">
                <table class="table border table-hover table-nowrap table-centered m-0 text-center">
                  <thead>
                  <tr>
                    <th scope="col" class="text-start">NO.</th>
                    <th scope="col" class="text-start">Image</th>
                    <th scope="col" class="text-start">Full Name</th>
                    <th scope="col" class="text-start">Status</th>
                    <th scope="col" style="width: 125px;">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(stf, index) in listStaff" :key="index">
                    <td class="text-start" style="width: 50px;">
                      <span>{{index + 1}}</span>
                    </td>
                    <td class="text-start" style="width: 200px;">
                      <img :src="stf.avatarUrl" alt="user-img" class="avatar-md" width="70px">
                    </td>
                    <td class="text-start">
                      <span class="link-type" @click="showInfoStaff(stf)">{{stf.fullname}}</span>
                    </td>
                    <td class="text-start">
                      <span :class="['badge', stf.enabled ? 'badge-soft-success' : 'badge-soft-warning', 'text-sm']">{{stf.enabled ? 'Active' : 'Suspension'}}</span>
                    </td>
                    <td>
                      <div class="d-flex gap-3 mb-3">
                        <button type="button" class="btn btn-success btn-sm me-auto p-2" v-if="!stf.enabled" @click="openStatusDialog(stf, true)">Active</button>
                        <button type="button" class="btn btn-warning btn-sm me-auto p-2" v-else @click="openStatusDialog(stf, false)">Suspension</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="handleDelete(stf, index)">Ban</button>
                      </div>
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

    <!-- Modal -->
    <create-staff-dialog :visible="dialogCreateStaffVisible" @close="dialogCreateStaffVisible = false" @staff-added="getAllStaff"></create-staff-dialog>
    <staff-dialog :staff="staff" :visible="dialogInfoStaff" @close="dialogInfoStaff = false"></staff-dialog>
    <message-dialog :visible="dialogStatusVisible" :statusMessage="statusMessage" @close="dialogStatusVisible = false" @message="handleModifyStatus"></message-dialog>
<!-- -->
  </div>
  <layouts1></layouts1>
</template>
<script>
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";
import CreateStaffDialog from "@/views/pages/admin/component/CreateStaffDialog.vue";
import baseApi from "@/axios";
import StaffDialog from "@/views/pages/admin/component/StaffDialog.vue";
import MessageDialog from "@/views/pages/admin/component/MessageDialog.vue";
import {ref} from "vue";
import toast from "@/utils/Toast";
import {confirmDelete, confirmSave} from "@/utils/confirmDialogs";

export default {
  components: { AdminBreadcrumb, AdminSidebar , CreateStaffDialog, StaffDialog, MessageDialog},
  data() {
    return {
      dialogCreateStaffVisible: false,
      dialogInfoStaff: false,
      dialogStatusVisible: false,
      statusMessage: '',
      listStaff: [],
      staff: ref(
          {

          }
      ),
      temp: ref(
          {

          }
      ),
      selectedStaff: null,
    };
  },
  methods: {
    showAddModal() {
      this.dialogCreateStaffVisible = true;
    },
    getAllStaff() {
      baseApi.get("/api/v1/getAllStaffs").then((response) => {
        this.listStaff = response.data;
        console.log(this.listStaff);
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
    },
    showInfoStaff(staff) {
      this.staff = Object.assign({}, staff) // copy obj
      console.log(this.staff);
      this.dialogInfoStaff = true
    },
    openStatusDialog(row, status) {
      this.selectedStaff = row
      this.dialogStatusVisible = true
      this.temp.enabled = status
    },
    handleModifyStatus(message) {
      this.statusMessage = message;
      confirmSave().then(() => {
        this.selectedStaff.enabled = this.temp.enabled;
        this.sendStatusEmail();
        toast.info('Sending email...')
      }).catch(() => {
        this.statusLoading = false;
        this.dialogStatusVisible = false;
      })
      this.statusLoading = false;
      this.dialogStatusVisible = false;
    },
    sendStatusEmail() {
      const approvedCourseRequest = {
        username: this.selectedStaff.username,
        email: this.selectedStaff.email,
        accountStatus: this.temp.enabled,
        text: this.statusMessage
      }
      // Call your REST API to send the email
      baseApi.post('/api/v1/emailStaff', approvedCourseRequest).then(response => {
        console.log('Email sent successfully:', response.data)
        toast.success(response.data.message)
      }).catch(error => {
        console.error('Error sending email:', error)
        toast.error('Error sending email')
      })
    },
    handleDelete(row, index) {
      confirmDelete().then(() => {
        baseApi.delete(`/users/${row.id}`).then(response => {
          console.log('Staff deleted successfully:', response.data)
          this.listStaff.splice(index, 1)
          toast.success("Staff deleted successfully")
        }).catch(error => {
          console.error('Error deleting Staff:', error)
          toast.error('Error deleting Staff')
        })
      }).catch(() => {
        toast.error('Delete canceled')
      })
    },
  },
  mounted() {
    this.getAllStaff();
  },
};
</script>

<style scoped>
  .link-type {
    cursor: pointer;
    color: #007bff;
  }
  .link-type:hover {
    text-decoration: underline;
  }
  .avatar-md {
    border-radius: 50%;
  }
  .avatar-md:hover {
    transform: scale(1.05);
    transition: transform 0.2s;
  }
  .table-responsive {
    overflow-x: auto;
  }
  .table th, .table td {
    vertical-align: middle;
  }
  .table th {
    background-color: #f8f9fa;
  }
  .table td {
    background-color: #ffffff;
  }
  .table th, .table td {
    padding: 1rem;
  }
  .table th {
    font-weight: bold;
  }
  .table td {
    font-size: 0.9rem;
  }
  .table thead th {
    border-bottom: 2px solid #dee2e6;
  }
  .table tbody tr:hover {
    background-color: #f1f1f1;
  }
  .table tbody tr {
    transition: background-color 0.3s;
  }
  .table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .table tbody tr:nth-child(odd) {
    background-color: #ffffff;
  }
  .table tbody tr:hover {
    background-color: #e9ecef;
  }
</style>

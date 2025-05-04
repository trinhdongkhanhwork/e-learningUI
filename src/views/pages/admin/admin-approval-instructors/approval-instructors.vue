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
              <h4 class="card-title">Instructor Approval</h4>
              <div class="table-responsive">
                <table class="table border table-hover table-nowrap table-centered m-0 text-center">
                  <thead>
                  <tr>
                    <th scope="col">Avatar</th>
                    <th scope="col" class="text-start">User Name</th>
                    <th scope="col" class="text-start">Instructor</th>
                    <th scope="col" class="text-start">Email</th>
                    <th scope="col" class="text-start">Phone</th>
                    <th scope="col">Active</th>
                    <th scope="col" style="width: 125px;">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(user, index) in list" :key="index">
                    <td>
                      <img :src="user.avatarUrl" alt="user-img" class="avatar-md" width="70px">
                    </td>
                    <td class="text-start">
                      <span class="link-type" @click="showInfoInstructor(user)">{{user.username}}</span>
                    </td>
                    <td class="text-start">
                      <span>{{user.roles.map(role => role.roleName).join(', ')}}</span>
                    </td>
                    <td class="text-start">
                      <span class="text-muted">{{user.email}}</span>
                    </td>
                    <td class="text-start">
                      <span class="text-muted">{{user.phone}}</span>
                    </td>
                    <td>
                      <span :class="['badge', user.active ? 'badge-soft-success' : 'badge-soft-warning', 'text-sm']">{{user.active ? 'Published' : 'Draft'}}</span>
                    </td>
                    <td>
                      <div class="d-flex justify-content-center gap-3">
                        <button type="button" class="btn btn-success btn-sm" v-if="!user.active" @click="openStatusDialog(user, true)">Approve</button>
                        <button type="button" class="btn btn-warning btn-sm" v-else @click="openStatusDialog(user, false)">Draft</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="handleDelete(user, index)">Reject</button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
<!--          <div class="dash-pagination">-->
<!--            <div class="row align-items-center">-->
<!--              <div class="col-6">-->
<!--                <p>Page {{ listQuery.page + 1 }} of {{ Math.ceil(total / listQuery.size) }}</p>-->
<!--              </div>-->
<!--              <div class="col-6">-->
<!--                <ul class="pagination">-->
<!--                  <li :class="{ disabled: listQuery.page === 0 }">-->
<!--                    <button @click="changePage(listQuery.page - 1)">Previous</button>-->
<!--                  </li>-->
<!--                  <li :class="{ disabled : listQuery.page === totalPages - 1 }">-->
<!--                    <button @click="changePage(listQuery.page + 1)">Next</button>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

        </div>
      </div>
    </div>

    <!-- Modal -->
    <instructor-dialog :visible="dialogInfoInstructorVisible" :instructor="instructor" @close="dialogInfoInstructorVisible = false"></instructor-dialog>

    <message-dialog :visible="dialogStatusVisible" :statusMessage="statusMessage" @close="dialogStatusVisible = false" @message="handleModifyStatus"></message-dialog>
  </div>
  <layouts1></layouts1>
</template>
<script>
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";
import baseApi from "@/axios";
import InstructorDialog from "@/views/pages/admin/component/InstructorDialog.vue";
import MessageDialog from "@/views/pages/admin/component/MessageDialog.vue";
import {ref} from "vue";
import toast from "@/utils/Toast";
import { confirmDelete, confirmSave } from "@/utils/confirmDialogs";
import Layouts from "@/views/layouts/layouts-header.vue";

export default {
  components: {Layouts, AdminBreadcrumb, AdminSidebar, InstructorDialog, MessageDialog },
  data() {
    return {
      title: "Dashboard",
      text: "Home",
      text1: "Dashboard",
      list: null,
      total: 0,
      listLoading: true,
      totalPages: 0,
      listQuery: {
        page: 0,
        size: 5,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      temp: ref(
          {

          }
      ),
      instructor: ref(
          {

          }
      ),
      dialogStatusVisible: false,
      dialogInfoInstructorVisible: false,
      statusMessage: '',
      statusLoading: false,
    };
  },
  methods: {
    async getAllUsers() {
      this.listLoading = true;
      await baseApi
          .get('/users/getListUsersUpdateTeacher')
          .then((response) => {
            this.list = response.data.result;
            console.log('List users:', this.list);
            this.listLoading = false;
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
            toast.error('Error fetching users');
            this.listLoading = false;
          });
    },
    changePage(page) {
      if (page < 0 || page >= this.totalPages) {
        // Không cho phép chuyển trang ngoài giới hạn
        return;
      }
      this.listQuery.page = page;
      this.getAllCourses();
      console.log('Page:', page);
    },


    async handleModifyStatus(message) {
      this.statusLoading = true;
      this.statusMessage = message;
      confirmSave().then(() => {
        this.selectedCourse.published = this.temp.published;
        this.sendStatusEmail();
        toast.info('Sending email...')
      }).catch(() => {
        this.statusLoading = false;
        this.dialogStatusVisible = false;
      })
      this.statusLoading = false;
      this.dialogStatusVisible = false;
    },

    showInfoInstructor(instructor) {
      this.instructor = Object.assign({}, instructor) // copy obj
      console.log(this.instructor);
      this.dialogInfoInstructorVisible = true
    },

    handleDelete(row, index) {
      confirmDelete().then(() => {
        baseApi.delete(`/api/v1/courses/${row.id}`).then(response => {
          this.list.splice(index, 1)
          toast.success(response.data.message)
        }).catch(error => {
          console.error('Error deleting course:', error)
          toast.error('Error deleting course')
        })
      }).catch(() => {
        toast.error('Delete canceled')
      })
    },

    openStatusDialog(row, status) {
      this.selectedCourse = row
      this.dialogStatusVisible = true
      this.temp.published = status
    },

    sendStatusEmail() {
      const approvedCourseRequest = {
        courseName: this.selectedCourse.title,
        email: this.selectedCourse.instructor.email,
        courseStatus: this.temp.published,
        text: this.statusMessage
      }
      // Call your REST API to send the email
      baseApi.post('/api/v1/email', approvedCourseRequest).then(response => {
        console.log('Email sent successfully:', response.data)
        toast.success(response.data.message)
      }).catch(error => {
        console.error('Error sending email:', error)
        toast.error('Error sending email')
      })
    }
  },
  mounted() {
    this.getAllUsers()
  }
};
</script>

<style scoped>
  .link-type {
    color: #007bff;
    cursor: pointer;
  }
  button {
    cursor: pointer;
    min-width: 80px;
  }
  .badge{
    min-width: 80px;
    min-height: 20px;
    border-radius: 0%;
  }

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }
  .pagination li {
    margin: 0 5px;
  }
  .pagination li button {
    color: #007bff;
    cursor: pointer;
    text-decoration: none;
  }
  .pagination li.active button {
    font-weight: bold;
    color: #495057;
  }
  .pagination li.disabled button {
    color: #ccc;
    pointer-events: none;
    cursor: default;
  }
  .pagination li button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
  }

  .pagination li button:hover {
    background-color: #f1f1f1;
  }

  .pagination li.active button {
    background-color: #007bff;
    color: #fff;
  }

</style>

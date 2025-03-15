<template>
  <admin-headerborder></admin-headerborder>
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
              <h4 class="card-title">Course Approval</h4>
              <div class="table-responsive">
                <table class="table border table-hover table-nowrap table-centered m-0 text-center">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col" class="text-start">Course Name</th>
                    <th scope="col" class="text-start">Instructor</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col" style="width: 125px;">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(course, index) in list" :key="index">
                    <td>
                      <span>{{course.id}}</span>
                    </td>
                    <td class="text-start" width="355px">
                      <span class="link-type" @click="showCourseDetail(course)">{{course.title}}</span>
                    </td>
                    <td class="text-start">
                      <span class="link-type" @click="showInfoInstructor(course.instructor)">{{course.instructor.fullname}}</span>
                    </td>
                    <td>
                      <p class="text-muted">{{course.price}}</p>
                    </td>
                    <td>
                      <p class="text-muted">{{course.category}}</p>
                    </td>
                    <td>
                      <span :class="['badge', course.published ? 'badge-soft-success' : 'badge-soft-warning', 'text-sm']">{{course.published ? 'Published' : 'Draft'}}</span>
                    </td>
                    <td>
                      <div class="d-flex gap-3 mb-3">
                        <button type="button" class="btn btn-success btn-sm me-auto p-2" v-if="!course.published" @click="openStatusDialog(course, true)">Approve</button>
                        <button type="button" class="btn btn-warning btn-sm me-auto p-2" v-else @click="openStatusDialog(course, false)">Draft</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="handleDelete(course, index)">Reject</button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="dash-pagination">
            <div class="row align-items-center">
              <div class="col-6">
                <p>Page 1 of 2</p>
              </div>
              <div class="col-6">
                <ul class="pagination">
                  <li class="active">
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#"><i class="feather-arrow-right"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <course-dialog :visible="dialogCourseDetailVisible"  :temp="temp" @close="dialogCourseDetailVisible = false"></course-dialog>

    <instructor-dialog :visible="dialogInfoInstructorVisible" :instructor="instructor" @close="dialogInfoInstructorVisible = false"></instructor-dialog>

    <message-dialog :visible="dialogStatusVisible" :statusMessage="statusMessage" @close="dialogStatusVisible = false" @message="handleModifyStatus"></message-dialog>
  </div>
  <layouts1></layouts1>
</template>
<script>
import AdminHeaderborder from "@/views/layouts/admin-headerborder.vue";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";
import baseApi from "@/axios";
import CourseDialog from "@/views/pages/admin/component/CourseDialog.vue";
import InstructorDialog from "@/views/pages/admin/component/InstructorDialog.vue";
import MessageDialog from "@/views/pages/admin/component/MessageDialog.vue";
import {ref} from "vue";
import toast from "@/utils/Toast";
import { confirmDelete, confirmSave } from "@/utils/confirmDialogs";

export default {
  components: { AdminHeaderborder, AdminBreadcrumb, AdminSidebar, CourseDialog, InstructorDialog, MessageDialog },
  data() {
    return {
      title: "Dashboard",
      text: "Home",
      text1: "Dashboard",
      selectedSection: null,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 0,
        size: 20,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: ref(
          {
            // id: undefined,
            // importance: 1,
            // remark: '',
            // timestamp: new Date(),
            // title: '',
            // type: '',
            // status: 'published',
            // sections: []
          }
      ),
      instructor: ref(
          {

          }
      ),
      dialogCourseDetailVisible: false,
      dialogFormVisible: false,
      dialogStatusVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      dialogInfoInstructorVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      activeLectureTab: '',
      statusMessage: '',
      statusLoading: false,
      selectedCourse: null,
      showModal: ref(false),
    };
  },
  methods: {
    async getAllCourses() {
      this.listLoading = true;
      await baseApi.get('/api/v1/courses',
          {
            params: {
              page: this.listQuery.page,
              size: this.listQuery.size
            }
          })
          .then(response => {
            this.list = response.data.content;
            this.total = response.data.content.length;
            console.log(this.list);
            console.log(this.total);

            setTimeout(() => {
              this.listLoading = false
            },1.5 * 1000);
          })
          .catch(error => {
            console.error('Error fetching users:', error)
            toast.error('Error fetching users')
          })
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

    showCourseDetail(row) {
      this.temp.value = Object.assign({}, row); // copy obj
      console.log(this.temp.value);
      this.selectedSection = this.temp.value.sections.length > 0 ? this.temp.value.sections[0].id : null;
      this.dialogCourseDetailVisible = true;
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
    this.getAllCourses()
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
</style>

<template>
  <admin-headerborder></admin-headerborder>
  <admin-breadcrumb :title="title" :text="text" :text1="text1"></admin-breadcrumb>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <admin-sidebar></admin-sidebar>
        <!-- /Sidebar -->
        <div class="col-xl-10 col-lg-10">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Category Management</h4>
              <button
                  class="btn btn-primary float-right mb-3"
                  @click="showAddModal"
              >
                <i class="bx bx-plus"></i> Add New Category
              </button>
              <div class="table-responsive">
                <table class="table border table-hover table-nowrap table-centered m-0 text-center">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col" class="text-start">Category Name</th>
                    <th scope="col">Cover Image</th>
                    <th scope="col" style="width: 125px;">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(category, index) in categories" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td class="text-start">{{ category.categoryName }}</td>
                    <td>
                      <img
                          v-if="category.coverImage"
                          :src="category.coverImage"
                          alt="Cover"
                          style="max-width: 100px;"
                      >
                    </td>
                    <td>
                      <div class="d-flex gap-3 mb-3">
                        <button
                            class="btn btn-warning btn-sm me-auto p-2"
                            @click="showEditModal(category)"
                        >
                          <i class="bx bx-edit"></i> Edit
                        </button>
                        <button
                            class="btn btn-danger btn-sm p-2"
                            @click="deleteCategory(category.id)"
                        >
                          <i class="bx bx-trash"></i> Delete
                        </button>
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
                <p>Page {{ currentPage }} of {{ totalPages }}</p>
              </div>
              <div class="col-6">
                <ul class="pagination">
                  <li>
                    <a href="#" @click.prevent="fetchCategories(currentPage - 1)" :class="{ 'disabled': currentPage === 1 }">
                      <i class="feather-arrow-left"></i>
                    </a>
                  </li>
                  <li v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
                    <a href="#" @click.prevent="fetchCategories(page)">{{ page }}</a>
                  </li>
                  <li>
                    <a href="#" @click.prevent="fetchCategories(currentPage + 1)" :class="{ 'disabled': currentPage === totalPages }">
                      <i class="feather-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Add/Edit -->
    <div class="modal" :class="{ 'd-block': showModal }" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEdit ? 'Edit Category' : 'Add Category' }}</h5>
            <button type="button" class="close" @click="closeModal">
              <span>×</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label>Category Name</label>
                <input
                    v-model="form.categoryName"
                    type="text"
                    class="form-control"
                    required
                >
              </div>
              <div class="form-group">
                <label>Cover Image</label>
                <input
                    type="file"
                    class="form-control-file"
                    @change="onFileChange"
                    accept="image/*"
                >
                <img
                    v-if="form.coverImage && !previewImage"
                    :src="form.coverImage"
                    class="mt-2"
                    style="max-width: 200px;"
                >
                <img
                    v-if="previewImage"
                    :src="previewImage"
                    class="mt-2"
                    style="max-width: 200px;"
                >
              </div>
              <button type="submit" class="btn btn-primary">
                {{ isEdit ? 'Update' : 'Create' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AdminHeaderborder from "@/views/layouts/admin-headerborder.vue";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";
import baseApi from "@/axios";
import { confirmSave } from '@/utils/confirmDialogs'; // Import confirmSave
import Swal from 'sweetalert2'; // Import SweetAlert2

export default {
  components: { AdminHeaderborder, AdminBreadcrumb, AdminSidebar },
  setup() {
    const title = ref("Category Management");
    const text = ref("Home");
    const text1 = ref("Category Management");

    const categories = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const pageSize = 10;
    const showModal = ref(false);
    const isEdit = ref(false);
    const form = ref({
      id: null,
      categoryName: '',
      coverImage: null
    });
    const previewImage = ref(null);

    const fetchCategories = async (page) => {
      try {
        const response = await baseApi.get('/api/category/getCategorys', {
          params: { page, size: pageSize }
        });
        categories.value = response.data;
        currentPage.value = page;
        totalPages.value = Math.ceil(response.data.length / pageSize) || 1;
      } catch (error) {
        console.error('Error fetching categories:', error);
        Swal.fire('Error!', 'Error fetching categories', 'error');
      }
    };

    const showAddModal = () => {
      isEdit.value = false;
      form.value = { id: null, categoryName: '', coverImage: null };
      previewImage.value = null;
      showModal.value = true;
    };

    const showEditModal = (category) => {
      isEdit.value = true;
      form.value = { ...category };
      previewImage.value = null;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const onFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        previewImage.value = URL.createObjectURL(file);
        form.value.coverImage = file;
      }
    };

    const submitForm = async () => {
      const saveResult = await confirmSave(); // Hiển thị xác nhận lưu
      if (!saveResult.isConfirmed) return;

      const formData = new FormData();
      formData.append('categoryName', form.value.categoryName);
      if (form.value.coverImage instanceof File) {
        formData.append('coverImage', form.value.coverImage);
      }

      try {
        if (isEdit.value) {
          await baseApi.put(`/api/category/update/${form.value.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          Swal.fire('Success!', 'Category updated successfully!', 'success');
        } else {
          await baseApi.post('/api/category/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          Swal.fire('Success!', 'Category created successfully!', 'success');
        }
        closeModal();
        fetchCategories(currentPage.value);
      } catch (error) {
        console.error('Error submitting form:', error);
        Swal.fire('Error!', 'Error submitting form', 'error');
      }
    };

    const deleteCategory = async (id) => {
      const deleteResult = await Swal.fire({ // Thay confirm bằng Swal
        title: 'Are you sure?',
        text: 'Do you really want to delete this category?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (!deleteResult.isConfirmed) return;

      try {
        await baseApi.delete(`/api/category/delete/${id}`);
        Swal.fire('Success!', 'Category deleted successfully!', 'success');
        fetchCategories(currentPage.value);
      } catch (error) {
        console.error('Error deleting category:', error);
        Swal.fire('Error!', 'Error deleting category', 'error');
      }
    };

    onMounted(() => {
      fetchCategories(1);
    });

    return {
      title,
      text,
      text1,
      categories,
      currentPage,
      totalPages,
      showModal,
      isEdit,
      form,
      previewImage,
      fetchCategories,
      showAddModal,
      showEditModal,
      closeModal,
      onFileChange,
      submitForm,
      deleteCategory
    };
  }
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
.modal.d-block {
  display: block;
}
button {
  cursor: pointer;
  min-width: 80px;
}
</style>
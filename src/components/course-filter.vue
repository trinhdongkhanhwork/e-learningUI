<template>
  <!-- Filter -->
  <div class="showing-list">
    <div class="row">
      <div class="col-lg-6">
        <div class="d-flex align-items-center">
          <div class="view-icons">
            <router-link
              :class="currentPath == 'course-grid' ? 'active' : 'notactive'"
              to="course-grid"
              class="grid-view"
            ><i class="feather-grid"></i></router-link>
            <router-link
              :class="currentPath == 'course-list' ? 'active' : 'notactive'"
              to="/course/course-list"
              class="list-view"
            ><i class="feather-list"></i></router-link>
          </div>
          <div class="show-result">
            <h4>Showing 1-12 of 50 results</h4>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="show-filter add-course-info">
          <form @submit.prevent>
            <div class="row gx-2 align-items-center">
              <div class="col-md-12 col-item">
                <div class="search-group">
                  <i class="feather-search"></i>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search our courses..."
                    v-model="searchQuery"
                    @input="emitFilters"
                  />
                </div>
              </div>
              <!-- <div class="col-md-6 col-lg-6 col-item">
                <div class="form-group select-form mb-0">
                  <vue-select :options="published" placeholder="Newly published" v-model="selectedCategory" @select="emitFilters" />
                </div>
              </div> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Filter -->
</template>

<script>
import baseApi from '@/axios';

export default {
  emits: ['filter-changed', 'select'],
  computed: {
    currentPath() {
      return this.$route.name;
    },
  },
  data() {
    return {
      published: [], 
      selectedCategory: null,
      searchQuery: '',
    };
  },
  created() {
    this.fetchCategories(); // Fetch categories on component creation
  },
  methods: {
    emitFilters() {
    this.$emit('filter-changed', {
      categories: this.selectedCategories,
      instructors: this.selectedInstructors,
      priceRange: this.selectedPriceRange,  
      filters: {
        searchQuery: this.searchQuery,
        selectedCategory: this.selectedCategory
      }
    });
  },
    async fetchCategories() {
      try {
        const response = await baseApi.get("/api/category/getCategorys");
        this.published = response.data.map(category => category.categoryName); // Populate published with category names
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
  },
};
</script> 
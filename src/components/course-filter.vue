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
              ><i class="feather-grid"></i
            ></router-link>
            <router-link
              :class="currentPath == 'course-list' ? 'active' : 'notactive'"
              to="/course/course-list"
              class="list-view"
              ><i class="feather-list"></i
            ></router-link>
          </div>
          <div class="show-result">
            <h4>Showing 1-9 of 50 results</h4>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="show-filter add-course-info">
          <form action="#">
            <div class="row gx-2 align-items-center">
              <div class="col-md-6 col-item">
                <div class="search-group">
                  <i class="feather-search"></i>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search our courses"
                  />
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-item">
                <div class="form-group select-form mb-0">
                  <vue-select :options="published" placeholder="Newly published" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Filter -->
</template>
<script>
export default {
  computed: {
    currentPath() {
      return this.$route.name;
    },
  },
  data() {
    return {
      published: ["Newly published", "published 1", "published 2", "published 3"],
    };
  },
};
</script>

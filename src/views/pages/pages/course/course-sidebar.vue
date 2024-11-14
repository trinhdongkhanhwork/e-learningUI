<template>
  <div class="col-lg-3 theiaStickySidebar">
    <div class="stickysidebar">
      <div class="filter-clear">
        <div class="clear-filter d-flex align-items-center">
          <h4><i class="feather-filter"></i>Filters</h4>
          <div class="clear-text">
            <p>CLEAR</p>
          </div>
        </div>

        <!-- Search Filter category -->
        <div class="card search-filter">
          <div class="card-body">
            <div class="filter-widget mb-0">
              <div class="categories-head d-flex align-items-center">
                <h4>Course categories</h4>
                <i class="fas fa-angle-down"></i>
              </div>
              <div  v-for="category in categories" :key="category.id">
                <label class="custom_check" >
                  <input type="checkbox" name="select_specialist" :value="category.id" v-model="selectedCategories" />
                  <span class="checkmark"></span> {{ category.categoryName }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- /Search Filter -->

        <!-- Search Filter instructor -->
        <div class="card search-filter">
          <div class="card-body">
            <div class="filter-widget mb-0">
              <div class="categories-head d-flex align-items-center">
                <h4>Instructors</h4>
                <i class="fas fa-angle-down"></i>
              </div>
              <div v-for="instructor in uniqueInstructors" :key="instructor.id">
                <label class="custom_check">
                  <input type="checkbox" :value="instructor" v-model="selectedInstructors" />
                  <span class="checkmark"></span> {{ instructor }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- /Search Filter -->

        <!-- Search Filter price-->
        <div class="card search-filter">
          <div class="card-body">
            <div class="filter-widget mb-0">
              <div class="categories-head d-flex align-items-center">
                <h4>Price</h4>
                <i class="fas fa-angle-down"></i>
              </div>
              <div v-for="range in priceRanges" :key="range.label">
                <label class="custom_check custom_one">
                  <input
                      type="radio"
                      name="select_price"
                      :value="range"
                      v-model="selectedPriceRange"
                  />
                  <span class="checkmark"></span> {{ range.label }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- /Search Filter -->

        <!-- Latest Posts -->
        <div class="card post-widget">
          <div class="card-body">
            <div class="latest-head">
              <h4 class="card-title">Latest Courses</h4>
            </div>
            <ul class="latest-posts">
              <li>
                <div class="post-thumb">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        src="@/assets/img/blog/blog-01.jpg"
                        alt=""
                    />
                  </router-link>
                </div>
                <div class="post-info free-color">
                  <h4>
                    <router-link to="/course/course-details"
                    >Introduction LearnPress – LMS plugin</router-link
                    >
                  </h4>
                  <p>FREE</p>
                </div>
              </li>
              <li>
                <div class="post-thumb">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        src="@/assets/img/blog/blog-02.jpg"
                        alt=""
                    />
                  </router-link>
                </div>
                <div class="post-info">
                  <h4>
                    <router-link to="/course/course-details"
                    >Become a PHP Master and Make Money</router-link
                    >
                  </h4>
                  <p>$200</p>
                </div>
              </li>
              <li>
                <div class="post-thumb">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        src="@/assets/img/blog/blog-03.jpg"
                        alt=""
                    />
                  </router-link>
                </div>
                <div class="post-info free-color">
                  <h4>
                    <router-link to="/course/course-details">Learning jQuery Mobile for Beginners</router-link>
                  </h4>
                  <p>FREE</p>
                </div>
              </li>
              <li>
                <div class="post-thumb">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        src="@/assets/img/blog/blog-01.jpg"
                        alt=""
                    />
                  </router-link>
                </div>
                <div class="post-info">
                  <h4>
                    <router-link to="/course/course-details">Improve Your CSS Workflow with SASS</router-link>
                  </h4>
                  <p>$200</p>
                </div>
              </li>
              <li>
                <div class="post-thumb">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        src="@/assets/img/blog/blog-02.jpg"
                        alt=""
                    />
                  </router-link>
                </div>
                <div class="post-info free-color">
                  <h4>
                    <router-link to="/course/course-details">HTML5/CSS3 Essentials in 4-Hours</router-link>
                  </h4>
                  <p>FREE</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- /Latest Posts -->
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, watch, computed } from 'vue';
import baseApi from '@/axios';

export default {
  props: {
    onFilterChange: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const categories = ref([]); // Danh sách categories
    const selectedCategories = ref([]); // Danh sách các category đã chọn
    const selectedInstructors = ref([]); //danh sách giảng viên đã chọn
    const selectedPriceRange = ref(null); //Khoảng giá
    const courses = ref([]); // Danh sách khóa học

    // Các khoảng giá cho bộ lọc
    const priceRanges = ref([
      { min: 0, max: 0, label: "All" },
      { min: 100, max: 200, label: "100$ - 200$" },
      { min: 200, max: 300, label: "200$ - 300$" },
      { min: 300, max: 400, label: "300$ - 400$" },
      { min: 400, max: 500, label: "400$ - 500$" },
      { min: 500, max: 600, label: "500$ - 600$" },
      { min: 600, max: 700, label: "600$ - 700$" },
      { min: 700, max: 800, label: "700$ - 800$" },
      { min: 800, max: 900, label: "800$ - 900$" },
      { min: 900, max: 1000, label: "900$ - 1000$" },
    ]);

    // Lấy danh sách categories từ API
    const fetchCategories = async () => {
      try {
        const response = await baseApi.get('/api/category/getCategorys');
        categories.value = response.data; // Gán dữ liệu vào categories
      } catch (error) {
        console.error('Lỗi khi lấy danh sách categories:', error);
      }
    };

    // Lấy danh sách khóa học từ API
    const fetchCourses = async () => {
      try {
        const response = await baseApi.get('/api/v1/courses', {
          params: {
            categoriesIds: selectedCategories.value.join(','),
          },
        });
        courses.value = response.data.content || [];
      } catch (error) {
        console.log('Lỗi khi lấy khóa học: ', error);
      }
    };

    // Khi có sự thay đổi về selectedCategories hoặc selectedInstructors, gọi hàm lọc từ parent
    watch([selectedCategories, selectedInstructors, selectedPriceRange], () => {
      props.onFilterChange({
        categories: selectedCategories.value,
        instructors: selectedInstructors.value,
        priceRange: selectedPriceRange.value,
      });
    });

    // Tính toán danh sách giảng viên duy nhất
    const uniqueInstructors = computed(() => {
      // Dùng Set để lấy giảng viên duy nhất từ các khóa học
      const instructors = new Set();
      courses.value.forEach((course) => {
        if (course.instructor && course.instructor.fullname) {
          instructors.add(course.instructor.fullname); // Thêm tên giảng viên vào Set
        }
      });
      console.log("ahbshda:"+[...instructors])
      return [...instructors]; // Chuyển Set thành mảng
    });

    // Computed property để lọc khóa học theo khoảng giá
    const filteredCourses = computed(() => {
      if (!selectedPriceRange.value || selectedPriceRange.value.min === 0) {
        return courses.value;
      }
      return courses.value.filter(course => {
        return (
            course.price >= selectedPriceRange.value.min &&
            course.price <= selectedPriceRange.value.max
        );
      });
    });


    onMounted(() => {
      fetchCategories();
      fetchCourses();
    });

    return {
      categories,
      selectedCategories,
      selectedInstructors,
      selectedPriceRange,
      priceRanges,
      courses,
      filteredCourses,
      uniqueInstructors,
    };
  },
};
</script>

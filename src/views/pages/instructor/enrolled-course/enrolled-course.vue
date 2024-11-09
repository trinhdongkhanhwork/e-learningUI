<template>
  <div class="row">
    <!-- Course Grid -->
    <div
        v-for="course in paidCourses"
        :key="course.id"
        class="col-xxl-4 col-md-6 d-flex"
    >
      <div class="course-box flex-fill">
        <div class="product">
          <div class="product-img">
            <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
              <img v-if="course.coverImage" :src="require(`@/assets/img/course-list/${course.coverImage}`)"
                   alt="Img" class="img-fluid" style="width: 300px;height: 270px;"/>
            </router-link>
            <div class="price">
              <h3>{{ course.price }} <span>$99.00</span></h3>
            </div>
          </div>
          <div class="product-content">
            <div class="course-group d-flex">
              <div class="course-group-img d-flex">
                <router-link to="/instructor/instructor-profile">
                  <img
                      src="@/assets/img/user/user2.jpg"
                      alt="Instructor Img"
                      class="img-fluid"
                  />
                </router-link>
                <div class="course-name">
                  <h4>
                    <router-link to="/instructor/instructor-profile">
                      {{course.instructor.fullname }}
                    </router-link>
                  </h4>
                  <p>{{ course.instructor.roleEntity.roleName }}</p>
                </div>
              </div>
              <div
                  class="course-share d-flex align-items-center justify-content-center"
              >
                <a href="#"><i class="fa-regular fa-heart"></i></a>
              </div>
            </div>
            <h3 class="title instructor-text">
              <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                {{ course.title }}
              </router-link>
            </h3>
            <div class="course-info d-flex align-items-center">
              <div class="rating-img d-flex align-items-center">
                <img src="@/assets/img/icon/icon-01.svg" alt="Icon" />
                <p>{{ course.level }}</p>
              </div>
              <div class="course-view d-flex align-items-center">
                <img src="@/assets/img/icon/icon-02.svg" alt="Icon" />
                <p>70hr 30min</p>
              </div>
            </div>
            <div class="rating mb-0">
              <i class="fas fa-star filled me-1"></i>
              <i class="fas fa-star filled me-1"></i>
              <i class="fas fa-star filled me-1"></i>
              <i class="fas fa-star filled me-1"></i>
              <i class="fas fa-star filled me-1"></i>
              <span class="d-inline-block average-rating">
                  <span>5.0</span> (20)
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Course Grid -->
  </div>
</template>
<script>
import useCourses from '@/service/instructor/enrollCourse';
import { onMounted } from 'vue';

export default {
  setup() {
    const { courses, paidCourses, fetchCoursesEnroll } = useCourses();

    onMounted(async () => {
      await fetchCoursesEnroll();
    });

    return {
      courses,
      paidCourses
    };
  }
};
</script>


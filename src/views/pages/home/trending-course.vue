<template>
  <!-- Trending Course -->
  <section class="section trend-course">
    <div class="container">
      <div class="section-header aos" data-aos="fade-up">
        <div class="section-sub-head">
          <span>What’s New</span>
          <h2>TRENDING COURSES</h2>
        </div>
        <div class="all-btn all-category d-flex align-items-center">
          <router-link to="/course/course-list" class="btn btn-primary">All Courses</router-link>
        </div>
      </div>
      <div class="section-text aos" data-aos="fade-up">
        <p class="mb-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan
          bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.
        </p>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
      <feature-instructors></feature-instructors>
    </div>
  </section>
  <!-- /Trending Course -->

  <leading-companies></leading-companies>
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
    };
  },
  setup() {
    return {
      // carousel settings
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },

      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 3,
          snapAlign: "start",
        },
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>

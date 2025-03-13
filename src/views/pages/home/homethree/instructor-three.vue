<template>
  <!-- Become An Instructor -->
  <section class="home-three-become">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8 col-md-8" data-aos="fade-up">
          <div class="become-content-three">
            <h2>Become An Instructor</h2>
            <p>
              Top instructors from around the world teach millions of students on
              DreamsLMS.
            </p>
          </div>
        </div>
        <div class="col-lg-4 col-md-4" data-aos="fade-up">
          <div class="become-button-three">
            <router-link to="/register" class="btn btn-become"
              >Get Started Now</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Become An Instructor -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import "vue3-carousel/dist/carousel.css";
import "swiper/css/swiper.min.css";
export default {

  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>

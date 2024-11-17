<template>
  <!-- Leading Companies -->
  <section class="section lead-companies">
    <div class="container">
      <div class="section-header aos" data-aos="fade-up">
        <div class="section-sub-head feature-head text-center">
          <span>Trusted By</span>
          <h2>500+ Leading Universities And Companies</h2>
        </div>
      </div>
      <div class="lead-group aos" data-aos="fade-up">
        <Carousel
          :autoplay="2000"
          :loop="true"
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
        </Carousel>
      </div>
    </div>
  </section>
  <!-- /Leading Companies -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  components: {
    Carousel,
    Slide,
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
          itemsToShow: 5,
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

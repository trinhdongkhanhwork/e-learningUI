<template>
  <!-- Share Knowledge -->
  <section class="section share-knowledge">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="knowledge-img aos" data-aos="fade-up">
            <img src="@/assets/img/share.png" alt="" class="img-fluid" />
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <div class="join-mentor aos" data-aos="fade-up">
            <h2>Want to share your knowledge? Join us a Mentor</h2>
            <p>
              High-definition video is video of higher resolution and quality than
              standard-definition. While there is no standardized meaning for
              high-definition, generally any video.
            </p>
            <ul class="course-list">
              <li><i class="fa-solid fa-circle-check"></i>Best Courses</li>
              <li><i class="fa-solid fa-circle-check"></i>Top rated Instructors</li>
            </ul>
            <div class="all-btn all-category d-flex align-items-center">
              <router-link to="/instructor/instructor-list" class="btn btn-primary"
                >Read More</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Share Knowledge -->

  <!-- Users Love -->
  <section class="section user-love">
    <div class="container">
      <div class="section-header white-header aos" data-aos="fade-up">
        <div class="section-sub-head feature-head text-center">
          <span>Check out these real reviews</span>
          <h2>Users-love-us Don't take it from us.</h2>
        </div>
      </div>
    </div>
  </section>
  <!-- /Users Love -->

  <!-- Say testimonial Four -->
  <section class="testimonial-four">
    <div class="review">
      <div class="container">
        <div class="testi-quotes">
          <img src="@/assets/img/qute.png" alt="" />
        </div>
        <div class="mentor-testimonial lazy slider">
          <Carousel
            :wrap-around="true"
            :settings="settings"
            :breakpoints="breakpoints"
          >
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
      </div>
    </div>
  </section>
  <!-- /Say testimonial Four -->

  <!-- Become An Instructor -->
  <section class="section become-instructors aos" data-aos="fade-up">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 d-flex">
          <div class="student-mentor cube-instuctor ">
            <h4>Become An Instructor</h4>
            <div class="row">
              <div class="col-lg-7 col-md-12">
                <div class="top-instructors">
                  <p>Top instructors from around the world teach millions of students on Mentoring.</p>
                </div>
              </div>
              <div class="col-lg-5 col-md-12">
                <div class="mentor-img">
                  <img class="img-fluid" alt="Img" src="@/assets/img/icon/become-02.svg">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 d-flex">
          <div class="student-mentor yellow-mentor">
            <h4>Transform Access To Education</h4>
            <div class="row">
              <div class="col-lg-8 col-md-12">
                <div class="top-instructors">
                  <p>Create an account to receive our newsletter, course recommendations and promotions.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="mentor-img">
                  <img class="img-fluid" alt="Img" src="@/assets/img/icon/become-01.svg">
                </div>
              </div>
            </div>
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
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },

      breakpoints: {
        575: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        991: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 1,
          snapAlign: "center",
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

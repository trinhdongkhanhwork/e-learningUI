<template>
  <!-- Home Banner -->
  <section class="home-three-slide d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-8 col-md-12 col-12" data-aos="fade-down">
          <div class="home-three-slide-face">
            <div class="home-three-slide-text">
              <h5>The Leader in Online Learning</h5>
              <h1>Engaging <span>&</span> Accessible Online Courses For All</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
                accumsan bibendum gravida maecenas augue elementum et
              </p>
            </div>
            <div class="banner-three-content">
              <form class="form" @submit.prevent="submitForm">
                <div class="form-inner-three">
                  <div class="input-group">
                    <h1 id="dynamic-text" style="margin-top:10px; font-size: 20px; margin-left: 120px; color: cadetblue;">Show all exciting courses.</h1>
                    <!-- <input
                      type="email"
                      class="form-control"
                      placeholder="Search School, Online eductional centers, etc"
                    /> -->
                    <!-- <span class="drop-detail-three">
                      <vue-select :options="Category" placeholder="Select Category" />
                    </span> -->
                    <button class="btn btn-three-primary sub-btn" type="submit" style="margin-left: 130px;">
                      <i class="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-4 col-md-6 col-12" data-aos="fade-up">
          <div class="girl-slide-img aos">
            <img class="img-fluid" src="@/assets/img/slider/home-slider.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Home Banner -->

  <!--Online Courses -->
  <section class="section student-course home-three-course">
    <div class="container">
      <div class="course-widget-three">
        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex" data-aos="fade-up">
            <div class="course-details-three">
              <div class="align-items-center">
                <div class="course-count-three course-count ms-0">
                  <div class="course-img">
                    <img
                      class="img-fluid"
                      src="@/assets/img/icon-three/course-01.svg"
                      alt=""
                    />
                  </div>
                  <div class="course-content-three">
                    <h4 class="text-blue">
                      <span class="counterUp"
                        ><vue3-autocounter
                          class="counter"
                          ref="counter"
                          :startAmount="1"
                          :delay="3"
                          :endAmount="totalCourseCount"
                          :duration="5"
                          :autoinit="true" /></span
                      >+
                    </h4>
                    <p>Online Courses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex" data-aos="fade-up">
            <div class="course-details-three">
              <div class="align-items-center">
                <div class="course-count-three course-count ms-0">
                  <div class="course-img">
                    <img
                      class="img-fluid"
                      src="@/assets/img/icon-three/course-02.svg"
                      alt=""
                    />
                  </div>
                  <div class="course-content-three">
                    <h4 class="text-yellow">
                      <span class="counterUp"
                        ><vue3-autocounter
                          class="counter"
                          ref="counter"
                          :startAmount="10"
                          :delay="3"
                          :endAmount="totalTutors"
                          :duration="5"
                          :autoinit="true" /></span
                      >+
                    </h4>
                    <p>Expert Tutors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex" data-aos="fade-up">
            <div class="course-details-three mb-0">
              <div class="align-items-center">
                <div class="course-count-three">
                  <div class="course-img">
                    <img
                      class="img-fluid"
                      src="@/assets/img/icon-three/course-04.svg"
                      alt=""
                    />
                  </div>
                  <div class="course-content-three course-count ms-0">
                    <h4 class="text-green">
                      <span class="counterUp"
                        ><vue3-autocounter
                          class="counter"
                          ref="counter"
                          :startAmount="1"
                          :delay="3"
                          :endAmount="totalStudents"
                          :duration="5"
                          :autoinit="true" /></span
                      >+
                    </h4>
                    <p>Online Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Online Courses -->

  <!-- Master skills Career -->
  <section class="master-skill-three">
    <div class="master-three-vector">
      <img class="ellipse-right img-fluid" src="@/assets/img/bg/pattern-01.png" alt="" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-6 col-md-12" data-aos="fade-right">
          <div class="master-three-images">
            <div class="master-three-left">
              <img
                class="img-fluid"
                src="@/assets/img/students/career.png"
                alt="image-banner"
                title="image-banner"
              />
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-lg-6 col-md-12" data-aos="fade-left">
          <div class="home-three-head" data-aos="fade-up">
            <h2>Master the skills to drive your career</h2>
          </div>
          <div class="home-three-content" data-aos="fade-up">
            <p>
              Get certified, master modern tech skills, and level up your career whether
              you’re starting out or a seasoned pro. 95% of eLearning learners report our
              hands-on content directly helped their careers.
            </p>
          </div>
          <div class="skils-group">
            <div class="row">
              <div
                v-for="(item, index) in skillsthree"
                :key="index"
                class="col-lg-6 col-xs-12 col-sm-6"
                :data-aos="item.animation"
              >
                <div class="skils-icon-item">
                  <div class="skils-icon">
                    <img
                      class="img-fluid"
                      :src="require(`@/assets/img/icon-three/${item.iconSrc}`)"
                      :alt="item.altText"
                    />
                  </div>
                  <div class="skils-content">
                    <p class="mb-0">{{ item.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Master skills Career -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import skillsthree from "@/assets/json/skillsthree.json";
import baseApi from "@/axios";

export default {
  data() {
    return {
      courses: [],
      totalCourseCount: 0,
      totalTutors: 0,
      totalStudents: 0,
      Category: ["Select category", "Angular", "Node Js", "React", "Python"],
      skillsthree: skillsthree,
    };
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await baseApi.get("/api/v1/courses");
        if (Array.isArray(response.data.content)) {
          this.courses = response.data.content.map(course => ({
            ...course,
          }));
          this.calculateTotals();
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    },
    calculateTotals() {
      this.totalCourseCount = this.courses.length;
      this.totalTutors = new Set(this.courses.map(course => course.instructor.id)).size;
      this.totalStudents = this.courses.reduce((sum, course) => sum + course.enrolledUserCount, 0);
    },
    submitForm() {
      this.$router.push("/course/course-grid");
    },
  },
  mounted() {
    this.fetchCourses();
    this.$nextTick(() => {
      AOS.init();
    });

    const textElement = document.getElementById("dynamic-text");
    let colors = ["cadetblue", "coral", "darkorange", "limegreen"];
    let currentColor = 0;

    setInterval(() => {
      if (textElement) {
        textElement.style.color = colors[currentColor];
        currentColor = (currentColor + 1) % colors.length;
      }
    }, 1000);
  },
};
</script>

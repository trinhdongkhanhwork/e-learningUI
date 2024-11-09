<template>
  <page-header></page-header>
  <coursedetails></coursedetails>
  <!-- <inner-page></inner-page> -->
  <div>
    <div class="inner-banner">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="instructor-wrap border-bottom-0 m-0">
              <div class="about-instructor align-items-center">
                <div class="abt-instructor-img">
                  <router-link to="/instructor/instructor-profile"
                  ><img
                      src="@/assets/img/user/user1.jpg"
                      alt="img"
                      class="img-fluid"
                  /></router-link>
                </div>
                <div class="instructor-detail me-3">
                  <h5><router-link to="/instructor/instructor-profile">{{ course.instructor.fullname }}</router-link></h5>
                  <p>Instructor</p>
                </div>
                <div class="rating mb-0">
                  <i class="fas fa-star filled me-1"></i>
                  <i class="fas fa-star filled me-1"></i>
                  <i class="fas fa-star filled me-1"></i>
                  <i class="fas fa-star filled me-1"></i>
                  <i class="fas fa-star me-1"></i>
                  <span class="d-inline-block average-rating"><span>4.5</span> (15)</span>
                </div>
              </div>
              <span class="web-badge mb-3">{{ course.level }}</span>
            </div>
            <h2>{{ course.title }}</h2>
            <div class="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
              <div class="cou-info">
                <img src="@/assets/img/icon/icon-01.svg" alt="" />
                <p>12+ Lesson</p>
              </div>
              <div class="cou-info">
                <img src="@/assets/img/icon/timer-icon.svg" alt="" />
                <p>9hr 30min</p>
              </div>
              <div class="cou-info">
                <img src="@/assets/img/icon/people.svg" alt="" />
                <p>32 students enrolled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Course Content -->
  <section class="page-content course-sec">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <!-- Overview -->
          <div class="card overview-sec">
            <div class="card-body">
              <h5 class="subs-title">Overview</h5>
              <h6>Course Description</h6>
              <p>
                {{ course.description }}
              </p>
              <h6>What you'll learn</h6>
              <div class="row">
                <div class="col-md-6">
                  <ul>
                    <li>Become a UX designer.</li>
                    <li>You will be able to add UX designer to your CV</li>
                    <li>Become a UI designer.</li>
                    <li>Build & test a full website design.</li>
                    <li>Build & test a full mobile app.</li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <ul>
                    <li>Learn to design websites & mobile phone apps.</li>
                    <li>You'll learn how to choose colors.</li>
                    <li>Prototype your designs with interactions.</li>
                    <li>Export production ready assets.</li>
                    <li>All the techniques used by UX professionals</li>
                  </ul>
                </div>
              </div>
              <!-- <h6>Requirements</h6>
              <ul class="mb-0">
                <li>
                  You will need a copy of Adobe XD 2023 or above. A free trial
                  can be downloaded from Adobe.
                </li>
                <li>No previous design experience is needed.</li>
                <li class="mb-0">No previous Adobe XD skills are needed.</li>
              </ul> -->
            </div>
          </div>
          <!-- /Overview -->

          <!-- Course Content -->
          <div class="card content-sec" v-show="sections.length != 0">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6">
                  <h5 class="subs-title">Course Content</h5>
                </div>
                <!-- <div class="col-sm-6 text-sm-end">
                  <h6>92 Lectures 10:56:11</h6>
                </div> -->
              </div>
              <div class="course-card" v-for="(section, index) in sections" :key="index">
                <h6 class="cou-title">
                  <a class="collapsed"
                     @click="isViewSectionToggle(section.id)">
                    {{ section.title }}</a>
                </h6>
                <div class="card-collapse" v-if="viewSectionToggle[section.id]">
                  <ul>
                    <li v-for="(lecture, index) in section.lectures" :key="index">
                      <p>
                        <img
                            src="@/assets/img/icon/play.svg"
                            alt=""
                            class="me-2"/>
                        {{ lecture.title }}
                      </p>
                      <div>
                        <a href="javascript:;">Preview</a>
                        <span>02:53</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- /Course Content -->

          <!-- Instructor -->
          <!-- <div class="card instructor-sec">
            <div class="card-body">
              <h5 class="subs-title">About the instructor</h5>
              <div class="instructor-wrap">
                <div class="about-instructor">
                  <div class="abt-instructor-img">
                    <router-link to="/instructor/instructor-profile"
                      ><img
                        src="@/assets/img/user/user1.jpg"
                        alt="img"
                        class="img-fluid"
                    /></router-link>
                  </div>
                  <div class="instructor-detail">
                    <h5>
                      <router-link to="/instructor/instructor-profile"
                        >Nicole Brown</router-link
                      >
                    </h5>
                    <p>UX/UI Designer</p>
                  </div>
                </div>
                <div class="rating">
                  <i class="fas fa-star filled me-1"></i>
                  <i class="fas fa-star filled me-1"></i>
                  <i class="fas fa-star filled me-1"></i>
                  <i class="fas fa-star filled me-1"></i>
                  <i class="fas fa-star me-1"></i>
                  <span class="d-inline-block average-rating"
                    >4.5 Instructor Rating</span
                  >
                </div>
              </div>
              <div class="course-info d-flex align-items-center">
                <div class="cou-info">
                  <img src="@/assets/img/icon/play.svg" alt="" />
                  <p>5 Courses</p>
                </div>
                <div class="cou-info">
                  <img src="@/assets/img/icon/icon-01.svg" alt="" />
                  <p>12+ Lesson</p>
                </div>
                <div class="cou-info">
                  <img src="@/assets/img/icon/icon-02.svg" alt="" />
                  <p>9hr 30min</p>
                </div>
                <div class="cou-info">
                  <img src="@/assets/img/icon/people.svg" alt="" />
                  <p>270,866 students enrolled</p>
                </div>
              </div>
              <p>
                UI/UX Designer, with 7+ Years Experience. Guarantee of High
                Quality Work.
              </p>
              <p>
                Skills: Web Design, UI Design, UX/UI Design, Mobile Design, User
                Interface Design, Sketch, Photoshop, GUI, Html, Css, Grid
                Systems, Typography, Minimal, Template, English, Bootstrap,
                Responsive Web Design, Pixel Perfect, Graphic Design, Corporate,
                Creative, Flat, Luxury and much more.
              </p>

              <p>Available for:</p>
              <ul>
                <li>1. Full Time Office Work</li>
                <li>2. Remote Work</li>
                <li>3. Freelance</li>
                <li>4. Contract</li>
                <li>5. Worldwide</li>
              </ul>
            </div>
          </div> -->
          <!-- /Instructor -->

          <!-- Reviews -->
          <div class="card review-sec" v-if="reviews.length != 0">
            <div class="card-body" style="padding-bottom: 0;">
              <h5 class="subs-title" style="margin: 0">Reviews</h5>
            </div>
            <div class="card-body" v-for="(review, index) in reviews" :key="index">
              <div class="instructor-wrap">
                <div class="about-instructor">
                  <div class="abt-instructor-img">
                    <router-link to="/instructor/instructor-profile"
                    ><img
                        src="@/assets/img/user/user1.jpg"
                        alt="img"
                        class="img-fluid"
                    /></router-link>
                  </div>
                  <div class="instructor-detail">
                    <h5>
                      <router-link to="/instructor/instructor-profile"
                      >{{ review.fullName }}</router-link
                      >
                    </h5>
                    <p>UX/UI Designer</p>
                  </div>
                </div>
                <div class="rating">
                  <i class="fas fa-star filled me-1" v-for="n in review.star" :key="n"></i>
                  <i class="fas fa-star me-1" v-for="n in (5 - review.star)" :key="n"></i>
                  <span class="d-inline-block average-rating"
                  >{{ review.star }} Student Rating</span>
                </div>
              </div>
              <p style="font-size: 15px;">
                {{ review.commentText }}
              </p>
              <!-- <a href="javascript:;" class="btn btn-reply"
                ><i class="feather-corner-up-left"></i> Reply</a
              > -->
            </div>
          </div>
          <!-- /Reviews -->

          <!-- Comment -->
          <!-- <div class="card comment-sec">
            <div class="card-body">
              <h5 class="subs-title">Post A comment</h5>
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group mb-3">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Subject"
                  />
                </div>
                <div class="form-group mb-3">
                  <textarea
                    rows="4"
                    class="form-control"
                    placeholder="Your Comments"
                  ></textarea>
                </div>
                <div class="submit-section">
                  <button class="btn submit-btn" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div> -->
          <!-- /Comment -->
        </div>

        <div class="col-lg-4">
          <div class="sidebar-sec">
            <!-- Video -->
            <div class="video-sec vid-bg">
              <div class="card">
                <div class="card-body">
                  <a
                      href="https://www.youtube.com/embed/1trvO6dqQUI"
                      class="video-thumbnail"
                      data-fancybox=""
                  >
                    <div class="play-icon">
                      <i class="fa-solid fa-play"></i>
                    </div>
                    <img class="" src="@/assets/img/video.jpg" alt="" />
                  </a>
                  <div class="video-details">
                    <div class="course-fee">
                      <h2>FREE</h2>
                      <p><span>$99.00</span> 50% off</p>
                    </div>
                    <div class="row gx-2">
                      <div class="col-md-6">
                        <router-link
                            to="course-wishlist"
                            class="btn btn-wish w-100"
                        ><i class="feather-heart"></i> Add to
                          Wishlist</router-link
                        >
                      </div>
                      <div class="col-md-6">
                        <a href="javascript:;" class="btn btn-wish w-100"
                        ><i class="feather-share-2"></i> Share</a
                        >
                      </div>
                    </div>
                    <router-link
                        :to="isPayment ? { path: '/course/course-lesson/', query: { id: idCourse } } : { path: '/pages/cart'}"
                        class="btn btn-enroll w-100"
                        @click="handleEnroll"
                    >{{ isPayment ? 'Star' : 'Enroll now'}}</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- /Video -->

            <!-- Include -->
            <div class="card include-sec">
              <div class="card-body">
                <div class="cat-title">
                  <h4>Includes</h4>
                </div>
                <ul>
                  <li>
                    <img
                        src="@/assets/img/icon/import.svg"
                        class="me-2"
                        alt=""
                    />
                    11 hours on-demand video
                  </li>
                  <li>
                    <img src="@/assets/img/icon/play.svg" class="me-2" alt="" />
                    69 downloadable resources
                  </li>
                  <li>
                    <img src="@/assets/img/icon/key.svg" class="me-2" alt="" />
                    Full lifetime access
                  </li>
                  <li>
                    <img
                        src="@/assets/img/icon/mobile.svg"
                        class="me-2"
                        alt=""
                    />
                    Access on mobile and TV
                  </li>
                  <li>
                    <img
                        src="@/assets/img/icon/cloud.svg"
                        class="me-2"
                        alt=""
                    />
                    Assignments
                  </li>
                  <li>
                    <img
                        src="@/assets/img/icon/teacher.svg"
                        class="me-2"
                        alt=""
                    />
                    Certificate of Completion
                  </li>
                </ul>
              </div>
            </div>
            <!-- /Include -->

            <!-- Features -->
            <div class="card feature-sec">
              <div class="card-body">
                <div class="cat-title">
                  <h4>Includes</h4>
                </div>
                <ul>
                  <li>
                    <img
                        src="@/assets/img/icon/users.svg"
                        class="me-2"
                        alt=""
                    />
                    Enrolled: <span>32 students</span>
                  </li>
                  <li>
                    <img
                        src="@/assets/img/icon/timer.svg"
                        class="me-2"
                        alt=""
                    />
                    Duration: <span>20 hours</span>
                  </li>
                  <li>
                    <img
                        src="@/assets/img/icon/chapter.svg"
                        class="me-2"
                        alt=""
                    />
                    Chapters: <span>15</span>
                  </li>
                  <li>
                    <img
                        src="@/assets/img/icon/video.svg"
                        class="me-2"
                        alt=""
                    />
                    Video:<span> 12 hours</span>
                  </li>
                  <li>
                    <img
                        src="@/assets/img/icon/chart.svg"
                        class="me-2"
                        alt=""
                    />
                    Level: <span>Beginner</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- /Features -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Pricing Plan -->
  <layouts1></layouts1>
</template>
<script>
import baseApi from '@/axios';
import { useStore } from 'vuex';
import { ref } from "vue";

export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);

    return {
      idCourse: null,  // Khai báo idCourse ở đây
      user,
      isPayment: false,
      course: {},
      sections: [],
      viewSectionToggle: {},
      reviews: []
    }
  },
  created() {
    this.idCourse = this.$route.query.id;  // Gán giá trị cho idCourse trong created
    this.course = {
      id: null,
      title: "",
      description: "",
      createdAt: "",
      categoryId: 3,
      coverImage: "",
      price: null,
      published: null,
      level: "",
      instructor: {},
      sections: []
    }
    this.getCourseById(this.idCourse);
    this.getReviews(this.idCourse);
    this.isPayments(this.idCourse);
    const selectedCourseId = localStorage.getItem("selectedCourseId");
    if (selectedCourseId) {
      this.getCourseById(selectedCourseId);  // Gọi phương thức để lấy thông tin khóa học
    }
  },
  methods: {
    getCourseById(idCourse) {
      baseApi.get(`/api/v1/courses/getCourseById/${idCourse}`)
          .then(course => {
            this.course = course.data;
            this.sections = this.course.sections;
            console.log("Tìm khóa học thành công");
          })
          .catch(error => {
            console.log("Tìm khóa học thất bại", error);
          });
    },
    getReviews(idCourse) {
      baseApi.get(`/api/comment/getCommentCourse/${idCourse}`)
          .then(reviews => {
            this.reviews = reviews.data;
            console.log("Tìm review thành công");
          })
          .catch(error => {
            console.log("Tìm review thất bại", error);
          });
    },
    isViewSectionToggle(sectionId) {
      this.viewSectionToggle[sectionId] = !this.viewSectionToggle[sectionId];
    },
    isPayments(idCourse) {
      const userId = this.user.id;
      baseApi.get(`/api/payment/isPayment/${idCourse}/${userId}`)
          .then(value => {
            if (value.data) {
              this.isPayment = true;
            }
            console.log("Enrollment: " + value.data);
          });
    },
    handleEnroll() {
      if (!this.isPayment) {  // Kiểm tra nếu chưa thanh toán
        // Lấy danh sách giỏ hàng từ localStorage hoặc tạo mảng mới nếu chưa có
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Tạo đối tượng khóa học để thêm vào giỏ hàng
        const courseToAdd = {
          id: this.course.id,
          courseId: this.course.id, // Thêm courseId ở đây
          title: this.course.title,
          price: this.course.price,
          coverImage: this.course.coverImage,
          description: this.course.description,
          level: this.course.level,
          enrolledUserCount: this.course.enrolledUserCount,
          category: this.course.category,
          instructor: this.course.instructor,
          // Thêm các thuộc tính khác nếu cần
        };

        // Kiểm tra xem khóa học đã có trong giỏ hàng chưa
        if (!cart.some(item => item.id === courseToAdd.id)) {
          cart.push(courseToAdd);  // Thêm khóa học vào giỏ hàng
          localStorage.setItem("cart", JSON.stringify(cart));  // Cập nhật localStorage
          alert("Added to cart successfully!");
        } else {
          alert("Course is already in the cart!");
        }
      }

      // Điều hướng tùy theo giá trị của isPayment
      const destination = this.isPayment ? "/course/course-lesson/" : "/pages/cart";
      this.$router.push({ path: destination, query: { id: this.idCourse } });
    }

  }
}
</script>

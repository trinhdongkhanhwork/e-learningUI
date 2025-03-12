<template>
  <page-header></page-header>
  <coursedetails></coursedetails>
<!--   <inner-page></inner-page>-->
  <div>
    <div class="inner-banner" :style="{ backgroundImage: `url(${course.coverImage})` }">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="instructor-wrap border-bottom-0 m-0">
              <div class="about-instructor align-items-center">
                <div class="abt-instructor-img">
                  <router-link to="/instructor/instructor-profile"
                  ><img
                      :src="`${course.instructor.avatarUrl}`"
                      alt="img"
                      class="img-fluid"
                  /></router-link>
                </div>
                <div class="instructor-detail me-3">
                  <h5><router-link to="/instructor/instructor-profile">{{ course.instructor.fullname }}</router-link></h5>
                  <p>Phone: {{ course.instructor.phone }}</p>
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
                <p>{{ course.level }}</p>
              </div>
              <div class="cou-info">
                <img src="@/assets/img/icon/timer-icon.svg" alt="" />
                <p>9hr 30min</p>
              </div>
              <div class="cou-info">
                <img src="@/assets/img/icon/people.svg" alt="" />
                <p>{{ course.enrolledUserCount }} students enrolled</p>
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
                  <img
                      :src="`${course.coverImage}`"
                      alt="img"
                      class="img-fluid"
                      style="width: 450px; height: 250px; object-fit: cover;"
                  />
                  <div class="video-details">
                    <div class="course-fee">
                      <h2>{{ course.price }}$</h2>
                      <p><img :src="require('@/assets/img/course-list/anh-dong.gif')" alt="Example Image" style="width: 100px;height: 70px;"/></p>
                    </div>
                    <div class="row gx-2">
                      <div class="col-md-6">
                        <button
                          class="btn btn-wish w-100"
                          :class="{ 'btn-wish-active': course.isFavorite }"
                          @click="toggleWishlist(course)"
                        >
                          <i :class="course.isFavorite ? 'feather-heart' : 'feather-heart-off'"></i>
                          {{ course.isFavorite ? 'Remove Wishlist' : 'Add to Wishlist' }}
                        </button>
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
                    Enrolled: <span>{{ course.enrolledUserCount }} students</span>
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
import {router} from "@/router";

export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);

    return {
      idCourse: null,  // Khai báo idCourse ở đây
      user,
      isPayment: false,
      wishlist: [],  // Đã thêm wishlist
      course: {},
      sections: [],
      viewSectionToggle: {},
      reviews: [],
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
    this.isPayments(this.idCourse);
    this.fetchWishlist();  // Lấy wishlist ngay khi bắt đầu
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
    isViewSectionToggle(sectionId) {
      this.viewSectionToggle[sectionId] = !this.viewSectionToggle[sectionId];
    },
    isPayments(idCourse) {
      const userId = this.user?.id;
      baseApi.get(`/api/payment/isPayment/${idCourse}/${userId}`)
          .then(value => {
            if (value.data) {
              this.isPayment = true;
            }
            console.log("Enrollment: " + value.data);
          });
    },
    handleEnroll() {
      const userId = this.user?.id;
      if (!userId) {
        alert("Please log in to add a course to your cart.");
        router.push("/");
        return;
      }
      if (!this.isPayment) {
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
    },

    async toggleWishlist(course) {
      if (course.isFavorite) {
        await this.unWishlist(course.id);
        course.isFavorite = false; 
      } else {
        await this.addToWishlist(course);
        course.isFavorite = true; 
      }
      await this.fetchWishlist();
    },

    // Hàm thêm khóa học vào wishlist
    async addToWishlist(course) {
      const userId = this.user?.id;
      if (!userId) {
        console.warn("User chưa đăng nhập. Chuyển hướng đến trang login.");
        router.push("/");
        return;
      }
      console.log(userId);
      const wishlistData = {
        userId: userId,
        courseId: course.id
      };

      try {
        const response = await baseApi.post('/api/v1/wishlist/addWishlist', wishlistData);
        if (response && response.data && response.data.code === 9898) {
          console.log("Khóa học đã được thêm vào wishlist:", response.data);
          // Cập nhật lại wishlist sau khi thêm khóa học
          this.fetchWishlist();
        } else {
          console.error("Định dạng phản hồi không như mong đợi:", response);
        }
      } catch (error) {
        console.error("Lỗi khi thêm vào wishlist:", error);
      }
    },

    // Hàm lấy danh sách wishlist
    async fetchWishlist() {
      const userId = this.user?.id;
      console.log("Fetching wishlist for user ID:", userId);
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        this.wishlist = response.data || [];
        console.log("Wishlist data:", this.wishlist); // Kiểm tra dữ liệu
        this.updateFavoriteStatus(); // Cập nhật trạng thái yêu thích
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    },

    async unWishlist(courseId) {
  // Lấy wishlistId dựa trên courseId từ danh sách wishlist hiện tại
  const wishlistItem = this.wishlist.find(wish => wish.courseId === courseId);
  if (!wishlistItem) {
    console.error("Wishlist item không tồn tại với courseId:", courseId);
    return;
  }

  try {
    const response = await baseApi.delete(`/api/v1/wishlist/${wishlistItem.id}`);
    if (response.status === 200) {
      console.log("Khóa học đã bị xóa khỏi wishlist");

      // Cập nhật lại danh sách wishlist
      this.wishlist = this.wishlist.filter(course => course.id !== wishlistItem.id);
      this.updateFavoriteStatus();
    }
  } catch (error) {
    console.error("Lỗi khi xóa khỏi wishlist:", error);
  }
},

    updateFavoriteStatus() {
      // Lọc các khóa học trong danh sách wishlist và cập nhật trạng thái yêu thích
      this.course.isFavorite = this.wishlist.some(wish => wish.courseId === this.course.id);
    },
  }
}
</script>

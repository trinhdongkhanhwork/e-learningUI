<template>
  <page-header></page-header>
  <coursedetails></coursedetails>
  <div>
    <div class="inner-banner" :style="{ backgroundImage: `url(${course.coverImage})` }">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="instructor-wrap border-bottom-0 m-0">
              <div class="about-instructor align-items-center">
                <div class="abt-instructor-img">
                  <router-link to="/instructor/instructor-profile">
                    <img :src="`${course.instructor.avatarUrl}`" alt="img" class="img-fluid" />
                  </router-link>
                </div>
                <div class="instructor-detail me-3">
                  <h5>
                    <router-link to="/instructor/instructor-profile">{{ course.instructor.fullname }}</router-link>
                  </h5>
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
              <p>{{ course.description }}</p>
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
              </div>
              <div class="course-card" v-for="(section, index) in sections" :key="index">
                <h6 class="cou-title">
                  <a class="collapsed" @click="isViewSectionToggle(section.id)">
                    {{ section.title }}
                  </a>
                </h6>
                <div class="card-collapse" v-if="viewSectionToggle[section.id]">
                  <ul>
                    <li v-for="(lecture, index) in section.lectures" :key="index">
                      <p>
                        <img src="@/assets/img/icon/play.svg" alt="" class="me-2" />
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

          <!-- Reviews -->
          <div class="card review-sec" v-if="reviews.length != 0">
            <div class="card-body" style="padding-bottom: 0;">
              <h5 class="subs-title" style="margin: 0">Reviews</h5>
            </div>
            <div class="card-body" v-for="(review, index) in reviews" :key="index">
              <div class="instructor-wrap">
                <div class="about-instructor">
                  <div class="abt-instructor-img">
                    <router-link to="/instructor/instructor-profile">
                      <img src="@/assets/img/user/user1.jpg" alt="img" class="img-fluid" />
                    </router-link>
                  </div>
                  <div class="instructor-detail">
                    <h5>
                      <router-link to="/instructor/instructor-profile">{{ review.fullName }}</router-link>
                    </h5>
                    <p>UX/UI Designer</p>
                  </div>
                </div>
                <div class="rating">
                  <i class="fas fa-star filled me-1" v-for="n in review.star" :key="n"></i>
                  <i class="fas fa-star me-1" v-for="n in (5 - review.star)" :key="n"></i>
                  <span class="d-inline-block average-rating">{{ review.star }} Student Rating</span>
                </div>
              </div>
              <p style="font-size: 15px;">{{ review.commentText }}</p>
            </div>
          </div>
          <!-- /Reviews -->
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
                      <p><img :src="require('@/assets/img/course-list/anh-dong.gif')" alt="Example Image" style="width: 100px; height: 70px;" /></p>
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
                        <a href="javascript:;" class="btn btn-wish w-100">
                          <i class="feather-share-2"></i> Share
                        </a>
                      </div>
                    </div>
                    <router-link
                        :to="isPayment ? { path: '/course/course-lesson/', query: { id: idCourse } } : { path: '/pages/cart'}"
                        class="btn btn-enroll w-100"
                        @click="handleEnroll"
                    >
                      {{ isPayment ? 'Start' : 'Enroll now' }}
                    </router-link>
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
                    <img src="@/assets/img/icon/import.svg" class="me-2" alt="" />
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
                    <img src="@/assets/img/icon/mobile.svg" class="me-2" alt="" />
                    Access on mobile and TV
                  </li>
                  <li>
                    <img src="@/assets/img/icon/cloud.svg" class="me-2" alt="" />
                    Assignments
                  </li>
                  <li>
                    <img src="@/assets/img/icon/teacher.svg" class="me-2" alt="" />
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
                    <img src="@/assets/img/icon/users.svg" class="me-2" alt="" />
                    Enrolled: <span>{{ course.enrolledUserCount }} students</span>
                  </li>
                  <li>
                    <img src="@/assets/img/icon/timer.svg" class="me-2" alt="" />
                    Duration: <span>20 hours</span>
                  </li>
                  <li>
                    <img src="@/assets/img/icon/chapter.svg" class="me-2" alt="" />
                    Chapters: <span>15</span>
                  </li>
                  <li>
                    <img src="@/assets/img/icon/video.svg" class="me-2" alt="" />
                    Video: <span>12 hours</span>
                  </li>
                  <li>
                    <img src="@/assets/img/icon/chart.svg" class="me-2" alt="" />
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
import { ref, onMounted } from "vue";
import { router } from "@/router";

export default {
  setup() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    const idCourse = ref(null);
    const isPayment = ref(false);
    const wishlist = ref([]);
    const course = ref({
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
      sections: [],
      isFavorite: false,
    });
    const sections = ref([]);
    const viewSectionToggle = ref({});
    const reviews = ref([]);

    // Lấy courseId từ query
    onMounted(() => {
      idCourse.value = router.currentRoute.value.query.id;
      if (idCourse.value) {
        getCourseById(idCourse.value);
        isPayments(idCourse.value);
        fetchWishlist();
      }
    });

    // Lấy thông tin khóa học
    const getCourseById = async (courseId) => {
      try {
        const response = await baseApi.get(`/api/v1/courses/getCourseById/${courseId}`);
        course.value = response.data;
        sections.value = course.value.sections || [];
        console.log("Tìm khóa học thành công");
      } catch (error) {
        console.log("Tìm khóa học thất bại", error);
      }
    };

    // Toggle hiển thị section
    const isViewSectionToggle = (sectionId) => {
      viewSectionToggle.value[sectionId] = !viewSectionToggle.value[sectionId];
    };

    // Kiểm tra trạng thái thanh toán
    const isPayments = async (courseId) => {
      const userId = user.value?.id;
      if (!userId) return;
      try {
        const response = await baseApi.get(`/api/payment/isPayment/${courseId}/${userId}`);
        isPayment.value = response.data;
        console.log("Enrollment: " + response.data);
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    // Lấy danh sách wishlist
    const fetchWishlist = async () => {
      const userId = user.value?.id;
      if (!userId) return;
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        wishlist.value = response.data || [];
        updateFavoriteStatus();
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    // Cập nhật trạng thái isFavorite của khóa học
    const updateFavoriteStatus = () => {
      course.value.isFavorite = wishlist.value.some(wish => wish.courseId === course.value.id);
    };

    // Kiểm tra xem khóa học đã có trong wishlist chưa
    const isInWishlist = (courseId) => {
      return wishlist.value.some(wish => wish.courseId === courseId);
    };

    // Thêm vào wishlist
    const addToWishlist = async (course) => {
      const userId = user.value?.id;
      if (!userId) {
        alert("Please log in to add to wishlist!");
        return;
      }

      // Kiểm tra xem khóa học đã có trong wishlist chưa
      if (isInWishlist(course.id)) {
        alert("This course is already in your wishlist!");
        return;
      }

      const wishlistData = {
        userId: userId,
        courseId: course.id,
      };

      try {
        const response = await baseApi.post('/api/v1/wishlist/addWishlist', wishlistData);
        if (response && response.data) {
          console.log("Khóa học đã được thêm vào wishlist:", response.data);
          wishlist.value.push(response.data); // Thêm vào danh sách wishlist
          course.value.isFavorite = true; // Cập nhật trạng thái
        }
      } catch (error) {
        console.error("Lỗi khi thêm vào wishlist:", error);
        alert("Failed to add to wishlist. Please try again.");
      }
    };

    // Xóa khỏi wishlist
    const unWishlist = async (courseId) => {
      const wishlistItem = wishlist.value.find(wish => wish.courseId === courseId);
      if (!wishlistItem) {
        console.error("Wishlist item không tồn tại với courseId:", courseId);
        return;
      }

      try {
        const response = await baseApi.delete(`/api/v1/wishlist/${wishlistItem.id}`);
        if (response.status === 200) {
          console.log("Khóa học đã bị xóa khỏi wishlist");
          wishlist.value = wishlist.value.filter(course => course.id !== wishlistItem.id);
          course.value.isFavorite = false; // Cập nhật trạng thái
        }
      } catch (error) {
        console.error("Lỗi khi xóa khỏi wishlist:", error);
      }
    };

    // Toggle wishlist
    const toggleWishlist = async (course) => {
      if (course.isFavorite) {
        await unWishlist(course.id);
      } else {
        await addToWishlist(course);
      }
    };

    // Kiểm tra xem khóa học đã có trong giỏ hàng chưa
    const checkCart = async (courseId) => {
      const userId = user.value?.id;
      if (!userId) return false;
      try {
        const response = await baseApi.get(`/api/v1/cart/getAllCart/${userId}`);
        const carts = response.data;
        return carts.some(cart => cart.courseId === courseId);
      } catch (error) {
        console.error("Lỗi khi kiểm tra giỏ hàng:", error);
        return false;
      }
    };

    // Thêm vào giỏ hàng
    const addToCart = async (courseId) => {
      const userId = user.value?.id;
      if (!userId) {
        alert("Please log in to add to cart!");
        return;
      }

      const cartRequest = {
        userId: userId,
        courseId: courseId,
        addAt: new Date().toISOString(),
      };

      try {
        const response = await baseApi.post('/api/v1/cart/addCart', cartRequest);
        console.log("Đã thêm vào giỏ hàng:", response.data);
        return response.data;
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        throw error;
      }
    };

    // Xử lý nút Enroll
    const handleEnroll = async () => {
      if (!isPayment.value) { // Nếu chưa thanh toán
        try {
          // Kiểm tra xem khóa học đã có trong giỏ hàng chưa
          const isInCart = await checkCart(course.value.id);

          if (!isInCart) {
            // Thêm vào giỏ hàng qua API
            await addToCart(course.value.id);
          } else {
            alert("Course is already in the cart!");
          }

          // Điều hướng đến trang giỏ hàng
          router.push({ path: '/pages/cart', query: { id: idCourse.value } });
        } catch (error) {
          alert("Failed to add to cart. Please try again.");
        }
      } else {
        // Nếu đã thanh toán, điều hướng đến trang bài học
        router.push({ path: '/course/course-lesson/', query: { id: idCourse.value } });
      }
    };

    return {
      idCourse,
      user,
      isPayment,
      wishlist,
      course,
      sections,
      viewSectionToggle,
      reviews,
      getCourseById,
      isViewSectionToggle,
      isPayments,
      fetchWishlist,
      toggleWishlist,
      handleEnroll,
    };
  },
};
</script>
<template>
  <layouts-login></layouts-login>
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
                  <i class="fas fa-star filled me-1" v-for="n in Math.floor(averageRating)" :key="n"></i>
                  <i class="fas fa-star-half-alt filled me-1" v-if="averageRating % 1 >= 0.5"></i>
                  <i class="fas fa-star me-1" v-for="n in (5 - Math.ceil(averageRating))" :key="n"></i>
                  <span class="d-inline-block average-rating"><span>{{ averageRating.toFixed(1) }}</span> ({{ reviews.length }})</span>
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
              <!-- <div class="cou-info">
                <img src="@/assets/img/icon/timer-icon.svg" alt="" />
                <p>9hr 30min</p>
              </div> -->
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
  <section class="page-content course-sec" style="min-height: 800px;">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <!-- Overview -->
          <!-- <div class="card overview-sec">
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
          </div> -->
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
                      <!-- <div>
                        <a href="javascript:;">Preview</a>
                        <span>02:53</span>
                      </div> -->
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- /Course Content -->

          <!-- Phần đánh giá -->
          <div class="card review-sec">
            <div class="card-body" style="padding-bottom: 0;">
              <h5 class="subs-title" style="margin: 0">Reviews</h5>
            </div>
            <!-- Form chỉ để thêm bình luận mới -->
            <div class="card-body" v-if="isPayment && !userRating">
              <h6>Add Your Review</h6>
              <div class="form-group">
                <label>Rating:</label>
                <div class="star-rating">
                  <i
                      v-for="n in 5"
                      :key="n"
                      :class="[
                      'fas fa-star',
                      { 'filled': n <= ratingForm.rating },
                      'me-1',
                      'star-clickable'
                    ]"
                      @click="ratingForm.rating = n"
                  ></i>
                </div>
              </div>
              <div class="form-group">
                <label>Comment:</label>
                <textarea v-model="ratingForm.comment" class="form-control" rows="3"></textarea>
              </div>
              <button @click="createRating" class="btn btn-primary" style="margin-top: 10px;">Submit Review</button>
            </div>
            <!-- Danh sách bình luận với nút sửa/xóa -->
            <div class="card-body" v-for="(review, index) in reviews" :key="index">
              <div class="instructor-wrap d-flex justify-content-between align-items-center">
                <div class="about-instructor">
                  <div class="abt-instructor-img">
                    <router-link to="/instructor/instructor-profile">
                      <img :src="review.avatarUrl" alt="img" class="img-fluid" />
                    </router-link>
                  </div>
                  <div class="instructor-detail">
                    <h5>
                      {{ review.fullName }}
                    </h5>
                  </div>
                </div>
                <div class="rating">
                  <i class="fas fa-star filled me-1" v-for="n in review.rating" :key="n"></i>
                  <i class="fas fa-star me-1" v-for="n in (5 - review.rating)" :key="n"></i>
                  <span class="d-inline-block average-rating">{{ review.rating }} Star Rating</span>
                </div>
              </div>
              <!-- Form sửa bình luận -->
              <div v-if="editingReviewId === review.id">
                <div class="form-group">
                  <label>Rating:</label>
                  <div class="star-rating">
                    <i
                      v-for="n in 5"
                      :key="n"
                      :class="[
                        'fas fa-star',
                        { 'filled': n <= ratingForm.rating },
                        'me-1',
                        'star-clickable'
                      ]"
                      @click="ratingForm.rating = n"
                    ></i>
                  </div>
                </div>
                <div class="form-group">
                  <label>Comment:</label>
                  <textarea v-model="ratingForm.comment" class="form-control" rows="3"></textarea>
                </div>
                <button @click="updateRating(review.id)" class="btn btn-primary" style="margin-right: 10px; margin-top: 10px;">Save Changes</button>
                <button @click="cancelEdit" class="btn btn-secondary ml-2" style="margin-top: 10px;">Cancel</button>
              </div>
              <!-- Hiển thị bình luận và nút -->
              <div v-else>
                <p style="font-size: 15px;">{{ review.comment }}</p>
                <div v-if="user && review.userId === user.id" class="d-flex justify-content-end">
                  <button @click="startEdit(review)" class="btn btn-sm btn-primary me-2">Edit</button>
                  <button @click="deleteRating(review.id)" class="btn btn-sm btn-danger">Delete</button>
                </div>
              </div>
            </div>
            <div class="card-body" v-if="reviews.length === 0">
              <p>No reviews yet.</p>
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
            <!-- <div class="card include-sec">
              <div class="card-body">
                <div class="cat-title">
                  <h4>Includes</h4>
                </div>
                <ul>
                  <li><img src="@/assets/img/icon/import.svg" class="me-2" alt="" />11 hours on-demand video</li>
                  <li><img src="@/assets/img/icon/play.svg" class="me-2" alt="" />69 downloadable resources</li>
                  <li><img src="@/assets/img/icon/key.svg" class="me-2" alt="" />Full lifetime access</li>
                  <li><img src="@/assets/img/icon/mobile.svg" class="me-2" alt="" />Access on mobile and TV</li>
                  <li><img src="@/assets/img/icon/cloud.svg" class="me-2" alt="" />Assignments</li>
                  <li><img src="@/assets/img/icon/teacher.svg" class="me-2" alt="" />Certificate of Completion</li>
                </ul>
              </div>
            </div> -->
            <!-- /Include -->

            <!-- Features -->
            <!-- <div class="card feature-sec">
              <div class="card-body">
                <div class="cat-title">
                  <h4>Includes</h4>
                </div>
                <ul>
                  <li><img src="@/assets/img/icon/users.svg" class="me-2" alt="" />Enrolled: <span>{{ course.enrolledUserCount }} students</span></li>
                  <li><img src="@/assets/img/icon/timer.svg" class="me-2" alt="" />Duration: <span>20 hours</span></li>
                  <li><img src="@/assets/img/icon/chapter.svg" class="me-2" alt="" />Chapters: <span>15</span></li>
                  <li><img src="@/assets/img/icon/video.svg" class="me-2" alt="" />Video: <span>12 hours</span></li>
                  <li><img src="@/assets/img/icon/chart.svg" class="me-2" alt="" />Level: <span>Beginner</span></li>
                </ul>
              </div>
            </div> -->
            <!-- /Features -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <layouts1></layouts1>
</template>

<script>
import baseApi from '@/axios';
import { useStore } from 'vuex';
import { ref, onMounted } from "vue";
import { router } from "@/router";
import { showError, showSuccess } from '@/utils/confirmDialogs';

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
    const averageRating = ref(0);
    const userRating = ref(null);
    const ratingForm = ref({ rating: 0, comment: "" });
    const editingReviewId = ref(null);

    onMounted(() => {
      idCourse.value = router.currentRoute.value.query.id;
      if (idCourse.value) {
        getCourseById(idCourse.value);
        isPayments(idCourse.value);
        fetchWishlist();
        fetchReviews(idCourse.value);
        fetchAverageRating(idCourse.value);
        fetchUserRating(idCourse.value);
      }
    });

    const getCourseById = async (courseId) => {
      try {
        const response = await baseApi.get(`/api/v1/courses/getCourseById/${courseId}`);
        course.value = response.data;
        sections.value = course.value.sections || [];
      } catch (error) {
        showError("Không thể tải thông tin khóa học!");
      }
    };

    const isViewSectionToggle = (sectionId) => {
      viewSectionToggle.value[sectionId] = !viewSectionToggle.value[sectionId];
    };

    const isPayments = async (courseId) => {
      const userId = user.value?.id;
      if (!userId) return;
      try {
        const response = await baseApi.get(`/api/payment/isPayment/${courseId}/${userId}`);
        isPayment.value = response.data;
      } catch (error) {
        showError("Lỗi khi kiểm tra trạng thái thanh toán!");
      }
    };

    const fetchWishlist = async () => {
      const userId = user.value?.id;
      if (!userId) return;
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        wishlist.value = response.data || [];
        updateFavoriteStatus();
      } catch (error) {
        showError("Lỗi khi lấy danh sách yêu thích!");
      }
    };

    const updateFavoriteStatus = () => {
      course.value.isFavorite = wishlist.value.some(wish => wish.courseId === course.value.id);
    };

    const isInWishlist = (courseId) => {
      return wishlist.value.some(wish => wish.courseId === courseId);
    };

    const addToWishlist = async (course) => {
      const userId = user.value?.id;
      if (!userId) {
        showError("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
        return;
      }
      if (isInWishlist(course.id)) {
        showError("Khóa học đã có trong danh sách yêu thích!");
        return;
      }
      const wishlistData = { userId: userId, courseId: course.id };
      await baseApi.post('/api/v1/wishlist/addWishlist', wishlistData);
      await fetchWishlist();
      showSuccess("Đã thêm vào danh sách yêu thích!");
    };

    const unWishlist = async (courseId) => {
      const wishlistItem = wishlist.value.find(wish => wish.courseId === courseId);
      if (!wishlistItem) {
        showError("Không tìm thấy khóa học trong danh sách yêu thích!");
        return;
      }
      try {
        const response = await baseApi.delete(`/api/v1/wishlist/${wishlistItem.id}`);
        if (response.status === 200) {
          wishlist.value = wishlist.value.filter(wish => wish.id !== wishlistItem.id);
          course.value.isFavorite = false;
          showSuccess("Đã xóa khỏi danh sách yêu thích!");
        }
      } catch (error) {
        showError("Lỗi khi xóa khỏi danh sách yêu thích!");
      }
    };

    const toggleWishlist = async (course) => {
      if (course.isFavorite) {
        await unWishlist(course.id);
      } else {
        await addToWishlist(course);
      }
    };

    const checkCart = async (courseId) => {
      const userId = user.value?.id;
      if (!userId) return false;
      try {
        const response = await baseApi.get(`/api/v1/cart/getAllCart/${userId}`);
        const carts = response.data;
        return carts.some(cart => cart.courseId === courseId);
      } catch (error) {
        showError("Lỗi khi kiểm tra giỏ hàng!");
        return false;
      }
    };

    const addToCart = async (courseId) => {
      const userId = user.value?.id;
      if (!userId) {
        showError("Vui lòng đăng nhập để thêm vào giỏ hàng!");
        return;
      }
      const cartRequest = { userId: userId, courseId: courseId, addAt: new Date().toISOString() };
      try {
        const response = await baseApi.post('/api/v1/cart/addCart', cartRequest);
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    const handleEnroll = async () => {
      if (!isPayment.value) {
        try {
          const isInCart = await checkCart(course.value.id);
          if (!isInCart) {
            await addToCart(course.value.id);
          } else {
            showError("Khóa học đã có trong giỏ hàng!");
          }
          router.push({ path: '/pages/cart', query: { id: idCourse.value } });
        } catch (error) {
          showError("Không thể thêm vào giỏ hàng. Vui lòng thử lại!");
        }
      } else {
        router.push({ path: '/course/course-lesson/', query: { id: idCourse.value } });
      }
    };

    const fetchReviews = async (courseId) => {
      const response = await baseApi.get(`/api/ratings/course/${courseId}`);
      reviews.value = response.data;
    };

    const fetchAverageRating = async (courseId) => {
      try {
        const response = await baseApi.get(`/api/ratings/course/${courseId}/average`);
        averageRating.value = response.data || 0;
      } catch (error) {
        showError("Lỗi khi lấy điểm đánh giá trung bình!");
      }
    };

    const fetchUserRating = async (courseId) => {
      const userId = user.value?.id;
      if (!userId) return;
      try {
        const response = await baseApi.get(`/api/ratings/course/${courseId}`);
        const userReview = response.data.find(r => r.userId === userId);
        if (userReview) {
          userRating.value = userReview;
        }
      } catch (error) {
        showError("Lỗi khi lấy đánh giá của bạn!");
      }
    };

    const createRating = async () => {
      const userId = user.value?.id;
      if (!userId) {
        showError("Vui lòng đăng nhập để gửi đánh giá!");
        return;
      }
      if (!isPayment.value) {
        showError("Bạn cần mua khóa học để gửi đánh giá!");
        return;
      }
      try {
        const response = await baseApi.post('/api/ratings', {
          userId: userId,
          courseId: idCourse.value,
          rating: ratingForm.value.rating,
          comment: ratingForm.value.comment,
        });
        userRating.value = response.data;
        
        reviews.value.push({
          id: response.data.id,
          fullName: response.data.fullname,
          avatarUrl: response.data.avatarUrl, 
          rating: response.data.rating,
          comment: response.data.comment,
          userId: response.data.userId,
        });
        
        ratingForm.value = { rating: 0, comment: "" };
        fetchAverageRating(idCourse.value);
        showSuccess("Đã gửi đánh giá thành công!");
      } catch (error) {
        showError("Không thể gửi đánh giá. Vui lòng thử lại!");
      }
    };

    const updateRating = async (ratingId) => {
      const userId = user.value?.id;
      if (!userId) return;
      try {
        const response = await baseApi.put('/api/ratings', {
          userId: userId,
          courseId: idCourse.value,
          ratingId: ratingId,
          rating: ratingForm.value.rating,
          comment: ratingForm.value.comment,
        });
        reviews.value = reviews.value.map(r => r.id === response.data.id ? response.data : r);
        if (userRating.value && userRating.value.id === ratingId) {
          userRating.value = response.data;
        }
        editingReviewId.value = null;
        ratingForm.value = { rating: 0, comment: "" };
        fetchAverageRating(idCourse.value);
        showSuccess("Đã cập nhật đánh giá thành công!");
      } catch (error) {
        showError("Không thể cập nhật đánh giá. Vui lòng thử lại!");
      }
    };

    const deleteRating = async (ratingId) => {
      const userId = user.value?.id;
      if (!userId) return;
      try {
        await baseApi.delete('/api/ratings', {
          data: {
            userId: userId,
            ratingId: ratingId,
          }
        });
        reviews.value = reviews.value.filter(r => r.id !== ratingId);
        if (userRating.value && userRating.value.id === ratingId) {
          userRating.value = null;
        }
        fetchAverageRating(idCourse.value);
        showSuccess("Đã xóa đánh giá thành công!");
      } catch (error) {
        showError("Không thể xóa đánh giá. Vui lòng thử lại!");
      }
    };

    const startEdit = (review) => {
      editingReviewId.value = review.id;
      ratingForm.value = { rating: review.rating, comment: review.comment };
    };

    const cancelEdit = () => {
      editingReviewId.value = null;
      ratingForm.value = { rating: 0, comment: "" };
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
      averageRating,
      userRating,
      ratingForm,
      editingReviewId,
      getCourseById,
      isViewSectionToggle,
      isPayments,
      fetchWishlist,
      toggleWishlist,
      handleEnroll,
      fetchReviews,
      fetchAverageRating,
      fetchUserRating,
      createRating,
      updateRating,
      deleteRating,
      startEdit,
      cancelEdit,
    };
  },
};
</script>

<style>
.star-rating .fas.fa-star {
  color: #e0e0e0; /* White/light gray color for unselected stars */
  cursor: pointer;
}

.star-rating .fas.fa-star.filled {
  color: #ffb800; /* Yellow color for selected stars */
}

.star-clickable {
  transition: transform 0.1s ease-in-out;
}

.star-clickable:hover {
  transform: scale(1.1);
}
</style>
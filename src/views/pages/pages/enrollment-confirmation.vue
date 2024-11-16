<template>
  <div class="enrollment-confirmation">
    <h1>Enrollment Confirmation</h1>
    <p>Your course has been successfully registered!</p>

    <div v-if="course">
      <h2>{{ course.title }}</h2>
      <img :src="course.coverImage" alt="Course Cover Image" class="course-image" />
      <p>{{ course.description }}</p>
      <p><strong>Category:</strong> {{ course.category }}</p>
      <p><strong>Level:</strong> {{ course.level }}</p>
      <p><strong>Price:</strong> ${{ course.price }}</p>
    </div>
    <button @click="confirmEnrollment">Admission confirmation</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'EnrollmentConfirmation',
  data() {
    return {
      course: null,
    };
  },
  mounted() {
    this.fetchCourseDetails();
    this.preventBackNavigation(); // Ngăn người dùng quay lại trang trước
  },
  methods: {
    async fetchCourseDetails() {
      try {
        const courseId = this.$route.query.courseId; // Lấy courseId từ query
        // Kiểm tra xem courseId có hợp lệ không
        if (!courseId || isNaN(courseId)) {
          return; // Ngừng thực hiện nếu courseId không hợp lệ
        }
        const response = await axios.get(`http://localhost:8080/api/v1/courses/${courseId}`);
        this.course = response.data;
      } catch (error) {
        console.error("Error fetching course details:", error); // Ghi lỗi nếu có
      }
    },
    preventBackNavigation() {
      // Ngăn người dùng quay lại trang trước
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', () => {
        window.history.pushState(null, document.title, window.location.href);
        // Nếu cần, bạn có thể điều hướng tới một trang khác ở đây
        // this.$router.push('/some-other-page');
      });
    },
    confirmEnrollment() {
      const courseId = this.$route.query.courseId; // Lấy courseId từ query
      const paymentId = this.$route.query.paymentId; // Lấy paymentId từ query

      if (!courseId || !paymentId) {
        console.log("Missing courseId or paymentId"); // Ghi log để gỡ lỗi
        return; // Ngừng thực hiện nếu không có courseId hoặc paymentId
      }

      // Gửi yêu cầu cập nhật trạng thái enrollment
      axios.post(`http://localhost:8080/api/enrollments/confirm`, null, {
        params: {
          paymentId: paymentId,
          courseId: courseId
        }
      })
          .then(response => {
            console.log("Enrollment confirmation response:", response.data); // Ghi log để kiểm tra phản hồi
            // Chuyển đến trang payment-success với courseId
            this.next(courseId);
          })
          .catch(error => {
            console.error("Error confirming enrollment:", error); // Ghi lỗi nếu có
          });
    },
    next(courseId) {
      console.log("Navigating to payment-success with courseId:", courseId); // Kiểm tra courseId trước khi điều hướng
      this.$router.push({ path: 'payment-success', query: { courseId } });
    },
  },
  watch: {
    '$route.query.courseId': 'fetchCourseDetails',
  },
};
</script>

<style scoped>
.enrollment-confirmation {
  text-align: center;
}

.course-image {
  max-width: 100%;
  height: auto;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50; /* Màu xanh lá */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049; /* Màu xanh lá đậm hơn khi hover */
}
</style>

<template>
  <div class="payment-success">
    <h1>Payment successful!</h1>
    <p>Thank you for your payment.</p>
    <router-link to="/home/index" class="btn btn-primary">Return to the home page</router-link>
    <router-link :to="{ path: '/course/course-details', query: { id: courseId } }" class="btn btn-secondary">
      Go to Course Details
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccess',
  computed: {
    courseId() {
      const id = this.$route.query.courseId; // Lấy courseId từ query
      console.log("courseId received:", id); // Ghi ra console để kiểm tra
      return id;
    },
  },
};
</script>

<style scoped>
.payment-success {
  text-align: center;
  margin: 50px;
}
.payment-success h1 {
  color: green;
}
.payment-success p {
  margin-bottom: 20px;
}
.btn {
  margin: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}
.btn-primary {
  background-color: #4CAF50; /* Green color for primary button */
  color: white;
}
.btn-primary:hover {
  background-color: #45a049; /* Darker green on hover for primary */
}
.btn-secondary {
  background-color: #007bff; /* Blue color for secondary button */
  color: white;
}
.btn-secondary:hover {
  background-color: #0056b3; /* Darker blue on hover for secondary */
}
</style>

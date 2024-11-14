<template>
  <div class="tab-pane show active" id="today">
    <div class="table-responsive custom-table">
      <table class="table table-nowrap mb-0">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Course Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in latestOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>
              <span class="title-course">{{ order.courseTitle }}</span>
            </td>
            <td>{{ formatDate(order.paymentDate) }}</td>
            <td>{{ order.price }}</td>
            <td>{{ getStatusLabel(order.paymentStatusId) }}</td>
            <td>
              <a href="javascript:void(0);" class="action-icon" @click="downloadOrder(order.courseId)">
                <i class="bx bxs-download"></i>
              </a>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { data } from 'vue3-tags-input';

export default {
  data() {
    return {
      orders: [] // Danh sách đơn hàng
    };
  },
  computed: {
    latestOrders() {
      return this.orders
        .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)) // Sắp xếp theo ngày thanh toán
        .slice(0, 10); // Lấy 10 đơn hàng gần nhất
    }
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    loadOrders() {
      axios.get('http://localhost:8080/api/payments')
        .then(response => {
          this.orders = response.data;
          console.log(this.orders);
        })
        .catch(error => {
          console.error("Error fetching orders:", error);
        });
    },
    getStatusLabel(status) {
      switch (status) {
        case 1:
          return "Completed";
        case 2:
          return "Failed";
        case 3:
          return "Pending";
        default:
          return "Unknown";
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
    },
    downloadOrder(courseId) {
      // Tìm đơn hàng có courseId tương ứng
      const order = this.orders.find(order => order.courseId === courseId);
      if (order && order.enrollment) {
        const downloadUrl = `http://localhost:8080/api/courses/${courseId}/download`; // Thay đổi API nếu cần
        axios.get(downloadUrl, { responseType: 'arraybuffer' })  // Sử dụng 'arraybuffer' để nhận dữ liệu nhị phân
          .then(response => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', `course_${courseId}.pdf`); // Đặt tên file tải xuống
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch(error => {
            console.error("Error downloading course PDF:", error);
          });
      } else {
        alert('Download is only available for completed payments.');
      }
    }

  }
};
</script>

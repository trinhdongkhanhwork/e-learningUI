<template>
  <page-header></page-header>

  <cart-breadcrumb></cart-breadcrumb>
  <!-- Cart -->
  <section class="course-content cart-widget">
    <div class="container">
      <div class="student-widget">
        <div class="student-widget-group">
          <div class="row">
            <div class="col-lg-12">
              <div class="cart-head">
                <h4>Your cart ({{ cartItems.length }} items)</h4>
              </div>
              <div class="cart-group">
                <div class="row">
                  <div v-if="cartItems.length > 0">
                    <div v-for="item in cartItems" :key="item.id" class="col-lg-12 col-md-12 d-flex">
                      <div class="course-box course-design list-course d-flex">
                        <!-- Checkbox lớn hơn và ở trên nút Remove -->
                        <div class="product-checkbox me-3">
                          <input
                              type="checkbox"
                              :id="`item-${item.id}`"
                              v-model="selectedItems"
                              :value="item.id"
                              class="large-checkbox"
                          />
                          <label :for="`item-${item.id}`"></label>
                        </div>
                        <div class="product">
                          <div class="product-img">
                            <router-link :to="`/course/course-details/${item.courseId}`">
                              <img class="img-fluid" :src="item.coverImage || ''" />
                            </router-link>
                            <div class="price">
                              <h3 class="free-color">${{ item.price || 'N/A' }}</h3>
                            </div>
                          </div>
                          <div class="product-content">
                            <div class="head-course-title">
                              <h3 class="title">
                                <router-link :to="`/course/course-details/${item.courseId}`">
                                  {{ item.title || 'No title' }}
                                </router-link>
                              </h3>
                            </div>
                            <div class="cart-remove mt-2">
                              <a href="javascript:;" class="btn btn-primary" @click="removeFromCart(item.id)">Remove</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <p>No items in cart</p>
                  </div>
                </div>
              </div>
              <div class="cart-total" v-if="cartItems.length > 0">
                <!-- Nút chọn tất cả -->
                <label class="select-all">
                  <input
                      type="checkbox"
                      v-model="selectAll"
                      @change="toggleSelectAll"
                  />
                  Select All
                </label>
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <div class="cart-subtotal">
                      <p>Subtotal (Selected: {{ selectedItems.length }}) <span>${{ totalPrice }}</span></p>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <h4>Choose Payment Method:</h4>
                    <div class="payment-methods">
                      <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="paypal"
                            value="paypal"
                            v-model="paymentMethod"
                        />
                        <label class="form-check-label" for="paypal">Paypal</label>
                      </div>
                      <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="vnpay"
                            value="vnpay"
                            v-model="paymentMethod"
                        />
                        <label class="form-check-label" for="vnpay">Vnpay</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <div class="check-outs mt-3">
                      <button @click="pay" class="btn btn-primary" :disabled="!paymentMethod || selectedItems.length === 0">
                        Pay Now ({{ selectedItems.length }} items)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Cart -->

  <layouts1></layouts1>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue';
import baseApi from "@/axios";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    const cartItems = ref([]);
    const paymentMethod = ref('');
    const route = useRoute();
    const selectedItems = ref([]); // Danh sách các ID của khóa học được chọn
    const selectAll = ref(false); // Trạng thái của nút "Select All"

    // Lấy danh sách giỏ hàng từ API
    const fetchCartItems = async () => {
      if (!user.value?.id) return;
      try {
        const response = await baseApi.get(`/api/v1/cart/getAllCart/${user.value.id}`);
        console.log("Cart items from API:", response.data);
        cartItems.value = response.data || [];
        cartItems.value.forEach(item => {
          if (typeof item.price !== 'number') {
            item.price = parseFloat(item.price) || 0;
          }
        });
        // Reset danh sách chọn sau khi tải lại dữ liệu
        selectedItems.value = [];
        selectAll.value = false;
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    // Xóa khóa học khỏi giỏ hàng
    const removeFromCart = async (cartId) => {
      try {
        await baseApi.delete(`/api/v1/cart/${cartId}`);
        cartItems.value = cartItems.value.filter(item => item.id !== cartId);
        selectedItems.value = selectedItems.value.filter(id => id !== cartId); // Xóa khỏi danh sách chọn nếu có
        updateSelectAllStatus();
        console.log("Removed item from cart successfully");
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    };

    const isPayments = async (idCourse) => {
      const userId = user.value.id;
      try {
        const response = await baseApi.get(`/api/payment/isPayment/${idCourse}/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Error checking payment status:", error);
        return false;
      }
    };

    const checkAndRemovePaidCourses = async () => {
      const updatedCart = (await Promise.all(cartItems.value.map(async item => {
        const paid = await isPayments(item.courseId);
        return paid ? null : item;
      }))).filter(item => item !== null);
      cartItems.value = updatedCart;
      selectedItems.value = selectedItems.value.filter(id => cartItems.value.some(item => item.id === id));
      updateSelectAllStatus();
    };

    // Tính tổng giá dựa trên các mục được chọn
    const totalPrice = computed(() => {
      return cartItems.value
          .filter(item => selectedItems.value.includes(item.id))
          .reduce((total, item) => {
            const price = item.price || 0;
            return total + price;
          }, 0)
          .toFixed(2);
    });

    const pay = async () => {
      if (selectedItems.value.length === 0) {
        console.error('No items selected to pay for');
        return;
      }

      const selectedCartItems = cartItems.value.filter(item => selectedItems.value.includes(item.id));
      const paymentData = {
        courseIds: selectedCartItems.map(item => item.courseId),
        userId: user.value.id
      };

      try {
        let endpoint = paymentMethod.value === 'paypal' ? '/api/payments/paypal/pay' : '/api/payments/vnpay/pay';
        const response = await baseApi.post(endpoint, paymentData);
        if (response.data && response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          console.error('No payment URL received');
        }
      } catch (error) {
        console.error('Error during payment:', error);
      }
    };

    // Hàm xử lý nút "Select All"
    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedItems.value = cartItems.value.map(item => item.id);
      } else {
        selectedItems.value = [];
      }
    };

    // Cập nhật trạng thái của "Select All" khi danh sách chọn thay đổi thủ công
    const updateSelectAllStatus = () => {
      selectAll.value = selectedItems.value.length === cartItems.value.length && cartItems.value.length > 0;
    };

    // Theo dõi thay đổi trong selectedItems để cập nhật selectAll
    watch(selectedItems, () => {
      updateSelectAllStatus();
    }, {deep: true});

    // Tải lại dữ liệu khi route thay đổi hoặc có query id mới
    watch(() => [route.path, route.query.id], ([newPath, newId]) => {
      if (newPath === '/pages/cart') {
        fetchCartItems().then(() => checkAndRemovePaidCourses());
      }
    }, {immediate: true});

    onMounted(() => {
      fetchCartItems().then(() => checkAndRemovePaidCourses());
    });

    return {
      cartItems,
      removeFromCart,
      paymentMethod,
      totalPrice,
      pay,
      selectedItems,
      selectAll,
      toggleSelectAll,
    };
  }
};
</script>

<style scoped>
.cart-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-all {
  font-size: 16px;
  cursor: pointer;
}

.select-all input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
}

.product-checkbox {
  display: flex;
  align-items: center;
}

.large-checkbox {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.product-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-remove {
  margin-top: 10px; /* Đẩy nút Remove xuống dưới checkbox */
}
</style>
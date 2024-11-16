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
                        <div class="product">
                          <div class="product-img">
                            <router-link :to="`/course/course-details/${item.id}`">
                              <img class="img-fluid" :src="`${item.coverImage}`" />
                            </router-link>
                            <div class="price">
                              <h3 class="free-color">{{ item.price }}</h3>
                            </div>
                          </div>
                          <div class="product-content">
                            <div class="head-course-title">
                              <h3 class="title">
                                <router-link :to="`/course/course-details/${item.id}`">{{ item.title }}</router-link>
                              </h3>
                            </div>
                          </div>
                          <div class="cart-remove">
                            <a href="javascript:;" class="btn btn-primary" @click="removeFromCart(item.id)">Remove</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-total">
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <div class="cart-subtotal">
                      <p>Subtotal <span>${{ totalPrice }}</span></p>
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
                        <label class="form-check-label" for="paypal">
                          Paypal
                        </label>
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
                        <label class="form-check-label" for="vnpay">
                          Vnpay
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <div class="check-outs mt-3">
                      <button @click="pay" class="btn btn-primary" :disabled="!paymentMethod"> Pay Now</button>
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

export default {
  setup() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    const cartItems = ref([]);
    const paymentMethod = ref('');

    // Hàm lấy dữ liệu từ localStorage
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
    cartItems.value = storedCart;
  } else {
    cartItems.value = [];
  }

      // Kiểm tra lại và đảm bảo price là số
      cartItems.value.forEach(item => {
        if (typeof item.price !== 'number') {
          item.price = parseFloat(item.price); // Chuyển price sang số nếu nó là chuỗi
        }
      });
    };

    // Hàm xóa khóa học khỏi giỏ hàng
    const removeFromCart = (courseId) => {
      cartItems.value = cartItems.value.filter(course => course.id !== courseId);
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
    };

    // Hàm kiểm tra thanh toán cho từng khóa học
    const isPayments = async (idCourse) => {
      const userId = user.value?.id;
      try {
        const response = await baseApi.get(`/api/payment/isPayment/${idCourse}/${userId}`);
        return response.data; // Trả về kết quả kiểm tra
      } catch (error) {
        console.error("Error checking payment status:", error);
        return false;
      }
    };

    // Kiểm tra thanh toán cho từng khóa học trong giỏ hàng và xóa nếu đã thanh toán
    const checkAndRemovePaidCourses = async () => {
      const itemsToKeep = [];
      for (const course of cartItems.value) {
        const paid = await isPayments(course.id);
        if (paid) {
          console.log(`Course ${course.id} đã thanh toán, xóa khỏi giỏ hàng`);
        } else {
          itemsToKeep.push(course);
        }
      }
      cartItems.value = itemsToKeep;
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
    };

    const totalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => {
        const price = item.price || 0;
        return total + price;
      }, 0).toFixed(2);
    });

    // Handle payment
    const pay = async () => {
      const price = parseFloat(totalPrice.value) * 100;
      const userId = ref(null);

      watch(user, (newUser) => {
        if (newUser && newUser.id) {
          userId.value = newUser.id;
        }
      }, { immediate: true });

      if (cartItems.value.length === 0) {
        console.error('No items in cart to pay for');
        return;
      }

      const courseId = cartItems.value[0].id;
      try {
        let paymentUrl;
        if (paymentMethod.value === 'paypal') {
          const response = await baseApi.post('/api/payments/paypal/pay', null, {
            params: {
              price,
              courseId,
              userId: userId.value,
            },
          });

          if (response.data && response.data.paymentUrl) {
            paymentUrl = response.data.paymentUrl;
            window.location.href = paymentUrl;
            return;
          }
        } else if (paymentMethod.value === 'vnpay') {
          const response = await baseApi.post('/api/payments/vnpay/pay', null, {
            params: {
              price,
              courseId,
              userId: userId.value,
            },
          });

          if (response.data && response.data.paymentUrl) {
            window.location.href = response.data.paymentUrl;
            return;
          }
        }
        console.error('No payment URL received');
      } catch (error) {
        console.error('Error during payment:', error);
      }
    };

    onMounted(() => {
      loadCart();
      checkAndRemovePaidCourses();
    });

    return {
      cartItems,
      removeFromCart,
      paymentMethod,
      totalPrice,
      pay,
    };
  }
};
</script>


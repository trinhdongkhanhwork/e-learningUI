<template>
  <layouts-loginborder></layouts-loginborder>

  <wishlist-breadcrumb></wishlist-breadcrumb>
  <!-- Pricing Plan -->
  <section class="course-content">
    <div class="container">
      <div class="card wish-card">
        <div class="card-header">
          <h5>{{ wishlist.length }} Courses</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <div class="wishlist-item" v-if="wishlist.length" v-for="wish in wishlist" :key="wish.id">
                <div class="row align-items-center">
                  <div class="col-md-9">
                    <div class="wishlist-detail">
                      <div class="wishlist-img">
                        <router-link :to="`/course/course-details?id=${wish.courseId}`">
                          <img v-if="wish.coverImage" :src="`${wish.coverImage}`" alt="Img" class="img-fluid" />
                        </router-link>
                        <div class="price-amt">
                          <h4>{{ wish.price }}</h4>
                        </div>
                      </div>
                      <div class="wishlist-info">
                        <h5>
                          <router-link :to="`/course/course-details?id=${wish.courseId}`">
                            {{ wish.title }}
                          </router-link>
                        </h5>
                        <div class="course-info d-flex align-items-center border-bottom-0 pb-0">
                          <div class="rating-img d-flex align-items-center">
                            <img src="@/assets/img/icon/icon-01.svg" alt="" />
                            <p>{{ wish.level }}</p>
                          </div>
                          <div class="course-view d-flex align-items-center">
                            <img src="@/assets/img/icon/icon-02.svg" alt="" />
                            <p>9hr 30min</p>
                          </div>
                        </div>
                        <div class="rating">
                          <i class="fas fa-star filled me-1"></i>
                          <i class="fas fa-star filled me-1"></i>
                          <i class="fas fa-star filled me-1"></i>
                          <i class="fas fa-star filled me-1"></i>
                          <i class="fas fa-star me-1"></i>
                          <span class="d-inline-block average-rating">
                            <span>4.0</span> (15)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="remove-btn">
                      <a
                          v-if="wish.isPayment"
                          class="btn"
                          style="background-color: lightblue; color: black;"
                          @click.prevent="handleWishlistItemAction(wish)"
                      >
                        View detail
                      </a>
                      <a
                          v-else-if="wish.inCart"
                          class="btn"
                          style="background-color: orange; color: white;"
                          @click.prevent="removeFromCart(wish.cartId)"
                      >
                        Remove from Cart
                      </a>
                      <a
                          v-else
                          href="#"
                          class="btn"
                          style="background-color: blanchedalmond; color: black;"
                          @click.prevent="addToCart(wish)"
                      >
                        Add to cart
                      </a>
                      <a
                          class="btn"
                          style="margin-left: 10px;"
                          @click.prevent="unWishlist(wish.id)"
                      >
                        UnWishlist
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <p>No items in wishlist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Pricing Plan -->
  <layouts1></layouts1>
</template>

<script>
import { router } from "@/router";
import baseApi from "@/axios";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    const wishlist = ref([]);

    // Fetch wishlist từ API
    const fetchWishlist = async () => {
      const userId = user.value?.id;
      if (!userId) return;
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        wishlist.value = await Promise.all(
            response.data.map(async (item) => {
              const isPayment = await checkPaymentStatus(item.courseId);
              const cartStatus = await checkCartStatus(item.courseId);
              return {
                ...item,
                isPayment,
                inCart: cartStatus.inCart,
                cartId: cartStatus.cartId, // Lưu cartId để xóa nếu cần
              };
            })
        );
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    // Kiểm tra trạng thái thanh toán của khóa học
    const checkPaymentStatus = async (courseId) => {
      const userId = user.value?.id;
      try {
        const response = await baseApi.get(`/api/payment/isPayment/${courseId}/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Error checking payment status:", error);
        return false;
      }
    };

    // Kiểm tra trạng thái giỏ hàng của khóa học
    const checkCartStatus = async (courseId) => {
      const userId = user.value?.id;
      try {
        const response = await baseApi.get(`/api/v1/cart/getAllCart/${userId}`);
        const cartItem = response.data.find((item) => item.courseId === courseId);
        return {
          inCart: !!cartItem,
          cartId: cartItem ? cartItem.id : null,
        };
      } catch (error) {
        console.error("Error checking cart status:", error);
        return { inCart: false, cartId: null };
      }
    };

    // Thêm vào giỏ hàng
    const addToCart = async (wish) => {
      const userId = user.value?.id;
      if (!userId) {
        alert("Please log in to add to cart!");
        return;
      }

      // Kiểm tra xem khóa học đã có trong giỏ hàng chưa
      const cartStatus = await checkCartStatus(wish.courseId);
      if (cartStatus.inCart) {
        alert("This course is already in your cart!");
        // Chuyển ngay đến trang giỏ hàng dù khóa học đã có
        router.push("/pages/cart");
        return;
      }

      try {
        const response = await baseApi.post(`/api/v1/cart/addCart`, {
          userId,
          courseId: wish.courseId,
        });
        if (response.status === 200) {
          alert("Added to cart successfully!");
          wish.inCart = true;
          wish.cartId = response.data.id; // Giả sử API trả về cart item với id
          // Chuyển ngay đến trang giỏ hàng
          router.push("/pages/cart");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add to cart. Please try again.");
      }
    };

    // Xóa khỏi giỏ hàng
    const removeFromCart = async (cartId) => {
      try {
        await baseApi.delete(`/api/v1/cart/${cartId}`);
        const wish = wishlist.value.find((w) => w.cartId === cartId);
        if (wish) {
          wish.inCart = false;
          wish.cartId = null;
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    };

    // Xóa khỏi wishlist
    const unWishlist = async (id) => {
      try {
        await baseApi.delete(`/api/v1/wishlist/${id}`);
        wishlist.value = wishlist.value.filter((course) => course.id !== id);
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    };

    // Xử lý hành động khi nhấn nút
    const handleWishlistItemAction = (wishlistItem) => {
      if (wishlistItem.isPayment) {
        router.push({
          path: "/course/course-details",
          query: { id: wishlistItem.courseId },
        });
      } else {
        addToCart(wishlistItem);
      }
    };

    // Dark mode
    const enableDarkMode = () => {
      document.documentElement.setAttribute("class", "light dark");
      localStorage.setItem("darkMode", "enabled");
    };

    const disableDarkMode = () => {
      document.documentElement.setAttribute("class", "light");
      localStorage.removeItem("darkMode");
    };

    // Mounted hook
    onMounted(() => {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode === "enabled") {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
      fetchWishlist();
    });

    return {
      user,
      wishlist,
      fetchWishlist,
      addToCart,
      removeFromCart,
      unWishlist,
      handleWishlistItemAction,
      enableDarkMode,
      disableDarkMode,
    };
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.wishlist-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.wishlist-detail {
  display: flex;
  align-items: center;
}

.wishlist-img img {
  max-width: 100px;
  height: auto;
}

.price-amt {
  margin-left: 10px;
}

.wishlist-info {
  margin-left: 20px;
}

.remove-btn {
  text-align: right;
}

.remove-btn .btn {
  margin-left: 10px;
  padding: 5px 15px;
}
</style>
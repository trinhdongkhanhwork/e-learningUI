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
              <div class="wishlist-item" v-if="wishlist.length" v-for="wish in wishlist" :key=" wish.id">
                <div class="row align-items-center">
                  <div class="col-md-9">
                    <div class="wishlist-detail" >
                      <div class="wishlist-img">
                        <router-link :to="`/course/${wish.id}`">
                          <img v-if="wish.coverImage" :src="`${wish.coverImage}`" alt="Img" class="img-fluid" />
                        </router-link>
                        <div class="price-amt">
                          <h4>{{ wish.price }}</h4>
                        </div>
                      </div>
                      <div class="wishlist-info">
                        <h5>
                          <router-link to="/course/course-details"
                          >{{ wish.title }}</router-link
                          >
                        </h5>
                        <div
                            class="course-info d-flex align-items-center border-bottom-0 pb-0"
                        >
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
                          <span class="d-inline-block average-rating"
                          ><span>4.0</span> (15)</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="remove-btn">
                      <a v-if="wish.isPayment"
                         class="btn"
                         style="background-color: lightblue; color: black;"
                         @click.prevent="handleWishlistItemAction(wish)">
                        View detail
                      </a>

                      <a v-else href="#" class="btn" style="background-color: blanchedalmond;
                        color: black;" @click.prevent="addToCart(wish)"> Add to cart</a>

                      <a class="btn" style="margin-left: 10px;" @click.prevent="unWishlist(wish.id)"> UnWishlist</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Plan Type -->
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
import { useStore } from 'vuex';
import { ref } from "vue";

export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    return {
      wishlist: [],
      cart: [],
      user,
    };
  },

  mounted() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }

    this.fetchWishlist();
  },

  methods: {
    async fetchWishlist() {
      const userId = this.user?.id;
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        // Check payment status for each item in the wishlist
        this.wishlist = await Promise.all(response.data.map(async (item) => {
          const isPayment = await this.checkPaymentStatus(item.courseId);
          return { ...item, isPayment };
        }));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    },

    async checkPaymentStatus(courseId) {
      const userId = this.user.id;
      try {
        const response = await baseApi.get(`/api/payment/isPayment/${courseId}/${userId}`);
        return response.data; // Assume it returns true/false
      } catch (error) {
        console.error("Error checking payment status:", error);
        return false;
      }
    },

    handleWishlistItemAction(wishlistItem) {
      if (wishlistItem.isPayment) {
        // Chuyển hướng đến chi tiết khóa học nếu đã thanh toán
        router.push({
          path: '/course/course-details',
          query: { id: wishlistItem.courseId },
        });
      } else {
        // Thêm khóa học vào giỏ nếu chưa thanh toán
        this.addToCart(wishlistItem);
      }
    },

    async unWishlist(id) {
      try {
        await baseApi.delete(`/api/v1/wishlist/${id}`);
        this.wishlist = this.wishlist.filter((course) => course.id !== id);
        this.cart = this.cart.filter((course) => course.id !== id);

        let cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
        cartFromLocalStorage = cartFromLocalStorage.filter((course) => course.id !== id);
        localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
      } catch (error) {
        console.error("Error removing", error);
      }
    },

    addToCart(course) {
      const userId = this.user?.id;
      if (!userId) {
        alert("Please log in to add a course to your cart.");
        router.push("/");  
        return;
      }
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (!cart.some(item => item.id === course.id)) {
        cart.push(course);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Add to cart success!");
      }
      router.push("/pages/cart");
    },

    removeFromCart(id) {
      this.cart = this.cart.filter((course) => course.id !== id);
    },

    enableDarkMode() {
      document.documentElement.setAttribute("class", "light dark");
      localStorage.setItem("darkMode", "enabled");
    },

    disableDarkMode() {
      document.documentElement.setAttribute("class", "light");
      localStorage.removeItem("darkMode");
    }
  }
};
</script>


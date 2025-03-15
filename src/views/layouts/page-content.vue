<template>
  <ul class="nav header-navbar-rht">
    <li class="nav-item">
      <div>
        <a
            href="#"
            id="dark-mode-toggle"
            ref="darkModeToggle"
            class="dark-mode-toggle"
            @click="enableDarkMode"
        >
          <i class="fa-solid fa-moon"></i>
        </a>
        <a
            href="#"
            id="light-mode-toggle"
            class="dark-mode-toggle"
            ref="lightModeToggle"
            @click="disableDarkMode"
        >
          <i class="fa-solid fa-sun"></i>
        </a>
      </div>
    </li>
    <li class="nav-item">
      <router-link to="/student/student-messages">
        <img src="@/assets/img/icon/messages.svg" alt="img" />
      </router-link>
    </li>
    <li class="nav-item cart-nav">
      <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown" @click.prevent="fetchCart">
        <img src="@/assets/img/icon/cart.svg" alt="img" />
      </a>
      <div class="wishes-list dropdown-menu dropdown-menu-right">
        <div class="wish-header">
          <router-link to="/pages/cart">View Cart</router-link>
          <a href="javascript:void(0)" class="float-end">Checkout</a>
        </div>
        <div class="wish-content">
          <ul>
            <li v-if="cart.length === 0" class="text-center" style="font-size: 20px; font-family: 'Times New Roman', Times, serif; color: brown; margin-top: 100px;">
              No items in cart
            </li>
            <li v-for="item in cart" :key="item.id">
              <div class="media">
                <div class="d-flex media-wide">
                  <div class="avatar">
                    <router-link :to="`/course/course-details?id=${item.courseId}`">
                      <img :src="item.coverImage" alt="Img" class="img-fluid" />
                    </router-link>
                  </div>
                  <div class="media-body">
                    <h6>
                      <router-link :to="`/course/course-details?id=${item.courseId}`">{{ item.title }}</router-link>
                    </h6>
                    <p>{{ item.level || 'N/A' }}</p>
                    <h5>${{ item.price }}</h5>
                  </div>
                </div>
                <div class="remove-btn">
                  <a href="#" class="btn" @click.prevent="removeFromCart(item.id)">Remove</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li class="nav-item wish-nav">
      <a class="dropdown-toggle" data-bs-toggle="dropdown" @click.prevent="fetchWishlist">
        <img src="@/assets/img/icon/wish.svg" alt="img" />
      </a>
      <div class="wishes-list dropdown-menu dropdown-menu-right">
        <div class="wish-content">
          <ul>
            <li v-if="wishlist.length === 0" class="text-center" style="font-size: 20px; font-family: 'Times New Roman', Times, serif; color: brown; margin-top: 100px;">
              There are no favorites
            </li>
            <li v-for="wish in wishlist" :key="wish.id">
              <div class="media">
                <div class="d-flex media-wide">
                  <div class="avatar">
                    <router-link :to="`/course/course-details?id=${wish.courseId}`">
                      <img v-if="wish.coverImage" :src="wish.coverImage" alt="Img" class="img-fluid" />
                    </router-link>
                  </div>
                  <div class="media-body">
                    <h6>
                      <router-link :to="`/course/course-details?id=${wish.courseId}`">{{ wish.title }}</router-link>
                    </h6>
                    <p>{{ wish.level || 'N/A' }}</p>
                    <h5>${{ wish.price }}</h5>
                    <div class="remove-btn">
                      <template v-if="wish.isPayment">
                        <a
                            href="#"
                            class="btn"
                            style="background-color: blanchedalmond; color: black;"
                            @click.prevent="viewCourseDetails(wish)"
                        >View Details</a>
                      </template>
                      <template v-else>
                        <a
                            href="#"
                            class="btn"
                            style="background-color: red; color: white;"
                            @click.prevent="addToCart(wish)"
                        >Add to Cart</a>
                      </template>
                      <a class="btn" style="margin-left: 10px;" @click.prevent="unWishlist(wish.id)">Unwishlist</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li class="nav-item noti-nav">
      <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
        <img src="@/assets/img/icon/notification.svg" alt="img" />
      </a>
      <div class="notifications dropdown-menu dropdown-menu-right">
        <div class="topnav-dropdown-header">
          <span class="notification-title">
            Notifications
            <select>
              <option>All</option>
              <option>Unread</option>
            </select>
          </span>
          <a href="javascript:void(0)" class="clear-noti">
            Mark all as read <i class="fa-solid fa-circle-check"></i>
          </a>
        </div>
        <div class="noti-content">
          <ul class="notification-list">
            <li class="notification-message">
              <div class="media d-flex">
                <div>
                  <router-link to="/pages/notifications" class="avatar">
                    <img class="avatar-img" alt="Img" src="@/assets/img/user/user1.jpg" />
                  </router-link>
                </div>
                <div class="media-body">
                  <h6>
                    <router-link to="/pages/notifications">
                      Lex Murphy requested <span>access to</span> UNIX directory tree hierarchy
                    </router-link>
                  </h6>
                  <button class="btn btn-accept">Accept</button>
                  <button class="btn btn-reject">Reject</button>
                  <p>Today at 9:42 AM</p>
                </div>
              </div>
            </li>
            <!-- Các notification khác giữ nguyên -->
          </ul>
        </div>
      </div>
    </li>
    <li class="nav-item user-nav">
      <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
        <span class="user-img">
          <img src="@/assets/img/user/user11.jpg" alt="Img" />
          <span class="status online"></span>
        </span>
      </a>
      <div class="users dropdown-menu dropdown-menu-right" data-popper-placement="bottom-end">
        <div class="user-header">
          <div class="avatar avatar-sm">
            <img src="@/assets/img/user/user11.jpg" alt="User Image" class="avatar-img rounded-circle" />
          </div>
          <div class="user-text">
            <h6>Rolands R</h6>
            <p class="text-muted mb-0">Student</p>
          </div>
        </div>
        <router-link class="dropdown-item" to="/student/setting-edit-profile">
          <i class="feather-user me-1"></i> Profile
        </router-link>
        <router-link class="dropdown-item" to="/student/setting-student-subscription">
          <i class="feather-star me-1"></i> Subscription
        </router-link>
        <div class="dropdown-item night-mode">
          <span><i class="feather-moon me-1"></i> Night Mode </span>
          <div class="form-check form-switch check-on m-0">
            <input class="form-check-input" type="checkbox" id="night-mode" />
          </div>
        </div>
        <router-link class="dropdown-item" to="/">
          <i class="feather-log-out me-1"></i> Logout
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script>
import { router } from "@/router";
import baseApi from "@/axios";
import { useStore } from 'vuex';
import { ref, onMounted, watch } from "vue";

export default {
  setup() {
    const darkModeToggle = ref(null);
    const lightModeToggle = ref(null);
    const store = useStore();
    const user = ref(store.state.userInfo);
    const wishlist = ref([]);
    const cart = ref([]);
    const userId = ref(null);

    const fetchWishlist = async () => {
      if (!userId.value) {
        console.log("No user ID, skipping fetchWishlist");
        return;
      }
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId.value}`);
        wishlist.value = await Promise.all(response.data.map(async (wishlistItem) => {
          const courseId = wishlistItem.courseId;
          const isPayment = await checkPaymentStatus(courseId);
          return {...wishlistItem, isPayment};
        }));
        console.log("Wishlist fetched:", wishlist.value);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    const fetchCart = async () => {
      if (!userId.value) {
        console.log("No user ID, skipping fetchCart");
        return;
      }
      try {
        const response = await baseApi.get(`/api/v1/cart/getAllCart/${userId.value}`);
        cart.value = response.data || [];
        console.log("Cart fetched:", cart.value);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const checkPaymentStatus = async (courseId) => {
      if (!userId.value) return false;
      try {
        const response = await baseApi.get(`/api/payment/isPayment/${courseId}/${userId.value}`);
        return response.data;
      } catch (error) {
        console.error("Error checking payment status:", error);
        return false;
      }
    };

    const viewCourseDetails = (wish) => {
      router.push({
        path: '/course/course-lesson',
        query: {id: wish.courseId}
      });
    };

    const unWishlist = async (id) => {
      try {
        await baseApi.delete(`/api/v1/wishlist/${id}`);
        wishlist.value = wishlist.value.filter((course) => course.id !== id);
        console.log("Removed from wishlist:", id);
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    };

    const addToCart = async (wish) => {
      if (!userId.value) {
        alert("Please log in to add to cart!");
        return;
      }
      try {
        const response = await baseApi.get(`/api/v1/cart/getAllCart/${userId.value}`);
        const isInCart = response.data.some(item => item.courseId === wish.courseId);

        if (!isInCart) {
          const cartRequest = {
            userId: userId.value,
            courseId: wish.courseId,
            title: wish.title,
            price: wish.price,
            coverImage: wish.coverImage,
            addAt: new Date().toISOString(),
          };
          const addResponse = await baseApi.post(`/api/v1/cart/addCart`, cartRequest);
          console.log("Added to cart:", addResponse.data);
          await fetchCart(); // Cập nhật giỏ hàng trong header
        } else {
          alert("Course is already in the cart!");
        }
        router.push("/pages/cart");
      } catch (error) {
        console.error("Error adding to cart:", error.response ? error.response.data : error.message);
        alert("Failed to add to cart. Please try again.");
      }
    };

    const removeFromCart = async (id) => {
      try {
        await baseApi.delete(`/api/v1/cart/${id}`);
        cart.value = cart.value.filter((course) => course.id !== id);
        console.log("Removed from cart:", id);
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    };

    const enableDarkMode = () => {
      document.documentElement.setAttribute("class", "light dark");
      darkModeToggle.value.classList.remove("activate");
      lightModeToggle.value.classList.add("activate");
      localStorage.setItem("darkMode", "enabled");
    };

    const disableDarkMode = () => {
      document.documentElement.setAttribute("class", "light");
      lightModeToggle.value.classList.remove("activate");
      darkModeToggle.value.classList.add("activate");
      localStorage.removeItem("darkMode");
    };

    watch(user, (newUser) => {
      if (newUser && newUser.id) {
        userId.value = newUser.id;
        console.log("User ID updated:", userId.value);
        fetchWishlist();
        fetchCart();
      }
    }, {immediate: true});

    onMounted(() => {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode === "enabled") {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
      if (userId.value) {
        fetchWishlist();
        fetchCart();
      }
    });

    return {
      darkModeToggle,
      lightModeToggle,
      enableDarkMode,
      disableDarkMode,
      wishlist,
      cart,
      fetchWishlist,
      fetchCart,
      addToCart,
      unWishlist,
      removeFromCart,
      viewCourseDetails,
    };
  },
};
</script>
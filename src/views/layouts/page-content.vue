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
      <router-link to="/student/student-messages"
      ><img src="@/assets/img/icon/messages.svg" alt="img"
      /></router-link>
    </li>
    <li class="nav-item cart-nav">
      <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
        <img src="@/assets/img/icon/cart.svg" alt="img" />
      </a>
      <div class="wishes-list dropdown-menu dropdown-menu-right">
        <div class="wish-header">
          <a href="javascript:void(0)">View Cart</a>
          <a href="javascript:void(0)" class="float-end">Checkout</a>
        </div>
        <div class="wish-content">
          <ul>
            <li v-for="item in cart" :key="item.id">
              <div class="media">
                <div class="d-flex media-wide">
                  <div class="avatar">
                    <router-link :to="`/pages/course-details/${item.id}`">
                      <img :src="require(`@/assets/img/course-list/${item.coverImage}`)" alt="Img" />
                    </router-link>
                  </div>
                  <div class="media-body">
                    <h6>
                      <router-link :to="`/pages/course-details/${item.id}`">{{ item.title }}</router-link>
                    </h6>
                    <p>{{ item.level }}</p>
                    <h5>{{ item.price }}</h5>
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
            <li v-if="wishlist.length === 0" class="text-center" style="font-size: 20px;font-family: 'Times New Roman', Times, serif;color: brown;margin-top: 100px;">There are no favorites</li>
            <li v-for="wish in wishlist" :key="wish.id">
              <div class="media">
                <div class="d-flex media-wide">
                  <div class="avatar">
                    <router-link :to="`/pages/course-details/${wish.id}`">
                      <img v-if="wish.coverImage" :src="require(`@/assets/img/course-list/${wish.coverImage}`)" alt="Img" class="img-fluid" />
                    </router-link>
                  </div>
                  <div class="media-body">
                    <h6>
                      <router-link :to="`/pages/course-details/${wish.id}`">{{ wish.title }}</router-link>
                    </h6>
                    <p>{{ wish.level }}</p>
                    <h5>{{ wish.price }}</h5>
                    <div class="remove-btn">
                      <template v-if="wish.isPayment">
                        <a
                            href="#"
                            class="btn"
                            style="background-color: blanchedalmond; color: black;"
                            @click.prevent="viewCourseDetails(wish.id)"
                        >View Details</a>
                      </template>
                      <template v-else>
                        <a
                            href="#"
                            class="btn"
                            style="background-color: red; color: white;"
                            @click.prevent="addToCart(wish)"
                        >Add to cart</a>
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
          <span class="notification-title"
          >Notifications
            <select>
              <option>All</option>
              <option>Unread</option>
            </select>
          </span>
          <a href="javascript:void(0)" class="clear-noti"
          >Mark all as read <i class="fa-solid fa-circle-check"></i
          ></a>
        </div>
        <div class="noti-content">
          <ul class="notification-list">
            <li class="notification-message">
              <div class="media d-flex">
                <div>
                  <router-link to="/pages/notifications" class="avatar">
                    <img
                        class="avatar-img"
                        alt="Img"
                        src="@/assets/img/user/user1.jpg"
                    />
                  </router-link>
                </div>
                <div class="media-body">
                  <h6>
                    <router-link to="/pages/notifications"
                    >Lex Murphy requested <span>access to</span> UNIX
                      directory tree hierarchy
                    </router-link>
                  </h6>
                  <button class="btn btn-accept">Accept</button>
                  <button class="btn btn-reject">Reject</button>
                  <p>Today at 9:42 AM</p>
                </div>
              </div>
            </li>
            <li class="notification-message">
              <div class="media d-flex">
                <div>
                  <router-link to="/pages/notifications" class="avatar">
                    <img
                        class="avatar-img"
                        alt="Img"
                        src="@/assets/img/user/user2.jpg"
                    />
                  </router-link>
                </div>
                <div class="media-body">
                  <h6>
                    <router-link to="/pages/notifications"
                    >Ray Arnold left 6 <span>comments on</span> Isla Nublar
                      SOC2 compliance report</router-link
                    >
                  </h6>
                  <p>Yesterday at 11:42 PM</p>
                </div>
              </div>
            </li>
            <li class="notification-message">
              <div class="media d-flex">
                <div>
                  <router-link to="/pages/notifications" class="avatar">
                    <img
                        class="avatar-img"
                        alt="Img"
                        src="@/assets/img/user/user3.jpg"
                    />
                  </router-link>
                </div>
                <div class="media-body">
                  <h6>
                    <router-link to="/pages/notifications"
                    >Dennis Nedry <span>commented on</span> Isla Nublar SOC2
                      compliance report</router-link
                    >
                  </h6>
                  <p class="noti-details">
                    “Oh, I finished de-bugging the phones, but the system's
                    compiling for eighteen minutes, or twenty. So, some minor
                    systems may go on and off for a while.”
                  </p>
                  <p>Yesterday at 5:42 PM</p>
                </div>
              </div>
            </li>
            <li class="notification-message">
              <div class="media d-flex">
                <div>
                  <router-link to="/pages/notifications" class="avatar">
                    <img
                        class="avatar-img"
                        alt="Img"
                        src="@/assets/img/user/user1.jpg"
                    />
                  </router-link>
                </div>
                <div class="media-body">
                  <h6>
                    <router-link to="/pages/notifications"
                    >John Hammond <span>created</span> Isla Nublar SOC2
                      compliance report
                    </router-link>
                  </h6>
                  <p>Last Wednesday at 11:15 AM</p>
                </div>
              </div>
            </li>
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
      <div
          class="users dropdown-menu dropdown-menu-right"
          data-popper-placement="bottom-end"
      >
        <div class="user-header">
          <div class="avatar avatar-sm">
            <img
                src="@/assets/img/user/user11.jpg"
                alt="User Image"
                class="avatar-img rounded-circle"
            />
          </div>
          <div class="user-text">
            <h6>Rolands R</h6>
            <p class="text-muted mb-0">Student</p>
          </div>
        </div>
        <router-link class="dropdown-item" to="/student/setting-edit-profile"
        ><i class="feather-user me-1"></i> Profile</router-link
        >
        <router-link
            class="dropdown-item"
            to="/student/setting-student-subscription"
        ><i class="feather-star me-1"></i> Subscription</router-link
        >
        <div class="dropdown-item night-mode">
          <span><i class="feather-moon me-1"></i> Night Mode </span>
          <div class="form-check form-switch check-on m-0">
            <input class="form-check-input" type="checkbox" id="night-mode" />
          </div>
        </div>
        <router-link class="dropdown-item" to="/"
        ><i class="feather-log-out me-1"></i> Logout</router-link
        >
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

    watch(user, (newUser) => {
      if (newUser && newUser.id) {
        userId.value = newUser.id;
        console.log("User ID updated:", userId.value);
      }
    }, { immediate: true });

    console.log("user id111:" +userId.value);

    const fetchWishlist = async () => {
      try {
        if (userId.value) {
          const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId.value}`);
          wishlist.value = await Promise.all(response.data.map(async (wishlistItem) => {
            const courseId = wishlistItem.courseId;
            const isPayment = await checkPaymentStatus(courseId);
            return { ...wishlistItem, isPayment };
          }));
        } else {
          console.error("User ID is not available");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    const viewCourseDetails = (wishlistItemId) => {
      // Tìm `wishlistItem` dựa trên `id` trong `wishlist`
      const wishlistItem = wishlist.value.find(item => item.id === wishlistItemId);

      if (wishlistItem && wishlistItem.courseId) {
        router.push({
          path: '/course/course-details',
          query: { id: wishlistItem.courseId } // Lấy courseId từ wishlistItem
        });
      } else {
        console.error("Course ID not found for the given wishlist item");
      }
    };

    const checkPaymentStatus = async (courseId) => {
      try {
        const response = await baseApi.get(`/api/payment/isPayment/${courseId}/${userId.value}`);
        return response.data;
      } catch (error) {
        console.error("Error checking payment status:", error);
        return false;
      }
    };

    const unWishlist = async(id) => {
      try {
        await baseApi.delete(`/api/v1/wishlist/${id}`);
        wishlist.value = wishlist.value.filter((course) => course.id !== id);
        cart.value = cart.value.filter((course) => course.id !== id);
        window.onload;

        let cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
        cartFromLocalStorage = cartFromLocalStorage.filter((course) => course.id !== id);
        localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
      } catch (error) {
        console.error("Error removing", error);
      }
    };

    const addToCart = (course) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (!cart.some(item => item.id === course.id)) {
        cart.push(course);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Add to cart success!");
      }
      router.push("/pages/cart");
    };

    const removeFromCart = (id) => {
      cart.value = cart.value.filter((course) => course.id !== id);
    };

    function enableDarkMode() {
      document.documentElement.setAttribute("class", "light dark");
      darkModeToggle.value.classList.remove("activate");
      lightModeToggle.value.classList.add("activate");
      localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
      document.documentElement.setAttribute("class", "light");
      lightModeToggle.value.classList.remove("activate");
      darkModeToggle.value.classList.add("activate");
      localStorage.removeItem("darkMode");
    }

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
      darkModeToggle,
      lightModeToggle,
      enableDarkMode,
      disableDarkMode,
      wishlist,
      cart,
      fetchWishlist,
      addToCart,
      unWishlist,
      removeFromCart,
      viewCourseDetails,
    };
  },
};
</script>




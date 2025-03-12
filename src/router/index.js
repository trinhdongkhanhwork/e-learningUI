import { createRouter, createWebHistory } from 'vue-router';

import Blog_Index from '@/views/pages/blog/blog-index.vue'
import Blog_Details from '@/views/pages/blog/blog-details'
import Blog_Grid from '@/views/pages/blog/blog-grid'
import Blog_List from '@/views/pages/blog/blog-list'
import Blog_Masonry from '@/views/pages/blog/blog-masonry'
import Blog_Modern from '@/views/pages/blog/blog-modern'
import comesoon from '@/views/pages/pages/error/come-soon.vue'
import courselesson from '@/views/pages/pages/course-lesson.vue'
import error404 from '@/views/pages/pages/error/error-404.vue'
import error500 from '@/views/pages/pages/error/error-500.vue'
import forgotpassword from '@/views/pages/pages/forgot-password.vue'
import login from '@/views/pages/pages/login-index.vue'
import newpassword from '@/views/pages/pages/new-password.vue'
import Pages_Index from '@/views/pages/pages/pages-index.vue'
import Notifications_Index from '@/views/pages/pages/notifications-index.vue'
import Pricing_Plan from '@/views/pages/pages/pricing-plan.vue'
import Wishlist_Index from '@/views/pages/pages/wishlist-index.vue'
import Faq_Index from '@/views/pages/pages/faq-index.vue'
import Support_Index from '@/views/pages/pages/support-index.vue'
import Job_Category from '@/views/pages/pages/job-category.vue'
import Checkout_Index from '@/views/pages/pages/checkout-index.vue'
import Cart_Index from '@/views/pages/pages/cart-index.vue'
import Privacy_Policy from '@/views/pages/pages/privacy-policy.vue'
import Course_Index from '@/views/pages/pages/course/course-index.vue'
import Add_Course from '@/views/pages/pages/course/add-course'
import Course_Details from '@/views/pages/pages/course/course-details.vue'
import Course_Grid from '@/views/pages/pages/course/course-grid.vue'
import Course_List from '@/views/pages/pages/course/course-list.vue'
import Help_Center from '@/views/pages/pages/help-center.vue'
import Term_Condition from '@/views/pages/pages/term-condition.vue'
import underconstruction from '@/views/pages/pages/error/under-construction.vue'
import verificationcode from '@/views/pages/pages/verification-code.vue'

import Homethree from '@/views/pages/home/homethree/homethree.vue'
import Student_Dashboard from '@/views/pages/student/student-dashboard.vue';
import Student_Index from '@/views/pages/student/student-index.vue'
import Student_Profile from '@/views/pages/student/student-profile.vue'
import Student_Grid from '@/views/pages/student/students-grid.vue'
import Student_List from '@/views/pages/student/students-list.vue'
import Student_Courses from '@/views/pages/student/student-courses/student-courses.vue'
import Student_Wishlist from '@/views/pages/student/student-wishlist/student-wishlist.vue'
import Student_Reviews from '@/views/pages/student/student-reviews.vue'
import Student_Quiz from '@/views/pages/student/student-quiz.vue'
import Student_Quiz_Details from '@/views/pages/student/student-quiz-details.vue'
import Student_Order_History from '@/views/pages/student/student-order/student-order-history.vue'
import Student_Qa from '@/views/pages/student/student-qa.vue'
import Student_Referral from '@/views/pages/student/student-referral/student-referral.vue'
import Student_Messages from '@/views/pages/student/student-message/student-messages.vue'
import Student_Tickets from '@/views/pages/student/student-tickets/student-tickets.vue'
import Student_Settings from '@/views/pages/student/student-settings/student-settings.vue'
import Student_Change_Password from '@/views/pages/student/student-settings/student-change-password.vue'
import Student_Social_Profile from '@/views/pages/student/student-settings/student-social-profile.vue'
import Student_Linked_Accounts from '@/views/pages/student/student-settings/student-linked-accounts.vue'
import Student_Notifications from '@/views/pages/student/student-settings/student-notifications.vue'
import Setting_Student_Subscription from '@/views/pages/student/setting-student-subscription.vue'

import Instructor_Index from '@/views/pages/instructor/instructor-index.vue'
import Instructor_Dashboard from '@/views/pages/instructor/dashboard/instructor-dashboard.vue'
import Instructor_Settings from '@/views/pages/instructor/instructor-settings/instructor-settings.vue'
import Instructor_Change_Password from '@/views/pages/instructor/instructor-settings/instructor-change-password.vue'
import Instructor_Setting_Withdraw from '@/views/pages/instructor/instructor-settings/instructor-setting-withdraw.vue'
import Instructor_Setting_Notifications from '@/views/pages/instructor/instructor-settings/instructor-setting-notifications.vue'
import Instructor_Delete_Account from '@/views/pages/instructor/instructor-settings/instructor-delete-account.vue'
import Instructor_Earnings from '@/views/pages/instructor/instructor-earnings/instructor-earnings.vue'
import Instructor_Assignment from '@/views/pages/instructor/instructor-assignment.vue'
import Instructor_Quiz_Attempts from '@/views/pages/instructor/instructor-quiz-attempts.vue'
import Instructor_Quiz_Attempts_Details from '@/views/pages/instructor/instructor-quiz-attempts-details.vue'
import Instructor_Withdraw from '@/views/pages/instructor/instructor-withdraw.vue'
import Instructor_Profile from '@/views/pages/instructor/instructor-profile.vue'
import Instructor_Enrolled_Course from '@/views/pages/instructor/enrolled-course/instructor-enrolled-course.vue'
import Instructor_Announcements from '@/views/pages/instructor/instructor-announcements.vue'
import Instructor_Course from '@/views/pages/instructor/instructor-course/instructor-course.vue'
import Instructor_Tickets from '@/views/pages/instructor/instructor-tickets/instructor-tickets.vue'
import Instructor_Notifications from '@/views/pages/instructor/instructor-notifications.vue'
import Instructor_Referral from '@/views/pages/instructor/instructor-referral/instructor-referral.vue'
import Instructor_Qa from '@/views/pages/instructor/instructor-qa.vue'
import Instructor_Reviews from '@/views/pages/instructor/instructor-reviews/instructor-reviews.vue'
import Instructor_Wishlist from '@/views/pages/instructor/instructor-wishlist.vue'
import Instructor_Chat from '@/views/pages/instructor/instructor-chat/instructor-chat.vue'
import Instructor_Orders from '@/views/pages/instructor/instructor-orders/instructor-orders.vue'
import Instructor_Quiz from '@/views/pages/instructor/instructor-quiz.vue'
import Instructor_Quiz_Details from '@/views/pages/instructor/instructor-quiz-details.vue'
import Instructor_Grid from '@/views/pages/instructor/instructor-grid.vue'
import Instructor_List from '@/views/pages/instructor/instructor-list.vue'
import Registerstepfive from '@/views/pages/pages/register-step-five.vue'
import Registerstepfour from '@/views/pages/pages/register-step-four.vue'
import Registerstepone from '@/views/pages/pages/register-step-one.vue'
import Registerstepthree from '@/views/pages/pages/register-step-three.vue'
import Registersteptwo from '@/views/pages/pages/register-step-two.vue'
import Register from '@/views/pages/pages/register-index.vue'
import Admin_Index from '@/views/pages/admin/admin-index.vue'
import Admin_Dashboard from '@/views/pages/admin/dashboard/admin-dashboard.vue'
import Admin_Approval_Course from '@/views/pages/admin/admin-approval-course/approval-course.vue'
import Home from '@/views/pages/home/home-index.vue'
import { useStore } from "vuex";
import Authenticate from "@/views/pages/pages/authenticate.vue";
import PaymentSuccess from '@/views/pages/pages/payment-success.vue';
import EnrollmentConfirmation from '@/views/pages/pages/enrollment-confirmation.vue';
//import ApprovalInstructors from "@/views/pages/admin/admin-approval-instructors/approval-instructors.vue";
import axios from "axios";
const routes = [
  {
    path: '/enrollment-confirmation',
    name: 'EnrollmentConfirmation',
    meta: {requiresAuth: true, roles: ["STUDENT", "ADMIN", "INSTRUCTOR"] },
    component: EnrollmentConfirmation,
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    meta: {requiresAuth: true, roles: ["STUDENT", "ADMIN", "INSTRUCTOR"] },
    component: PaymentSuccess,
  },
  {
    path: "/student",
    component: Student_Index,
    meta: {requiresAuth: true, roles: ["STUDENT", "ADMIN"] },
    children: [
      { path: "", redirect: "/student/student-dashboard" },
      { path: "student-dashboard", component: Student_Dashboard },
      { path: "student-profile", component: Student_Profile },
      { path: "student-courses", component: Student_Courses },
      { path: "student-wishlist", component: Student_Wishlist },
      { path: "student-reviews", component: Student_Reviews },
      { path: "student-quiz", component: Student_Quiz },
      { path: "student-quiz-details", component: Student_Quiz_Details },
      { path: "student-order-history", component: Student_Order_History },
      { path: "student-qa", component: Student_Qa },
      { path: "student-referral", component: Student_Referral },
      { path: "student-messages", component: Student_Messages },
      { path: "student-tickets", component: Student_Tickets },
      { path: "student-settings", component: Student_Settings },
      { path: "student-change-password", component: Student_Change_Password },
      { path: "student-social-profile", component: Student_Social_Profile },
      { path: "student-linked-accounts", component: Student_Linked_Accounts },
      { path: "student-notifications", component: Student_Notifications },
      { path: "students-grid", component: Student_Grid },
      { path: "students-list", component: Student_List },
      { path: "setting-student-subscription", component: Setting_Student_Subscription },
    ],

  },
  {
    path: "/admin",
    component: Admin_Index,
    meta: {requiresAuth: true, roles: ["ADMIN"] },
    children: [
      { path: "", redirect: "/admin/admin-dashboard" },
      { path: "admin-dashboard", component: Admin_Dashboard },
      { path: "approval-course", component: Admin_Approval_Course },
      //{ path: "approval-instructors", component: ApprovalInstructors }
    ]
  },
  {
    path: "/instructor",
    component: Instructor_Index,
    meta: {requiresAuth: true, roles: ["ADMIN", "INSTRUCTOR"] },
    children: [
      { path: "", redirect: "/instructor/instructor-dashboard" },
      { path: "instructor-dashboard", component: Instructor_Dashboard },
      { path: "instructor-list", component: Instructor_List },
      { path: "instructor-grid", component: Instructor_Grid },
      { path: "instructor-settings", component: Instructor_Settings },
      { path: "instructor-change-password",component: Instructor_Change_Password,},
      { path: "instructor-setting-notifications",component: Instructor_Setting_Notifications,},
      { path: "instructor-setting-withdraw",component: Instructor_Setting_Withdraw,},
      { path: "instructor-delete-account",component: Instructor_Delete_Account,},
      { path: "instructor-earnings", component: Instructor_Earnings },
      { path: "instructor-assignment", component: Instructor_Assignment },
      { path: "instructor-quiz-attempts", component: Instructor_Quiz_Attempts },
      { path: "instructor-quiz-attempts-details",component: Instructor_Quiz_Attempts_Details,},
      { path: "instructor-withdraw", component: Instructor_Withdraw },
      { path: "instructor-profile", component: Instructor_Profile },
      { path: "instructor-enrolled-course",component: Instructor_Enrolled_Course,},
      { path: "instructor-announcements", component: Instructor_Announcements },
      { path: "instructor-course", component: Instructor_Course },
      { path: "instructor-tickets", component: Instructor_Tickets },
      { path: "instructor-notifications", component: Instructor_Notifications },
      { path: "instructor-referral", component: Instructor_Referral },
      { path: "instructor-chat", component: Instructor_Chat },
      { path: "instructor-qa", component: Instructor_Qa },
      { path: "instructor-reviews", component: Instructor_Reviews },
      { path: "instructor-wishlist", component: Instructor_Wishlist },
      { path: "instructor-quiz", component: Instructor_Quiz },
      { path: "instructor-quiz-details", component: Instructor_Quiz_Details },
      { path: "instructor-orders", component: Instructor_Orders },
    ],
  },
  {
    path: "/pages",
    component: Pages_Index,
    children: [
      { path: "", redirect: "/pages/notifications" },
      { path: "notifications", component: Notifications_Index },
      { path: "pricing-plan", component: Pricing_Plan },
      { path: "wishlist", component: Wishlist_Index },
      { path: "faq", component: Faq_Index },
      { path: "support", component: Support_Index },
      { path: "job-category", component: Job_Category },
      { path: "checkout", component: Checkout_Index },
      { path: "cart", component: Cart_Index },
      { path: "help-center", component: Help_Center },
      { path: "privacy-policy", component: Privacy_Policy },
      { path: "term-condition", component: Term_Condition },
    ],
  },
  {
    path: "/course",
    component: Course_Index,
    children: [
      { path: "", redirect: "/course/add-course" },
      { path: "add-course", component: Add_Course },
      { path: "course-list", component: Course_List },
      { path: "course-grid", component: Course_Grid },
      { path: "course-details", component: Course_Details },
      { path: "course-lesson", component: courselesson },
    ]
  },
  {
    path: "/blog",
    component: Blog_Index,
    children: [
      { path: "", redirect: "/blog/blog-list" },
      { path: "blog-list", component: Blog_List },
      { path: "blog-grid", component: Blog_Grid },
      { path: "blog-details", component: Blog_Details },
      { path: "blog-masonry", component: Blog_Masonry },
      { path: "blog-modern", component: Blog_Modern },
    ],
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '', redirect: '/home/index' },
      { path: 'index', component: Homethree, meta: { headerClass: 'header-three', NavbarClass: 'header-nav-three' } }
    ]
  },
  {
    path: '/come-soon',
    name: 'come-soon',
    component: comesoon
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: error404
  },
  {
    path: "/error-500",
    name: "error-500",
    component: error500,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: forgotpassword,
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: "/new-password",
    name: "new-password",
    component: newpassword,
  },
  {
    path: '/register-step-five',
    name: 'register-step-five',
    component: Registerstepfive
  },
  {
    path: '/register-step-four',
    name: 'register-step-four',
    component: Registerstepfour
  },
  {
    path: '/register-step-one',
    name: 'register-step-one',
    component: Registerstepone
  },
  {
    path: '/register-step-three',
    name: 'register-step-three',
    component: Registerstepthree
  },
  {
    path: '/register-step-two',
    name: 'register-step-two',
    component: Registersteptwo
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: "/under-construction",
    name: "under-construction",
    component: underconstruction,
  },
  {
    path: "/verification-code",
    name: "verification-code",
    component: verificationcode,
  },
  {
    path: "/authenticate",
    name: "authenticate",
    component: Authenticate,
  }
];

export const router = createRouter({
  history: createWebHistory("/vue/"),
  linkActiveClass: "active",
  routes,
});
router.beforeEach(async (to, from, next) => {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });

  const store = useStore();
  const userRole = store.state.userInfo?.roleEntity.roleName;
  console.log("User Role:", userRole);

  const token = localStorage.getItem("token");

  if (token) {
    try {
      // Gọi API introspect để kiểm tra token
      const response = await axios.post("http://localhost:8080/authentication/introspect", { token });
      const isValid = response.data.result.valid;
      console.log("Token valid:", isValid);

      if (isValid) {
        // Kiểm tra role nếu route có yêu cầu
        if (to.meta.roles && !to.meta.roles.includes(userRole)) {
          next({ name: "error-404" }); // Điều hướng tới trang lỗi 404
        } else {
          next(); // Tiếp tục điều hướng
        }
      } else {
        console.error("Token is invalid");
        localStorage.removeItem("token"); // Xóa token không hợp lệ
        store.commit("clearUserInfo"); // Xóa thông tin người dùng
        next({ name: "login" }); // Chuyển hướng tới trang login
      }
    } catch (error) {
      console.error("Token introspection failed:", error);
      localStorage.removeItem("token"); // Xóa token nếu lỗi xảy ra
      store.commit("clearUserInfo"); // Xóa thông tin người dùng
      next({ name: "login" }); // Chuyển hướng tới trang login
    }
  } else {
    // Nếu không có token và route yêu cầu xác thực
    if (to.meta.requiresAuth) {
      next({ name: "login" }); // Chuyển hướng tới trang login
    } else {
      next(); // Cho phép truy cập nếu không yêu cầu đăng nhập
    }
  }
});

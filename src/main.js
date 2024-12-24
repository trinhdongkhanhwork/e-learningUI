import { createApp } from 'vue'
import { router } from '@/router';
import App from './App.vue'
import {BootstrapVue3, BToastPlugin} from 'bootstrap-vue-3'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import VueSelect from 'vue3-select2-component'
import VueFeather from 'vue-feather';
import VueApexCharts from "vue3-apexcharts";
import DatePicker from 'vue3-datepicker'
import Vue3Autocounter from 'vue3-autocounter';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { createStore } from "vuex";
import VueLazyload from 'vue-lazyload';

/*********Header component**********/
import Header from '@/views/layouts/layouts-header.vue'
import IndexHeader from '@/views/layouts/index-header.vue'
import HeaderBorder from '@/views/layouts/header-border.vue'
import HeaderPage from '@/components/header-page.vue'
import HeaderPage1 from '@/components/header-page1.vue'
import Menuheader from '@/components/menu-header.vue'
import Mainnav from '@/components/main-nav.vue'
import Signpages from '@/components/sign-pages.vue'
import Navbar from '@/components/navbar.vue'
import LoginHeader from '@/views/layouts/login-header.vue'
import LoginHeaderBorder from '@/views/layouts/login-headerborder.vue'
import Instructorheader from '@/views/layouts/instructor-header.vue'
import Instructorheaderborder from '@/views/layouts/instructor-headerborder.vue'
import HorizontalHeader from '@/views/layouts/horizontal-header.vue';
import HeaderMenu from '@/views/layouts/header-menu.vue';
import Student_Header from '@/views/layouts/student-header.vue'
import Page_Header from '@/views/layouts/page-header.vue'
import Page_Content from '@/views/layouts/page-content.vue'

/*********Footer component**********/
import Footer from '@/views/layouts/layouts-footer.vue'
import FooterTop from '@/components/footer-top.vue'
import FooterBottom from '@/components/footer-bottom.vue'


/*********Breacrumb**********/
import Student_Breadcrumb from '@/components/breadcrumb/student-breadcrumb.vue'

/*********Pages**********/
import CartBreadcrumb from '@/components/breadcrumb/cart-breadcrumb.vue'
import CheckoutBreadcrumb from '@/components/breadcrumb/checkout-breadcrumb.vue'
import CourseInnerpage from '@/views/pages/pages/course/inner-page.vue'
import CourseDetailsBreadcrumb from '@/components/breadcrumb/course-details.vue'
import Coursegridbreadcrumb from '@/components/breadcrumb/coursegrid-breadcrumb.vue'
import Coursegridfilter from '@/components/course-filter.vue'
import Coursesidebar from '@/views/pages/pages/course/course-sidebar.vue'
import CourseHeader from '@/components/course-header.vue'
import FaqBreadcrumb from '@/components/breadcrumb/faq-breadcrumb.vue'
import HelpCenterBreadcrumb from '@/components/breadcrumb/help-center.vue'
import RegisterBanner from '@/components/register-banner.vue'
import LoginBanner from '@/components/loginbanner.vue'


import MessageLayout from '@/views/layouts/message.vue'
import SupportBreadcrumb from '@/components/breadcrumb/support-breadcrumb.vue'
import TermconditionBreadcrumb from '@/components/breadcrumb/term-condition.vue'
import JobcategoryBreadcrumb from '@/components/breadcrumb/job-category.vue'
import NotificationsBreadcrumb from '@/components/breadcrumb/notifications-breadcrumb.vue'
import Pricingplan from '@/components/breadcrumb/pricing-plan.vue'
import PrivacypolicyBreadcrumb from '@/components/breadcrumb/privacy-policy.vue'
import Wishlistbreadcrumb from '@/components/breadcrumb/wishlist-breadcrumb.vue'

/*********Blog**********/
import BlogDetailsBreadcrumb from '@/components/breadcrumb/blogdetails.vue'
import BlogSidebar from '@/components/blog-sidebar.vue'
import BlogGridBreadcrumb from '@/components/breadcrumb/bloggrid.vue'
import BlogPagination from '@/components/lms-pagination.vue'
import BloglistBreadcrumb from '@/components/breadcrumb/bloglist.vue'
import BlogMasonryBreadcrumb from '@/components/breadcrumb/blog-masonry.vue'
import BlogModernBreadcrumb from '@/components/breadcrumb/blog-modern.vue'

/*********Student**********/
import StudentFilter from '@/components/student-filter.vue'
import Studentsidebar from '@/views/layouts/student-sidebar.vue'
import SettingsupportviewticketsBreadcrumb from '@/components/breadcrumb/settingsupportview-tickets.vue'
import Enrolled_Courses from '@/views/pages/student/student-courses/enrolled-courses.vue'
import Active_Courses from '@/views/pages/student/student-courses/active-courses.vue'
import Complete_Courses from '@/views/pages/student/student-courses/complete-courses.vue'
import Wishlist_Grid from '@/views/pages/student/student-wishlist/wishlist-grid.vue'
import Today_History from '@/views/pages/student/student-order/today-history.vue'
import Referral_Table from '@/views/pages/student/student-referral/referral-table.vue'
import Chat_Footer from '@/views/pages/student/student-message/chat-footer.vue'
import StudentChat_Header from '@/views/pages/student/student-message/chat-header.vue'
import Chat_Message from '@/views/pages/student/student-message/chat-message.vue'
import Pinned_Chat from '@/views/pages/student/student-message/pinned-chat.vue'
import Recent_Chat from '@/views/pages/student/student-message/recent-chat.vue'
import Top_Online from '@/views/pages/student/student-message/top-online.vue'
import Open_Tickets from '@/views/pages/student/student-tickets/open-tickets.vue'
import Close_Tickets from '@/views/pages/student/student-tickets/close-tickets.vue'
import Inprogress_Tickets from '@/views/pages/student/student-tickets/inprogress-tickets'
import All_Tickets from '@/views/pages/student/student-tickets/all-tickets.vue'
import Settings_Sidebar from '@/views/pages/student/student-settings/settings-sidebar.vue'


/*********Instructor**********/
import InstructorBreadcrumb from '@/components/breadcrumb/instructor-breadcrumb.vue'
import DepositBreadcrumb from '@/components/breadcrumb/deposit-breadcrumb.vue'
import ChatHeader from '@/components/chat-header.vue'
import InstructorSidebar from '@/views/layouts/instructor-sidebar.vue'
import InstructoreditBreadcrumb from '@/components/breadcrumb/instructor-edit.vue'
import Instructorgrid2Breadcrumb from '@/components/breadcrumb/instructor-grid2.vue'
import Instructorfilter from '@/components/instructor-filter.vue'
import Instructorgrid from '@/views/pages/instructor/instructor-grid.vue'
import Instructorlist from '@/views/pages/instructor/instructor-list.vue'
import InstructorlistBreadcrumb from '@/components/breadcrumb/instructor-list.vue'
import Instructor_Settings_Sidebar from '@/views/pages/instructor/instructor-settings/instructor-settings-sidebar.vue'
import InstructorEnrolledCourse from '@/views/pages/instructor/enrolled-course/enrolled-course.vue'
import InstructorCompletedCourse from '@/views/pages/instructor/enrolled-course/completed-course.vue'
import Instructor_Enroll_Courses from '@/views/pages/instructor/instructor-course/enroll-course.vue'
import Instructor_Active_Courses from '@/views/pages/instructor/instructor-course/active-course.vue'
import Instructor_Complete_Courses from '@/views/pages/instructor/instructor-course/complete-course.vue'
import Instructor_Open_Tickets from '@/views/pages/instructor/instructor-tickets/instructor-open-tickets.vue'
import Instructor_All_Tickets from '@/views/pages/instructor/instructor-tickets/instructor-all-tickets.vue'
import Instructor_Inprogress_Tickets from '@/views/pages/instructor/instructor-tickets/instructor-inprogress-tickets.vue'
import Instructor_Closed_Tickets from '@/views/pages/instructor/instructor-tickets/instructor-closed-tickets.vue'
import Instructor_Referral_Table from '@/views/pages/instructor/instructor-referral/referral-table.vue'
import Given_Reviews from '@/views/pages/instructor/instructor-reviews/given-reviews.vue'
import Instructor_Chat_Footer from '@/views/pages/instructor/instructor-chat/instructor-chat-footer.vue'
import InstructorChat_Header from '@/views/pages/instructor/instructor-chat/instructor-chat-header.vue'
import Instructor_Chat_Message from '@/views/pages/instructor/instructor-chat/instructor-chat-message.vue'
import Instructor_Pinned_Chat from '@/views/pages/instructor/instructor-chat/instructor-pinned-chat.vue'
import Instructor_Recent_Chat from '@/views/pages/instructor/instructor-chat/instructor-recent-chat.vue'
import Instructor_Top_Online from '@/views/pages/instructor/instructor-chat/instructor-top-online.vue'
import Instructor_Month from '@/views/pages/instructor/instructor-orders/instructor-month.vue'
import Instructor_Year from '@/views/pages/instructor/instructor-orders/instructor-year.vue'
import Instructor_Today from '@/views/pages/instructor/instructor-orders/instructor-today.vue'

/*********Home**********/
import homebanner from '@/views/pages/home/home-banner.vue'
import featurecourse from '@/views/pages/home/feature-course.vue'
import trendingcourse from '@/views/pages/home/trending-course.vue'
import shareknowledge from '@/views/pages/home/share-knowledge.vue'
import latestblog from '@/views/pages/home/latest-blog.vue'
import dashboardindex from '@/views/pages/home/dashboard-index.vue'
import featureinstructors from '@/views/pages/home/feature-instructors.vue'
import leadingcompanies from '@/views/pages/home/leading-companies.vue'
import homethreebanner from '@/views/pages/home/homethree/home-threebanner.vue'
import favouritethree from '@/views/pages/home/homethree/favourite-three.vue'
import coursestabcontent from '@/views/pages/home/homethree/courses-tabcontent.vue'
import acheivegoals from '@/views/pages/home/homethree/acheive-goals.vue'
import instructorthree from '@/views/pages/home/homethree/instructor-three.vue'
import footerthree from '@/views/pages/home/homethree/footer-three.vue'


/*********Modal**********/
import Support_Tickets_Modal from '@/components/support-tickets-modal.vue'
import Instructor_Withdraw_Modal from '@/components/instructor-withdraw-modal.vue'



// plugins
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/assets/css/feather.css';

import '@/assets/css/style.css';
import '@/assets/css/vue.css';




const app = createApp(App)

/*********Header component**********/
app.component('layouts', Header);
app.component('layouts-index', IndexHeader);
app.component('layouts-2', HeaderBorder);
app.component('header-page', HeaderPage);
app.component('header-page1', HeaderPage1);
app.component('menuheader', Menuheader);
app.component('main-nav', Mainnav);
app.component('sign-pages', Signpages);
app.component('navbar', Navbar);
app.component('layouts-login', LoginHeader);
app.component('layouts-loginborder', LoginHeaderBorder);
app.component('layouts-instructor', Instructorheader);
app.component('layouts-instructorborder', Instructorheaderborder);
app.component('horizontal-header', HorizontalHeader)
app.component('header-menu', HeaderMenu)
app.component('student-header',Student_Header)
app.component('page-header',Page_Header)
app.component('page-content',Page_Content)

/*********Footer component**********/
app.component('layouts1', Footer);
app.component('footertop', FooterTop);
app.component('footer-bottom', FooterBottom);
app.component('student-breadcrumb',Student_Breadcrumb)

/*********Layout component**********/
app.component('message-layout', MessageLayout)

/*********Pages**********/
app.component('cart-breadcrumb', CartBreadcrumb);
app.component('checkout-breadcrumb', CheckoutBreadcrumb)
app.component('inner-page', CourseInnerpage);
app.component('coursedetails', CourseDetailsBreadcrumb);
app.component('coursegrid-breadcrumb', Coursegridbreadcrumb);
app.component('course-filter', Coursegridfilter);
app.component('course-sidebar', Coursesidebar);
app.component('course-header', CourseHeader);
app.component('faq-breadcrumb', FaqBreadcrumb);
app.component('helpcenter', HelpCenterBreadcrumb);
app.component('login-banner', LoginBanner);
app.component('register-banner', RegisterBanner);
app.component('supportbreadcrumb', SupportBreadcrumb);
app.component('termcondition', TermconditionBreadcrumb);
app.component('wishlist-breadcrumb', Wishlistbreadcrumb);

/*********Blog**********/
app.component('blogdetails', BlogDetailsBreadcrumb);
app.component('blog-sidebar', BlogSidebar);
app.component('bloggrid', BlogGridBreadcrumb);
app.component('pagination', BlogPagination);
app.component('bloglist', BloglistBreadcrumb);
app.component('blogmasonry', BlogMasonryBreadcrumb);
app.component('blog-modern', BlogModernBreadcrumb);
/*********Student**********/
app.component('student-filter', StudentFilter);
app.component('student-sidebar', Studentsidebar);
app.component('settingsupportviewtickets', SettingsupportviewticketsBreadcrumb);
app.component('enrolled-courses',Enrolled_Courses)
app.component('active-courses',Active_Courses)
app.component('complete-courses',Complete_Courses)
app.component('wishlist-grid',Wishlist_Grid)
app.component('today-history',Today_History)
app.component('referral-table',Referral_Table)
app.component('top-online',Top_Online)
app.component('recent-chat',Recent_Chat)
app.component('pinned-chat',Pinned_Chat)
app.component('chat-message',Chat_Message)
app.component('studentchat-header',StudentChat_Header)
app.component('chat-footer',Chat_Footer)
app.component('open-tickets',Open_Tickets)
app.component('close-tickets',Close_Tickets)
app.component('all-tickets',All_Tickets)
app.component('inprogress-tickets',Inprogress_Tickets)
app.component('settings-sidebar',Settings_Sidebar)


/*********Instructor**********/
app.component('instructorbreadcrumb', InstructorBreadcrumb);
app.component('deposit-breadcrumb', DepositBreadcrumb);
app.component('chat-header', ChatHeader);
app.component('instructor-sidebar', InstructorSidebar);
app.component('instructoredit', InstructoreditBreadcrumb);
app.component('instructorgrid2', Instructorgrid2Breadcrumb);
app.component('instructor-filter', Instructorfilter);
app.component('instructor-grid', Instructorgrid);
app.component('instructor-list', Instructorlist);
app.component('instructorlist', InstructorlistBreadcrumb);
app.component('job-category', JobcategoryBreadcrumb);
app.component('notifications-breadcrumb', NotificationsBreadcrumb);
app.component('pricingplan', Pricingplan);
app.component('privacypolicy', PrivacypolicyBreadcrumb);
app.component('instructor-settings-sidebar',Instructor_Settings_Sidebar)
app.component('instructor-enrolled-course', InstructorEnrolledCourse)
app.component('instructor-completed-course', InstructorCompletedCourse)
app.component('instructor-complete-course',Instructor_Complete_Courses)
app.component('instructor-active-course',Instructor_Active_Courses)
app.component('instructor-enroll-course',Instructor_Enroll_Courses)
app.component('instructor-open-tickets',Instructor_Open_Tickets)
app.component('instructor-all-tickets',Instructor_All_Tickets)
app.component('instructor-inprogress-tickets',Instructor_Inprogress_Tickets)
app.component('instructor-closed-tickets',Instructor_Closed_Tickets)
app.component('instructor-referral-table',Instructor_Referral_Table)
app.component('given-reviews',Given_Reviews)
app.component('instructor-top-online',Instructor_Top_Online)
app.component('instructor-recent-chat',Instructor_Recent_Chat)
app.component('instructor-pinned-chat',Instructor_Pinned_Chat)
app.component('instructor-chat-message',Instructor_Chat_Message)
app.component('instructorchat-header',InstructorChat_Header)
app.component('instructor-chat-footer',Instructor_Chat_Footer)
app.component('instructor-month',Instructor_Month)
app.component('instructor-year',Instructor_Year)
app.component('instructor-today',Instructor_Today)


/*********Home**********/
app.component('home-banner', homebanner);
app.component('feature-course', featurecourse);
app.component('trending-course', trendingcourse);
app.component('share-knowledge', shareknowledge);
app.component('latest-blog', latestblog);
app.component('dashboard-index', dashboardindex);
app.component('leading-companies', leadingcompanies);
app.component('feature-instructors', featureinstructors);
app.component('home-threebanner', homethreebanner);
app.component('favourite-three', favouritethree);
app.component('coursestab-content', coursestabcontent);
app.component('acheive-goals', acheivegoals);
app.component('instructor-three', instructorthree);
app.component('footer-three', footerthree);



/*********Modal**********/
app.component('support-tickets-modal',Support_Tickets_Modal)
app.component('instructor-withdraw-modal',Instructor_Withdraw_Modal)
app.component('date-picker', DatePicker);
app.component('vue-select', VueSelect)
app.component(VueFeather.name, VueFeather)
app.component('vue3-autocounter', Vue3Autocounter)


const store = createStore({
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        },
        clearUserInfo(state) {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    },
    actions: {
        setUserInfo({ commit }, userInfo) {
            commit('setUserInfo', userInfo);
        },
        clearUserInfo({ commit }) {
            commit('clearUserInfo');
        }
    }
});

app.use(VueApexCharts)
app.use(CKEditor)
app.use(VueLazyload)
    .use(store)
    .use(BootstrapVue3)
    .use(BToastPlugin)
    .use(Antd)
app.use(router).mount('#app');

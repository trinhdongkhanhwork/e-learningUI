<template>
  <div class="chat-page main-chat-blk">
    <div class="main-wrapper chat-wrapper">
      <layouts></layouts>
      <student-breadcrumb :title="title" :text="text" :text1="text1" />
      <div class="page-content chat-page-wrapper">
        <div class="container">
          <div class="row">
            <!-- sidebar -->
            <instructor-sidebar></instructor-sidebar>
            <!-- /Sidebar -->

            <!-- Student Profile -->
            <div class="col-xl-9 col-lg-9 theiaStickySidebar">
              <div class="stickysidebar">
                <div class="settings-widget card-details mb-0">
                  <div class="settings-menu p-0">
                    <div class="profile-heading">
                      <h3>Message</h3>
                    </div>
                    <div class="checkout-form">
                      <!-- sidebar group -->
                      <div class="content">
                        <div class="sidebar-group left-sidebar chat_sidebar">
                          <!-- Chats sidebar -->

                          <div
                            id="chats"
                            class="left-sidebar-wrap sidebar active slimscroll"
                          >
                            <perfect-scrollbar
                              class="scroll-area"
                              :settings="settings"
                              @ps-scroll-y="scrollHanle"
                            >
                              <div class="slimscroll">
                                <!-- Left Chat Title -->
                                <div
                                  class="left-chat-title all-chats d-flex justify-content-between align-items-center"
                                >
                                  <div class="select-group-chat">
                                    <div class="dropdown">
                                      <a href="javascript:void(0);">
                                        All Chats
                                      </a>
                                    </div>
                                  </div>
                                  <div class="add-section">
                                    <ul>
                                      <li>
                                        <a
                                          href="javascript:void(0);"
                                          class="user-chat-search-btn"
                                          ><i class="feather-search"></i
                                        ></a>
                                      </li>
                                    </ul>
                                    <!-- Chat Search -->
                                    <div class="user-chat-search">
                                      <form>
                                        <span class="form-control-feedback"
                                          ><i class="feather-search"></i
                                        ></span>
                                        <input
                                          type="text"
                                          name="chat-search"
                                          placeholder="Search"
                                          class="form-control"
                                        />
                                        <div class="user-close-btn-chat">
                                          <i class="feather-x"></i>
                                        </div>
                                      </form>
                                    </div>
                                    <!-- /Chat Search -->
                                  </div>
                                </div>
                                <!-- /Left Chat Title -->

                                <!-- Top Online Contacts -->
                                <top-online></top-online>
                                <!-- /Top Online Contacts -->

                                <div
                                  class="sidebar-div chat-body"
                                  id="chatsidebar"
                                >
                                  <!-- Left Chat Title -->
                                  <div
                                    class="d-flex justify-content-between align-items-center ps-0 pe-0"
                                  >
                                    <div class="fav-title pin-chat">
                                      <h6>Pinned Chat</h6>
                                    </div>
                                  </div>
                                  <!-- /Left Chat Title -->

                                  <pinned-chat></pinned-chat>
                                  <!-- Left Chat Title -->
                                  <div
                                    class="d-flex justify-content-between align-items-center ps-0 pe-0"
                                  >
                                    <div class="fav-title pin-chat">
                                      <h6>Recent Chat</h6>
                                    </div>
                                  </div>
                                  <!-- /Left Chat Title -->
                                  <recent-chat></recent-chat>
                                </div>
                              </div>
                            </perfect-scrollbar>
                          </div>
                          <!-- / Chats sidebar -->
                        </div>
                        <!-- /Sidebar group -->

                        <!-- Chat -->
                        <div class="chat chat-messages" id="middle">
                          <div class="h-100">
                            <studentchat-header></studentchat-header>
                            <div class="chat-body chat-page-group slimscroll">
                              <perfect-scrollbar
                                class="scroll-area-one"
                                :settings="settings"
                                @ps-scroll-y="scrollHanle"
                              >
                                <chat-message></chat-message>
                              </perfect-scrollbar>
                            </div>
                          </div>
                          <chat-footer></chat-footer>
                        </div>
                        <!-- /Chat -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Student Profile -->
          </div>
        </div>
      </div>
      <layouts1></layouts1>
    </div>
  </div>
</template>
<script>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
export default {
  components: {
    PerfectScrollbar,
  },
  data() {
    return {
      title: "Messages",
      text: "Home",
      text1: "Messages",
      settings: {
        suppressScrollX: true,
      },
    };
  },
  methods: {
    scrollHanle() {},
  },
};
</script>

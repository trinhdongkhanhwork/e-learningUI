<template>
  <div class="chat-page main-chat-blk">
    <div class="main-wrapper chat-wrapper">
      <layouts></layouts>
      <!-- <student-breadcrumb :title="title" :text="text" :text1="text1" /> -->
      <div class="page-content chat-page-wrapper">
        <div class="container" style="margin-top: 10px;">
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

                          <div id="chats"
                            class="left-sidebar-wrap sidebar active slimscroll">
                            <perfect-scrollbar class="scroll-area  m-0"
                              :settings="settings"
                              @ps-scroll-y="scrollHanle">
                              <div class="slimscroll">
                                <!-- Left Chat Title -->
                                <div class="left-chat-title all-chats d-flex justify-content-between align-items-center">
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
                                <!-- <top-online></top-online> -->
                                <!-- /Top Online Contacts -->

                                <div class="sidebar-div chat-body"
                                  id="chatsidebar">
                                  <!-- Left Chat Title -->
                                  <div class="d-flex justify-content-between align-items-center ps-0 pe-0">
                                    <div class="fav-title pin-chat">
                                      <h6>Course Chat</h6>
                                    </div>
                                  </div>
                                  <!-- /Left Chat Title -->

                                  <!-- Course chat -->
                                  <ul class="user-list space-chat">
                                    <li class="user-list-item chat-user-list"
                                        v-for="(course, index) in courseChats" :key="index"
                                        @click="getMessageToCourse(course)">
                                      <a href="javascript:void(0);" class="status-active">
                                        <div class="avatar avatar-online">
                                          <img :src="course.coverImage" class="rounded-circle"/>
                                        </div>
                                        <div class="users-list-body">
                                          <div>
                                            <h5>{{ course.title }}</h5>
                                            <p></p>
                                          </div>
                                          <!-- <div class="last-chat-time">
                                            <small class="text-muted">10:20 PM</small>
                                            <div class="chat-pin">
                                              <i class="fa-solid fa-thumbtack me-2"></i>
                                              <i class="fa-solid fa-check-double"></i>
                                            </div>
                                          </div> -->
                                        </div>
                                      </a>
                                      <!-- <div class="chat-hover ms-1">
                                        <div class="chat-action-col">
                                          <span class="d-flex" data-bs-toggle="dropdown">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                          </span>
                                          <div class="dropdown-menu chat-drop-menu dropdown-menu-end">
                                            <span class="dropdown-item"
                                              ><span><i class="bx bx-archive-in"></i></span>Archive Chat
                                            </span>
                                            <span class="dropdown-item"
                                              ><span><i class="bx bx-volume-mute"></i></span>Mute Notification</span
                                            >
                                            <span class="dropdown-item"
                                              ><span><i class="bx bx-log-out"></i></span>Delete Chat</span
                                            >
                                            <span class="dropdown-item"
                                              ><span><i class="bx bx-pin"></i></span>Unpin Chat</span
                                            >
                                            <span class="dropdown-item"
                                              ><span><i class="bx bx-check-square"></i></span>Mark as Unread</span
                                            >
                                          </div>
                                        </div>
                                      </div> -->
                                    </li>
                                  </ul>
                                  <!-- Course Chat -->
                                  <!-- Left Chat Title -->
                                  <!-- <div class="d-flex justify-content-between align-items-center ps-0 pe-0">
                                    <div class="fav-title pin-chat">
                                      <h6>Recent Chat</h6>
                                    </div>
                                  </div> -->
                                  <!-- /Left Chat Title -->
                                  <!-- <recent-chat></recent-chat> -->
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
                            
                            <!-- Chat header -->
                            <div class="chat-header" v-if="courseChat != null">
                              <div class="user-details mb-0">
                                <figure class="avatar mb-0">
                                  <img :src="courseChat != null ? courseChat.coverImage : null">
                                </figure>
                                <div class="mt-1">
                                  <h5>{{ courseChat.title }}</h5>
                                </div>
                              </div>
                              <!-- <div class="chat-options">
                              </div>
                              <div class="chat-search">
                              </div> -->
                            </div>
                            <!-- Chat header -->

                            <div class="chat-body chat-page-group slimscroll">
                              <perfect-scrollbar class="scroll-area-one"
                                :settings="settings"
                                @ps-scroll-y="scrollHanle">
                                <div class="messages">
                                  
                                  <!-- <div class="chat-line">
                                    <span class="chat-date">Today, July 24</span>
                                  </div> -->

                                  <div v-if="messages.length == 0"
                                      style="display: flex; margin: 0 auto 0 auto">
                                      <h3>Start texting people</h3>
                                  </div>

                                  <div class="chats"
                                        v-for="(message, index) in messages" :key="index"
                                        :class="{'chats-right': message.idUserFrom == user.id }">
                                    <div class="chat-avatar">
                                      <img :src="message.avatarUserFrom"
                                        class="rounded-circle dreams_chat"
                                        alt="image"/>
                                    </div>
                                    <div class="chat-content">
                                      <div class="chat-profile-name">
                                        <h6>
                                          {{ message.nameUserFrom }}<span>18:00</span><span class="check-star msg-star d-none"><i class="bx bxs-star"></i></span>
                                        </h6>
                                        <div class="chat-action-btns ms-2" v-if="message.idUserFrom == user.id">
                                          <div class="chat-action-col">
                                            <a class="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                              <i class="fa-solid fa-ellipsis"></i>
                                            </a>
                                            <div class="dropdown-menu chat-drop-menu dropdown-menu-end">
                                              <!-- <a href="javascript:void(0);" class="dropdown-item message-info-left"
                                                ><span><i class="bx bx-info-circle"></i></span>Message Info
                                              </a>
                                              <a href="javascript:void(0);" class="dropdown-item reply-button"
                                                ><span><i class="bx bx-share"></i></span>Reply</a
                                              >
                                              <a href="javascript:void(0);" class="dropdown-item"
                                                ><span><i class="bx bx-smile"></i></span>React</a
                                              >
                                              <a href="javascript:void(0);" class="dropdown-item"
                                                ><span><i class="bx bx-reply"></i></span>Forward</a
                                              >
                                              <a href="javascript:void(0);" class="dropdown-item click-star"
                                                ><span><i class="bx bx-star"></i></span
                                                ><span class="star-msg">Star Message</span></a
                                              >
                                              <a href="javascript:void(0);" class="dropdown-item"
                                                ><span><i class="bx bx-edit-alt"></i></span>Report</a
                                              > -->
                                              <a href="javascript:void(0);" class="dropdown-item"
                                                @click="deleteMessage(message.id)"><span><i class="bx bx-trash"></i></span>Delete</a
                                              >
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="message-content reply-getcontent">{{ message.message }}</div>
                                    </div>
                                  </div>
                                </div>
                              </perfect-scrollbar>
                            </div>
                          </div>
                          <!-- Chat footer -->
                          <div class="chat-footer">
                            <form>
                              <div class="smile-foot">
                                <div class="chat-action-btns">
                                  <div class="chat-action-col">
                                    <a class="action-circle" href="javascript:void(0);" data-bs-toggle="dropdown">
                                      <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                      <a href="javascript:void(0);" class="dropdown-item"
                                        ><span><i class="bx bx-file"></i></span>Document</a
                                      >
                                      <a href="javascript:void(0);" class="dropdown-item"
                                        ><span><i class="bx bx-camera"></i></span>Camera</a
                                      >
                                      <a href="javascript:void(0);" class="dropdown-item"
                                        ><span><i class="bx bx-image"></i></span>Gallery</a
                                      >
                                      <a href="javascript:void(0);" class="dropdown-item"
                                        ><span><i class="bx bx-volume-full"></i></span>Audio</a
                                      >
                                      <a href="javascript:void(0);" class="dropdown-item"
                                        ><span><i class="bx bx-map"></i></span>Location</a
                                      >
                                      <a href="javascript:void(0);" class="dropdown-item"
                                        ><span><i class="bx bx-user-pin"></i></span>Contact</a
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="smile-foot emoj-action-foot">
                                <a href="javascript:void(0);" class="action-circle"
                                  ><i class="bx bx-smile"></i
                                ></a>
                              </div>
                              <div class="smile-foot">
                                <a href="javascript:void(0);" class="action-circle"
                                  ><i class="bx bx-microphone-off"></i
                                ></a>
                              </div>

                              <div class="replay-forms">
                                <!-- <div class="chats forward-chat-msg reply-div d-none">
                                  <div class="contact-close_call text-end">
                                    <a href="javascript:void(0);" class="close-replay">
                                      <i class="bx bx-x"></i>
                                    </a>
                                  </div>
                                  <div class="chat-avatar">
                                    <img
                                      src="@/assets/img/user/user3.jpg"
                                      class="rounded-circle dreams_chat"
                                      alt="image"
                                    />
                                  </div>
                                  <div class="chat-content">
                                    <div class="chat-profile-name">
                                      <h6>Mark Villiams<span>8:16 PM</span></h6>
                                      <div class="chat-action-btns ms-2">
                                        <div class="chat-action-col">
                                          <a class="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                            <i class="fa-solid fa-ellipsis"></i>
                                          </a>
                                          <div class="dropdown-menu chat-drop-menu dropdown-menu-end">
                                            <a href="javascript:void(0);" class="dropdown-item message-info-left"
                                              ><span><i class="bx bx-info-circle"></i></span>Message Info
                                            </a>
                                            <a href="javascript:void(0);" class="dropdown-item reply-button"
                                              ><span><i class="bx bx-share"></i></span>Reply</a
                                            >
                                            <a href="javascript:void(0);" class="dropdown-item"
                                              ><span><i class="bx bx-smile"></i></span>React</a
                                            >
                                            <a href="javascript:void(0);" class="dropdown-item"
                                              ><span><i class="bx bx-reply"></i></span>Forward</a
                                            >
                                            <a href="javascript:void(0);" class="dropdown-item"
                                              ><span><i class="bx bx-star"></i></span>Star Message</a
                                            >
                                            <a href="javascript:void(0);" class="dropdown-item"
                                              ><span><i class="bx bx-dislike"></i></span>Report</a
                                            >
                                            <a href="javascript:void(0);" class="dropdown-item"
                                              ><span><i class="bx bx-trash"></i></span>Delete</a
                                            >
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="message-content reply-content"></div>
                                  </div>
                                </div> -->
                                <input v-model="messageInput"
                                  type="text"
                                  class="form-control chat_form"
                                  placeholder="Type your message here..."
                                />
                              </div>

                              <div class="form-buttons">
                                <button class="btn send-btn" type="button"
                                        @click="sendMessage()">
                                  <i class="bx bx-paper-plane"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                          <!-- Chat footer -->
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
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import baseApi from "@/axios";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  components: {
    PerfectScrollbar,
  },
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    return {
      title: "Messages",
      text: "Home",
      text1: "Messages",
      settings: {
        suppressScrollX: true,
      },
      user,
      messageTo: {
        id: "bc7b0320-2fbf-4aa1-aee6-0735cc35d38b",
        avatarUrl: "https://lms-cfd.s3.amazonaws.com/profile.jpg"
      },
      messages:[],
      messageInput: "",
      courseChats: [],
      courseChat: null,
    };
  },
  created() {
    this.getCourseIntructor()
    this.connectSocket()
  },
  methods: {
    getMessageToUser(){
      baseApi.get(`/messages/toUser/${this.user.id}/${this.messageTo.id}`)
      .then(message => {
        this.messages = message.data
        console.log("Tải dữ liệu tin nhắn thành công: ")
      })
      .catch(error => {
        console.log("Truy xuất tin nhắn thất bại: ", error)
      })
    },
    getMessageToCourse(enrollCourse){
      baseApi.get(`/messages/toCourse/${enrollCourse.id}`)
      .then(messageCourse => {
        this.messages = messageCourse.data
        this.courseChat = enrollCourse
        console.log("Tải tin nhắn nhóm chat thành công: ", this.messages)
      })
      .catch(error => {
        console.log("Tải tin nhắn nhóm chat thất bại: ", error)
      })
    },
    getCourseIntructor(){
      baseApi.get(`/messages/getCourseIntructor/${this.user.id}`)
      .then( courses => {
        this.courseChats = courses.data
        console.log("Tải thành công dữ liệu nhóm chat: ")
      })
      .catch(error => {
        console.log("Tìm nhóm chat thất bại: ", error)
      })
    },
    sendMessage(){
      if(this.messageInput != "") {
        if(this.stompClient && this.stompClient.connected){
          this.stompClient.publish({
            destination: "/app/messages/send",
            body: JSON.stringify({
              id: null,
              message: this.messageInput,
              idUserTo: null,
              idUserFrom: this.user.id,
              idCourse: this.courseChat.id,
              createdAt: null,
              type: "text"
            }),
          });
          console.log("Đã gửi bình luận qua WebSocket");
          this.messageInput = ""
        }
      } 
    },
    deleteMessage(idMessage){
      this.stompClient.publish({
        destination: `/app/messages/delete`,
        body: JSON.stringify({
          id: idMessage,
          message: null,
          idUserTo: null,
          idUserFrom: null,
          idCourse: null,
          createdAt: null,
          type: null
        }),
      });
    },
    connectSocket() {
      this.stompClient = new StompJs.Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
        debug: (str) => {
          // console.log("Thông tin gỡ lỗi", str);
        },
        onConnect: (frame) => {
          // console.log("Kết nối socket thành công!", frame);
          this.stompClient.subscribe("/topic/messages", (message) => {
            try {
              const messageData = JSON.parse(message.body);
              console.log("Nhận bình luận:", messageData);

              if (this.messages != null) {
                const index = this.messages.findIndex(
                  (mess) => mess.id === messageData.id
                );
                if (index !== -1) {
                  // Nếu bình luận đã tồn tại, cập nhật nó
                  this.messages[index].message = messageData.message;
                }if (messageData.idCourse == this.courseChat.id){
                  this.messages.push(messageData);
                }
              } else {
                // Nếu bình luận chưa tồn tại, thêm mới
                this.messages = [];
                this.messages.push(messageData);
              }
            } catch (error) {
              console.error("Không thể phân tích JSON:", error);
              console.error("Nội dung nhận được:", message.body);
            }
          });
          this.stompClient.subscribe("/topic/delete", (idMessage) => {
            try {
              const id = JSON.parse(idMessage.body);
              console.log("Xóa bình luận có id: ", id);

              const index = this.messages.findIndex((message) => message.id === id);
              if (index !== -1) {
                this.messages.splice(index, 1);
              }
            } catch (error) {
              console.error("Không thể phân tích JSON:", error);
              console.error("Nội dung nhận được:", idMessage.body);
            }
          });
        },
        onStompError: (frame) => {
          console.error("Broker reported error: " + frame.headers["message"]);
          console.error("Additional details: " + frame.body);
        },
      });
      this.stompClient.activate();
    },
    scrollHanle() {},
  },
  beforeUnmount() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  },
};
</script>
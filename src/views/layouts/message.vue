<template>
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
                                    <li><a href="javascript:void(0);" class="user-chat-search-btn">
                                          <i class="feather-search"></i>
                                        </a>
                                    </li>
                                </ul>
                                <!-- Chat Search -->
                                <div class="user-chat-search">
                                    <form>
                                    <span class="form-control-feedback"><i class="feather-search"></i></span>
                                    <input type="text"
                                        name="chat-search"
                                        placeholder="Search"
                                        class="form-control"/>
                                    <div class="user-close-btn-chat">
                                        <i class="feather-x"></i>
                                    </div>
                                    </form>
                                </div>
                                <!-- /Chat Search -->
                              </div>
                          </div>
                          <!-- /Left Chat Title -->

                          <div class="sidebar-div chat-body"
                              id="chatsidebar">
                              <!-- Left Chat Title -->
                              <div class="d-flex justify-content-between align-items-center ps-0 pe-0">
                                <div class="fav-title pin-chat">
                                    <h6>Group Chat</h6>
                                </div>
                              </div>
                              <!-- /Left Chat Title -->

                              <!-- assembly chat -->
                              <ul class="user-list space-chat">
                                <li class="user-list-item chat-user-list"
                                    v-for="(assembly, index) in assemblys" :key="index"
                                    @click="getMessageInAssembly(assembly)">
                                    <a href="javascript:void(0);" class="status-active">
                                      <div class="avatar avatar-online">
                                          <img :src="assembly.imageAssembly" class="rounded-circle"/>
                                      </div>
                                      <div class="users-list-body">
                                          <div>
                                            <h5>{{ assembly.nameAssembly }}</h5>
                                            <p></p>
                                          </div>
                                      </div>
                                    </a>
                                </li>
                              </ul>
                              <!-- assembly chat -->
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
                        <div class="chat-header" v-if="assemblyChat != null">
                            <div class="user-details mb-0">
                              <figure class="avatar mb-0">
                                  <img :src="assemblyChat != null ? assemblyChat.imageAssembly : null">
                              </figure>
                              <div class="mt-1">
                                  <h5>{{ assemblyChat.nameAssembly }}</h5>
                              </div>
                            </div>
                        </div>
                        <!-- Chat header -->
                        
                        <div class="chat-body chat-page-group slimscroll">
                          <perfect-scrollbar class="scroll-area-one" 
                                              :settings="settings" @ps-scroll-y="scrollHanle"
                                              :class="{'noneMessage': messages.length == 0}">
                            <div class="messages">

                                <!-- <div class="chat-line">
                                <span class="chat-date">Today, July 24</span>
                                </div> -->

                                <div v-if="messages.length == 0"
                                    style="display: flex; margin: auto">
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
                                            {{ message.nameUserFrom }}
                                            <span>{{ message.createdAt }}</span>
                                            <span class="check-star msg-star d-none"><i class="bx bxs-star"></i></span>
                                        </h6>
                                        <div class="chat-action-btns ms-2" v-if="message.idUserFrom == user.id">
                                            <div class="chat-action-col">
                                              <a class="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                                  <i class="fa-solid fa-ellipsis"></i>
                                              </a>
                                              <div class="dropdown-menu chat-drop-menu dropdown-menu-end">
                                                  <a href="javascript:void(0);" class="dropdown-item"
                                                    @click="deleteMessage(message.id)"><span><i class="bx bx-trash"></i></span>Delete</a>
                                              </div>
                                            </div>
                                        </div>
                                      </div>
                                      <div class="message-content reply-getcontent" style="display: flex; justify-content: start; flex-direction: column;">
                                        {{ message.message }}
                                        <img :src="message.urlImage" alt="" style="width: 100%; margin-top: 10px;" v-if="message.urlImage != null">
                                        <a :href="message.urlFile" v-if="message.urlFile != null">   
                                            Click here to download
                                            <img src="@/assets/img/foderDowload.jpg" width="100%">
                                        </a>
                                      </div>
                                  </div>
                                </div>
                            </div>
                          </perfect-scrollbar>
                        </div>
                      </div>
                      <!-- Chat footer -->
                      <div class="chat-footer"  v-if="assemblyChat != null">
                        <form v-if="messages != null">
                            <div class="smile-foot">
                              <div class="chat-action-btns">
                                  <div class="chat-action-col">
                                  <a class="action-circle" href="javascript:void(0);" data-bs-toggle="dropdown">
                                      <i class="fa-solid fa-ellipsis-vertical"></i>
                                  </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a href="javascript:void(0);" class="dropdown-item"
                                        @click="() => {viewInputToggle = 'file'}">
                                        <span><i class="bx bx-file"></i></span>File</a>
                                        <a href="javascript:void(0);" class="dropdown-item"
                                        @click="() => {viewInputToggle = 'image'}">
                                        <span><i class="bx bx-image"></i></span>Photo</a>
                                        <a href="javascript:void(0);" class="dropdown-item"
                                        @click="() => {viewInputToggle = 'text'}">
                                        <span><i class="bx bx-text"></i></span>Text</a>
                                    </div>
                                  </div>
                              </div>
                            </div>
                            <div class="replay-forms">
                              <input v-model="messageInput" v-if="viewInputToggle == 'text'" type="text"
                                  class="form-control chat_form"
                                  placeholder="Type your message here..."/>
                              <input type="file" v-if="viewInputToggle == 'image'"
                                  class="form-control chat_form inputImage"
                                  @change="hanleUploadImage"/>
                              <input type="file" v-if="viewInputToggle == 'file'"
                                  class="form-control chat_form"
                                  @change="hanleUploadFile"/>
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
      assemblys: [],
      assemblyChat: null,
      messages:[],
      messageInput: "",
      image: {},
      file: {},
      viewInputToggle: "text",
    };
  },
  created() {
    this.getAssembly()
    this.connectSocket()
  },
  methods: {
    getAssembly(){
      baseApi.get(`/assembly/user/${this.user.id}`)
      .then((response) => {
        this.assemblys = response.data
        console.log("Tải dữ liệu nhóm tin nhắn thành cồng: ", this.assemblys)
      })
      .catch((error) => {
        console.log("Không thể tải dữ liệu các nhóm tin nhắn: ", error)
      })
    },
    getMessageInAssembly(assembly){
      baseApi.get(`/messages/group/${assembly.id}`)
      .then((response) => {
        this.messages = response.data
        this.assemblyChat = assembly
        console.log("Dữ liệu tin nhắn được tải lên: ", this.messages)
      })
      .catch((error) => {
        console.log("Tải dữ liệu tin nhắn thất bại: ", error)
      })
    },
    async sendMessage(){
      const urlImage = await this.upLoadImage()
      const urlFile = await this.upLoadFile()
      if(this.messageInput != "" || urlImage != null || urlFile != null) {
        if(this.stompClient && this.stompClient.connected){
          const mesage = {
              id: null,
              message: this.messageInput,
              idUserFrom: this.user.id,
              idAssembly: this.assemblyChat.id,
              urlImage: urlImage,
              urlFile: urlFile,
              createdAt: null,
              type: "text"
            }
          this.stompClient.publish({
            destination: "/app/sendToGroup",
            body: JSON.stringify(mesage),
          });

          console.log("Đã gửi bình luận qua WebSocket", mesage);
          this.messageInput = ""
          this.image = null
          this.file = null
          this.viewInputToggle = 'text'
        }
      }  
    },
    deleteMessage(idMessage){
      this.stompClient.publish({
        destination: `/app/deleteMessage`,
        body: JSON.stringify({
          id: idMessage,
          message: null,
          idUserTo: null,
          idUserFrom: null,
          idAssembly: null,
          createdAt: null,
          type: null
        }),
      });
    },
    connectSocket() {
      this.stompClient = new StompJs.Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
        onConnect: (frame) => {
          console.log("Kết nối socket thành công!", frame);
          this.stompClient.subscribe("/topic/message", (message) => {
            try {
              const messageData = JSON.parse(message.body).body;
              console.log("Nhận bình luận:", messageData);

              if (this.messages != null) {
                const index = this.messages.findIndex(
                  (mess) => mess.id === messageData.id
                );
                if (index !== -1) {
                  // Nếu bình luận đã tồn tại, cập nhật nó
                  this.messages[index].message = messageData.message;
                }if (messageData.idAssembly == this.assemblyChat.id){
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
          this.stompClient.subscribe("/topic/deleteMessage", (idMessage) => {
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
    hanleUploadFile(event){
      this.file = event.target.files[0]

    },
    hanleUploadImage(event){
      this.image = event.target.files[0]
    },
    async upLoadImage(){
      if(!this.image){
        return null
      }
      const formData = new FormData();
      formData.append("img", this.image )

      try{
        const response = await baseApi.post("/api/s3/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        console.log("Upload thành công: ", response.data.result.urlImg)
        return response.data.result.urlImg
      } catch (error) {
        console.log("Tải hình lên không thành công: ", error)
        return null;
      }

    },
    async upLoadFile(){
      if(!this.file){
        return null
      }
      const formData = new FormData();
      formData.append("img", this.file )

      try{
        const response = await baseApi.post("/api/s3/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        console.log("Upload file thành công: ", response.data.result.urlImg)
        return response.data.result.urlImg
      } catch (error) {
        console.log("Tải file lên không thành công: ", error)
        return null;
      }

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
<style>
.noneMessage {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
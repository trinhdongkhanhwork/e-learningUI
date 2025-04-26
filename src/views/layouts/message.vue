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
                          <div class="left-chat-title all-chats d-flex flex-column justify-content-center align-items-center">
                              <div class="select-group-chat">
                                <input type="text" class="form-control" placeholder="Search friend..."
                                          style="min-width: 300px;"
                                          v-model="keyword">
                              </div>
                              <ul class="user-list space-chat" style="margin-top: 20px; min-width: 100%;"
                                  v-if="friendsSearch.length > 0">
                                <li class="user-list-item chat-user-list"
                                    v-for="(friendSearch, index) in friendsSearch" :key="index">
                                    <a href="javascript:void(0);" class="status-active">
                                      <div class="avatar avatar-online">
                                          <img :src="friendSearch?.user?.avatarUrl" class="rounded-circle"/>
                                      </div>
                                      <div class="users-list-body">
                                          <div>
                                            <h5>{{ friendSearch?.user?.fullname }}</h5>
                                            <p></p>
                                          </div>
                                      </div>
                                     <div class="d-flex flex-column justify-content-center align-items-center">
                                        <button class="btn btn-pinkIcon"
                                                :class="{ 'isFriend' : friendSearch?.friendStatus?.id !== null}"
                                                :disabled="friendSearch?.friendStatus?.id !== null"
                                                @click="addFriend(friendSearch?.user?.id)">
                                          <img src="@/assets/img/addUser.png" style="aspect-ratio: 1 / 1; width: 20px;">
                                        </button>
                                     </div>
                                    </a>
                                </li>
                              </ul>
                          </div>
                          <!-- /Left Chat Title -->
                           
                           <!-- Invitation -->
                          <div class="sidebar-div chat-body"
                              id="chatsidebar"
                              v-if="invitations.length > 0">
                              <!-- Title -->
                              <div class="d-flex justify-content-between align-items-center ps-0 pe-0">
                                <div class="fav-title pin-chat">
                                    <h6>Invitation</h6>
                                </div>
                              </div>
                              <!-- Title -->

                              <!-- Friend invỉtation -->
                              <ul class="user-list space-chat">
                                <li class="user-list-item chat-user-list"
                                    v-for="(invitation, index) in invitations" :key="index">
                                    <a href="javascript:void(0);" class="status-active">
                                      <div class="avatar avatar-online">
                                          <img :src="invitation?.avatarUrl" class="rounded-circle"/>
                                      </div>
                                      <div class="users-list-body">
                                          <div>
                                            <h5>{{ invitation?.fullname }}</h5>
                                            <p></p>
                                          </div>
                                      </div>
                                     <div class="d-flex flex-column justify-content-center align-items-center">
                                        <button class="btn btn-pink"
                                                @click="confirmFriend(invitation.id)">Confrim</button>
                                     </div>
                                    </a>
                                </li>
                              </ul>
                              <!-- Friend invỉtation -->
                          </div>
                          <!-- Invitation -->

                          <div class="sidebar-div chat-body"
                              id="chatsidebar"
                              v-if="friends.length > 0">
                              <!-- Left Chat Title -->
                              <div class="d-flex justify-content-between align-items-center ps-0 pe-0">
                                <div class="fav-title pin-chat">
                                    <h6>Friend chat</h6>
                                </div>
                              </div>
                              <!-- /Left Chat Title -->

                              <!-- Friend chat -->
                              <ul class="user-list space-chat">
                                <li class="user-list-item chat-user-list"
                                    v-for="(friend, index) in friends" :key="index"
                                    @click="selectFriend(friend)">
                                    <a href="javascript:void(0);" class="d-flex justify-content-between">
                                      <div class="avatar avatar-online">
                                          <img :src="friend.avatarUrl" class="rounded-circle"/>
                                      </div>
                                      <div class="users-list-body">
                                          <div>
                                            <h5>{{ friend.fullname }}</h5>
                                          </div>
                                      </div>
                                    </a>
                                </li>
                              </ul>
                              <!-- Friend chat -->
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
                        <div class="chat-header" v-if="selectedFriend != null">
                            <div class="user-details mb-0">
                              <figure class="avatar mb-0">
                                <img :src="selectedFriend?.avatarUrl || ''" class="rounded-circle">
                              </figure>
                              <div class="mt-1">
                                <h5>{{ selectedFriend?.fullname || '' }}</h5>
                              </div>
                            </div>
                        </div>
                        <!-- Chat header -->
                        
                        <div class="chat-body chat-page-group slimscroll">
                          <perfect-scrollbar class="scroll-area-one"
                                               ref="messageList"
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
                                    :class="{'chats-right': message.user.id == user.id }">
                                  <div class="chat-avatar">
                                      <img :src="message.user.avatarUrl"
                                      class="rounded-circle dreams_chat"
                                      alt="image"/>
                                  </div>
                                  <div class="chat-content">
                                      <div class="chat-profile-name">
                                        <h6>
                                            {{ message.user.fullname }}
                                            <span style="color: lightgray">{{  formatDate(message.createdAt) }}</span>
                                        </h6>
                                        <div class="chat-action-btns ms-2" v-if="message.user.id == user.id">
                                            <div class="chat-action-col">
                                              <a href="javascript:void(0);" data-bs-toggle="dropdown"
                                                v-if="message.recall">
                                                  <i class="fa-solid fa-ellipsis"></i>
                                              </a>
                                              <div class="dropdown-menu chat-drop-menu dropdown-menu-end">
                                                  <a href="javascript:void(0);" class="dropdown-item" @click="recallMessage(message.id)">
                                                    <span><i class="bx bx-trash"></i></span>Recall</a>
                                              </div>
                                            </div>
                                        </div>
                                      </div>
                                      <div class="message-content reply-getcontent" style="display: flex; justify-content: start; flex-direction: column;"
                                            v-if="message.recall">
                                        {{ message.message }}
                                        <img :src="message.urlImage" alt="" style="width: 100%; margin-top: 10px;" v-if="message.urlImage != null && message.urlImage != ''">
                                        <a :href="message.urlFile" v-if="message.urlFile != null && message.urlFile != ''">   
                                            Click here to download
                                            <img src="@/assets/img/foderDowload.jpg" width="100%">
                                        </a>
                                      </div>
                                      <div class="message-content reply-getcontent" style="display: flex; justify-content: start; flex-direction: column; background-color: white; border: solid 1px lightgray; color: lightgray;"
                                            v-if="!message.recall">
                                        Recall
                                      </div>
                                  </div>
                                </div>
                            </div>
                          </perfect-scrollbar>
                        </div>
                      </div>
                      <!-- Chat footer -->
                      <div class="chat-footer">
                        <form v-if="selectedFriend != null" @submit.prevent="send">
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
                            <div class="replay-forms" style="margin-top: 0;">
                              <input v-model="textMessage" type="text" v-if="viewInputToggle == 'text'"
                                  class="form-control chat_form"
                                  placeholder="Type your message here..."/>
                              <input type="file" v-if="viewInputToggle == 'image'"
                                  ref="imageMessage"
                                  class="form-control chat_form inputImage"
                                  @change="uploadImage"/>
                              <input type="file" v-if="viewInputToggle == 'file'" 
                                  ref="fileMessage"
                                  class="form-control chat_form"
                                  @change="uploadFile"/>
                            </div>
                            <div class="form-buttons" style="margin: 0;">
                              <button class="btn send-btn" type="button"
                                      @click="send()">
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
import { onMounted, ref, watch } from "vue";
import { useStore } from 'vuex';
import messageService from "@/service/messages/messages"
import friendService from "@/service/friend/friend"
import { uploadService } from "@/service/uploadFile/uploadService"
import moment from "moment";
export default {
  components: {
    PerfectScrollbar,
  },
  setup(){
    const {messages, friend, fetchMessages, sendMessage, recallMessage} = messageService();
    const {invitations, friendsSearch, friends, fetchFriends, searchFriend, sendInvitation, loadInvitation, confirmInvitaiton, receiveInvitation, receiveComfirmInvitation} = friendService();
    const store = useStore();
    const user = ref(store.state.userInfo);
    const selectedFriend = ref(null);
    const viewInputToggle = ref("text")
    const textMessage = ref("");
    const imageMessage = ref(null);
    const fileMessage = ref(null);
    const messageList = ref(null);
    const keyword = ref("");

    onMounted(async () => {
      fetchFriends(),
      loadInvitation(),
      receiveInvitation(),
      receiveComfirmInvitation()
    })

    watch(keyword, () => {
      searchFriend(keyword.value);
    });

    const addFriend = async (idFriend) => {
      await sendInvitation(idFriend);
      setTimeout(() => {
        searchFriend(keyword.value);
      }, 500)
    }

    const confirmFriend = async (idFriend) => {
      await confirmInvitaiton(idFriend);
    }

    const uploadImage = async () => {
      if( imageMessage?.value?.files.length == 0) return null
      const inputImage = new FormData();
      inputImage.append("img", imageMessage?.value?.files[0])
      return await uploadService(inputImage);
    }

    const uploadFile = async () => {
      if( fileMessage?.value?.files.length == 0) return null
      const inputFile = new FormData();
      inputFile.append("img", fileMessage?.value?.files[0]);
      return await uploadService(inputFile);
    }

    const send = async () => {
      if (!textMessage.value && !imageMessage.value && !fileMessage.value) return;
      const [imageUrl, fileUrl] = await Promise.all([
        imageMessage.value ? uploadImage() : null,
        fileMessage.value ? uploadFile() : null
      ]);
      sendMessage(textMessage.value, selectedFriend?.value?.id, imageUrl, fileUrl)
      imageMessage.value = null
      fileMessage.value = null 
      textMessage.value = ""
    }

    const selectFriend = async (friendSelect) => {
      selectedFriend.value = friendSelect;
      fetchMessages(friendSelect.id);
    }

    const formatDate = (dateString) => {
      if(dateString == '' || dateString == null) return ''
      return moment(dateString).format("DD/MM/YYYY");
    }

    return {
      viewInputToggle,
      friends,
      selectedFriend,
      messages,
      selectFriend,
      formatDate,
      uploadImage,
      uploadFile,
      send,
      textMessage,
      imageMessage,
      fileMessage,
      recallMessage,
      messageList,
      friendsSearch,
      keyword,
      user,
      addFriend,
      invitations,
      confirmFriend
    }
  }
}
</script>
<style>
.noneMessage {
  display: flex;
  justify-content: center;
  align-items: center;
}
.isFriend {
  background-color: gray !important;
  border: gray !important;
}
</style>
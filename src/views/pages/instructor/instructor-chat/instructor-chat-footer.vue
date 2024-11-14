<template>
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
        <div class="chats forward-chat-msg reply-div d-none">
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
        </div>
        <input
          type="text"
          class="form-control chat_form"
          placeholder="Type your message here..."
        />
      </div>
      <div class="form-buttons">
        <button class="btn send-btn" type="submit">
          <i class="bx bx-paper-plane"></i>
        </button>
      </div>
    </form>
  </div>
</template>

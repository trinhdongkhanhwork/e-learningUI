<template>
  <ul class="user-list space-chat">
    <li class="user-list-item chat-user-list">
      <a href="javascript:void(0);" class="status-active">
        <div class="avatar avatar-online">
          <img src="@/assets/img/user/user12.jpg" class="rounded-circle" alt="image" />
        </div>
        <div class="users-list-body">
          <div>
            <h5>Mark Villiams</h5>
            <p>Have you called them?</p>
          </div>
          <div class="last-chat-time">
            <small class="text-muted">10:20 PM</small>
            <div class="chat-pin">
              <i class="fa-solid fa-thumbtack me-2"></i>
              <i class="fa-solid fa-check-double"></i>
            </div>
          </div>
        </div>
      </a>
      <div class="chat-hover ms-1">
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
      </div>
    </li>
    
  </ul>
</template>

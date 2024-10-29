<template>
  <div class="chat-header">
    <div class="user-details mb-0">
      <div class="d-lg-none">
        <ul class="list-inline mt-2 me-2">
          <li class="list-inline-item">
            <a
              class="text-muted px-0 left_sides"
              href="javascript:void(0);"
              data-chat="open"
            >
              <i class="fas fa-arrow-left"></i>
            </a>
          </li>
        </ul>
      </div>
      <figure class="avatar mb-0">
        <img src="@/assets/img/user/user12.jpg" class="rounded-circle" alt="image" />
      </figure>
      <div class="mt-1">
        <h5>Mark Villiams</h5>
        <small class="last-seen"> Last Seen at 07:15 PM </small>
      </div>
    </div>
    <div class="chat-options">
      <ul class="list-inline">
        <li class="list-inline-item">
          <a
            href="javascript:void(0)"
            class="btn btn-outline-light chat-search-btn"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Search"
          >
            <i class="feather-search"></i>
          </a>
        </li>
        <li class="list-inline-item">
          <a
            class="btn btn-outline-light no-bg"
            href="javascript:void(0);"
            data-bs-toggle="dropdown"
          >
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <router-link to="/home/" class="dropdown-item"
              ><span><i class="bx bx-x"></i></span>Close Chat
            </router-link>
            <a href="javascript:void(0);" class="dropdown-item"
              ><span><i class="bx bx-volume-mute"></i></span>Mute Notification</a
            >
            <a href="javascript:void(0);" class="dropdown-item"
              ><span><i class="bx bx-time-five"></i></span>Disappearing Message</a
            >
            <a href="javascript:void(0);" class="dropdown-item"
              ><span><i class="bx bx-brush-alt"></i></span>Clear Message</a
            >
            <a href="javascript:void(0);" class="dropdown-item"
              ><span><i class="bx bx-trash"></i></span>Delete Chat</a
            >
            <a href="javascript:void(0);" class="dropdown-item"
              ><span><i class="bx bx-dislike"></i></span>Report</a
            >
            <a href="javascript:void(0);" class="dropdown-item"
              ><span><i class="bx bx-block"></i></span>Block</a
            >
          </div>
        </li>
      </ul>
    </div>
    <!-- Chat Search -->
    <div class="chat-search">
      <form>
        <span class="form-control-feedback"><i class="bx bx-search"></i></span>
        <input
          type="text"
          name="chat-search"
          placeholder="Search Chats"
          class="form-control"
        />
        <div class="close-btn-chat">
          <i class="feather-x"></i>
        </div>
      </form>
    </div>
    <!-- /Chat Search -->
  </div>
</template>

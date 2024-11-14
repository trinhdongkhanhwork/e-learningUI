<template>
  <div class="settings-page-head">
    <ul class="settings-pg-links">
      <li>
        <router-link to="/instructor/instructor-settings"
          ><i class="bx bx-edit"></i>Edit Profile</router-link
        >
      </li>
      <li>
        <router-link to="/instructor/instructor-change-password"
          ><i class="bx bx-lock"></i>Change Password</router-link
        >
      </li>
      <li>
        <router-link to="/instructor/instructor-setting-notifications"
          ><i class="bx bx-bell"></i>Notifications</router-link
        >
      </li>
      <li>
        <router-link to="/instructor/instructor-setting-withdraw"
          ><i class="bx bx-wallet-alt"></i>Withdraw</router-link
        >
      </li>
      <li>
        <router-link to="/instructor/instructor-delete-account"
          ><i class="bx bx-error-alt"></i>Delete Account</router-link
        >
      </li>
    </ul>
  </div>
</template>

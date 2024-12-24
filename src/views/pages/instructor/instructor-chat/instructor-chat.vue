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

              <!-- Message -->
              <message-layout></message-layout>
            <!-- Message -->

          </div>
        </div>
      </div>
      <layouts1></layouts1>
    </div>
  </div>
</template>

<template>
  <div class="chat-page main-chat-blk">
    <layouts-index></layouts-index>
    <student-breadcrumb title="Messages" text="Home" text1="Messages" />
    <div class="main-wrapper chat-wrapper">
      <div class="page-content chat-page-wrapper">
        <div class="container" style="margin-top: 10px;">
          <div class="row">
            <!-- sidebar -->
            <student-sidebar></student-sidebar>
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
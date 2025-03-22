<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import {connectSocket} from '@/service/socket/socket'
onMounted(async () => {
  await connectSocket();
});
</script>

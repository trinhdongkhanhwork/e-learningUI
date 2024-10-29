<template>
  <div class="top-online-contacts">
    <div class="fav-title">
      <h6>Online Now</h6>
      <a href="#" class="view-all-chat-profiles">View All</a>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide d-flex align-item-center justfy-content-between" v-for="item in TopSlider" :key="item.id">
          <div class="top-contacts-box">
            <div class="profile-img online">
              <a href="javascript:void(0);"
                ><img :src="require(`@/assets/img/user/${item.Image}`)" alt="Image"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopSlider from "@/assets/json/instructor-top-online.json";
export default {
  data() {
    return {
      TopSlider: TopSlider
    }
  },
}
</script>
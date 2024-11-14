<template>
  <div class="d-flex justify-content-between">
    <div class="cards text-center" style="width: 18rem;" @click="handleSetLineChartData('newVisitis')">
      <div class="card-body">
        <i class="fas fa-users" style="color: peru"></i>
        <h5 class="card-title">New Visits</h5>
        <p class="card-text">102,400</p>
      </div>
    </div>
    <div class="cards text-center" style="width: 18rem;" @click="handleSetLineChartData('messages')">
      <div class="card-body">
        <i class="fas fa-comments" style="color: mediumvioletred"></i>
        <h5 class="card-title">Messages</h5>
        <p class="card-text">81,212</p>
      </div>
    </div>
    <div class="cards text-center" style="width: 18rem;" @click="handleSetLineChartData('purchases')">
      <div class="card-body">
        <i class="fas fa-dollar" style="color: green"></i>
        <h5 class="card-title">Purchases</h5>
        <p class="card-text">9,280</p>
      </div>
    </div>
    <div class="cards text-center" style="width: 18rem;" @click="handleSetLineChartData('shoppings')">
      <div class="card-body">
        <i class="fas fa-shopping-cart" style="color: red"></i>
        <h5 class="card-title">Shoppings</h5>
        <p class="card-text">13,600</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useMotion } from '@vueuse/motion'

export default {
  directives: {
    motion: useMotion
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style>
.cards {
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;
}
.cards .card-body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  transition: background-color 0.3s, color 0.3s;
}
.cards .card-body i {
  font-size: 2rem;
  margin-bottom: 10px;
  transition: color 0.3s;
  border-radius: 10px;
}
.cards:hover .card-body {
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 10px;
}
.cards:hover .card-body i {
  color: white;
  border-radius: 10px;
}
</style>

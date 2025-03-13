<template>
  <div v-if="showSectionPopup" class="modal fade show fade-in" tabindex="-1" style="display: block; margin-top: 50px" @click.self="closePopup">
  <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Enter Section Name</h5>
          <button type="button" class="btn-close" @click="closePopup"></button>
        </div>
        <div class="modal-body">
          <input type="text" v-model="title" class="form-control" />
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="addSection">Add</button>
          <button class="btn btn-secondary" @click="closePopup">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showSectionPopup'],
  data() {
    return {
      title: '',
    };
  },
  methods: {
    addSection() {
      this.$emit('add-section', this.title);
      this.closePopup();
    },
    closePopup() {
      this.$emit('close-popup');
    },
  },
};
</script>
<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

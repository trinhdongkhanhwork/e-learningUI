<template>
  <transition name="fade">
    <div v-if="visible" class="dialog-overlay" @click.self="closeDialog">
      <transition name="fade">
        <div v-if="visible" class="dialog-content"  >
          <header class="dialog-header">
            <h2>Instructor Details</h2>
            <button @click="closeDialog" class="close-button">&times;</button>
          </header>

          <form class="dialog-body">
            <div class="dialog-row">
              <div class="card mb-3">
                <div class="row g-0 d-flex align-items-center">
                  <textarea class="form-control" id="message" rows="3" placeholder="Type your message here..." v-model="localStatusMessage"></textarea>
                </div>
              </div>
            </div>
          </form>
          <footer class="dialog-footer">
            <button @click="closeDialog" class="button">Close</button>
            <button @click="emitStatusMessage" class="button">Confirm</button>
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>

export default {
  name: "MessageDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    statusMessage: {
      type: String,
      default: ''
    }
  },
  emits: ["close", "message"],
  data() {
    return {
      localStatusMessage: this.statusMessage
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    emitStatusMessage() {
      this.$emit("message", this.localStatusMessage);
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.dialog-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: scale(0.80);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Transition Styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.dialog-body {
  padding: 10px 0;
}

.dialog-row {
  display: flex;
  gap: 20px;
}

/* Footer Button */

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #45a049;
}
</style>

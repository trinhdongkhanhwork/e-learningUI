<template>
  <transition name="fade">
    <div v-if="visible" class="dialog-overlay" @click.self="closeDialog">
      <transition name="fade">
        <div v-if="visible" class="dialog-content"  >
          <header class="dialog-header">
            <h2>Staff Details</h2>
            <button @click="closeDialog" class="close-button">&times;</button>
          </header>

          <form class="dialog-body">
            <div class="dialog-row">
              <div class="card mb-3">
                <div class="row g-0 d-flex align-items-center">
                  <div class="col-md-4">
                    <img :src="staff.avatarUrl" class="img-fluid" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <form class="form-control text-start">
                        <div class="mb-3">
                          <label for="fullname" class="form-label">User Name</label>
                          <input type="text" class="form-control" id="fullname" :value="staff.username" disabled>
                        </div>
                        <div class="mb-3">
                          <label for="fullname" class="form-label">Full Name</label>
                          <input type="text" class="form-control" id="fullname" :value="staff.fullname" disabled>
                        </div>
                        <div class="mb-3">
                          <label for="email" class="form-label">Email</label>
                          <input type="email" class="form-control" id="email" :value="staff.email" disabled>
                        </div>
                        <div class="mb-3">
                          <label for="phone" class="form-label">Phone</label>
                          <input type="text" class="form-control" id="phone" :value="staff.phone" disabled>
                        </div>
                        <div class="mb-3">
                          <label for="birthday" class="form-label">Birthday</label>
                          <input type="text" class="form-control" id="dob" :value="formatDate(staff.birthday)" disabled>
                        </div>
                        <div class="mb-3">
                          <label for="permissions" class="form-label">Permissions</label>
                          <span class="form-control" id="permissions">
                            <span v-for="(permission, index) in staff.permissions" :key="index">
                              {{ permission}}<span v-if="index < staff.permissions.length - 1">, </span>
                            </span>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <footer class="dialog-footer">
            <button @click="closeDialog" class="button">Close</button>
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>

export default {
  name: "StaffDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    staff: {
      type: Object,
      required: true,
    },
  },
  emits: ["close"],
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
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
  background-color: rgba(0, 0, 0, 0.7);
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

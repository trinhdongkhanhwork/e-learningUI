<template>
  <transition name="fade">
    <div v-if="visible" class="dialog-overlay" @click.self="closeDialog">
      <transition name="fade">
        <div v-if="visible" class="dialog-content"  >
          <header class="dialog-header">
            <h2>Course Details</h2>
            <button @click="closeDialog" class="close-button">&times;</button>
          </header>

          <form class="dialog-body">
            <div class="dialog-row">
              <!-- Left Column -->
              <div class="dialog-col text-start" style="flex: 0 0 40%;">
                <div class="form-item">
                  <label>ID:</label>
                  <span>{{ temp.value.id }}</span>
                </div>
                <div class="form-item">
                  <label>Title:</label>
                  <span>{{ temp.value.title }}</span>
                </div>
                <div class="form-item">
                  <label style="display:block;">Cover Image:</label>
                  <img :src="temp.value.coverImage" style="width: 400px; height: 200px; object-fit: cover;">
                </div>
                <div class="form-item">
                  <label>Price:</label>
                  <span>{{ temp.value.price }}</span>
                </div>
                <div class="form-item">
                  <label>Instructor:</label>
                  <span>{{ temp.value.instructor ? temp.value.instructor.fullname : '' }}</span>
                </div>
                <div class="form-item">
                  <label>Created Date: </label>
                  <span>{{ formatDate(temp.value.createdAt) }}</span>
                </div>
                <div class="form-item">
                  <label>Status</label>
                  <span :class="temp.value.published ? 'tag published' : 'tag draft'">
                    {{ temp.value.published ? 'Published' : 'Draft' }}
                  </span>
                </div>
              </div>

              <!-- Right Column -->
              <div class="dialog-col" style="flex: 0 0 60%;">
                <div class="form-item text-start">
                  <label>Sections</label>
                  <select v-model="selectedSection" class="select">
                    <option v-for="section in temp.value.sections" :key="section.id" :value="section.id">
                      {{ section.title }}
                    </option>
                  </select>
                </div>

                <div v-if="selectedSection" class="form-item">
                  <div class="lecture-tabs">
                    <ul class="nav nav-tabs">
                      <li v-for="lecture in getLecturesBySection(selectedSection)" :key="lecture.id" class="nav-item">
                        <a class="nav-link" :class="{ active: activeLectureTab === lecture.id }" @click="setActiveLectureTab(lecture.id)">
                          {{ lecture.title }}
                        </a>
                      </li>
                    </ul>
                    <div class="tab-content">
                      <div v-for="lecture in getLecturesBySection(selectedSection)" :key="lecture.id" class="tab-pane" :class="{ active: activeLectureTab === lecture.id }">
                        <div v-if="lecture.type === 'video'">
                          <div v-for="(video, index) in lecture.videos" :key="index">
                            <video :src="video.videoUrl" controls style="width: 85%; aspect-ratio: 16 / 9;" />
                          </div>
                        </div>
                        <div v-if="lecture.type === 'quiz'" style="max-height: 400px; overflow-y: auto;">
                          <div class="quiz-form text-start">
                            <h2>{{lecture.quiz.title}}</h2>
                            <form>
                              <div v-for="(question, index) in lecture.quiz.questions" :key="index" class="question mb-5">
                                <h3>{{ index + 1 }}. {{ question.title }}</h3>
                                <div v-for="(option, idx) in question.options" :key="idx" class="option">
                                  <label>
                                    <input
                                        type="checkbox"
                                        disabled
                                        :name="'question-' + index"
                                        :checked="option.correct"
                                    />
                                    {{ option.text }}
                                  </label>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
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
  name: "CourseDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    temp: {
      type: Object,
      required: true,
    },
  },
  emits: ["close"],
  data() {
    return {
      selectedSection: this.temp.value && this.temp.value.sections.length > 0 ? this.temp.value.sections[0].id : null,
      activeLectureTab: this.temp.value && this.temp.value.sections.length > 0 && this.temp.value.sections[0].lectures.length > 0 ? this.temp.value.sections[0].lectures[0].id : null,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    },
    getLecturesBySection(sectionId) {
      const section = this.temp.value.sections.find((s) => s.id === sectionId);
      return section ? section.lectures : [];
    },
    setActiveLectureTab(lectureId) {
      this.activeLectureTab = lectureId;
    }
  },
  watch: {
    temp: {
      handler(newVal) {
        this.selectedSection = newVal.value && newVal.value.sections.length > 0 ? newVal.value.sections[0].id : null;
        this.activeLectureTab = newVal.value && newVal.value.sections.length > 0 && newVal.value.sections[0].lectures.length > 0 ? newVal.value.sections[0].lectures[0].id : null;
      },
      deep: true,
    },
    selectedSection(newSectionId) {
      const section = this.temp.value.sections.find((s) => s.id === newSectionId);
      this.activeLectureTab = section && section.lectures.length > 0 ? section.lectures[0].id : null;
    }
  }
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
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: scale(0.92);
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

.dialog-col {
  flex: 1;
}

/* Form Item Styling */
.form-item {
  margin-bottom: 15px;
}

.form-item label {
  color: #555;
  margin-bottom: 6px;
  margin-right: 10px;
}

.form-item span {
  color: black;
  font-size: 16px;
}

.form-item img {
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Section and Lecture Tabs */

.select {
  width: 50%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.nav-tabs {
  display: flex;
  margin-top: 12px;
  border: none;
  cursor: pointer;
}

.nav-tabs .nav-item {
  margin-right: 8px;
}

.nav-tabs .nav-link {
  padding: 8px 12px;
  color: #555;
  border-radius: 4px;
  text-decoration: none;
  background-color: #f1f1f1;
  transition: background-color 0.2s, color 0.2s;
}

.nav-tabs .nav-link.active {
  background-color: #28a745;
  color: white;
}

.nav-tabs .nav-link:hover {
  background-color: #e0e0e0;
}

.tab-content {
  margin-top: 16px;
}

/* Tags */
.tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.published {
  background-color: #28a745;
}

.draft {
  background-color: #e9ab2e;
}

/* Option Tags */
.option-tag {
  display: inline-block;
  background-color: #e0e0e0;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin: 2px;
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

.quiz-form {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.quiz-form h2 {
  text-align: center;
  font-size: 2rem;
  color: #4caf50;
  margin-bottom: 20px;
  font-weight: 600;
}

.quiz-form p {
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
}

.question {
  margin-bottom: 30px;
}

.question h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
}

.option {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.option label {
  font-size: 1rem;
  color: #555;
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s;
}

.option input[type='radio'] {
  accent-color: #4caf50; /* Thay đổi màu của radio button */
  transform: scale(1.3);
  cursor: pointer;
}

.option label:hover {
  color: #4caf50;
}
</style>

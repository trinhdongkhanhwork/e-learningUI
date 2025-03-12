<template>
  <page-header></page-header>
  <!-- New Course -->
  <section class="page-content course-sec" style="margin-top: 30px;">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12">
          <div class="add-course-header">
            <h2>Add New Course</h2>
            <div class="add-course-btns">
              <ul class="nav">
                <li>
                  <router-link to="/instructor/instructor-dashboard" class="btn btn-black"
                  >Back to Course</router-link
                  >
                </li>
                <li>
                  <button class="btn btn-success-dark" @click="saveCourse" :disabled="isSaving || currentStep === 4">Save</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <!-- Course Wizard -->
            <div class="widget-set">
              <div class="widget-setcount">
                <ul id="progressbar" v-show="currentStep === 1">
                  <li class="progress-active">
                    <p><span></span> Basic Information</p>
                  </li>
                  <li>
                    <p><span></span> Courses Media</p>
                  </li>
                  <li>
                    <p><span></span> Curriculum</p>
                  </li>
                </ul>
                <ul id="progressbar" v-show="currentStep === 2">
                  <li>
                    <p><span></span> Basic Information</p>
                  </li>
                  <li class="progress-active">
                    <p><span></span> Courses Media</p>
                  </li>
                  <li>
                    <p><span></span> Curriculum</p>
                  </li>
                </ul>
                <ul id="progressbar" v-show="currentStep === 3">
                  <li>
                    <p><span></span> Basic Information</p>
                  </li>
                  <li>
                    <p><span></span> Courses Media</p>
                  </li>
                  <li class="progress-active">
                    <p><span></span> Curriculum</p>
                  </li>
                </ul>
              </div>
              <div class="widget-content multistep-form">
                <div id="first" v-if="currentStep === 1">
                  <div class="add-course-info">
                    <div class="add-course-inner-header">
                      <h4>Basic Information</h4>
                    </div>
                    <div class="add-course-form">
                      <form @submit.prevent="saveCourse">
                        <div class="form-group">
                          <label class="add-course-label">Course Title</label>
                          <input
                              type="text"
                              class="form-control"
                              placeholder="Course Title"
                              v-model="courseInfo.title"
                          />
                        </div>
                        <div class="form-group">
                          <label class="add-course-label">Courses Category</label>
                          <select class="form-control" v-model="courseInfo.categoryId">
                            <option v-for="category in Category" :key="category.id" :value="category.id">
                              {{ category.categoryName }}
                            </option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label class="add-course-label">Courses Level</label>
                          <vue-select ref="levelSelect" :options="Level" placeholder="Level 01" v-model="courseInfo.level" />
                        </div>
                        <div class="form-group">
                          <label class="add-course-label">Courses Price</label>
                          <input
                              type="text"
                              class="form-control"
                              placeholder="10.00"
                              v-model="courseInfo.price"
                          />
                        </div>
                        <div class="form-group mb-0">
                          <label class="add-course-label">Course Description</label>
                          <div id="editor">
                            <textarea v-model="courseInfo.description" class="form-control"></textarea>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="widget-btn">
                      <router-link to="/instructor/instructor-dashboard" class="btn btn-black"
                      >Back to Dashboard</router-link
                      >
                      <a
                          class="btn btn-info-light next_btn"
                          @click="nextStep"
                          :disabled="currentStep === totalSteps"
                      >Continue</a
                      >
                    </div>
                  </div>
                </div>
                <div class="field-card" v-if="currentStep === 2">
                  <div class="add-course-info">
                    <div class="add-course-inner-header">
                      <h4>Courses Media</h4>
                    </div>
                    <div class="add-course-form">
                      <form @submit.prevent="saveCourse">
                        <div class="input-block">
                          <label class="add-course-label">Course cover image</label>
                          <div class="relative-form">
                            <label class="relative-file-upload">
                              Upload File <input type="file" @change="handleFileUpload" />
                            </label>
                          </div>
                        </div>
                        <div class="input-block">
                          <div class="add-image-box" style="width: 100%; height: 400px; overflow: hidden;">
                            <img :src="courseInfo.coverImage" style="width: 100%; height: 100%; aspect-ratio: 16 / 9; object-fit: cover;" />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="widget-btn">
                      <a
                          class="btn btn-black prev_btn"
                          @click="previousStep"
                          :disabled="currentStep === 1"
                      >Previous</a
                      >
                      <a
                          class="btn btn-info-light next_btn"
                          @click="nextStep"
                          :disabled="currentStep === totalSteps"
                      >Continue</a
                      >
                    </div>
                  </div>
                </div>
                <div class="field-card" v-if="currentStep === 3">
                  <div class="add-course-info">
                    <div class="add-course-inner-header">
                      <h4>Curriculum</h4>
                    </div>
                    <div class="add-course-section">
                      <a href="javascript:void(0);" class="btn" @click="promptSectionName">Add Section</a>
                      <SectionPopup :showSectionPopup="showSectionPopup" @add-section="addSection" @close-popup="closePopup" />
                      <LecturePopup :showLecturePopup="showLecturePopup" @add-lecture="addLecture" @close-popup="closePopup" />
                    </div>
                    <div class="add-course-form">
                      <div class="curriculum-grid" v-for="(section, index) in sections" :key="index">
                        <div class="curriculum-head" style="display: flex; justify-content: space-between; align-items: center;">
                          <h5 class="section-title" style="color: #333; font-size: 1.5rem; font-weight: bold;">
                            <i class="fas fa-folder" style="margin-right: 10px;"></i> {{ section.title }}
                          </h5>
                          <div class="btn-group" style="float: right;">
                            <a href="javascript:void(0);" class="btn-icon" @click="renameSection(index)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                              <i class="fas fa-edit"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn-icon" @click="deleteSection(index)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                              <i class="fas fa-trash-alt"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn-icon" @click="promptLectureName(section)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                              <i class="fas fa-plus"></i>
                            </a>
                          </div>
                        </div>
                        <div class="curriculum-info" style="background-color: #f9f9f9; padding: 10px; margin-top: 10px;">
                          <div v-for="(lecture, lectureIndex) in section.lectures" :key="lectureIndex" class="lecture-item" style="margin-bottom: 20px; border: 1px solid #ccc; padding: 10px;">
                            <div class="lecture-head" style="display: flex; justify-content: space-between; align-items: center;">
                              <h6 class="lecture-title" style="color: #333; font-size: 1.2rem; font-weight: bold;">
                                <i class="fas fa-file-alt" style="margin-right: 10px;"></i> {{ lecture.title }}
                              </h6>
                              <div class="btn-group" style="float: right;">
                                <a href="javascript:void(0);" class="btn-icon" @click="renameLecture(section, lecture)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                                  <i class="fas fa-edit"></i>
                                </a>
                                <a href="javascript:void(0);" class="btn-icon" @click="deleteLecture(section, lectureIndex)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                                  <i class="fas fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                            <div class="lecture-body">
                              <div style="display: flex; justify-content: center; align-items: center;">
                                <div style="margin: 5px;">
                                  <!-- quiz -->
                                  <template v-if="!lecture.quiz || !lecture.quiz.title">
                                    <a href="javascript:void(0);" class="btn-icon" v-if="!lecture.showVideoInput && !lecture.showAssignmentInput" @click="addQuiz(lecture)" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center;">
                                      <i class="fas fa-question-circle" style="font-size: 24px; margin-right: 5px;"></i>
                                      <span>Quiz</span>
                                    </a>
                                  </template>

                                  <template v-else>
                                    <div style="display: flex; align-items: center;">
                                      <span style="margin-right: 10px;">Quiz: {{ lecture.quiz.title }}</span>
                                      <a href="javascript:void(0);" class="btn-icon" @click="addQuiz(lecture)" style="border: 1px solid #ccc; padding: 5px;">
                                        <i class="fas fa-edit" style="font-size: 20px;"></i>
                                      </a>
                                    </div>
                                  </template>
                                </div>

                                <!-- Nút Video -->
                                <template v-if="!lecture.quiz || !lecture.quiz.title">
                                  <a href="javascript:void(0);" class="btn-icon" v-if="!lecture.showQuizInput && !lecture.showAssignmentInput" @click="addVideo(lecture)" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center; margin: 5px;">
                                    <i class="fas fa-video" style="font-size: 24px; margin-right: 5px;"></i>
                                    <span>Video</span>
                                  </a>
                                </template>

                                <!-- Nút Assignment -->
                                <template v-if="!lecture.quiz || !lecture.quiz.title">
                                  <a href="javascript:void(0);" class="btn-icon" v-if="!lecture.showQuizInput && !lecture.showVideoInput" @click="addAssignment(lecture)" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center; margin: 5px;">
                                    <i class="fas fa-tasks" style="font-size: 24px; margin-right: 5px;"></i>
                                    <span>Assignment</span>
                                  </a>
                                </template>
                              </div>

                              <!-- Quiz Input -->
                              <div v-if="lecture.showQuizInput" class="quiz-input" style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                                <div class="row mb-3" style="display: flex; align-items: center; margin-bottom: 15px;">
                                  <label style="flex: 0 0 20%; font-weight: bold;">Title Quiz</label>
                                  <div style="flex: 1;">
                                    <input type="text" v-model="lecture.quizTitle" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;" placeholder="Enter title quiz" />
                                  </div>
                                </div>
                                <div class="row mb-3" style="display: flex; justify-content: flex-start; margin-bottom: 15px;">
                                  <button @click="saveQuiz(lecture)" style="padding: 6px 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px; font-size: 14px; width: 100px;">
                                    Save Quiz
                                  </button>
                                  <button @click="addQuestionToQuiz(lecture.quiz)" style="padding: 6px 12px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; width: 150px;">
                                    Add Question
                                  </button>
                                  <button @click="triggerExcelUpload(lecture)" style="padding: 6px 12px; background-color: cadetblue; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; width: 200px;margin-left: 10px;">
                                    Add Question excel
                                  </button>
                                  <button @click="lecture.showQuizInput = false" style="padding: 6px 12px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; width: 100px; margin-left: 10px;">
                                    Cancel
                                  </button>
                                </div>

                                <!-- Hiển thị các câu hỏi -->
                                <div v-for="(question, index) in lecture.quiz.questions" :key="question.title" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; background-color: white;">
                                  <h5 style="font-weight: bold; color: #333;">{{ question.title }}</h5>

                                  <button @click="editQuestionTitle(question)" style="padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; margin-right: 10px; cursor: pointer; font-size: 12px;">
                                    Edit Question
                                  </button>

                                  <button @click="deleteQuestion(lecture, index)" style="padding: 5px 10px; background-color: #dc3545; color: white; border: none; border-radius: 4px; margin-right: 10px; cursor: pointer; font-size: 12px;">
                                    Delete Question
                                  </button>

                                  <button @click="editOptionToQuestion(question)" style="padding: 5px 10px; background-color: #6c757d; color: white; border: none; border-radius: 4px; margin-bottom: 10px; cursor: pointer; font-size: 12px;">
                                    Edit Option
                                  </button>

                                  <div v-for="option in question.options" :key="option.text" style="display: flex; align-items: center; margin-bottom: 5px;">
                                    <input type="checkbox" disabled v-model="option.correct" style="margin-right: 10px;" />
                                    <span>{{ option.text }}</span>
                                  </div>
                                </div>
                              </div>


                              <div v-if="lecture.showVideoInput" class="input-group" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-video" style="margin-right: 10px;"></i>
                                <input type="file" class="form-control form-control-sm" @change="handleFileVideo(index, lectureIndex, $event)" style="flex: 1;" />
                              </div>
                              <div v-if="lecture.showAssignmentInput" class="input-group" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-tasks" style="margin-right: 10px;"></i>
                                <input type="text" class="form-control form-control-sm" placeholder="Enter assignment details" style="flex: 1;" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="widget-btn">
                      <a
                          class="btn btn-black prev_btn"
                          @click="previousStep"
                          :disabled="currentStep === 2"
                      >Previous</a
                      >
                    </div>
                  </div>
                </div>
                <div class="field-card" v-if="currentStep === 4">
                  <div class="add-course-info">
                    <div class="add-course-msg">
                      <i class="fas fa-circle-check"></i>
                      <h4>The Course Added Succesfully</h4>
                      <p>Admin will be Approve soon.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Course Wizard -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /New Course -->

  <layouts1></layouts1>
</template>
<script>
import LecturePopup from "@/components/LecturePopup.vue";
import SectionPopup from "@/components/SectionPopup.vue";
import baseApi from "@/axios";
import { useStore } from "vuex";
import Swal from 'sweetalert2';
import {router} from "@/router";
import toast from "@/utils/Toast";
import { confirmSave,confirmDelete } from "@/utils/confirmDialogs";
import * as XLSX from 'xlsx';

export default {
  components: {
    LecturePopup,
    SectionPopup
  },
  data() {
    const store = useStore();
    const userInfo = store.state.userInfo;

    return {
      userInfo,
      Category: [],
      Level: ["Level 01", "Level 02", "Level 03", "Level 04"],
      currentStep: 1,
      totalSteps: 5,
      sections: [],
      showSectionPopup: false,
      showLecturePopup: false,
      currentSection: null,
      currentLecture: null,
      courseInfo: {
        title: "",
        categoryId: null,
        level: "",
        description: "",
        coverImage: null,
        price: "",
        published: false,
        instructor: userInfo.id,
        sections: [],
        createdAt: new Date(),
      },
      isSaving: false, // Add this line
    };
  },
  methods: {
    nextStep() {
      if (this.validateStep(this.currentStep)) {
        if (this.currentStep < this.totalSteps) {
          this.currentStep++;
          console.log(this.currentStep);
        }
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    promptSectionName() {
      this.showSectionPopup = true;
    },
    promptLectureName(section) {
      this.currentSection = section;
      this.showLecturePopup = true;
    },
    addSection(sectionName) {
      if (sectionName) {
        const existingSection = this.sections.find(section => section.title === sectionName);
        if (existingSection) {
          toast.error("Section name already exists. Please choose a different name.");
          return;
        }
        if (this.currentSection) {
          this.currentSection.title = sectionName;
          toast.success("Created section "+sectionName+" successfully.");
        } else {
          this.sections.push({
            title: sectionName,
            lectures: [],
          });
          toast.success("Created section "+sectionName+" successfully.");
        }
      }
      this.showSectionPopup = false;
      this.currentSection = null;
    },
    addLecture(lectureName) {
      if (lectureName && this.currentSection) {
        const existingLecture = this.currentSection.lectures.find(lecture => lecture.title === lectureName);
        if (existingLecture) {
          toast.error("Lecture name already exists in this section. Please choose a different name.");
          return;
        }
        if (this.currentLecture) {
          this.currentLecture.title = lectureName;
        } else {
          this.currentSection.lectures.push({
            title: lectureName,
            type: '',
            showVideoInput: false,
            showQuizInput: false,
            videos: [],
            quiz: null
          });
          toast.success("Created lecture "+lectureName+" successfully.");
        }
      }
      this.showLecturePopup = false;
      this.currentSection = null;
      this.currentLecture = null;
    },
    closePopup() {
      this.showSectionPopup = false;
      this.showLecturePopup = false;
    },
    addQuiz(lecture) {
      if (!lecture.quiz) {
        lecture.quiz = {
          title: '',
          questions: []
        };
        lecture.quizTitle = ''; // Initialize quizTitle
        lecture.showQuizInput = true;
        lecture.type = 'quiz';
        lecture.videos = []; // Clear videos if quiz is added
      } else {
        Swal.fire({
          title: `Title Quiz: ${lecture.quiz.title}`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Edit',
          cancelButtonText: 'Delete',
          showCloseButton: true,
          focusConfirm: false,
        }).then((result) => {
          if (result.isConfirmed) {
            lecture.showQuizInput = true;
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.deleteQuiz(lecture);
          }
        });
      }
    },
    saveQuiz(lecture) {
      // Kiểm tra nếu tiêu đề quiz rỗng thì không cho phép lưu
      if (!lecture.quizTitle.trim()) {
        Swal.fire({
          title: 'Quiz title cannot be empty!',
          icon: 'warning',
        });
        return;
      }

      // Lưu lại tiêu đề quiz sau khi người dùng nhập
      lecture.quiz.title = lecture.quizTitle;

      // Xóa đoạn mã kiểm tra lessonId
      lecture.showQuizInput = false;
      toast.success("Save quiz " + lecture.quiz.title + " successfully.");
    },
    deleteQuiz(lecture) {
      // Xóa quiz trong đối tượng lecture
      confirmDelete().then( (result) => {
        if (result.isConfirmed) {
          lecture.quiz = null;
          lecture.showQuizInput = false;
          Swal.fire('Deleted quiz', '', 'success');
        }
      });
    },
    addQuestionToQuiz(quiz) {
      // Kiểm tra nếu số lượng câu hỏi đã đạt tối đa (20 câu hỏi)
      if (quiz.questions.length >= 20) {
        Swal.fire({
          title: 'Maximum number of questions reached (20).',
          icon: 'warning',
        });
        return;
      }
      Swal.fire({
        title: "Enter question title:",
        input: "text",
        inputPlaceholder: "Question title",
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter a question title!";
          }
          const existingQuestion = quiz.questions.find(q => q.title === value);
          if (existingQuestion) {
            return "This question already exists.";
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Select question type:",
            input: "radio",
            inputOptions: {
              one: '4 option (one correct answer)',
              multiple: 'Many options (multiple correct answers)'
            },
            inputValidator: (value) => {
              if (!value) {
                return "You need to choose the question type!";
              }
            }
          }).then((typeResult) => {
            if (typeResult.isConfirmed) {
              let question = {
                title: result.value,
                type: typeResult.value,
                options: []
              };

              // Function to generate HTML for options with checkboxes for 'correct'
              const generateOptionsHTML = (numOptions, allowMultipleCorrect) => {
                return `
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${Array.from({ length: numOptions }, (_, i) => `
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <label for="option${i + 1}" style="flex: 1; font-weight: bold; font-size: 15px"> ${i + 1}:</label>
                        <input type="text" id="option${i + 1}" class="swal2-input" style="flex: 3;" placeholder="Option ${i + 1}">
                        <label style="flex: 1; font-weight: bold">
                          <input type="checkbox" id="correct${i + 1}" ${allowMultipleCorrect ? '' : 'class="single-correct"'}>
                        </label>
                      </div>
                    `).join('')}
                  </div>
                `;
              };

              const saveQuestion = (numOptions, allowMultipleCorrect) => {
                Swal.fire({
                  title: 'Edit options',
                  html: generateOptionsHTML(numOptions, allowMultipleCorrect),
                  focusConfirm: false,
                  confirmButtonText: 'Save question',
                  showCancelButton: true,
                  cancelButtonText: 'Cancel',
                  didOpen: () => {
                    if (!allowMultipleCorrect) {
                      // Add event listener to enforce single correct answer if type is 'one'
                      const checkboxes = document.querySelectorAll('.single-correct');
                      checkboxes.forEach((checkbox, i) => {
                        checkbox.addEventListener('change', function() {
                          if (this.checked) {
                            checkboxes.forEach((box, j) => {
                              if (i !== j) box.checked = false; // Deselect other checkboxes
                            });
                          }
                        });
                      });
                    }
                  },
                  preConfirm: () => {
                    let isValid = true;
                    let options = [];
                    for (let i = 1; i <= numOptions; i++) {
                      let optionText = document.getElementById(`option${i}`).value.trim();
                      let correct = document.getElementById(`correct${i}`).checked;

                      // Validate if the option is empty
                      if (!optionText) {
                        isValid = false;
                        Swal.showValidationMessage(`Option ${i} cannot be empty!`);
                        break;
                      }
                      options.push({
                        text: optionText,
                        correct: correct // Capture the checkbox state
                      });
                    }
                    if (isValid) {
                      // Save valid options to the question
                      question.options = options;
                      quiz.questions.push(question);
                    }
                    return isValid;
                  }
                });
              };

              if (typeResult.value === 'one') {
                saveQuestion(4, false); // Default to 4 options, with only one correct allowed
              } else {
                // Input the number of options for "many correct answers" type
                Swal.fire({
                  title: "Enter the number of options:",
                  input: "number",
                  inputPlaceholder: "Number of options",
                  inputValidator: (value) => {
                    if (!value || value <= 0) {
                      return "You need to enter a valid number of options!";
                    }
                    else if(value > 10) {
                      return "Option must be less than 10";
                    }
                  }
                }).then((numberResult) => {
                  if (numberResult.isConfirmed) {
                    saveQuestion(parseInt(numberResult.value), true); // Allow multiple correct options
                  }
                });
              }
            }
          });
        }
      });
    },
  triggerExcelUpload(lecture) {
      // Tạo thẻ input để chọn file
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.xlsx,.xls';
      fileInput.style.display = 'none';

      // Đưa thẻ input vào body và kích hoạt
      document.body.appendChild(fileInput);
      fileInput.click();

      // Khi file được chọn, truyền vào hàm upload
      fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          this.uploadQuestionsFromExcel(file, lecture);  // Gọi hàm xử lý file và truyền lecture vào
        }

        // Xóa phần tử input sau khi hoàn tất
        document.body.removeChild(fileInput);
      };
    },
  async uploadQuestionsFromExcel(file, lecture) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: 'array' });

          if (workbook.SheetNames.length === 0) {
            throw new Error('No sheets found in the Excel file');
          }

          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          // Kiểm tra nếu file Excel có quá 20 câu hỏi
          if (jsonData.length > 20) {
            Swal.fire({
              title: 'Excel file contains more than 20 questions.',
              text: 'Please upload a file with 20 or fewer questions.',
              icon: 'warning',
            });
            return; // Dừng lại nếu có quá 20 câu hỏi
          }

          // Khởi tạo quiz
          const quiz = {
            title: "Quiz from Excel",
            questions: []
          };

          jsonData.forEach((row) => {
            if (row.Question && row.Options && row.Type) {
              const question = {
                title: row.Question,
                type: row.Type,
                options: []
              };

              const options = row.Options.split(',').map(option => option.trim());

              if (typeof row.CorrectAnswer === 'string') {
                const correctAnswers = row.CorrectAnswer.split(',').map(answer => answer.trim());

                options.forEach((option, index) => {
                  question.options.push({
                    text: option,
                    correct: correctAnswers.includes((index + 1).toString())
                  });
                });
              } else {
                console.warn(`CorrectAnswer không phải là chuỗi: ${row.CorrectAnswer}`);
              }

              quiz.questions.push(question);
            }
          });

          // Kiểm tra lại số lượng câu hỏi sau khi đọc từ Excel và chỉ cho phép thêm tối đa 20 câu
          const maxQuestions = 20 - (lecture.quiz ? lecture.quiz.questions.length : 0);
          if (quiz.questions.length > maxQuestions) {
            quiz.questions = quiz.questions.slice(0, maxQuestions); // Cắt bớt nếu có quá 20 câu hỏi
          }

          // Cập nhật quiz vào lecture.quiz (thêm câu hỏi vào quiz)
          if (!lecture.quiz) {
            lecture.quiz = quiz; // Nếu chưa có quiz, khởi tạo quiz mới
          } else {
            // Nếu đã có quiz, thêm các câu hỏi mới vào quiz hiện tại
            lecture.quiz.questions.push(...quiz.questions);
          }

          console.log('Quiz với câu hỏi từ Excel:', lecture.quiz);
          Swal.fire('Upload thành công!', '', 'success');
        } catch (error) {
          Swal.fire('Lỗi!', error.message || 'Không thể xử lý tệp Excel.', 'error');
        }
      };

    reader.readAsArrayBuffer(file); 
  },

displayQuestions() {
  return this.quiz.questions.map(question => {
    return {
      title: question.title,
      options: question.options.map(option => ({
        text: option.text,
        correct: option.correct ? 'Correct' : 'Incorrect'
      }))
    };
  });
},
    editQuestionTitle(question) {
      // Kiểm tra xem question có undefined không
      if (!question) {
        console.error("Unknown question!");
        return;
      }
      Swal.fire({
        title: "Edit question title:",
        input: "text",
        inputPlaceholder: "New title",
        inputValue: question.title, // Hiển thị tiêu đề hiện tại
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter a title!";
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Cập nhật tiêu đề của câu hỏi
          question.title = result.value;
          Swal.fire("Saved!", "Question title has been updated.", "success");
        }
      });
    },
    deleteQuestion(lecture, index) {
      // Hiển thị thông báo xác nhận việc xóa
      confirmDelete().then((result) => {
        if (result.isConfirmed) {
          lecture.quiz.questions.splice(index, 1);
          Swal.fire('Deleted!', 'The question has been deleted.', 'success');
        }
      });
    },
    editOptionToQuestion(question) {
      let htmlOptions = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${question.options.map((option, index) => `
            <div style="display: flex; align-items: center; gap: 10px;">
              <label for="option${index + 1}" style="flex: 1; font-weight: bold;font-size: 15px"> ${index + 1}:</label>
              <input type="text" id="option${index + 1}" class="swal2-input" style="flex: 3;" value="${option.text}">
              <label style="flex: 1; font-weight: bold">
                <input type="checkbox" id="correct${index + 1}" ${option.correct ? 'checked' : ''} ${question.type === 'one' ? 'class="single-correct"' : ''}>
              </label>
            </div>
          `).join('')}
        </div>
      `;

      Swal.fire({
        title: 'Edit options',
        html: htmlOptions,
        focusConfirm: false,
        confirmButtonText: 'Save changes',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        didOpen: () => {
          if (question.type === 'one') {
            // Nếu câu hỏi chỉ có một đáp án đúng, thì thêm chức năng chỉ cho phép chọn một checkbox
            const checkboxes = document.querySelectorAll('.single-correct');
            checkboxes.forEach((checkbox, i) => {
              checkbox.addEventListener('change', function() {
                if (this.checked) {
                  checkboxes.forEach((box, j) => {
                    if (i !== j) box.checked = false; // Bỏ chọn các checkbox khác
                  });
                }
              });
            });
          }
        },
        preConfirm: () => {
          let isValid = true;

          question.options.forEach((option, index) => {
            let optionText = document.getElementById(`option${index + 1}`).value.trim();
            if (!optionText) {
              isValid = false;
              Swal.showValidationMessage(`Option ${index + 1} cannot be empty!`);
            } else {
              option.text = optionText;
              option.correct = document.getElementById(`correct${index + 1}`).checked;
            }
          });

          return isValid; // Chỉ trả về true nếu không có ô trống
        }
      });
    },
    addVideo(lecture) {
      lecture.showVideoInput = true;
      lecture.type = 'video';
    },
    addAssignment(lecture) {
      lecture.showAssignmentInput = true;
      lecture.type = 'assignment';
    },
    renameSection(index) {
      this.currentSection = this.sections[index];
      this.showSectionPopup = true;
    },
    deleteSection(index) {
      if (confirm("Are you sure you want to delete this section?")) {
        this.sections.splice(index, 1);
      }
    },
    renameLecture(section, lecture) {
      this.currentSection = section;
      this.currentLecture = lecture;
      this.showLecturePopup = true;
    },
    deleteLecture(section, lectureIndex) {
      if (confirm("Are you sure you want to delete this lecture?")) {
        section.lectures.splice(lectureIndex, 1);
      }
    },
    saveCourse() {
      // Trích xuất tất cả các tệp video từ các phần và bài giảng
      const files = this.sections.flatMap(section => section.lectures.flatMap(lecture => lecture.videos ? lecture.videos : [])).filter(video => video);
      console.log("Files extracted:", files);

      if (files.length > 0) {
        if (!this.courseInfo.sections) {
          this.courseInfo.sections = [];
        }
        this.sections.forEach(section => {
          section.lectures.forEach(lecture => {
            if (lecture.videos) {
              if (!this.courseInfo.sections.lectures) {
                this.courseInfo.sections.lectures = [];
              }
              lecture.videos = Array.from(lecture.videos.values()).map(video => ({
                fileName: video.name
              }));
              this.courseInfo.sections.lectures.push(...lecture.videos);
            }
          });
        });
      } else {
        console.error("Required part 'files' is not present.");
      }

      // Chuẩn bị thông tin khóa học, loại bỏ các thuộc tính không cần thiết
      this.courseInfo.sections = this.sections.map(section => ({
        ...section,
        // eslint-disable-next-line no-unused-vars
        lectures: section.lectures.map(({ showAssignmentInput, showQuizInput, showVideoInput, quiz, ...rest }) => ({
          ...rest,
          quiz: quiz ? {
            ...quiz,
            questions: quiz.questions.map(question => ({
              ...question,
              // Đảm bảo rằng trường isCorrect được bao gồm
              correct: question.correct || false // Thiết lập mặc định nếu không có
            }))
          } : null // Bao gồm quiz nếu nó tồn tại
        }))
      }));

      console.log("Course info prepared:", this.courseInfo);

      // Gửi thông tin khóa học đến máy chủ
      confirmSave().then((result) => {
        if (result.isConfirmed && this.validateStep(this.currentStep)) {
          if (result.isConfirmed) {
            baseApi.post("/api/v1/courses", this.courseInfo, {
              headers: {
                "Content-Type": "application/json"
              }
            })
                .then(response => {
                  console.log("Metadata saved:", response.data, response.status);
                  toast.success("Course saved successfully.");

                  // Chuyển đến bước cuối cùng
                  this.currentStep = 4;
                  this.isSaving = false; // Re-enable the save button
                  console.log("Current step set to 4");

                  // Set a timeout to revert back to step 1 after 10 seconds
                  setTimeout(() => {
                    router.push("/instructor/instructor-dashboard");
                  }, 5000);

                  // Chuẩn bị dữ liệu biểu mẫu để tải lên tệp
                  const formData = new FormData();
                  files.forEach(file => {
                    formData.append("files", file);
                  });

                  console.log("Form data prepared:", formData.get("files"));
                  // Tải tệp lên máy chủ
                  baseApi.post("/api/s3/upload/video", formData, {
                    "Content-Type": "multipart/form-data"
                  })
                      .then(uploadResponse => {
                        console.log("Files uploaded:", uploadResponse.data, uploadResponse.status);
                      })
                      .catch(uploadError => {
                        console.error("Error occurred while uploading files:", uploadError);
                      });

                })
                .catch(error => {
                  console.error("Error occurred while saving course metadata:", error);
                  toast.error("Failed to save course!");
                });
          }

        }
      });
    },
    handleFileUpload(event) {
      const coverImage = event.target.files[0];
      // Tải ảnh lên S3
      const formData = new FormData();
      formData.append("img", coverImage);
      baseApi.post("/api/s3/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
          .then(response => {
            console.log("Image uploaded:", response.data.result.urlImg);
            this.courseInfo.coverImage = response.data.result.urlImg;
            toast.success("Uploaded cover image successfully.");
          })
          .catch(error => {
            console.error("Error occurred while uploading file:", error);
            toast.error("Error occurred while uploading cover image.");
          });
    },
    handleFileVideo(index, lectureIndex, event) {
      const files = [];
      // Kiểm tra sự kiện và số lượng tệp được chọn
      if (event && event.target.files.length > 0) {
        // Lặp qua các tệp được chọn
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          if (file) {
            files.push(file); // Thêm tệp vào mảng files
            toast.success("Added video "+file.name+" successfully.");
          }
        }
      }
      // Gán các tệp video đã chọn cho bài giảng tương ứng
      this.sections[index].lectures[lectureIndex].videos = files;
      console.log(files); // In ra mảng files để kiểm tra
    },
    validateStep(step) {
      switch (step) {
        case 1:
          if (!this.courseInfo.title) {
            toast.error("Course title is required.");
            return false;
          }
          if (!this.courseInfo.categoryId) {
            toast.error("Course category is required.");
            return false;
          }
          if (!this.courseInfo.level) {
            toast.error("Course level is required.");
            return false;
          }
          if (!this.courseInfo.price) {
            toast.error("Course price is required.");
            return false;
          }else if(isNaN(this.courseInfo.price)){
            toast.error("Course price must be a number.");
            return false;
          }
          if (!this.courseInfo.description) {
            toast.error("Course description is required.");
            return false;
          }
          break;
        case 2:
          if (!this.courseInfo.coverImage) {
            toast.error("Course cover image is required.");
            return false;
          }
          break;
        case 3:
          if (this.sections.length === 0) {
            toast.error("At least one section is required.");
            return false;
          }
          for (const section of this.sections) {
            if (section.lectures.length === 0) {
              toast.error(`Section "${section.title}" must have at least one lecture.`);
              return false;
            }
          }
          break;
        default:
          break;
      }
      return true;
    },
    initData() {
      baseApi.get("/api/category/getCategorys")
          .then(response => {
            this.Category = response.data.map(
                category => ({
                  id: category.id,
                  categoryName: category.categoryName
                })
            );
            if (this.Category.length > 0) {
              this.courseInfo.categoryId = this.Category[0].id;
            }
            console.log("Categories fetched:", this.Category);
          })
          .catch(error => {
            console.error("Error occurred while fetching categories:", error);
          });
    },
  },
  mounted() {
    this.initData();
  }
};
</script>

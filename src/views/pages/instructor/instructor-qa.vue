<template>
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Instructor Edit Course -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-details">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3 class="text-secondary">Edit Courses</h3>
              </div>
              <div class="checkout-form">
                
                  <!-- Step 1: Course Details -->
                  <div v-if="currentStep === 1">
                    <div class="form-group">
                      <label for="course-select">Select Course</label>
                      <select
                        id="course-select"
                        class="form-control"
                        v-model="selectedCourseId"
                        @change="onCourseSelect"
                      >
                        <option value="">--Select a Course--</option>
                        <option
                          v-for="course in allCourses"
                          :key="course.id"
                          :value="course.id"
                        >
                          {{ course.title }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="course-name">Course Name</label>
                      <input
                        type="text"
                        id="course-name"
                        v-model="courses.title"
                        class="form-control"
                        placeholder="Enter course name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="course-level">Level</label>
                      <input
                        type="text"
                        id="course-level"
                        v-model="courses.level"
                        class="form-control"
                        placeholder="Enter course level"
                      />
                    </div>
                    <div class="form-group">
                      <label for="course-description">Course Description</label>
                      <textarea
                        id="course-description"
                        v-model="courses.description"
                        class="form-control"
                        placeholder="Enter course description"
                      ></textarea>
                    </div>
                  </div>

                  <!-- Step 2: Image Upload -->
                  <div v-if="currentStep === 2">
                    <div class="form-group">
                      <label for="course-image">Upload Course Image</label>
                      <input
                        type="file"
                        id="course-image"
                        class="form-control"
                        @change="handleFileUpload"
                        accept="image/*"
                      />
                    </div>

                    <!-- Image Preview -->
                    <div v-if="courses.coverImage" class="form-group">
                      <img
                        :src="courses.coverImage"
                        alt="Image Preview"
                        class="img-fluid"
                        style="max-width: 700px; height: 400px; margin-top: 20px;"
                      />
                    </div>
                  </div>


                   <!-- Step 3: Section Information -->
                   <div v-if="currentStep === 3">
                    <div class="form-group">
                      <label>Course Sections</label>
                      <ul class="nav nav-tabs" id="sectionTabs" role="tablist">
                        <li
                          class="nav-item"
                          v-for="(section, sectionIndex) in (courses.sections || [])"
                          :key="section?.id || sectionIndex"
                        >
                          <button
                            class="nav-link position-relative"
                            :class="{ active: sectionIndex === activeSectionIndex }"
                            @click="setActiveSection(sectionIndex)"
                          >
                            {{ section?.title || 'Untitled Section' }}
                            <span
                              class="btn-close"
                              @click.stop="deleteSection(sectionIndex)"
                            ></span>
                          </button>
                          <button class="btn btn-sm" @click="editSection(sectionIndex)">
                            <i class="fas fa-edit"></i>
                          </button>
                        </li>
                        <!-- Nút thêm Section -->
                        <li>
                          <button @click="showAddSectionFormWithSweetAlert" class="add-section-btn">
                            +
                          </button>
                        </li>
                      </ul>
                      
                      <!-- Section Content -->
                      <div class="tab-content mt-3">
                        <div v-for="(section, sectionIndex) in courses.sections" :key="section.id">
                          <div v-if="sectionIndex === activeSectionIndex" class="tab-pane active">
                            <!-- Nested Tab for Lectures -->
                            <ul
                              class="nav nav-pills"
                              id="lectureTabs"
                              role="tablist"
                            >
                              <!-- Kiểm tra nếu lectures không null và có phần tử -->
                              <li
                                class="nav-item"
                                v-for="(lecture, lectureIndex) in (section.lectures || [])"
                                :key="lecture.id || lectureIndex"
                              >
                                <button
                                  class="nav-link position-relative"
                                  :class="{ active: lectureIndex === activeLectureIndices[sectionIndex] }"
                                  @click="setActiveLecture(sectionIndex, lectureIndex)"
                                >
                                  {{ lecture.title || "Untitled Lecture" }}
                                  <span
                                    class="btn-close"
                                    @click.stop="deleteLecture(sectionIndex, lectureIndex)"
                                  ></span>
                                </button>
                                <button
                                  class="btn btn-sm"
                                  @click="editLecture(sectionIndex, lectureIndex)"
                                >
                                  <i class="fas fa-edit"></i>
                                </button>
                              </li>
                              <!-- Nút thêm Lecture -->
                              <li>
                                <button
                                  @click="addLectureToSection(sectionIndex)"
                                  class="add-lecture-btn"
                                >
                                  +
                                </button>
                              </li>
                            </ul>

                            <!-- Nếu lectures null hoặc rỗng -->
                            <div v-if="!section.lectures || section.lectures.length === 0">
                              <p class="text-muted">No lectures available in this section.</p>
                            </div>


                            <!-- Lecture Details -->
                            <div v-if="activeLectureIndices[sectionIndex] !== undefined">
                              <div v-if="section.lectures[activeLectureIndices[sectionIndex]]">
                                <template v-if="section.lectures[activeLectureIndices[sectionIndex]]">
                                  <template v-if="section.lectures[activeLectureIndices[sectionIndex]].type === 'quiz' && section.lectures[activeLectureIndices[sectionIndex]].quiz && section.lectures[activeLectureIndices[sectionIndex]].quiz.questions">
                                    <ul>
                                      <li
                                        v-for="(question, questionIndex) in section.lectures[activeLectureIndices[sectionIndex]].quiz.questions"
                                        :key="question.id"
                                      >
                                        <p style="font-weight: bold; margin-top: 10px;">
                                          {{ question.title }}:
                                        </p>
                                        <ul style="margin-top: -15px;">
                                          <li
                                            v-for="(option, optionIndex) in question.options"
                                            :key="option.id"
                                          >
                                          <input 
                                            type="checkbox" 
                                            :checked="option.correct" 
                                            @change="toggleCorrectOption(questionIndex, optionIndex)"
                                            style="margin-left: 10px;margin: 5px;" disabled
                                          />
                                            <span
                                              :class="{ 'text-success': option.correct }"
                                            >
                                              {{ option.text }}
                                            </span>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </template>
                                  <template v-else-if="
                                    section.lectures[activeLectureIndices[sectionIndex]] &&
                                    section.lectures[activeLectureIndices[sectionIndex]].type === 'video' &&
                                    section.lectures[activeLectureIndices[sectionIndex]].videos &&
                                    section.lectures[activeLectureIndices[sectionIndex]].videos.length > 0
                                  ">
                                    <video controls :key="section.lectures[activeLectureIndices[sectionIndex]].videos[0]?.videoUrl">
                                      <source
                                        :src="section.lectures[activeLectureIndices[sectionIndex]].videos[0]?.videoUrl"
                                        type="video/mp4"
                                      />
                                      Your browser does not support the video tag.
                                    </video>
                                    <p>{{ section.lectures[activeLectureIndices[sectionIndex]].videos[0]?.fileName }}</p>
                                  </template>
                                  <template v-else>
                                    <p class="text-muted">The lecture has no content.</p>
                                  </template>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Navigation Buttons -->
              <div class="form-group d-flex justify-content-between">
                <button
                  v-if="currentStep > 1"
                  type="button"
                  class="btn btn-secondary"
                  @click="previousStep"
                  style="margin-top: 10px;"
                >
                  Previous
                </button>
                
                <!-- Di chuyển phần này ra ngoài form để đảm bảo nó căn phải -->
                <form @submit.prevent="submitForm" class="d-flex justify-content-end">
                  <button
                    v-if="currentStep < totalSteps"
                    type="button"
                    class="btn btn-secondary"
                    @click="nextStep"
                    style="margin-top: 10px;"
                  >
                    Next
                  </button>

                  <button
                    v-if="currentStep === totalSteps"
                    type="submit"
                    class="btn btn-primary"
                    style="margin-top: 10px;"
                  >
                    Update Course
                  </button>
                </form>
              </div>

              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import baseApi from "@/axios";
import toast from "@/utils/Toast";
import { useStore } from "vuex";
import { ref } from "vue";
import { toRaw } from "vue";

export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    return {
      user,
      courses: {
        sections: [], 
      },
      allCourses: [],
      selectedCourseId: "",
      currentStep: 1,
      totalSteps: 3,
      activeSectionIndex: 0,
      activeLectureIndices: [], 
    };
  },
  created(){
    const idcourse = this.$route.query.id;
    this.getCourse(idcourse);
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    handleFileUpload(event) {
      const coverImage = event.target.files[0];
      if (!coverImage) {
        toast.error("No file selected.");
        return;
      }
      // Tải ảnh lên S3
      const formData = new FormData();
      formData.append("img", coverImage);

      baseApi
        .post("/api/s3/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Image uploaded:", response.data.result.urlImg);
          this.courses.coverImage = response.data.result.urlImg; // Cập nhật trực tiếp vào courses.coverImage
          toast.success("Uploaded cover image successfully.");
        })
        .catch((error) => {
          console.error("Error occurred while uploading file:", error);
          toast.error("Error occurred while uploading cover image.");
        });
    },
    submitForm() {
      const rawData = toRaw(this.courses);

      const updatedData = {
        id: rawData.id,
        title: rawData.title,
        description: rawData.description,
        createdAt: rawData.createdAt || new Date().toISOString(),
        categoryId: rawData.categoryId,
        coverImage: rawData.coverImage,
        level: rawData.level,
        price: rawData.price,
        published: rawData.published,
        sections: rawData.sections || [],
      };

      // Gửi dữ liệu đã chỉnh sửa lên server chỉ khi nhấn "Update"
      baseApi.put(`/api/v1/courses/${updatedData.id}`, updatedData)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Cập nhật khóa học thành công!',
            timer: 1500,
            showConfirmButton: false
          });
          this.$router.push(`/course/course-details?id=${response.data.id}`);
          console.log("sau khi update:", updatedData);
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Không thể cập nhật khóa học. Vui lòng thử lại.',
          });
        });
    },
    async fetchCourses() {
      try {
        const response = await baseApi.get("/api/v1/courses");
        if (Array.isArray(response.data.content)) {
          this.allCourses = response.data.content.filter(
            (course) => course.instructor.id === this.user.id
          );
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    },
    async fetchCourseById() {
      if (!this.selectedCourseId) return;
      try {
        const response = await baseApi.get(`/api/v1/courses/getCourseById/${this.selectedCourseId}`);
        if (response.data) {
          this.courses = response.data;
          console.log('Course Data:', this.courses); // Kiểm tra dữ liệu của course
          this.activeLectureIndices = this.courses.sections.map(() => 0); // Thiết lập chỉ mục bài giảng mặc định
        }
      } catch (error) {
        console.error("Error fetching course by ID:", error);
      }
    },
    onCourseSelect() {
      this.fetchCourseById();
    },
    setActiveSection(index) {
      this.activeSectionIndex = index;
      if (this.courses.sections[index]?.lectures?.length > 0) {
        this.activeLectureIndices.splice(index, 1, 0); // Đặt bài giảng đầu tiên làm mặc định
      }
    },
    setActiveLecture(sectionIndex, lectureIndex) {
      this.activeLectureIndices.splice(sectionIndex, 1, lectureIndex); // Đặt lecture tương ứng cho section
    },
    async showAddSectionFormWithSweetAlert() {
      const { value: sectionTitle } = await Swal.fire({
        title: "Add New Section",
        input: "text",
        inputLabel: "Section Title",
        inputPlaceholder: "Enter section title",
        showCancelButton: true,
        confirmButtonText: "Add Section",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "Section title cannot be empty!";
          }
        },
      });
      if (sectionTitle) {
        const newSection = {
          id: Date.now(),
          title: sectionTitle,
          lectures: [],
        };

        // Lưu trữ section vào mảng tạm thời (chưa cập nhật lên server)
        this.courses.sections.push(newSection);

        // Hiển thị thông báo thành công
        Swal.fire({
          icon: "success",
          title: "Section Added",
          text: `Section "${sectionTitle}" has been added.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },
    async addLectureToSection(sectionIndex) {
      // Hiển thị SweetAlert để chọn loại lecture
      const { value: lectureType } = await Swal.fire({
        title: "Add Lecture",
        input: "radio",
        inputOptions: {
          quiz: "Add Quiz",
          video: "Add Video",
        },
        inputPlaceholder: "Select lecture type",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select a lecture type!";
          }
        },
      });

      if (!lectureType) return; // Người dùng hủy

      if (lectureType === "quiz") {
        // Tạo lecture dạng quiz trống
        const newLecture = {
          id: Date.now(),
          title: "Untitled Quiz",
          type: "quiz",
          quiz: {
            title: "Untitled Quiz",
            questions: [],
          },
        };
        
        // Hiển thị form giống editLecture để thêm quiz và question
        const { value: lectureData } = await Swal.fire({
          title: "Add New Quiz",
          html: `
            <div style="margin-bottom: 15px; display: flex; flex-direction: column;">
              <label style="font-weight: bold; margin-bottom: 5px;margin-right:330px">Quiz Title:</label>
              <input 
                id="quiz-title" 
                value="${newLecture.quiz.title}" 
                style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;margin-right:330px"
              />
            </div>
            <div id="quiz-form" style="display: flex; flex-direction: column; gap: 15px;">
              <!-- Form để thêm câu hỏi -->
            </div>
            <button id="add-question" style="margin-top: 15px;margin-right:330px; padding: 10px; background-color: #555; color: white; border: none; border-radius: 4px; cursor: pointer; width: 130px; font-size: 15px;">
              Add Question
            </button>
          `,
          didRender: () => {
            const attachAddOptionEvents = () => {
              document.querySelectorAll(".add-option").forEach((button) => {
                button.addEventListener("click", (event) => {
                  const questionIndex = event.target.getAttribute("data-question");
                  const optionsContainer = document.getElementById(`options-${questionIndex}`);
                  const optionIndex = newLecture.quiz.questions[questionIndex].options.length;
                  newLecture.quiz.questions[questionIndex].options.push({ text: "", correct: false });

                  const newOptionHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <label>${optionIndex + 1}:</label>
                      <input 
                        value="" 
                        id="o-${questionIndex}-${optionIndex}" 
                        placeholder="Enter option text" 
                        style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
                      />
                      <input 
                        type="checkbox" 
                        id="c-${questionIndex}-${optionIndex}" 
                        style="width: 20px; height: 20px;"
                      />
                    </div>`;
                  optionsContainer.insertAdjacentHTML("beforeend", newOptionHTML);
                });
              });
            };

            const addQuestionButton = document.getElementById("add-question");
            if (addQuestionButton) {
              addQuestionButton.addEventListener("click", () => {
                const quizForm = document.getElementById("quiz-form");
                const newQuestionIndex = newLecture.quiz.questions.length;
                newLecture.quiz.questions.push({ title: "", options: [] });
                const newQuestionHTML = `
                  <div>
                    <label style="font-weight: bold; margin-right:330px">Question ${newQuestionIndex + 1}:</label>
                    <input 
                      id="q-${newQuestionIndex}" 
                      placeholder="Enter question title" 
                      style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;margin-right:330px"
                    />
                    <div id="options-${newQuestionIndex}" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;"></div>
                    <button 
                      class="add-option" 
                      data-question="${newQuestionIndex}" 
                      style="margin-top: 10px; padding: 5px 10px; background-color: #555; color: white; border: none; border-radius: 4px; cursor: pointer;margin-right:330px"
                    >
                      Add Option
                    </button>
                  </div>`;
                quizForm.insertAdjacentHTML("beforeend", newQuestionHTML);

                attachAddOptionEvents();
              });
            }

            attachAddOptionEvents();
          },
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            const quizTitle = document.getElementById("quiz-title").value;
            const questions = [];
            newLecture.quiz.questions.forEach((_, questionIndex) => {
              const questionTitle = document.getElementById(`q-${questionIndex}`).value;
              const options = [];
              newLecture.quiz.questions[questionIndex].options.forEach((_, optionIndex) => {
                const optionText = document.getElementById(`o-${questionIndex}-${optionIndex}`).value;
                const isCorrect = document.getElementById(`c-${questionIndex}-${optionIndex}`).checked;
                options.push({ text: optionText, correct: isCorrect });
              });
              questions.push({ title: questionTitle, options });
            });
            return { quizTitle, questions };
          },
        });

        if (lectureData) {
          newLecture.title = lectureData.quizTitle;
          newLecture.quiz.title = lectureData.quizTitle;
          newLecture.quiz.questions = lectureData.questions;

          this.courses.sections[sectionIndex].lectures.push(newLecture);

          Swal.fire({
            icon: "success",
            title: "Quiz Added",
            text: `Quiz "${lectureData.quizTitle}" has been added.`,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } else if (lectureType === "video") {
        const newLecture = {
        id: Date.now(),
        title: "Untitled Video",
        type: "video",
        videos: [], // Mảng videos để chứa thông tin các file video
      };

      const { value: lectureData } = await Swal.fire({
        title: "Add New Video",
        html: `
          <label>Video Title:</label>
          <input id="video-title" value="${newLecture.title}" 
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          <label>Upload Video:</label>
          <input 
            type="file" 
            id="video-file" 
            multiple
            accept="video/*" 
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" 
          />
        `,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          const videoTitle = document.getElementById("video-title").value;
          const videoFileInput = document.getElementById("video-file");

          if (!videoFileInput || !videoFileInput.files.length) {
            Swal.showValidationMessage("You need to upload at least one video!");
            return null;
          }

          const videoFiles = Array.from(videoFileInput.files);
          return { videoTitle, videoFiles };
        },
      });

      if (lectureData) {
        newLecture.title = lectureData.videoTitle;

        const videoFiles = lectureData.videoFiles;
        const formData = new FormData();

        videoFiles.forEach((file) => formData.append("files", file));

        try {
      const response = await baseApi.post("/api/s3/upload/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data); // Kiểm tra dữ liệu trả về

      const uploadedVideos = response.data; // Gắn dữ liệu trả về từ API
      if (uploadedVideos && uploadedVideos.length > 0) {
        newLecture.videos = uploadedVideos.map((video) => ({
          fileName: video.fileName,
          videoUrl: video.videoUrl, 
          duration: video.duration,
        }));

        this.courses.sections[sectionIndex].lectures.push(newLecture);

        Swal.fire({
          icon: "success",
          title: "Videos Added",
          text: `${uploadedVideos.length} videos have been added.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("No videos were uploaded successfully.");
      }
    } catch (error) {
      console.error("Error uploading videos:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.response?.data?.message || "An error occurred while uploading the videos.",
      });
    }
      }
    }
    },
    async editSection(sectionIndex) {
      const section = this.courses.sections[sectionIndex];

      // Hiển thị SweetAlert2 để chỉnh sửa tiêu đề section
      const { value: newTitle } = await Swal.fire({
        title: `Section: ${section.title}`,
        input: "text",
        inputLabel: "Edit Section Title",
        inputValue: section.title,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "Section title cannot be empty!";
          }
        },
      });

      // Cập nhật tiêu đề nếu người dùng nhập giá trị mới
      if (newTitle) {
        this.courses.sections[sectionIndex].title = newTitle;
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `Section title updated to "${newTitle}".`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },
    async editLecture(sectionIndex, lectureIndex) {
      const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
      const lecture = this.courses.sections[sectionIndex]?.lectures[lectureIndex];
      if (!lecture) {
        console.warn(`Lecture not found at sectionIndex ${sectionIndex}, lectureIndex ${lectureIndex}`);
        return;
      }

      const { value: lectureData } = await Swal.fire({
        title: `Edit Lecture: ${lecture.title}`,
        html: `
          <div style="margin-bottom: 15px; display: flex; flex-direction: column;">
            <label style="font-weight: bold; margin-bottom: 5px;">Lecture Title:</label>
            <input 
              value="${lecture.title}" 
              id="lecture-title" 
              style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
            />
          </div>
          ${
            lecture.type === "quiz"
              ? `  
                <div style="margin-bottom: 15px; display: flex; flex-direction: column;">
                  <label style="font-weight: bold; margin-bottom: 5px;">Quiz Title:</label>
                  <input 
                    value="${lecture.quiz?.title || ""}" 
                    id="quiz-title" 
                    style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
                  />
                </div>
                <div id="quiz-form" style="display: flex; flex-direction: column; gap: 15px;">
                  ${lecture.quiz?.questions
                    .map(
                      (q, questionIndex) => `
                        <div>
                          <label style="font-weight: bold;">Question ${questionIndex + 1}:</label>
                          <input 
                            value="${q.title}" 
                            id="q-${questionIndex}" 
                            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
                          />
                          <div style="display: flex; flex-direction: column; gap: 10px;" id="options-${questionIndex}">
                            ${q.options
                              .map(
                                (o, optionIndex) => `
                                  <div style="display: flex; align-items: center; gap: 10px;">
                                    <label>${optionIndex + 1}:</label>
                                    <input 
                                      value="${o.text}" 
                                      id="o-${questionIndex}-${optionIndex}" 
                                      style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
                                    />
                                    <input 
                                      type="checkbox" 
                                      id="c-${questionIndex}-${optionIndex}" 
                                      ${o.correct ? "checked" : ""} 
                                      style="width: 20px; height: 20px;"
                                    />
                                  </div>`
                              )
                              .join("")}
                          </div>
                          <button 
                            class="add-option" 
                            data-question="${questionIndex}" 
                            style="margin-top: 10px; padding: 5px 10px; background-color: #555; color: white; border: none; border-radius: 4px; cursor: pointer;">
                            Add Option
                          </button>
                        </div>`
                    )
                    .join("")}
                </div>
                <button id="add-question" style="margin-top: 15px; padding: 10px; background-color: #555; color: white; border: none; border-radius: 4px; cursor: pointer; width: 130px; font-size: 15px">
                  Add Question
                </button>`
              : ` 
                <div style="margin-bottom: 15px; display: flex; flex-direction: column;">
                  <label style="font-weight: bold; margin-bottom: 5px;">Current Video:</label>
                  <p>${lecture.videos?.[0]?.fileName || "No video uploaded"}</p>
                  <input 
                    type="file" 
                    id="newVideo" 
                    accept="video/*" 
                    style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
                  />
                </div>`
          }
        `,
        didRender: () => {
          const videoInput = document.getElementById("newVideo");
          if (videoInput) {
            videoInput.addEventListener("change", async (event) => {
              const newVideo = event.target.files[0];
              if (newVideo) {
                const formData = new FormData();
                formData.append("files", newVideo);
                
                // Kiểm tra nếu tệp video hợp lệ
                if (!newVideo) {
                  toast.error("Please select a video file.");
                  return;
                }
                if (newVideo.size > MAX_VIDEO_SIZE) { // Kiểm tra kích thước video
                  toast.error("File is too large.");
                  return;
                }

                try {
                  const response = await baseApi.post("/api/s3/upload/video", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  if (response.data) {
                    const uploadedVideo = response.data[0];
                    lecture.videos = [
                      {
                        videoUrl: uploadedVideo.videoUrl,
                        fileName: uploadedVideo.fileName,
                        duration: uploadedVideo.duration,
                      },
                    ];
                    console.log("Video uploaded successfully:", lecture.videos);
                  }
                } catch (error) {
                  console.error("Error uploading video:", error);
                  console.error("API error details:", error.response?.data); // Hiển thị chi tiết lỗi từ API
                  toast.error("Video upload failed.");
                }
              }
            });
          }
        },
        showCancelButton: true,
        preConfirm: async () => {
          const updatedLectureTitle = document.getElementById("lecture-title")?.value || "";
          let newVideoUrl = null;

          if (lecture.type === "quiz") {
            const updatedQuizTitle = document.getElementById("quiz-title")?.value || "";
            const updatedQuestions = lecture.quiz.questions.map((_, questionIndex) => {
              const questionTitle = document.getElementById(`q-${questionIndex}`)?.value || "";
              const options = lecture.quiz.questions[questionIndex].options.map((_, optionIndex) => ({
                text: document.getElementById(`o-${questionIndex}-${optionIndex}`)?.value || "",
                correct: document.getElementById(`c-${questionIndex}-${optionIndex}`)?.checked || false,
              }));
              return { title: questionTitle, options };
            });
            return { updatedLectureTitle, updatedQuizTitle, updatedQuestions };
          } else if (lecture.type === "video" && newVideoUrl) {
            return { updatedLectureTitle, newVideoUrl };
          }
          return { updatedLectureTitle };
        },
      });

      if (lectureData) {
        // Cập nhật dữ liệu lecture sau khi đã chỉnh sửa
        lecture.title = lectureData.updatedLectureTitle;
        if (lecture.type === "quiz") {
          lecture.quiz.title = lectureData.updatedQuizTitle;
          lecture.quiz.questions = lectureData.updatedQuestions;
        } else if (lecture.type === "video" && lectureData.newVideoUrl) {
          lecture.videos = [{ fileName: lectureData.newVideoUrl }];
        }
      }
    },
    deleteSection(sectionIndex) {
        if (confirm("Are you sure you want to delete this section?")) {
          this.courses.sections.splice(sectionIndex, 1);
          // Reset active section index if necessary
          if (this.activeSectionIndex === sectionIndex) {
            this.activeSectionIndex = 0;
          }
        }
    },
    deleteLecture(sectionIndex, lectureIndex) {
      if (confirm("Are you sure you want to delete this lecture?")) {
        this.courses.sections[sectionIndex].lectures.splice(lectureIndex, 1);

        // Reset active lecture index if necessary
        if (this.activeLectureIndices[sectionIndex] === lectureIndex) {
          // Directly assign the value instead of using this.$set
          this.activeLectureIndices[sectionIndex] = 0;
        }
      }
    },
    changeLecture(index) {
      this.activeLectureIndices[this.sectionIndex] = index;
    },
    getCourse(idCourse){
      baseApi.get(`/api/v1/courses/getCourseById/${idCourse}`)
      .then((c) => {
        this.courses = c.data;
        console.log("Tải dữ liệu hóa học lên thành công",this.course);
      })
      .catch((error) => {
        console.error("Lỗi khi tìm khóa học: ", error);
      })
    },
  },
  mounted() {
    this.fetchCourses();
  },
};
</script>


<style>
.add-section-btn {
  font-size: 25px;
  font-weight: bold;
  color: #121316; /* Màu giống Google Chrome */
  background-color: transparent;
  border: none; /* Loại bỏ viền */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.add-section-btn:hover {
  background-color: #ececec;
  color: rgb(15, 14, 14);
}

.add-section-btn:focus {
  outline: none;
}

.add-lecture-btn {
  font-size: 25px;
  font-weight: bold;
  color: #101113; 
  background-color: transparent;
  border: none; 
  border-radius: 50%; 
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.add-lecture-btn:hover {
  background-color: #f8f9f9;
  color: rgb(12, 12, 12);
}

.add-lecture-btn:focus {
  outline: none;
}


.nav-tabs {
  border-bottom: 1px solid #ddd;
}
.nav-tabs .nav-link {
  color: #555;
  margin-right: 5px;
  border: 1px solid transparent;
  border-radius: 5px;
}
.nav-tabs .nav-link.active {
  background-color: #2274f0;
  color: #fff;
  border-color: #2274f0;
}

/* Lecture Tabs */
.nav-pills {
  margin-top: 15px;
}
.nav-pills .nav-link {
  color: #555;
  border-radius: 5px;
  margin-right: 5px;
}
.nav-pills .nav-link.active {
  background-color: #6c757d;
  color: #fff;
}
.tab-content {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
video {
  width: 100%;
  max-height: 400px;
  margin-top: 10px;
}
.text-success {
  color: green;
}
.nav-tabs .nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px; 
}
.nav-tabs .btn-close {
  position: absolute;
  top: 50%; 
  right: 10px; 
  transform: translateY(-50%); 
  background-color: transparent; 
  border: none; 
  font-size: 10px;
  cursor: pointer;
  color: #6c757d; 
}

/* Lecture Tabs */
.nav-pills .nav-link {
  position: relative; 
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px; 
  margin-right: 10px;
  border-radius: 5px; 
}

/* Nút xóa cho Lecture */
.nav-pills .btn-close {
  position: absolute; 
  top: 50%;
  right: 10px; 
  transform: translateY(-50%); 
  background-color: transparent; 
  border: none; 
  font-size: 10px; 
  cursor: pointer;
  color: #6c757d;
}
</style>
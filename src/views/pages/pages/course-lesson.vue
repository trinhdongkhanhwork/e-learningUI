<template>
  <layouts-login></layouts-login>

  <section class="page-content course-sec course-lesson">
    <div class="container">
      <div class="row">
        <!-- Danh sách Sections và Lectures -->
        <div class="col-lg-4">
          <div class="lesson-group">
            <br>
            <div class="course-card" v-for="section in course?.sections" :key="section.id">
              <h6 class="cou-title">
                <a class="collapsed" data-bs-toggle="collapse" :href="'#collapse' + section.id" aria-expanded="false">
                  {{ section.title }} <span>{{ section.lectures.length }} Lessons</span>
                </a>
              </h6>
              <div :id="'collapse' + section.id" class="card-collapse collapse">
                <ul>
                  <li v-for="lecture in section.lectures" :key="lecture.id" @click="selectLecture(lecture)">
                    <p>{{ lecture.title }}</p>
                    <div>
                      <img v-if="lecture.type === 'video'" src="@/assets/img/icon/play-icon.svg" alt="Video" />
                      <img v-if="lecture.type === 'quiz'" src="@/assets/img/icon/question-icon-com.svg" alt="Quiz" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Nội dung bài học -->
        <div class="col-lg-8">
          <br>
          <div class="student-widget lesson-introduction">
            <div class="lesson-widget-group">
              <h4 class="tittle">{{ selectedLecture?.title || "Introduction" }}</h4>

              <!-- Nếu là video -->
              <div class="introduct-video" v-if="selectedLecture?.type === 'video'">
                <a href="https://www.youtube.com/embed/1trvO6dqQUI" class="video-thumbnail" data-fancybox="">
                  <div class="play-icon">
                    <i class="fa-solid fa-play"></i>
                  </div>
                  <img src="@/assets/img/video-img-01.jpg" alt="" />
                </a>
              </div>

              <!-- Nếu là quiz -->
              <div v-if="selectedLecture?.type === 'quiz'">
              <div v-if="loading">
                <p>Check data...</p>
              </div>
                <div class="quiz-box" v-if="!quizStarted">
                  <!-- nếu có dữ liệu -->
                  <template v-if="hasQuiz">
                    <div class="quiz-data">
                      <h3>Previous test results:</h3>
                      <table border="1">
                        <thead>
                          <tr>
                            <th>Number of checks</th>
                            <th>Day</th>
                            <th>Points</th>
                            <th>Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(quiz, index) in quizData" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ quiz.createdAt ? new Date(quiz.createdAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric',hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'N/A' }}</td>
                            <td>{{ quiz.score }}</td>
                            <td>{{ quiz.passedLecture ? 'Pass' : 'Fail' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button class="begin-btn" @click="startQuiz">[ Begin ]</button>
                  </template>
                  <template v-else>
                    <!-- Nếu chưa có dữ liệu -->
                    <p><strong>Number of questions:</strong> {{ selectedLecture?.quiz?.questions?.length || 0 }}</p>
                    <p><strong>Exercise duration:</strong> 5 Minutes</p>
                    <p><strong>Total attempts:</strong> 0/3</p>
                    <p><strong>Minimum score to complete:</strong> 85%</p>
                    <button class="begin-btn" @click="startQuiz">[ Begin ]</button>
                  </template>
                </div>

                <!-- Giao diện câu hỏi -->
                <div v-if="quizStarted">
                  <p><strong>Time Left:</strong> {{ Math.floor(timeLeft / 60) }}:{{ ('0' + (timeLeft % 60)).slice(-2) }}</p>

                  <div class="question-box">
                    <p><strong>Question {{ currentQuestionIndex + 1 }}: {{ currentQuestion.title }}</strong></p>
                    <ul>
                      <li v-for="(option, index) in currentQuestion.options" :key="index">
                        <label>
                          <input 
                            type="checkbox" 
                            :value="option.id" 
                            @change="toggleAnswer(option.id)"
                          />
                          {{ option.text }}
                        </label>
                      </li>
                    </ul>
                  </div>

                  <div class="quiz-actions">
                    <button class="submit-btn" @click="submitQuiz">[Submit]</button>
                    <button class="next-btn" @click="nextQuestion">[Next Question]</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <layouts1></layouts1>

  <!-- Popup xác nhận nộp bài -->
  <div v-if="showSubmitPopup" class="popup-overlay">
    <div class="popup-box">
      <p>Bạn có chắc chắn muốn nộp bài không?</p>
      <button class="confirm-btn" @click="confirmSubmitQuiz">Xác nhận</button>
      <button class="cancel-btn" @click="showSubmitPopup = false">Hủy</button>
    </div>
  </div>
</template>

<script> 
import axios from "axios";

export default {
  data() {
  return {
    course: null,
    courseId: null,
    selectedLecture: null,
    quizStarted: false, 
    currentQuestionIndex: 0,
    selectedAnswers: [],
    timeLeft: 300, 
    timer: null,
    showSubmitPopup: false,
    quizData: null,
    hasQuiz: false,
    loading: true,
  };
},
  computed: {
    currentQuestion() {
      return this.selectedLecture?.quiz?.questions[this.currentQuestionIndex] || {};
    },
  },
  async mounted() {
    
    this.courseId = this.getCourseIdFromUrl();
    if (!this.courseId) {
      console.error("not find course");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/courses/getCourseById/${this.courseId}`
      );
      this.course = response.data;
    } catch (error) {
      console.error("err data course:", error);
    }
  },
  methods: {
    getCourseIdFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get("id");
    },
    async selectLecture(lecture) {
  this.selectedLecture = lecture;
  this.quizStarted = false;
  this.currentQuestionIndex = 0;
  this.selectedAnswers = [];
  this.hasQuiz = false;
  this.loading = true;

  if (lecture.type === "quiz") {
    this.$nextTick(() => {
      if (typeof this.checkQuizData === "function") {
        this.checkQuizData(lecture.id);
      } else {
        console.error("checkQuizData not function!");
      }
    });
  }

  this.loading = false;
},

    startQuiz() {
    this.quizStarted = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswers = {};
    this.timeLeft = 300;
    this.selectedAnswers = [];


        // Bắt đầu đếm ngược
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        this.showSubmitPopup = true;
      }
    }, 1000);
  },

  nextQuestion() {
  if (this.currentQuestionIndex < this.selectedLecture.quiz.questions.length - 1) {
    this.currentQuestionIndex++;
    this.$nextTick(() => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      checkboxes.forEach(checkbox => checkbox.checked = false);
    });
  } else {
    alert("Bạn đã hoàn thành tất cả các câu hỏi!");
  }
}
,
  //thêm/xóa đáp án
  toggleAnswer(optionId) {
  if (!Array.isArray(this.selectedAnswers)) {
    this.selectedAnswers = [];
  }

  const index = this.selectedAnswers.indexOf(optionId);
  if (index === -1) {
    this.selectedAnswers.push(optionId);
  } else {
    this.selectedAnswers.splice(index, 1);
  }
  console.log("Selected Answers:", this.selectedAnswers);
},

//checkQuizData
async checkQuizData(lectureId) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/answers/${lectureId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Kiểm tra dữ liệu bài làm:", JSON.stringify(response.data));

      if (response.data.result && response.data.result.length > 0) {
        this.hasQuiz = true;
        this.quizData = response.data.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      } else {
        this.hasQuiz = false;
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra quiz:", error);
      this.hasQuiz = false;
    }
  },

  submitQuiz() {
    clearInterval(this.timer); // Dừng đếm ngược
    this.showSubmitPopup = true;
  },

  confirmSubmitQuiz() {
  this.showSubmitPopup = false;

  if (!this.selectedLecture?.id) {
    alert("Lỗi: not find quiz hợp lệ!");
    return;
  }

  // Kiểm tra nếu chưa chọn đáp án
  if (this.selectedAnswers.length === 0) {
    alert("you not chose answer!");
    return;
  }

  const token = localStorage.getItem("token");

  const payload = {
    lectureId: this.selectedLecture.id,
    optionId: [...this.selectedAnswers]
  };
console.log(this.selectedAnswers);

  console.log("Dữ liệu gửi lên API:",JSON.stringify(payload, null, 2));

  axios.post("http://localhost:8080/api/answers/submit", payload, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      alert("Bài làm đã được nộp thành công!");
      this.quizStarted = false;
      this.selectedAnswers = [];
    })
    .catch(error => {
      console.error("Lỗi khi nộp bài:", error);
      alert("Có lỗi xảy ra khi nộp bài! Vui lòng thử lại.",JSON.stringify(payload, null, 2));
    });
}
  }
}
</script>

<style scoped>
/* Hiệu ứng bàn tay khi rê chuột vào bài học */
.cou-title a,
ul li {
  cursor: pointer;
}

/* Style cho bảng Quiz */
.quiz-box {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.quiz-box p {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.begin-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.begin-btn:hover {
  background: #218838;
}

/* Hiển thị câu hỏi */
.question-box {
  background: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Danh sách câu trả lời */
.question-box ul {
  list-style: none;
  padding: 0;
}

.question-box li {
  margin: 10px 0;
}

/* Nút Submit và Next */
.quiz-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.submit-btn,
.next-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.submit-btn:hover {
  background: #0056b3;
}

.next-btn {
  background: #ffc107;
  color: #000;
}

.next-btn:hover {
  background: #e0a800;
}

.next-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.confirm-btn, .cancel-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;
}

.cancel-btn {
  background: #dc3545;
}

.confirm-btn:hover {
  background: #0056b3;
}

.cancel-btn:hover {
  background: #b02a37;
}
/* css table */
.quiz-data {
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.quiz-data h3 {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.quiz-data table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

.quiz-data th,
.quiz-data td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.quiz-data th {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
}

.quiz-data tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.quiz-data tbody tr:nth-child(even) {
  background-color: #ffffff;
}

.quiz-data tbody tr:hover {
  background-color: #f1f1f1;
  transition: 0.3s;
}

.begin-btn {
  display: block;
  width: 150px;
  margin: 15px auto;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.begin-btn:hover {
  background-color: #0056b3;
}
</style>

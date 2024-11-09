<template>
  <div class="tab-content">
    <!-- All -->
    <div class="tab-pane fade active show" id="alltab" role="tabpanel">
      <div class="all-course">
        <div class="row">
          <!-- Course -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up" v-for="course in courses" :key="course.id">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                    <img v-if="course.coverImage" :src="require(`@/assets/img/course-list/${course.coverImage}`)"
                         alt="Img" class="img-fluid" style="width: 300px;height: 270px;"/>
                  </router-link>
                  <div class="heart-three">
                    <a @click.prevent="toggleFavorites(course)">
                      <i :class="course.isFavorite ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'"></i>
                    </a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img :src="`${course.instructor.avatarUrl}`" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">
                      <p>{{ course.level }}</p>
                      <h3 class="title instructor-text">
                        {{course.title }}
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>{{course.enrolledUserCount}} Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>{{ course.price }}</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Course -->
        </div>
      </div>
    </div>
    <!-- /All -->

    <!-- Most popular -->
    <div class="tab-pane fade" id="mostpopulartab">
      <div class="all-course">
        <div class="row">
          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-21.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user4.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Creative Arts & media Course Completed
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>250 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$700 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-22.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user5.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-23.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user6.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Pyhton Development Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>Free</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-26.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user1.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>450 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-27.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user2.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Web Developer PHP Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>500 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-20.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user3.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        The Complete Business Management Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-24.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user7.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        Build Websites with HTML5 CSS3 Javascript
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-25.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user8.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->
        </div>
      </div>
    </div>
    <!-- /Most popular -->

    <!-- Business -->
    <div class="tab-pane fade" id="businesstab">
      <div class="businesstab">
        <div class="row">
          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-23.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user6.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Pyhton Development Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>Free</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-26.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user1.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>450 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-21.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user4.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Creative Arts & media Course Completed
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>250 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$700 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-22.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user5.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-27.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user2.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Web Developer PHP Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>500 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-20.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user3.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        The Complete Business Management Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-24.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user7.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        Build Websites with HTML5 CSS3 Javascript
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-25.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user8.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->
        </div>
      </div>
    </div>
    <!-- /Business -->

    <!-- Design -->
    <div class="tab-pane fade" id="designtab">
      <div class="designtab">
        <div class="row">
          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-27.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user2.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Web Developer PHP Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>500 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-23.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user6.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Pyhton Development Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>Free</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-26.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user1.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>450 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-21.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user4.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Creative Arts & media Course Completed
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>250 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$700 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-20.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user3.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        The Complete Business Management Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-24.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user7.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        Build Websites with HTML5 CSS3 Javascript
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-22.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user5.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-25.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user8.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->
        </div>
      </div>
    </div>
    <!-- /Design -->

    <!-- Music -->
    <div class="tab-pane fade" id="musictab">
      <div class="music-label">
        <div class="row">
          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-21.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user4.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Creative Arts & media Course Completed
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>250 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$700 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-22.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user5.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-23.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user6.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Pyhton Development Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>Free</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-26.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user1.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>450 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-27.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user2.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Web Developer PHP Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>500 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-20.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user3.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        The Complete Business Management Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-24.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user7.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        Build Websites with HTML5 CSS3 Javascript
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-25.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user8.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->
        </div>
      </div>
    </div>
    <!-- /Music -->

    <!-- Programmiing -->
    <div class="tab-pane fade" id="programmingtab">
      <div class="programmingtab">
        <div class="row">
          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-23.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user6.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Pyhton Development Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>Free</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-26.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user1.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>450 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-21.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user4.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Creative Arts & media Course Completed
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>250 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$700 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-22.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user5.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML CSS
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-27.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user2.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Web Developer PHP Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>500 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-20.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user3.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        The Complete Business Management Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-24.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user7.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        Build Websites with HTML5 CSS3 Javascript
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-25.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user8.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML CSS
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->
        </div>
      </div>
    </div>
    <!-- /Programmiing -->

    <!-- Database -->
    <div class="tab-pane fade" id="databasetab">
      <div class="databasetab">
        <div class="row">
          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-22.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user5.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML CSS
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-27.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user2.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Web Developer PHP Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>500 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-23.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user6.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Pyhton Development</p>
                      <h3 class="title instructor-text">
                        The Complete Pyhton Development Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>Free</h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-26.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user1.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Personalized Learning</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML CSS
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>450 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-21.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user4.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Creative Arts & media Course Completed
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>250 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$700 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-20.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user3.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        The Complete Business Management Course
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-24.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user7.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Business Management</p>
                      <h3 class="title instructor-text">
                        Build Websites with HTML5 CSS3 Javascript
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$650 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->

          <!-- Col -->
          <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
            <div class="course-box-three">
              <div class="course-three-item">
                <div class="course-three-img">
                  <router-link to="/course/course-details">
                    <img
                        class="img-fluid"
                        alt=""
                        src="@/assets/img/course/course-25.jpg"
                    />
                  </router-link>
                  <div class="heart-three">
                    <a href="javascript:;"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <div class="course-three-content">
                  <div class="course-group-three">
                    <div class="group-three-img">
                      <router-link to="/instructor/instructor-profile"
                      ><img src="@/assets/img/user/user8.jpg" alt="" class="img-fluid"
                      /></router-link>
                    </div>
                  </div>

                  <div class="course-three-text">
                    <router-link to="/course/course-details">
                      <p>Creative Arts & media</p>
                      <h3 class="title instructor-text">
                        Build Responsive Websites with HTML CSS
                      </h3>
                    </router-link>
                  </div>

                  <div class="student-counts-info d-flex align-items-center">
                    <div class="students-three-counts d-flex align-items-center">
                      <img src="@/assets/img/icon-three/student.svg" alt="" />
                      <p>400 Students</p>
                    </div>
                  </div>

                  <div
                      class="price-three-group d-flex align-items-center justify-content-between"
                  >
                    <div class="price-three-view d-flex align-items-center">
                      <div class="course-price-three">
                        <h3>$300 <span>$99.00</span></h3>
                      </div>
                    </div>
                    <div class="price-three-time d-inline-flex align-items-center">
                      <i class="fa-regular fa-clock me-2"></i>
                      <span>6hr 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Col -->
        </div>
      </div>
    </div>
    <!-- /Database -->
  </div>
</template>
<script>
import baseApi from '@/axios';
import { useStore } from 'vuex';
import { ref, onMounted } from "vue";

export default {
  data() {
    const store = useStore();
    const user = ref(store.state.userInfo);
    console.log(user);
    return {
      courses: [],
      wishlist: [], // Danh sách wishlist từ API
      user
    };
  },
  async mounted() {
    this.fetchWishlist(); // Lấy dữ liệu wishlist trước khi lấy danh sách khóa học
    this.fetchCourses();
  },
  methods: {
    async fetchWishlist() {

      const userId = this.user.id;
      console.log("Fetching wishlist for user ID:", userId);
      try {
        const response = await baseApi.get(`/api/v1/wishlist/getAllWS/${userId}`);
        this.wishlist = response.data || [];
        console.log("Wishlist data:", this.wishlist); // Kiểm tra dữ liệu
        this.updateFavoriteStatus();
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    },

    fetchCourses() {
      baseApi
          .get("/api/v1/courses/getCourses")
          .then((response) => {
            if (Array.isArray(response.data.content)) {
              this.courses = response.data.content.map(course => ({
                ...course,
                isFavorite: this.wishlist.some(wish => wish.id === course.id)
              }));

              this.updateFavoriteStatus();
            } else {
              console.error("Dữ liệu không phải là mảng:", response.data);
            }
          })
          .catch((error) => {
            console.error("Lỗi khi lấy danh sách khóa học:", error);
          });
    },

    toggleFavorites(course) {
      const userId = this.user.id;
      if (!userId) {
        console.error("User ID is not available");
        return;
      }

      // Tìm `wishlistItem` từ `wishlist` dựa vào `course.id`
      const wishlistItem = this.wishlist.find(wish => wish.courseId === course.id);

      if (course.isFavorite) {
        // Kiểm tra `wishlistItem` tồn tại trước khi xóa
        if (wishlistItem && wishlistItem.id) {
          baseApi
              .delete(`/api/v1/wishlist/${wishlistItem.id}`)
              .then(() => {
                // Cập nhật trạng thái yêu thích và xóa khỏi `wishlist`
                course.isFavorite = false;
                this.wishlist = this.wishlist.filter(wish => wish.courseId !== course.id);
                console.log(`Đã xóa khóa học ${course.id} khỏi wishlist`);
              })
              .catch((error) => {
                console.error("Lỗi khi xóa khỏi danh sách yêu thích:", error);
              });
        } else {
          console.error("Wishlist item không tồn tại hoặc không có ID.");
        }
      } else {
        // Thêm vào wishlist nếu chưa có
        const wishlistData = { userId, courseId: course.id };
        baseApi
            .post("/api/v1/wishlist/addWishlist", wishlistData)
            .then((response) => {
              if (response && response.data) {
                course.isFavorite = true;
                this.wishlist.push(response.data); // Thêm vào `wishlist` mới
                console.log("Đã thêm vào danh sách yêu thích:", response.data);
              } else {
                console.error("Định dạng phản hồi không như mong đợi:", response);
              }
            })
            .catch((error) => {
              console.error("Lỗi khi thêm vào danh sách yêu thích:", error);
            });
      }
    },
    async addToWishlist(course) {
      const userId = this.user.id;
      console.log(userId);
      const wishlistData = {
        userId: userId,
        courseId: course.id
      };

      try {
        const response = await baseApi.post('/api/v1/wishlist/addWishlist', wishlistData);
        if (response && response.data && response.data.code === 9898) {
          console.log("Khóa học đã được thêm vào wishlist:", response.data);
        } else {
          console.error("Định dạng phản hồi không như mong đợi:", response);
        }
      } catch (error) {
        console.error("Lỗi khi thêm vào wishlist:", error);
      }
    },

    updateFavoriteStatus() {
      // Duyệt qua từng khóa học và đánh dấu `isFavorite` nếu có trong `wishlist`
      this.courses.forEach(course => {
        course.isFavorite = this.wishlist.some(wish => wish.courseId === course.id);
      });
    },

    async unWishlist(courseId) {
      try {
        await baseApi.delete(`/api/v1/wishlist/${courseId}`);
        console.log("Khóa học đã bị xóa khỏi wishlist");
        this.wishlist = this.wishlist.filter(course => course.id !== courseId); // Cập nhật danh sách wishlist
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    },
  },
};

</script>

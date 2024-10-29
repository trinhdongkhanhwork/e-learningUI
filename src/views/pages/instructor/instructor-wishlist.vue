<template>
  <layouts></layouts>
  <student-breadcrumb :title="title" :text="text" :text1="text1" />
  <div class="page-content">
    <div class="container">
      <div class="row">
        <!-- sidebar -->
        <instructor-sidebar></instructor-sidebar>
        <!-- /Sidebar -->

        <!-- Instructor Wishlist -->
        <div class="col-xl-9 col-lg-9">
          <div class="settings-widget card-info">
            <div class="settings-menu p-0">
              <div class="profile-heading">
                <h3>Wishlist</h3>
              </div>
              <div class="checkout-form pb-0">
                <div class="row">
                  <!-- Course Grid -->
                  <div class="col-xxl-4 col-md-6 d-flex">
                    <div class="course-box flex-fill">
                      <div class="product">
                        <div class="product-img">
                          <router-link to="/course/course-details">
                            <img
                              class="img-fluid"
                              alt="Img"
                              src="@/assets/img/course/course-02.jpg"
                            />
                          </router-link>
                          <div class="price">
                            <h3>$80 <span>$99.00</span></h3>
                          </div>
                        </div>
                        <div class="product-content">
                          <div class="course-group d-flex">
                            <div class="course-group-img d-flex">
                              <a href="/instructor/instructor-profile"
                                ><img
                                  src="@/assets/img/user/user2.jpg"
                                  alt="Img"
                                  class="img-fluid"
                              /></a>
                              <div class="course-name">
                                <h4>
                                  <a href="/instructor/instructor-profile">Cooper</a>
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div
                              class="course-share d-flex align-items-center justify-content-center"
                            >
                              <a href="#"
                                ><i class="fa-regular fa-heart color-active"></i
                              ></a>
                            </div>
                          </div>
                          <h3 class="title instructor-text">
                            <router-link to="/course/course-details"
                              >Wordpress for Beginners - Master Wordpress
                              Quickly</router-link
                            >
                          </h3>
                          <div class="course-info d-flex align-items-center">
                            <div class="rating-img d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>12+ Lesson</p>
                            </div>
                            <div class="course-view d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>70hr 30min</p>
                            </div>
                          </div>
                          <div class="rating mb-0">
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <span class="d-inline-block average-rating"
                              ><span>5.0</span> (20)</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Course Grid -->

                  <!-- Course Grid -->
                  <div class="col-xxl-4 col-md-6 d-flex">
                    <div class="course-box flex-fill">
                      <div class="product">
                        <div class="product-img">
                          <router-link to="/course/course-details">
                            <img
                              class="img-fluid"
                              alt="Img"
                              src="@/assets/img/course/course-03.jpg"
                            />
                          </router-link>
                          <div class="price combo">
                            <h3>FREE</h3>
                          </div>
                        </div>
                        <div class="product-content">
                          <div class="course-group d-flex">
                            <div class="course-group-img d-flex">
                              <a href="/instructor/instructor-profile"
                                ><img
                                  src="@/assets/img/user/user5.jpg"
                                  alt="Img"
                                  class="img-fluid"
                              /></a>
                              <div class="course-name">
                                <h4>
                                  <a href="/instructor/instructor-profile">Jenny</a>
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div
                              class="course-share d-flex align-items-center justify-content-center"
                            >
                              <a href="#"
                                ><i class="fa-regular fa-heart color-active"></i
                              ></a>
                            </div>
                          </div>
                          <h3 class="title instructor-text">
                            <router-link to="/course/course-details"
                              >Sketch from A to Z (2022): Become an app
                              designer</router-link
                            >
                          </h3>
                          <div class="course-info d-flex align-items-center">
                            <div class="rating-img d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>10+ Lesson</p>
                            </div>
                            <div class="course-view d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>40hr 10min</p>
                            </div>
                          </div>
                          <div class="rating mb-0">
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star me-1"></i>
                            <i class="fas fa-star me-1"></i>
                            <span class="d-inline-block average-rating"
                              ><span>3.0</span> (18)</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Course Grid -->

                  <!-- Course Grid -->
                  <div class="col-xxl-4 col-md-6 d-flex">
                    <div class="course-box flex-fill">
                      <div class="product">
                        <div class="product-img">
                          <router-link to="/course/course-details">
                            <img
                              class="img-fluid"
                              alt="Img"
                              src="@/assets/img/course/course-04.jpg"
                            />
                          </router-link>
                          <div class="price">
                            <h3>$65 <span>$70.00</span></h3>
                          </div>
                        </div>
                        <div class="product-content">
                          <div class="course-group d-flex">
                            <div class="course-group-img d-flex">
                              <a href="/instructor/instructor-profile"
                                ><img
                                  src="@/assets/img/user/user4.jpg"
                                  alt="Img"
                                  class="img-fluid"
                              /></a>
                              <div class="course-name">
                                <h4>
                                  <a href="/instructor/instructor-profile"
                                    >Nicole Brown</a
                                  >
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div
                              class="course-share d-flex align-items-center justify-content-center"
                            >
                              <a href="#"
                                ><i class="fa-regular fa-heart color-active"></i
                              ></a>
                            </div>
                          </div>
                          <h3 class="title instructor-text">
                            <router-link to="/course/course-details"
                              >Learn Angular Fundamentals From beginning to
                              advance lavel</router-link
                            >
                          </h3>
                          <div class="course-info d-flex align-items-center">
                            <div class="rating-img d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>15+ Lesson</p>
                            </div>
                            <div class="course-view d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>80hr 40min</p>
                            </div>
                          </div>
                          <div class="rating mb-0">
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star me-1"></i>
                            <span class="d-inline-block average-rating"
                              ><span>4.0</span> (10)</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Course Grid -->

                  <!-- Course Grid -->
                  <div class="col-xxl-4 col-md-6 d-flex">
                    <div class="course-box flex-fill">
                      <div class="product">
                        <div class="product-img">
                          <router-link to="/course/course-details">
                            <img
                              class="img-fluid"
                              alt="Img"
                              src="@/assets/img/course/course-05.jpg"
                            />
                          </router-link>
                          <div class="price combo">
                            <h3>FREE</h3>
                          </div>
                        </div>
                        <div class="product-content">
                          <div class="course-group d-flex">
                            <div class="course-group-img d-flex">
                              <a href="/instructor/instructor-profile"
                                ><img
                                  src="@/assets/img/user/user3.jpg"
                                  alt="Img"
                                  class="img-fluid"
                              /></a>
                              <div class="course-name">
                                <h4>
                                  <a href="/instructor/instructor-profile"
                                    >John Smith</a
                                  >
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div
                              class="course-share d-flex align-items-center justify-content-center"
                            >
                              <a href="#"
                                ><i class="fa-regular fa-heart color-active"></i
                              ></a>
                            </div>
                          </div>
                          <h3 class="title instructor-text">
                            <router-link to="/course/course-details"
                              >Build Responsive Real World Websites with Crash
                              Course</router-link
                            >
                          </h3>
                          <div class="course-info d-flex align-items-center">
                            <div class="rating-img d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>12+ Lesson</p>
                            </div>
                            <div class="course-view d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>70hr 30min</p>
                            </div>
                          </div>
                          <div class="rating mb-0">
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star me-1"></i>
                            <span class="d-inline-block average-rating"
                              ><span>4.0</span> (15)</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Course Grid -->

                  <!-- Course Grid -->
                  <div class="col-xxl-4 col-md-6 d-flex">
                    <div class="course-box flex-fill">
                      <div class="product">
                        <div class="product-img">
                          <router-link to="/course/course-details">
                            <img
                              class="img-fluid"
                              alt="Img"
                              src="@/assets/img/course/course-07.jpg"
                            />
                          </router-link>
                          <div class="price">
                            <h3>$70 <span>$80.00</span></h3>
                          </div>
                        </div>
                        <div class="product-content">
                          <div class="course-group d-flex">
                            <div class="course-group-img d-flex">
                              <a href="/instructor/instructor-profile"
                                ><img
                                  src="@/assets/img/user/user6.jpg"
                                  alt="Img"
                                  class="img-fluid"
                              /></a>
                              <div class="course-name">
                                <h4>
                                  <a href="/instructor/instructor-profile"
                                    >Stella Johnson</a
                                  >
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div
                              class="course-share d-flex align-items-center justify-content-center"
                            >
                              <a href="#"
                                ><i class="fa-regular fa-heart color-active"></i
                              ></a>
                            </div>
                          </div>
                          <h3 class="title instructor-text">
                            <router-link to="/course/course-details"
                              >Learn JavaScript and Express to become a
                              Expert</router-link
                            >
                          </h3>
                          <div class="course-info d-flex align-items-center">
                            <div class="rating-img d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>15+ Lesson</p>
                            </div>
                            <div class="course-view d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>70hr 30min</p>
                            </div>
                          </div>
                          <div class="rating mb-0">
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star me-1"></i>
                            <span class="d-inline-block average-rating"
                              ><span>4.6</span> (15)</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Course Grid -->

                  <!-- Course Grid -->
                  <div class="col-xxl-4 col-md-6 d-flex">
                    <div class="course-box flex-fill">
                      <div class="product">
                        <div class="product-img">
                          <router-link to="/course/course-details">
                            <img
                              class="img-fluid"
                              alt="Img"
                              src="@/assets/img/course/course-08.jpg"
                            />
                          </router-link>
                          <div class="price combo">
                            <h3>FREE</h3>
                          </div>
                        </div>
                        <div class="product-content">
                          <div class="course-group d-flex">
                            <div class="course-group-img d-flex">
                              <a href="/instructor/instructor-profile"
                                ><img
                                  src="@/assets/img/user/user1.jpg"
                                  alt="Img"
                                  class="img-fluid"
                              /></a>
                              <div class="course-name">
                                <h4>
                                  <a href="/instructor/instructor-profile"
                                    >Nicole Brown</a
                                  >
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div
                              class="course-share d-flex align-items-center justify-content-center"
                            >
                              <a href="#"
                                ><i class="fa-regular fa-heart color-active"></i
                              ></a>
                            </div>
                          </div>
                          <h3 class="title instructor-text">
                            <router-link to="/course/course-details"
                              >Introduction to Programming- Python &
                              Java</router-link
                            >
                          </h3>
                          <div class="course-info d-flex align-items-center">
                            <div class="rating-img d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>10+ Lesson</p>
                            </div>
                            <div class="course-view d-flex align-items-center">
                              <img
                                src="@/assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>70hr 30min</p>
                            </div>
                          </div>
                          <div class="rating mb-0">
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <i class="fas fa-star filled me-1"></i>
                            <span class="d-inline-block average-rating"
                              ><span>5.0</span> (13)</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Course Grid -->
                </div>
              </div>
            </div>
          </div>

          <div class="dash-pagination">
            <div class="row align-items-center">
              <div class="col-6">
                <p>Page 1 of 2</p>
              </div>
              <div class="col-6">
                <ul class="pagination">
                  <li class="active">
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#"><i class="bx bx-chevron-right"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Instructor Wishlist -->
      </div>
    </div>
  </div>
  <layouts1></layouts1>
</template>
<script>
export default {
  data() {
    return {
      title: "Wishlist",
      text: "Home",
      text1: "Wishlist",
    };
  },
};
</script>

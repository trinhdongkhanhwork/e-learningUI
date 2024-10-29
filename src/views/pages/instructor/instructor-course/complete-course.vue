<template>
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
                src="@/assets/img/course/course-04.jpg"
              />
            </router-link>
            <div class="price">
              <h3>$65 <span>$70.00</span></h3>
            </div>
          </div>
          <div class="product-content">
            <h3 class="title instructor-text">
              <router-link to="/course/course-details"
                >Learn Angular Fundamentals From beginning to advance lavel</router-link
              >
            </h3>
            <div class="course-info d-flex align-items-center">
              <div class="rating-img d-flex align-items-center">
                <img src="@/assets/img/icon/icon-01.svg" alt="Img" />
                <p>15+ Lesson</p>
              </div>
              <div class="course-view d-flex align-items-center">
                <img src="@/assets/img/icon/icon-02.svg" alt="Img" />
                <p>80hr 40min</p>
              </div>
            </div>
            <div
              class="course-edit-btn d-flex align-items-center justify-content-between"
            >
              <a href="#"><i class="bx bx-edit me-2"></i>Edit</a>
              <a href="#"><i class="bx bx-trash me-2"></i>Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Course Grid -->
  </div>
</template>

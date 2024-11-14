<template>
  <div class="table-responsive custom-table">
    <table class="table table-nowrap mb-0">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Course Name</th>
          <th>Date</th>
          <th>Price</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="javascript:void(0);" class="tab-title">#2643</a></td>
          <td>
            <router-link to="/course/course-details" class="tab-title title-course"
              >Build Responsive Real World Websites with HTML5 and CSS3</router-link
            >
          </td>
          <td>March 24, 2024</td>
          <td>$34</td>
          <td>On Hold</td>
          <td>
            <a href="javascript:void(0);" class="action-icon"
              ><i class="bx bxs-download"></i
            ></a>
          </td>
        </tr>
        <tr>
          <td><a href="javascript:void(0);" class="tab-title">#2644</a></td>
          <td>
            <router-link to="/course/course-details" class="tab-title title-course"
              >Sketch from A to Z (2024): Become an app designer</router-link
            >
          </td>
          <td>March 26, 2024</td>
          <td>$40</td>
          <td>On Hold</td>
          <td>
            <a href="javascript:void(0);" class="action-icon"
              ><i class="bx bxs-download"></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

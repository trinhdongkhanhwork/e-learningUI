<template>
    <div>
        <div class="header-menu">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <nav class="navbar navbar-expand-lg">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul
                                    v-if="userRole === 'INSTRUCTOR'"
                                    class="navbar-nav ml-auto gap-3">
                                    <li class="nav-item">
                                        <router-link to="/" class="nav-link">Home</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link to="/about" class="nav-link">About</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link to="/services" class="nav-link">Services</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link to="/contact" class="nav-link">Contact</router-link>
                                    </li>
                                </ul>

                                <ul
                                    v-else-if="userRole === 'STUDENT'"
                                    class="navbar-nav ml-auto gap-3">
                                    <li class="nav-item">
                                        <router-link to="/" class="nav-link">Home</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link to="/course/course-list" class="nav-link">Courses</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link to="/instructor/instructor-list" class="nav-link">Instructors</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link to="/contact" class="nav-link">Teach on CFD-LMS</router-link>
                                    </li>
                                    <li class="nav-item">
                                      <router-link to="/student/student-dashboard" class="nav-link">Dashboard</router-link>
                                    </li>
                                </ul>

                                <ul
                                    v-else-if="userRole === 'ADMIN'"
                                    class="navbar-nav ml-auto gap-3">
                                  <li class="nav-item">
                                    <router-link to="/" class="nav-link">Home</router-link>
                                  </li>
                                  <li class="nav-item">
                                    <router-link to="/admin/approval-course" class="nav-link">Approval Courses</router-link>
                                  </li>
                                  <li class="nav-item">
                                    <router-link to="/admin/approval-instructors" class="nav-link">Approval Instructors</router-link>
                                  </li>
                                  <li class="nav-item">
                                    <router-link to="/admin" class="nav-link">Dashboard</router-link>
                                  </li>
                                </ul>

                                <ul
                                    v-else
                                    class="navbar-nav ml-auto gap-3">
                                  <li class="nav-item">
                                    <router-link to="/" class="nav-link">Home</router-link>
                                  </li>
                                  <li class="nav-item">
                                    <router-link to="/course/course-list" class="nav-link">Courses</router-link>
                                  </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";

export default {
    data() {
        const store = useStore();
        const userRole = store.state.userInfo?.roleEntity.roleName;
        return {
            userRole,
        }
    },
}
</script>

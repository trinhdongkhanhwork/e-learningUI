<template>
  <div class="row">
    <login-banner></login-banner>
    <div class="col-md-6 login-wrap-bg">
      <div class="login-wrapper">
        <div class="loginbox">
          <div class="img-logo">
            <img src="@/assets/img/logo.svg" class="img-fluid" alt="Logo"/>
            <div class="back-home">
              <router-link to="/home/">Back to Home</router-link>
            </div>
          </div>
          <h1>Sign up</h1>
          <Form
              class="register"
              @submit="submitForm"
              :validation-schema="schema"
              v-slot="{ errors }"
          >
            <div class="form-group">
              <label class="form-control-label">Full Name</label>
              <Field name="fullname" type="text" class="form-control" placeholder="Enter your Full Name"
                     :class="{ 'is-invalid': errors.fullname }"/>
              <div class="invalid-feedback">{{ errors.fullname }}</div>
            </div>

            <div class="form-group">
              <label class="form-control-label">Username</label>
              <Field name="username" type="text" class="form-control" placeholder="Enter your Username"
                     :class="{ 'is-invalid': errors.username }"/>
              <div class="invalid-feedback">{{ errors.username }}</div>
            </div>

            <div class="form-group">
              <label class="form-control-label">Email</label>
              <Field name="email" type="text" class="form-control" placeholder="Enter your Email"
                     :class="{ 'is-invalid': errors.email }"/>
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>

            <div class="form-group">
              <label class="form-control-label">Password</label>
              <Field name="password" type="password" class="form-control" placeholder="Enter your Password"
                     :class="{ 'is-invalid': errors.password }"/>
              <div class="invalid-feedback">{{ errors.password }}</div>
            </div>

            <div class="form-group">
              <label class="form-control-label">Birthday</label>
              <Field name="birthday" type="date" class="form-control"/>
            </div>

            <div class="form-group">
              <label class="form-control-label">Gender</label>
              <Field as="select" name="gender" class="form-control">
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Field>
            </div>

            <div class="form-group">
              <label class="form-control-label">Phone</label>
              <Field name="phone" type="text" class="form-control" placeholder="Enter your Phone Number"/>
            </div>

            <div class="form-group">
              <label class="form-control-label">Avatar</label>
              <input type="file" @change="onFileSelected" class="form-control"/>
            </div>

            <div class="form-check remember-me">
              <label class="form-check-label mb-0">
                <input class="form-check-input" type="checkbox" name="remember"/>
                I agree to the
                <router-link to="/pages/term-condition">Terms of Service</router-link>
                and
                <router-link to="/pages/privacy-policy">Privacy Policy.</router-link>
              </label>
            </div>

            <div class="d-grid">
              <button class="btn btn-primary btn-start" type="submit">Create Account</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Form, Field} from "vee-validate";
import * as Yup from "yup";

export default {
  data() {
    return {
      avatarFile: null,
    };
  },
  components: {
    Form,
    Field,
  },
  setup() {
    const schema = Yup.object().shape({
      fullname: Yup.string().required("Full Name is required"),
      username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
      email: Yup.string().email("Email is invalid").required("Email is required"),
      password: Yup.string().required("Password is required").min(3, "Password must be at least 3 characters"),
      birthday: Yup.date().required("Birthday is required"),
      gender: Yup.string().required("Gender is required"),
      phone: Yup.string().required("Phone is required").max(10, "Phone number length exceeds the limit of 10 numbers "),
    });

    return {schema};
  },
  methods: {
    onFileSelected(event) {
      this.avatarFile = event.target.files[0];
    },

    async uploadAvatar() {
      const formData = new FormData();
      formData.append("img", this.avatarFile);

      try {
        const response = await fetch("http://localhost:8080/api/s3/upload/image", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data.result.urlImg)
        localStorage.setItem("avatarUrl", data.result.urlImg);
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        throw new Error("Avatar upload failed");
      }
    },

    async submitForm(values, {resetForm}) {
      try {
        if (this.avatarFile) {
          await this.uploadAvatar();
        }

        const avatarUrl = localStorage.getItem("avatarUrl");

        const userData = {
          ...values,
          avatarUrl,
        };

        const response = await fetch("http://localhost:8080/users", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(userData),
        });
        const result = await response.json();

        if (result.code === 1000) {
          alert("User registered successfully!");
          this.$router.push("/");
          localStorage.removeItem("avatarUrl");
        } else{
          alert("Username or email is already in use.");
          resetForm({
            values: {
              ...values,
              username: "",
              email: "",
              password: "",
            },
          });
          localStorage.removeItem("avatarUrl");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        alert("An error occurred during registration.");
        localStorage.removeItem("avatarUrl");
      }
    },
  },
};
</script>


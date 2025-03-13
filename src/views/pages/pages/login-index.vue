<template>
  <div class="row">
    <login-banner></login-banner>

    <div class="col-md-6 login-wrap-bg">
      <!-- Login -->
      <div class="login-wrapper">
        <div class="loginbox">
          <div class="w-100">
            <div class="img-logo">
              <img src="@/assets/img/logo.svg" class="img-fluid" alt="Logo" />
              <div class="back-home">
                <router-link to="/home/">Back to Home</router-link>
              </div>
            </div>
            <h1>Sign into Your Account</h1>
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
              <div class="input-block">
                <label class="form-control-label">Email</label>
                <div class="form-addons">
                  <Field
                    name="email"
                    type="text"
                    value="example@dreamstechnologies.com"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                  />
                  <div class="invalid-feedback">{{ errors.email }}</div>
                  <div class="emailshow text-danger" id="email"></div>
                </div>
              </div>
              <div class="input-block">
                <label class="form-control-label">Password</label>
                <div class="pass-group">
                  <Field
                    name="password"
                    :type="showPassword ? 'text' : 'password'"
                    value="123456"
                    class="form-control pass-input mt-2"
                    :class="{ 'is-invalid': errors.password }"
                  />
                  <span @click="toggleShow" class="toggle-password"
                  :class="{
                      'feather-eye': showPassword,
                      'feather-eye-off': !showPassword,
                    }"
                  >
                  </span>
                  <div class="invalid-feedback">{{ errors.password }}</div>
                  <div class="emailshow text-danger" id="password"></div>
                </div>
              </div>
              <div class="forgot">
                <span
                  ><a class="forgot-link" href="forgot-password"
                    >Forgot Password ?</a
                  ></span
                >
              </div>
              <div class="remember-me">
                <label class="custom_check mr-2 mb-0 d-inline-flex remember-me">
                  Remember me
                  <input type="checkbox" name="radio" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="d-grid">
                <router-link to="/home/" class="btn btn-primary btn-start"> Sign In </router-link>
              </div>
            </Form>
          </div>
        </div>
        <div class="google-bg text-center">
          <span><a href="#">Or sign in with</a></span>
          <div class="sign-google">
            <ul>
              <li>
                <a href="#"
                  ><img
                    src="@/assets/img/net-icon-01.png"
                    class="img-fluid"
                    alt="Logo"
                  />
                  Sign In using Google</a
                >
              </li>
              <li>
                <a href="#"
                  ><img
                    src="@/assets/img/net-icon-02.png"
                    class="img-fluid"
                    alt="Logo"
                  />Sign In using Facebook</a
                >
              </li>
            </ul>
          </div>
          <p class="mb-0">
            New User ? <router-link to="register">Create an Account</router-link>
          </p>
        </div>
      </div>
      <!-- /Login -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { router } from "@/router";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      showPassword: false,
      password: null,
      emailError: "",
      passwordError: "",
    };
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
  },
  setup() {
    let users = localStorage.getItem("storedData");
    if (users === null) {
      let password = [
        {
          email: "example@dreamstechnologies.com",
          password: "123456",
        },
      ];
      const jsonData = JSON.stringify(password);
      localStorage.setItem("storedData", jsonData);
    }
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required").email("Email is invalid"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });
    const onSubmit = (values) => {
      document.getElementById("email").innerHTML = "";
      document.getElementById("password").innerHTML = "";
      let data = localStorage.getItem("storedData");
      var Pdata = JSON.parse(data);
      const Eresult = Pdata.find(({ email }) => email === values.email);
      if (Eresult) {
        if (Eresult.password === values.password) {
          router.push("/home/");
        } else {
          document.getElementById("password").innerHTML = "Incorrect password";
        }
      } else {
        document.getElementById("email").innerHTML = "Email is not valid";
      }
    };
    return {
      schema,
      onSubmit,
      checked: ref(false),
    };
  },
};
</script>
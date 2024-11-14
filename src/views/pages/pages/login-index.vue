<template>
  <div class="row">
    <login-banner></login-banner>

    <div class="col-md-6 login-wrap-bg">
      <!-- Login -->
      <div class="login-wrapper">
        <div class="loginbox">
          <div class="w-100">
            <div class="img-logo">
              <img src="@/assets/img/logo.svg" class="img-fluid" alt="Logo"/>
              <div class="back-home">
                <router-link to="/home/">Back to Home</router-link>
              </div>
            </div>
            <h1>Sign into Your Account</h1>
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
              <div class="input-block">
                <label class="form-control-label">Username</label>
                <div class="form-addons">
                  <Field
                      name="username"
                      type="text"
                      v-model="form.username"
                      class="form-control"
                      :class="{ 'is-invalid': errors.username }"
                  />
                  <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
              </div>
              <div class="input-block">
                <label class="form-control-label">Password</label>
                <div class="pass-group">
                  <Field
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      v-model="form.password"
                      class="form-control pass-input mt-2"
                      :class="{ 'is-invalid': errors.password }"
                  />
                  <span
                      @click="toggleShow"
                      class="toggle-password"
                      :class="{
                      'feather-eye': showPassword,
                      'feather-eye-off': !showPassword,
                    }"
                  ></span>
                  <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
              </div>
              <div class="forgot">
                <span>
                  <a class="forgot-link" href="forgot-password">Forgot Password ?</a>
                </span>
              </div>
              <div class="remember-me">
                <label class="custom_check mr-2 mb-0 d-inline-flex remember-me">
                  Remember me
                  <input type="checkbox" name="radio"/>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-start">Sign In</button>
              </div>
            </Form>
          </div>
        </div>
        <div class="google-bg text-center">
          <span><a href="#">Or sign in with</a></span>
          <div class="sign-google">
            <ul>
              <li>
                <a @click.prevent="redirectToGoogleLogin"><img src="@/assets/img/net-icon-01.png" class="img-fluid" alt="Logo"/>
                  Sign In using Google
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="@/assets/img/net-icon-02.png" class="img-fluid" alt="Logo"/>
                  Sign In using Facebook
                </a>
              </li>
            </ul>
          </div>
          <p class="mb-0">
            New User?
            <router-link to="register">Create an Account</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {Form, Field} from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
import {OAuthConfig} from "@/config/OAuthConfig";
import { useStore } from "vuex";
import baseApi from "@/axios";

export default {
  components: {Form, Field},
  setup() {
    const router = useRouter();
    const store = useStore();
    const form = ref({
      username: "",
      password: "",
    });
    const showPassword = ref(false);

    const schema = Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    });

    const toggleShow = () => {
      showPassword.value = !showPassword.value;
    };

    const onSubmit = async () => {
      baseApi
          .post("/authentication/token", form.value)
          .then((response) => {
            const token = response.data.result.token;
            localStorage.setItem("token", token);
            checkTokenValidity();
          })
          .catch((error) => {
            console.error("Error during authentication:", error);
          });
    };

    const redirectToGoogleLogin = () => {
      const callbackUrl = OAuthConfig.redirectUri;
      const authUrl = OAuthConfig.authUri;
      const googleClientId = OAuthConfig.clientId;

      const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
          callbackUrl
      )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

      window.location.href = targetUrl;
    };

    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.post("http://localhost:8080/authentication/introspect",{ token });
          console.log(response.data.result.valid);
          if (response.data.result.valid) {
            const handleRedirect = await baseApi.get("/users/myInfo")
            console.log(handleRedirect)
            store.commit("setUserInfo", handleRedirect.data.result)
            router.push("/home");
          }else {
            console.error("Token is invalid");
            localStorage.removeItem("token");
            store.commit("clearUserInfo");
          }
        } catch (error) {
          console.error("Token introspection failed:", error);
        }
      }
    };

    onMounted(() => {
      checkTokenValidity();
    });

    return {
      form,
      schema,
      showPassword,
      toggleShow,
      onSubmit,
      redirectToGoogleLogin,
    };
  },
};
</script>

<style scoped>
/* Style your login page here */
</style>

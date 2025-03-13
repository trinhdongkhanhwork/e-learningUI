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
          <h1>Forgot Password ?</h1>
          <div class="reset-password">
            <p>Enter your email to reset your password.</p>
          </div>
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <div class="input-block">
              <label class="form-control-label">Email</label>
              <Field
                  name="email"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.email }"
              />
            </div>
            <div class="d-grid">
              <button class="btn btn-start" type="submit">Submit</button>
            </div>
          </Form>
          <div v-if="emailError" class="error-message">{{ emailError }}</div>
        </div>
      </div>
    </div>

    <!-- OTP Dialog -->
    <div v-if="showOtpDialog" class="otp-dialog">
      <div class="dialog-content">
        <h2>Enter OTP</h2>
        <p>Please enter the 6-digit OTP sent to your email.</p>
        <input
            v-model="otp"
            type="text"
            maxlength="6"
            placeholder="Enter OTP"
            class="otp-input"
            @input="onOtpInput"
        />
        <div class="countdown">Time remaining: {{ countdown }}s</div>
        <button @click="verifyOtp" class="btn btn-verify">Verify OTP</button>
      </div>
    </div>

    <!-- New Password Dialog -->
    <div v-if="showNewPasswordDialog" class="new-password-dialog">
      <div class="dialog-content">
        <h2>Set New Password</h2>
        <p>Please enter your new password.</p>
        <input v-model="newPassword" type="password" placeholder="New Password" class="password-input"/>
        <input v-model="confirmPassword" type="password" placeholder="Re-enter Password" class="password-input"/>
        <button @click="resetPassword" class="btn btn-reset">Reset Password</button>
      </div>
    </div>
  </div>
</template>

<script>
import {Form, Field} from "vee-validate";
import * as Yup from "yup";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      emailError: "",
      showOtpDialog: false,
      showNewPasswordDialog: false,
      otp: "",
      newPassword: "",
      confirmPassword: "",
      countdown: 30,
      timer: null,
      otpValid: false,
    };
  },
  components: {
    Form,
    Field,
  },
  methods: {
    async onSubmit(values) {
      this.emailError = "";
      this.email = values.email;
      this.showOtpDialog = true;
      this.startCountdown();
      try {
        const response = await axios.post("http://localhost:8080/authentication/forgot-password", {
          email: this.email,
        });

        if (response.data.code === 1000) {
          const {hashedOtp, creationTime} = response.data.result;

          localStorage.setItem("hashedOtp", hashedOtp);
          localStorage.setItem("creationTime", creationTime);

        } else {
          this.emailError = "There was an issue processing your request.";
        }
      } catch (error) {
        this.emailError = "Email is not valid or server error.";
      }
    },
    saveOtpToLocalStorage() {
      localStorage.setItem("userOtp", this.otp);
    },
    onOtpInput(event) {
      const input = event.target.value;
      this.otp = input.replace(/[^0-9]/g, '');
    },
    startCountdown() {
      this.countdown = 120;
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.closeOtpDialog();
        }
      }, 1000);
    },
    closeOtpDialog() {
      clearInterval(this.timer);
      this.showOtpDialog = false;
      localStorage.removeItem("hashedOtp");
      localStorage.removeItem("creationTime");
    },
    async verifyOtp() {
      if (!/^\d{6}$/.test(this.otp)) {
        alert("OTP must be a 6-digit number.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/authentication/verify-otp", {
          otp: this.otp,
          hashedOtp: localStorage.getItem("hashedOtp"),
          creationTime: localStorage.getItem("creationTime"),
        });

        if (response.data.result.valid) {
          this.showOtpDialog = false;
          this.showNewPasswordDialog = true;
          this.otpValid = response.data.result.valid;
        } else {
          alert("Invalid OTP");
        }
      } catch (error) {
        alert("OTP verification failed.");
      }
    },
    async resetPassword() {
      if (this.newPassword === this.confirmPassword) {
        try {
          const response = await axios.put(
              `http://localhost:8080/users/updatePassWord/${this.email}/${this.otpValid}`,
              {password: this.newPassword}
          );

          if (response.data.result.response) {
            alert("Password reset successfully");
            localStorage.clear();
            this.showNewPasswordDialog = false;
            this.$router.push("/home");
          } else {
            alert("Failed to reset password.");
          }
        } catch (error) {
          alert("Failed to reset password.");
        }
      } else {
        alert("Passwords do not match.");
      }
    },
  },
  setup() {
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required").email("Email is invalid"),
    });
    return {
      schema,
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>


<style>
.otp-dialog, .new-password-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
}

.dialog-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #FFA500;
  text-align: center;
}

.otp-dialog h2, .new-password-dialog h2 {
  color: #FFA500;
}

.otp-input, .password-input {
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  text-align: center;
  border: 1px solid #FFA500;
}

.countdown {
  margin-top: 10px;
  font-weight: bold;
  color: #FFA500;
}

.btn-verify, .btn-reset {
  margin-top: 15px;
}
</style>

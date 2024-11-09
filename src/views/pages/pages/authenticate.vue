<template>
  <div>
    Đang xác thực...
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();

    const checkAuthCodeInUrl = async () => {
      const authCodeRegex = /[?&]code=([^&]+)/;
      const isMatch = window.location.href.match(authCodeRegex);

      if (isMatch) {
        const authCode = isMatch[1];
        console.log("Found authCode:", authCode);

        try {
          const response = await axios.post(
              `http://localhost:8080/authentication/outbound/authentication?code=${authCode}`
          );

          const token = response.data.result?.token;
          if (token) {
            localStorage.setItem("token", token);
            router.push("/home");
          } else {
            console.error("Authentication failed: No token received.");
            router.push("/login");
          }
        } catch (error) {
          console.error("Authentication request failed:", error);
          router.push("/login");
        }
      } else {
        console.log("No authCode found in the URL.");
        router.push("/login");
      }
    };

    checkAuthCodeInUrl();

    return {};
  },
};
</script>

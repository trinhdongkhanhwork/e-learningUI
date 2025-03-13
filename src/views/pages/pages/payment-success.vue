<template>
  <div class="payment-success-container">
    <div class="payment-success-card">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path fill="#4CAF50" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <h1>Payment Successful!</h1>
      <p class="subtitle">Thank you for your payment. You're all set to begin!</p>
      <router-link to="/home/index" class="btn-home">
        Return to Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccess'
}
</script>

<style scoped>
.payment-success-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.payment-success-card {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
  animation: fadeIn 0.5s ease-in;
}

.success-icon {
  margin-bottom: 1.5rem;
}

h1 {
  color: #4CAF50;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.btn-home {
  display: inline-block;
  padding: 12px 30px;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-home:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .payment-success-card {
    margin: 20px;
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .btn-home {
    padding: 10px 25px;
  }
}
</style>
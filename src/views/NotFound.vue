<template>
    <div class="container d-flex align-items-center justify-content-center">
      <div class="card">
        <img src="https://picsum.photos/400/300" alt="Error 404" class="card-img-top rounded-circle mx-auto mt-3">
        <div class="card-body text-center">
          <h1 class="card-title text-danger display-1 fw-bold">404</h1>
          <p class="card-text h3 text-secondary">Oops! Page not found.</p>
          <router-link to="/" class="btn btn-danger btn-lg mt-3">Go to Homepage</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <!-- <script>
  export default {
    name: "NotFound",
  };
  </script> -->
  
  <style scoped>
  .container {
    height: 100vh;
    background-color: #f7f7f7;
  }
  .card {
    width: 90%;
    max-width: 400px;
    border: none;
    border-radius: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  </style>
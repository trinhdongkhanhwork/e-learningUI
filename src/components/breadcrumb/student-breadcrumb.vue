<template>
  <div class="breadcrumb-bar breadcrumb-bar-info">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-12">
          <div class="breadcrumb-list">
            <h2 class="breadcrumb-title">{{ title }}</h2>
            <nav aria-label="breadcrumb" class="page-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/home/">{{ text }}</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ text1 }}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    text1: {
      type: String,
      default: "",
    },
  },
};
</script>

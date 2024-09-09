<template>
  <div class="main">
    <img src="@/assets/logo.png" alt="" srcset="">
    <h1 class="light">xxy's space</h1>
    <h5 class="light">敬请期待</h5>
  </div>
</template>

<style scoped>
.main {
  margin-top: 100px;
  text-align: center;
}

.light {
  color: #6957f0;
  font-weight: bold;
  text-align: center;
  -webkit-text-fill-color: transparent;
  background:
    linear-gradient(45deg, transparent 35%, rgba(255, 255, 255, 0.6), transparent 65%) no-repeat,
    currentColor;
  background-size: 50%;
  -webkit-background-clip: text;
  animation: saoguang 2s infinite;
}

@keyframes saoguang {
  0% {
    background-position: -100%;
  }

  100% {
    background-position: 200%;
  }
}
</style>

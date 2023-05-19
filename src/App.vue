<template>
  <div class="page">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

export default { components: { Header, Footer } };
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #828282;
}

.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
  margin: 20px 0;
}

.text-white {
  color: #fff;
}
.error-message {
  color: red;
}

@media only screen and (max-width: 900px) {
  .page {
    display: block;
  }
}
</style>

<script setup>
import { onMounted } from 'vue'

let header = null

onMounted(() => {
  header = document.getElementById('site-header')
})

window.onscroll = () => {
  if (document.body.scrollTop >= 150 || document.documentElement.scrollTop >= 150) header.classList.add('transparent')
  else header.classList.remove('transparent');
}
</script>

<template>
  <header id="site-header">
    <div class="container">
      <img :src="require('@/assets/images/logo.svg')">
      <div class="title">
        <strong>Frontend developer</strong> <br />
        <em>Challenge</em>
      </div>
    </div>
  </header>
</template>


<style lang="scss" scoped>
header {
  background-color: $clr-grey;
  height: 60px;
  position: fixed;
  top: 0;
  width: 100vw;

  &.transparent {
    background-color: transparent;
  }

  @media only screen and (min-width: $breakpoint-md) {
    height: 80px;
  }

  .container {
    align-items: center;
    display: flex;
    justify-content: space-between;

    @media only screen and (min-width: $breakpoint-md) {
      padding: 20px 0;
    }

    img {
      width: 140px;

      @media only screen and (min-width: $breakpoint-md) {
        width: 160px;
      }
    }

    .title {
      font-size: 14px;
      text-align: right;

      @media only screen and (min-width: $breakpoint-md) {
        font-size: 16px;
      }
    }
  }
}
</style>

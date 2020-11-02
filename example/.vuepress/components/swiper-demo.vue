<template>
  <div class="about">
    <Swiper :dataList="picArr"></Swiper>
  </div>
</template>

<script>
import Swiper from "../../../src/components/Swiper/Swiper";
// import licenseApi from "@/https/licenseApi.js";
export default {
  data() {
    return {
      picArr: [
        {
          image: "https://img1.sycdn.imooc.com/5ee2efe000013f2f18720764.jpg",
          link: ""
        },
        {
          image: "https://img1.sycdn.imooc.com/5ee24f3000017d0218720764.jpg",
          link: ""
        },
        {
          image: "https://img1.sycdn.imooc.com/5ed9db4c0001b36418720764.jpg",
          link: ""
        },
        {
          image: "https://img1.sycdn.imooc.com/5ee1d3dd00012d7b18720764.jpg",
          link: ""
        },
        {
          image: "https://img1.sycdn.imooc.com/5ee0af4b0001fbda18720764.jpg",
          link: ""
        }
      ]
    };
  },
  components: {
    Swiper
  }
};
</script>
<style lang="scss" scoped>
.about {
  overflow: hidden;
}
</style>

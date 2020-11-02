<template>
  <div class="c-swiper-container">
    <swiper
      ref="mySwiper"
      v-if="dataList.length>0"
      :options="swiperOptions"
      @mouseenter.native="onEnter"
      @mouseleave.native="onLeave"
    >
      <swiper-slide v-for="(item, index) in dataList" :key="index">
        <div>
          <a :href="item.link">
            <img :src="item.image" />
          </a>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "./swiper.css";

export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  name: "carrousel",
  data() {
    return {
      swiperOptions: {
        notNextTick: true, //可以第一时间获取到swiper对象
        observe: true, // 修改swiper元素或者子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: {
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    onEnter() {
      // this.swiper.autoplay.stop();
    },
    onLeave() {
      // this.swiper.autoplay.start();
    }
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(1, 1000, false);
  }
};
</script>
<style lang="scss" scoped>
.c-swiper-container {
  position: relative;
}
.swiper-container {
  width: 100%;
}
.swiper-wrapper {
}
.swiper-slide {
  width: 100% !important;
  img {
    width: 100%;
    height: 398px;
  }
}
// .c-swiper-container /deep/ .swiper-pagination {
//   bottom: 10%;
//   left: 50%;
//   transform: translate3d(-50%, 0, 0);
// }
// .c-swiper-container /deep/ .swiper-pagination-bullet {
//   margin: 0 10px;
//   background-color: #fff;
//   border-radius: 10px;
// }
// .c-swiper-container /deep/ .swiper-pagination-bullet-active {
//   width: 24px;
//   background-color: #fff;
// }
</style>
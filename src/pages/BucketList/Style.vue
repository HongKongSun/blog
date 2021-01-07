<template>
  <div class="list-item ">
    <ul v-if="item.status == 'todo'">
      <li>
        <section class="header">
          <span class="text-overflow">
            <i class="el-icon-s-flag" />

            <span>
              {{ item.name }}
            </span>
          </span>

          <span class="date">{{ getDate(item.date) }}</span>
        </section>
      </li>
    </ul>

    <el-timeline v-else>
      <el-timeline-item :timestamp="getDate(item.date)" placement="top">
        <!-- <el-card> -->
        <div class="text-title">
          {{ item.name }}
        </div>

        <!-- <el-card class="title" shadow="always"> -->
        <el-carousel
          v-if="item.imgs"
          type="card"
          arrow="always"
          indicator-position="outside"
          height="400px"
        >
          <el-carousel-item
            class="img-wrapper"
            :key="img"
            v-for="img in item.imgs"
          >
            <el-image class="img" :src="img" fit="contain" alt="img">
              <div slot="placeholder" class="img-slot">
                <i class="el-icon-loading"></i>
              </div>
              <div slot="error" class="img-slot">
                load error ？
              </div>
            </el-image>
          </el-carousel-item>
        </el-carousel>

        <iframe
          v-else
          class="iframe"
          frameborder="no"
          allowfullscreen
          mozallowfullscreen
          webkitallowfullscreen
          :src="item.video"
        ></iframe>
        <el-divider />
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
// import "./video.js";
import { DATE } from "../../lib/date.js";

export default {
  data() {
    return {
      show: false,
    };
  },
  components: {},

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {},
  mounted() {
    console.log(this.item);
  },
  methods: {
    showImages() {
      if (this.item.status === "done") {
        this.show = !this.show;
      }
    },
    getDate(rawDate) {
      return dayjs(rawDate).format(DATE);
    },
  },
};
</script>

<style scoped lang="scss">
.list-item {
  margin: 12px 0;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    i {
      font-weight: bold;
      margin-right: 8px;

      &.el-icon-check {
        color: #67c23a;
      }

      &.el-icon-s-flag {
        color: #f56c6c;
      }
    }

    .title {
      transition: all 0.3s;
      &.selected {
        font-size: 1.2em;
      }

      &.done {
        color: #409eff;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
    .date {
      text-align: right;
      min-width: 30%;
    }
  }

  .img {
    &-slot {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-wrapper {
      text-align: center;
    }

    i {
      font-size: 2em;
    }

    width: 100%;
    height: 100%;
  }
}
.text-title {
  color: #909399;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 30px 10px 10px;
}
.el-timeline {
  padding-left: 0.2rem;
}
::v-deep .el-timeline-item__wrapper {
  padding-left: 15px;
  top: -6px;
}
::v-deep .el-timeline-item__timestamp {
  font-size: 16px;
  font-weight: bold;
}
.el-divider--horizontal {
  height: 2px;
}
.iframe {
  width: 100%;
  height: 500px;
}
// 手机情况
@media only screen and (max-width: 600px) {
  .iframe {
    width: 100%;
    height: 200px;
  }
}
</style>

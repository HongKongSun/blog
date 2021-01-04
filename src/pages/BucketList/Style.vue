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
                加载失败，可能没有翻墙？
              </div>
            </el-image>
          </el-carousel-item>
        </el-carousel>
        <!-- </el-card> -->
        <el-divider></el-divider>
        <!-- </el-card> -->
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
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
  padding: 10px 30px;
}
::v-deep .el-timeline-item__timestamp {
  font-size: 16px;
  font-weight: bold;
}
</style>

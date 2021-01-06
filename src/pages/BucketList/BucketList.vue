<template>
  <div class="bucket-list">
    <h1>
      <span v-if="type == 'done'">Life-Style</span>
      <span v-if="type == 'todo'">待完成</span>
      <span>
        <el-radio v-model="type" label="done">Life</el-radio>
        <el-radio v-model="type" label="todo">Flag</el-radio>
      </span>
    </h1>

    <Style v-for="item in filterBucketList" :item="item" :key="item.title" />
  </div>
</template>

<script>
import Vue from "vue";
import Style from "./Style.vue";
import bucketList from "../../db/bucketList.js";
export default {
  data() {
    return {
      type: "done",
    };
  },
  components: { Style },

  computed: {
    filterBucketList() {
      console.log(this.type);
      return bucketList.filter((item) => item.status === this.type);
    },
  },
};
</script>

<style scoped lang="scss">
.bucket-list {
  h1 {
    display: flex;
    justify-content: space-between;

    span {
      display: flex;
      align-items: center;
    }
  }

  &-image {
    text-align: center;
  }
}
</style>

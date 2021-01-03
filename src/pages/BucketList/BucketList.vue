<template>
    <div class="bucket-list">
        <h1>
            <span v-if="type=='done'">已完成</span>
            <span v-if="type=='todo'">待完成</span>

            <span>
              <el-radio v-model="type" label="done">已完成</el-radio>
              <el-radio v-model="type" label="todo">还在立Flag</el-radio>
            </span>
        </h1>

        <ul class="bucket-list-content">
            <list-item v-for="item in filterBucketList" :item="item" :key="item.title"></list-item>
        </ul>
    </div>
</template>

<script>
  import Vue from 'vue'
  // import {Component} from 'vue-property-decorator'

  import bucketList from '../../db/bucketList.js'
  import ListItem from './ListItem.vue'
  export default {
  data() {
    return {
      type:'done'
    };
  },
  components: {ListItem},

  computed: {
    filterBucketList() {
      return bucketList.filter(item => item.status === this.type)
    }},

  methods: {
    
  },
};

  // @Component({
  //   components: {ListItem}
  // })
  // export default class BucketList extends Vue {
  //   type = 'done'

  //   
  // }
  
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

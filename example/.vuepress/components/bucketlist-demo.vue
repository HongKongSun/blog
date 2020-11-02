<template>
  <div class="about">
    <BucketList />
  </div>
</template>

<script>
import BucketList from "../../../src/pages/BucketList/BucketList";
// import licenseApi from "@/https/licenseApi.js";
export default {
  data() {
    return {
      
    };
  },
  components: {
    BucketList
  }
};
</script>
<style lang="scss" scoped>
.about {
  overflow: hidden;
}
</style>

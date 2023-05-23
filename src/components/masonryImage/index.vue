<template>
  <div class="masonryImage">
    <!-- 进度条 -->
    <div class="demo-progress">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="10" />
    </div>
    <div v-masonry transition-duration="0" item-selector=".item">
      <div class="item" :style="imgStyle" v-masonry-tile v-for="(item, index) in imageBlocks" :key="index">
        <img v-if="item.id !== -1" :src="item.content.url" @click="selectImage(item)">
        <p v-if="showInfo" :style="{ width: imgStyle.width }">
          <span>{{ item.name }}</span>
          <span>{{ item.createTime.substr(0, 10) }}</span>
        </p>
      </div>
    </div>
    <button @click="ons()">dfd</button>
  </div>
</template>
<script setup>
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['selectImage'])
const props = defineProps({
  imageBlocks: Array,
  imgStyle: Object,
  showInfo: {
    type: Boolean,
    default: false,
  }
});
////////////////////////////////////////////////////////////////
const imgs = ref('https://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/upload/gen/image_sd_1683209105.9191358.png')
console.log(props.imageBlocks.length)


///////////////////////////////////////////////////////////////



const selectImage = (item) => {
  emit("selectImage", item);
}
</script>
<style lang="scss" scoped>
// 进度条
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}


div.masonryImage {
  height: 100%;

  div.item {
    padding: 0 2px;
    box-sizing: border-box;

    img {
      width: 100%;
      border-radius: 10px;
      cursor: pointer;
    }

    p {
      height: 20px;
      line-height: 20px;
      padding-right: 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

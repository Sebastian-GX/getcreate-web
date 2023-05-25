<template>
  <div class="masonryImage">
    <!-- 进度条 -->
    <!-- <div class="demo-progress">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="10" />
    </div> -->

    <div v-if="dwg" v-masonry transition-duration="0" item-selector=".item">
      <div class="item" :style="imgStyle" v-masonry-tile v-for="(item, index) in imageBlocks" :key="index">
        <img v-if="item.id !== -1" :src="item.content.url" @click="selectImage(item)">
        <p v-if="showInfo" :style="{ width: imgStyle.width }">
          <span>{{ item.name }}</span>
          <span>{{ item.createTime.substr(0, 10) }}</span>
        </p>
      </div>
    </div>

    <div v-else v-masonry transition-duration="0" item-selector=".item">
      <div class="item" :style="imgStyle" v-masonry-tile v-for="(itemss, index) in num" :key="index">
        <img class="ond" src="../../assets/img/background.jpg" alt="">
        <!-- 进度条 -->
        <el-progress class="one" :stroke-width="8" :percentage="schedule" />
        <!-- </div> -->

      </div>

    </div>
  </div>
</template>
<script setup>
import { defineEmits, defineProps, ref } from 'vue';
// /接口
// import { getHistoryPrompt, getHistoryImage, getStudioProjectID, getStudioProjectResult } from "../../api/project";
const emit = defineEmits(['selectImage'])

const props = defineProps({
  imageBlocks: Array,
  imgStyle: Object,
  showInfo: {
    type: Boolean,
    default: false,
  }
});




let dwg = ref(false)
let num = ref()
setTimeout(() => {
  num.value = props.imageBlocks.length
  setInterval(() => {
    if (schedule.value < 100) {
      schedule.value += 20
    }
  }, 100)
  setTimeout(() => {
    dwg.value = true
  }, 2000)
}, 500)


// const imgs = ref('../../assets/img/background.jpg')
const consts = ref(false)

// 进度条
const schedule = ref(0)




const selectImage = (item) => {
  emit("selectImage", item);
}
</script>
<style lang="scss" scoped>
.ond {
  // width: 100%;
  height: 200px;
}

// 进度条
.demo-progress .el-progress--line {
  margin-bottom: 15px;
}

.one {
  width: 80%;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 10%;
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

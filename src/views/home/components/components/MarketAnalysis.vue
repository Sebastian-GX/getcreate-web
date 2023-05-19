<template>
  <div class="trendInfo">
    <div v-for="(item, index) in data" :key="index" :class="['trendInfoInner' + index]">
      <div style="height: 950px; position: relative" v-if="index == 0">
        <ul>
          <li style="display: flex; height: 486px;margin-bottom: 54.3px;" v-for="(iterm, index_) in data" :key="index_">
            <el-carousel class="carousl" width="100%" height="100%">
              <el-carousel-item v-for="itemc in iterm.imgList" :key="itemc">
                <!-- <h3 style="width: 100%;height: 100%;" class="small justify-center" text="2xl">{{ itemc.url }}</h3> -->
                <el-image class="img_1" :src="itemc.url" style="width: 100%;" fit="cover" />
              </el-carousel-item>
            </el-carousel>
            <div class="div_p" style="height: 486px;position: relative;">
              <h3 style="margin-top: 110.26px;position: relative;">
                {{ iterm.imgList[0].title }}
               
              </h3>
              <p>
                {{ iterm.imgList[0].description}}
                </p>

              <div style="position: absolute;bottom: 0;">查看详情</div>
            </div>
          </li>
        </ul>
      </div>
      <ul class="content" v-if="index > 0">
        <li v-for="(img, index_) in item.imgList" :key="index_" @click="detailBtnClick(img)">
          <el-image :src="img.url" fit="cover" />
          <p class="title">{{ img.title }}</p>
          <p class="description" v-if="index === 0 && index_ !== 2">
            {{ img.description }}
          </p>
        </li>
      </ul>

      <studio-trend-detail  style="z-index: 999;" :dialogVisible="detailDialogVisible" :detailDialogData="detailDialogData"
      @handleCloseDialog="detailDialogVisible = false;" />
    </div>
  </div>
</template>
<script setup>
import { defineProps ,ref} from "vue";
const props = defineProps({ data: Array });


import StudioTrendDetail from "../studioTrendDetailDialog.vue"
let detailDialogVisible = ref(false);
let detailDialogData = ref({});
const detailBtnClick = (item) => {
	console.log(item)
  detailDialogData = item;
  detailDialogVisible.value = true;
}
</script>

<style lang="scss" scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.div_p {
  margin-left: 37px;

}
/* 将轮播图指示器变成圆点 */
:deep(.el-carousel__indicator--horizontal .el-carousel__button) {
  width: 10px;
  height: 10px;
  /* background: transparent; */
  background: greenyellow;
  border: 1px solid #ffffff;
  border-radius: 50%;
  /*不透明度 */
  opacity: 0.5;
}

/* 当前被选中的指示器样式 */
:deep(.el-carousel__indicator--horizontal.is-active .el-carousel__button) {
  width: 10px;
  height: 10px;
  background: yellow;
  border-radius: 50%;
  opacity: 1;
}

:deep(.el-carousel__container) {
  width: 100%;
}

.div_p p {
  position: absolute;
  opacity: 1;
  margin-top: 37px;

  font-size: 16px;
  font-weight: 350;
  letter-spacing: 0em;

  color: #3D3D3D;
}

.div_p h3 {
  /* 为什么黑色总是吸引消费者的注意 */


  opacity: 1;
  display: block;
  font-family: 思源黑体;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 0em;

  color: #3d3d3d;
}

.div_p div {
  /* 查看详文 */
  position: absolute;
  width: 150.31px;
  height: 52.92px;
  opacity: 1;
  font-size: 24px;

  background: #090101;
  position: absolute;
  text-align: center;
  line-height: 48px;
  opacity: 1;


  font-weight: bold;
  letter-spacing: 0em;

  color: #D8D8D8;

}

.carousl {
  /* 矩形 275 */
  width: 812.88px;
  height: 486.47px;
  border-radius: 38px;
  opacity: 1;

  // background: url(矩形 275.jpg);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

div.trendInfo {
  div.title {
    font-family: iconfont logo;
    font-size: 24px;
    font-weight: bold;
    color: #3d3d3d;
    margin: 0px 0 51px 93px;
    letter-spacing: 0em;
  }

  div.trendInfoInner0 {
    margin-bottom: 200px;

    ul.content {
      height: 950px;
      position: relative;

      li {
        width: 345px;
        height: 428px;
        cursor: pointer;

        &:nth-child(1) {
          position: absolute;
          top: 0;
          left: 0;
        }

        &:nth-child(2) {
          position: absolute;
          bottom: 0;
          left: 0;
        }

        &:nth-child(3) {
          width: 710px;
          height: 920px;
          position: absolute;
          top: 0;
          left: 365px;

          .el-image {
            width: 100%;
            height: 899px;
            border-radius: 20px;
          }

          p.title {
            text-align: center;
            font-size: 30px;
            // color: #ffffff;
            color: #3d3d3d;
          }
        }

        &:nth-child(4) {
          position: absolute;
          top: 0;
          right: 0;
        }

        &:nth-child(5) {
          position: absolute;
          bottom: 0;
          right: 0;
        }

        .el-image {
          width: 100%;
          height: 377px;
          border-radius: 20px;
        }

        p.title {
          font-size: 16px;
          font-weight: bold;
          // color: #ffffff;
          color: #3d3d3d;

          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        p.description {
          width: 100%;
          font-size: 16px;
          // color: #ffffff;
          color: #3d3d3d;

          opacity: 0.6;
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  div.trendInfoInner1 {
    ul.content {
      height: 856px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        width: 345px;
        height: 428px;
        cursor: pointer;

        .el-image {
          width: 100%;
          height: 377px;
          border-radius: 20px;
        }

        p {
          width: 100%;
          font-size: 16px;
          font-weight: bold;
          // color: #ffffff;
          color: #3d3d3d;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}</style>
  
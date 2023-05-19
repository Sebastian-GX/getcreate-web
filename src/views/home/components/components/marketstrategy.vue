<template>
	<div>
		<div class="title">{{ props.data[0].type }}</div>
		<div class="swiperbox" style="width: 100%; overflow: hidden;">
			<swiper style="width: 100%;height: 885px;z-index: 0; overflow: scroll;" :slidesPerView="2"
				:slideToClickedSlide="true" :spaceBetween="40" :loop="true" :centeredSlides="true" :pagination="{
					el: '.swiper-pagination',
					clickable: true,
				}" :autoplay="uii" :navigation="true" :modules="modules" @swiper="onSwiper" class="mySwiper">
				<swiper-slide v-for="item, index in props.data[0].imgList " @mouseover="onMouseover"
					@mouseleave="onMousleave" :key="index"><img :src="item.url" style="background-color: red; "
						alt="" /></swiper-slide>
			</swiper>
		</div>
		<div class="titles">{{ props.data[1].type }}</div>


		<ul class="content" v-if="1 > 0">
			<li v-for="(img, index_) in props.data[1].imgList" :key="index_" @click="detailBtnClick(img)">
				<el-image :src="img.url" fit="cover" />
				<p class="title">{{ img.title }}</p>
				<p class="description" v-if="index === 0 && index_ !== 2">
					{{ img.description }}
				</p>
			</li>
		</ul>
		<studio-trend-detail :dialogVisible="detailDialogVisible" :detailDialogData="detailDialogData"
      @handleCloseDialog="detailDialogVisible = false;" />
	</div>
</template>

<script setup>
import { defineProps, ref, onMounted, reactive, toRaw } from 'vue';
const props = defineProps({ data: Array })
console.log(props)
import { Swiper, SwiperSlide } from 'swiper/vue'; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { addMyStyle } from '@/api/project';

import StudioTrendDetail from "../studioTrendDetailDialog.vue"
let detailDialogVisible = ref(false);
let detailDialogData = ref({});
const detailBtnClick = (item) => {
	console.log(item)
  detailDialogData = item;
  detailDialogVisible.value = true;
}

const suolun = ref()

const onSwiper = (swiper) => {
	var { autoplay } = toRaw(swiper)
	suolun.value = autoplay

};
onMounted(() => {
	console.log();
})
// const onSlideChange = e => {
// 	// swiper切换的时候执行的方法
// 	console.log('slide change', e);
// };
// const a=reactive({
//                 delay:500,
//                 disableOnInteraction:true
//             })
const uii = reactive({
	delay: 500,
	disableOnInteraction: false
})
const onMouseover = () => {
	suolun.value.stop()
}
const onMousleave = () => {
	suolun.value.start()

}
// setup语法糖只需要这样创建一个变量就可以正常使用分页器和对应功能，如果没有这个数组则无法使用对应功能
const modules = [Autoplay, Pagination, Navigation, A11y];
</script>
<style lang="scss" scoped>

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


.titles {
	font-size: 24px;
	font-weight: 900;
	margin: 40px 0;
}

.title {
	font-size: 24px;
	font-weight: 900;
	margin-bottom: 40px;
}

:deep(.swiper-button-prev) {
	display: none;
}

:deep(.swiper-button-next) {
	display: none;
}

.swiper-slide {
	width: 400px;
	text-align: center;
	font-size: 18px;
	background: #fff;
	border-radius: 20px;
	z-index: -99999 !important;
	/* Center slide text vertically */
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
}

:deep(::-webkit-scrollbar) {

	width: 0;
	height: 0;

}

.mySwiper img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

/* //这里使用的:deep样式穿透 */
:deep(.swiper-pagination) .swiper-pagination-bullet.swiper-pagination-bullet-active {
	background-color: rgb(229, 180, 127);
}

:deep(.swiper-pagination-bullet) {
	width: 14px;
	height: 14px;
	background-color: #fff;
}

:deep(.swiper-slide) {
	width: 634px !important;
	margin-left: 50px;
	overflow: scroll;

}

/* .swiper-wrapper */
:deep(.swiper-wrapper) {
	width: 2440px;
	height: 885px;
	position: absolute;
}

.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
:deep(.swiper-pagination-horizontal.swiper-pagination-bullets) .swiper-pagination-bullet {
	margin: 0 8px;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
	color: rgb(229, 180, 127);
}
</style>


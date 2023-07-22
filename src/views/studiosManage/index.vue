<template>
  <div class="studiosManage">
    <my-header></my-header>
    <div class="content">
      <div v-if="unseMain.youkonwme">
        <div class="Heads">
          <el-avatar :size="120" :src="userStore.userInfo.avatarPath" />
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="handleBeforeUpload"
            :http-request="handleFileUpload">
            <div class="upload"></div>
          </el-upload>
        </div>
        <p class="author">
          <span>test</span>
        </p>
        <ul class="tab">
          <li :class="{ active: item.value === activeQueryType }" v-for="item in queryTypeList" :key="item.value"
            @click="activeQueryTypes(item)">{{ item.name }}</li>
        </ul>
        <div class="contentArea" style="height: 550px; overflow: auto;">
          <KeepAlive>
            <component :is="tabs[activeQueryType]"></component>
          </KeepAlive>
        </div>
      </div>


      <div class="box" v-else="unseMain.youkonwme">
        <div>
          <ul v-if="asd">
            <!-- <p>{{ unseMain.youkonwme }}</p> -->
            <li v-for="item in paintingStyleList" :key="item.id">
              <el-image style="width: 170px; height: 170px" :src="item.content.url" />
            </li>
          </ul>
        </div>
        <div class="one">
          <div class="transition" style="position: relative; width: 450px; height: 660px;">
            <p class="mincheng">名称</p>
            <input style="width: 100%;" type="text" :placeholder="text">
            <ul style="position: absolute; height: 64px; ">
              <li @click="uploading()">取消</li>
              <li><span class="span">上传并学习画风</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch ,ref,computed,onMounted} from 'vue'
import MyHeader from "../studiosCreate/page/header.vue"
import MyStudio from "./page/myStudio.vue";
import CollectStudio from "./page/collectStudio.vue";
import MyStyle from "./page/myStyle.vue"
import { ElMessage } from 'element-plus';
import { uploadUserAvatar } from "@/api/user";
import { getMyStyle } from "../../api/project";
// import { useMainStore } from "../../stores/pocket";

// const userStores = useMainStore();
// paina
import { useMainStore } from '../../stores/pocket'
import { useUserStore } from "../../stores/user";
import { TreeOptionsEnum } from 'element-plus/es/components/tree-v2/src/virtual-tree';
const unseMain = useMainStore()

const userStore = useUserStore();

// 上传
const uploading = () => {
  unseMain.increments()
}
const text = ref('我的个性化风格口袋1')

let asd = ref(false)
let paintingStyleList = ref()
  
watch(()=>unseMain.youkonwme,(ole,val)=>{
  getMyStyle().then(res=>{
    console.log(res)
    paintingStyleList = res
    asd.value= true
  })
})
onMounted(async () => {
  paintingStyleList = await getMyStyle();
  console.log(paintingStyleList)
  unseMain.correct()
  // asd.value = true

})

const activeQueryTypes = (item) => {
  activeQueryType = item.value
  userStores.increment(item.name)
}


const tabs = {
  MINE: MyStudio,
  COLLECT: CollectStudio,
  paintingStyle: MyStyle,
}

let activeQueryType = $ref("MINE")
let queryTypeList = $ref([
  { name: "我的口袋", value: "MINE" },
  { name: "收藏的口袋", value: "COLLECT" },
  { name: "我的画风", value: "paintingStyle" },
])

const handleBeforeUpload = (file) => {
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
  const whiteList = ["gif", "jpg", "png", "jpeg"];
  if (whiteList.indexOf(fileSuffix.toLowerCase()) === -1) {
    ElMessage.error('文件格式错误！,仅支持 gif jpg png jpeg 格式');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
    return false;
  }
}
onMounted(()=>{

})
//更新头像
const handleFileUpload = ({ file }) => {
  uploadUserAvatar({ avatar: file }).then(res => {
    const { avatarUrl } = res;
    userStore.setAvatarUrl(avatarUrl);
  })
}
</script>
<style lang="scss" scoped>
.span {
  background-color: #860AB8;
  border-radius: 25px;
  color: white;
  padding: 10px;
  cursor: pointer;
}

.one {

  display: flex;
  justify-content: center;
  align-items: center;
}

.transition {
  font-size: 16px;
  background-color: white;
  border-radius: 25px;
  height: 700px;
  color: black;
  padding: 25px;


  input {
    outline: none;
    height: 45px;
    background: #D8D8D8;
    // width: 100%;
    border-radius: 25px;
    line-height: 45px;
    text-indent: 2rem;
    color: black;
    font-size: 18px;
  }

  ul {
    bottom: 0px;
    display: flex;
    justify-content: space-around;

    li {
      padding: 15px;
    }
  }

  .mincheng {
    margin-bottom: 20px;
  }
}

.box {
  display: flex;

  div {
    width: 50%;

    ul {
      width: 100%;
      height: 90vh;
      overflow: auto;

      // display: flex;
      li {
        // width: 50%;
        float: left;
        margin: 0.5%;
        border-radius: 20px;
        overflow: hidden;
        // img {
        //   width: 100%;
        // }
      }
    }
  }
}

.content {
  background: url(https://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/datanew/trend/Images/e45bd31d869c6baf76f909f6ca748a8b.png) no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

div.studiosManage {
  width: 100%;
  height: 100%;
  background: #292929;

  >div.content {
    width: 100%;
    height: calc(100% - 83px);
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    div.Heads {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      margin-top: 20px;
      position: relative;

      .avatar-uploader {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 0;
        top: 0;

        div.upload {
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
      }
    }

    p.author {
      height: 20px;
      line-height: 20px;
      text-align: center;
      margin-top: 20px;
      color: #fff;
    }

    ul.tab {
      width: 380px;
      height: 20px;
      margin: 0 auto;
      margin-top: 30px;
      margin-bottom: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      li {
        text-align: center;
        // flex-basis: 100px;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        &:first-child {
          text-align: left;
        }

        &:last-child {
          text-align: right;
        }

        &.active {
          // color: red;
          // text-decoration: underline;
          padding-bottom: 2px;
          border-bottom: 1px solid white;
        }
      }
    }

    .contentArea {
      width: 1440px;
      flex: 1;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
</style>

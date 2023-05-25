<template>
  <div class="myStyle">
    <div  class="operateGroup">

      <tag-group
        :tagValue="tagValue"
        :tagList="tagList"
        @update:tagValue="handleChangeTag"
      />
  
  
        <el-button type="primary"  @click="centerDialogVisible = true" id="button">上传图片</el-button>
    </div>
    <el-dialog
    v-model="centerDialogVisible"
    title=""
    width="1030"
    :show-close="false"
    style="height:620px;border-radius: 30px;background: #FFFFFF;"
    :modal="false"
    align-center
  >
  <el-upload
    class="upload-demo"
    drag
    action=""
    multiple
    http-request="handleFileUploadType"
  >
    <el-icon class="el-icon--upload" id="filled"><upload-filled /></el-icon>
    <div class="el-upload__text" id="foxtex1">
      拖放或点击批量上传图片用于学习我的画风
    </div>
    <div class="el-upload__text" id="foxtex2">
      我们建议使用每张小于10MB的图片
    </div>
  </el-upload>
      
  </el-dialog>
    <ul class="contentArea">
      <li v-for="item in paintingStyleList" :key="item.id">
        <el-image
          style="width: 170px; height: 170px"
          :src="item.content.url"
          fit="cover" />
      </li>
    </ul>
  </div>
</template>
<script setup name="myStyle">
import { addMyStyle, getMyStyle } from "@/api/project";
import TagGroup from "@/components/tagGroup/index.vue"
import { UploadFilled } from '@element-plus/icons-vue'

const tagValue = "untitledStudio"
const tagList = [
  { name: "未分区画风", value: "untitledStudio" },
]
const centerDialogVisible = ref(false)
let paintingStyleList = $ref([]);
onMounted(async () => {
  paintingStyleList = await getMyStyle();
})

const handleFileUploadType = ({file}) => {
  const params = { file: file };
  addMyStyle(params).then(async (res) => {
    paintingStyleList = await getMyStyle();
  })
}
</script>
<style lang="scss" scoped>
div.myStyle {
  div.operateGroup {
    display: flex;
    margin-bottom: 20px;
  }
  ul.contentArea {
    overflow: hidden;
    li {
      float: left;
      width: 170px;
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
  }
}
#button{
  border: 0px;
  background: #860AB8;
  margin-left: 20px;
  border-radius: 30px;
}
:deep(.el-upload-dragger){
  width: 850px;
  height: 490px;
  margin: 0 auto;
  border-radius: 30px;
opacity: 1;

background: #FFFFFF;

box-sizing: border-box;
border: 1px dashed #000000;
}
#filled{
  margin-top: 154px;
}
#foxtex1{
  font-family: 思源黑体;
font-size: 20px;
font-weight: bold;
letter-spacing: 0em;

color: #3D3D3D;
}
#foxtex2{
  font-family: 思源黑体;
font-size: 20px;
font-weight: normal;
letter-spacing: 0em;

color: #3D3D3D;margin-top: 63px;
}

</style>

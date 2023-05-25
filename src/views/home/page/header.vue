<template>
  <div class="header">
    <img src="../../../assets/img/home_logo_white.png" alt="" />
    <el-space :size="50">
      <div :class="['btn', { active: activeBtn === 'homeView' }]" @click="dumpImage('homeView')">
        Home
      </div>
      <div :class="['btn', { active: activeBtn === 'fashionTrend' }]" @click="dumpImage('fashionTrend')">
        Trend
      </div>
      <div :class="['btn', { active: activeBtn === 'studiosManage' }]" @click="dumpImage('studiosManage')">
        Pocket
      </div>
    </el-space>
    <el-input v-model="prompt" v-if="InputDate" class="w-50 m-2 inputHead">
      <template #prefix>
        <div style="padding:20px  10px 10px 10px;">
          <img style="

width: 20px;
height: 20px;
opacity: 1;
vertical-align: center;
" src="../../../assets/img/home_paint.svg" alt="">
        </div>
      </template>
      <template #suffix>
        <div id="headButton" @click="Create()">Create</div>
      </template>

    </el-input>
    <div>
      <avatar v-if="userStore.token" />
      <el-space :size="10" v-else>
        <div class="login" @click="loginBtnClick">登陆</div>
        <div class="register">注册</div>
      </el-space>
    </div>
  </div>
  <login-dialog :dialogVisible="loginDialogVisible" @handleCloseDialog="loginDialogVisible = false" />
  <create-project-dialog
          :defaultPrompt="prompt"
          :dialogVisible="createDialogVisible"
          @handleCloseDialog="createDialogVisible = false;"
        />
</template>
<script setup>

import LoginDialog from "../components/loginDialog.vue";
import Avatar from "@/components/avatar/index.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import CreateProjectDialog from "../components/createProjectDialog.vue";
import { useRouter } from "vue-router";
// import { Calendar, Search } from '@element-plus/icons-vue'
const input4 = ref('')


// 点击创造
let prompt = ref("穿着黑色毛衣的精致优雅女性")
let createDialogVisible = ref(false);
const Create = ()=>  {
  console.log('你点击了 Create')
  createDialogVisible.value = true;
}

let activeBtn = $ref("homeView");
const InputDate = ref(false)
const router = useRouter();
const dumpImage = (name) => {
  if (name === activeBtn) return;
  activeBtn = name;
  router.push({
    name: name,
  });
};
// 监听当前路由
watch(
  () => router.currentRoute.value,
  (newValue) => {
    console.log('newValue', newValue)
    activeBtn = newValue.name
    if (newValue.name != "homeView") {
      InputDate.value = true
    } else {
      InputDate.value = false

    }
  },
  { immediate: true }
)
//状态管理
const userStore = useUserStore();

//登陆相关
let loginDialogVisible = ref(false);
const loginBtnClick = () => {
  loginDialogVisible.value = true;
};
</script>
<style lang="scss" scoped>
#headButton {
  width: 113px;
  height: 30px;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  font-family: 思源黑体;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0em;
  color: #FFFFFF;
  background: #000000;
}

// el-input__wrapper
div.header {
  width: 100%;
  height: 80px;
  background: #101010;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  img {
    width: 110px;
  }

  div.btn {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;

    &.active {
      border-bottom: 1px solid #fff;
    }
  }

  div.login,
  div.register {
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
  }
}

.inputHead {
  width: 612px;
  height: 43px;
  background: #ccc;
}

:deep(.el-input) {
  width: 612px;
  height: 43px;

  border-radius: 20px;
  opacity: 1;

  background: #ffffff;
  --el-input-focus-border: black;
  --el-input-transparent-border: 0 0 0 0px;
  --el-input-border-color: black;
  --el-input-hover-border: 0px !important;
  --el-input-hover-border-color: black;
  --el-input-focus-border-color: black;
  --el-input-clear-hover-color: black;
  box-shadow: 0 0 0 0px !important;
  --el-input-border: 0px;
}

:deep(.el-select .el-input__wrapper.is-focus) {

  box-shadow: 0 0 0 0px !important;
}

:deep(.el-select .el-input.is-focus .el-input__wrapper) {

  box-shadow: 0 0 0 0px !important;
}

// el-input__inner
:deep(.el-input__inner) {
  width: 222px;
  height: 20px;
  margin-top: 2px;
}

:deep(.el-input__wrapper) {

  border-radius: 20px;
}

:deep(.el-select) {
  --el-select-border-color-hover: #fff;
}
</style>

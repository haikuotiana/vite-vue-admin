<template>
  <div class="login-box">
    <div class="login-form">
      <h3>简税系统平台</h3>
      <a-form :model="formState" name="normal_login" :label-col="labelCol" class="login-form" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item label="" name="username">
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="" name="password">
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <div class="form-submit-box">
          <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface FormState {
  username: string;
  password: string;
}
const router = useRouter();
const formState = reactive<FormState>({
  username: '',
  password: '',
});
const labelCol = reactive({
  style: { width: '80px' }
});
const onFinish = (values: any) => {
  console.log('Success:', values, router);
  router.push({
    path: '/index'
  })
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

.login-box {
  width: 100%;
  height: 100%;
  background: rgb(55, 66, 101);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 300px;
}
.login-form h3{
  text-align: center;
  font-size: 25px;
  color: #fff;
  font-weight: 500;
}
.form-submit-box {
  text-align: center;
}
</style>
<style>
.login-form .ant-form-item-label>label {
  color: #fff !important;
}
</style>

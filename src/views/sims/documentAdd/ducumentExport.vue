<template>
  <div class="djexport-box">
    <a-divider>单据导入</a-divider>
    <a-form
      :model="formState"
      name="validate_other"
      v-bind="formItemLayout"
      @finishFailed="onFinishFailed"
      @finish="onFinish"
      labelAlign="left"
      class="djexport-form"
    >
      <a-form-item name="radio-group" v-for="item in radioOption" :label="item.name">
        <a-radio-group v-model:value="formState[item.key]">
          <a-radio v-for="a in item.option" :value="a.value">{{a.label}}</a-radio>
        </a-radio-group>
      </a-form-item>
      <div style="text-align: center;">
        <a-button type="primary" @click="visible=true">
          <template #icon><UploadOutlined/></template>
          选择文件上传
        </a-button>
      </div>
    </a-form>
    <a-modal v-model:visible="visible" :confirm-loading="uploading" title="单据导入" @ok="handleOk">
      <a-upload-dragger v-model:fileList="fileList" :before-upload="beforeUpload" @remove="handleRemove">
        <p class="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p class="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        <p class="ant-upload-hint">支持单次或批量上传</p>
      </a-upload-dragger>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { UploadOutlined, InboxOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import {radioOption} from './optionSetting/ducumentExportOption'
import http from '@/utils/request'
const formItemLayout = {
  labelCol: { span: 8},
  wrapperCol: { span: 16 },
};
const visible = ref<boolean>(false);
const formState = reactive<Record<string, any>>({
  invoiceType:"3",
  tspz:"1",
  jejsfs:"2",
  zdcf:"2",
  cxjs:"1",
  kfxx:"1"
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const handleOk = ()=>{
  const formData = new FormData();
  fileList.value.forEach((file:any) => {
    console.log(file.originFileObj)
    formData.append("file", file.originFileObj);
  });
  console.log(formData,formState);
  uploading.value = true;
  http.post('/uploadFile',formData)
  .then(() => {
    fileList.value = [];
    uploading.value = false;
    message.success('上传成功');
  })
  .catch(() => {
    uploading.value = false;
  });
}
const fileList = ref<any>([]);
const uploading = ref<boolean>(false);
const beforeUpload: UploadProps['beforeUpload'] = file => {
  fileList.value = [...fileList.value, file];
  return false;
};
const handleRemove: UploadProps['onRemove'] = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
</script>
<style scoped>
.djexport-box{
  width: 100%;
  height: 100%;
}
.djexport-form{
  width: 800px;
  box-sizing: border-box;
  margin: 0 auto;
}
.djexport-form .ant-form-item{
  border: 1px solid #efefef;
  border-left: 3px solid #1890ff;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  padding: 10px 10px;
  box-sizing: border-box;
}
</style>


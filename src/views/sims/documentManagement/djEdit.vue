<template>
  <div class="page-wrap">
    <dxSearchForm :formModel="formOtion" :defaultForm="queryForm" @submit="submitForm"></dxSearchForm>
    <dxTable :batchBtn="batchBtn" :queryForm="queryForm" :columns="columns" :requestApi="requestApi" @onCheck="checkFn" @onDel="delFn" @onEdit="editFn" @optionCallback="checkOptionCallback"></dxTable>
  </div>
</template>
<script lang="ts" setup>
  import dxSearchForm from '@/components/dxSearchForm.vue';
  import dxTable from '@/components/dxTable.vue';
  import {formOtion,columns,batchBtn} from './optionSetting/djEdit'
  import {defaultParams} from '@/utils/common.ts'
  import { createVNode } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Modal } from 'ant-design-vue';
  let queryForm = reactive<any>(defaultParams(formOtion))
  interface ReqApi {
    method:string,
    url:string,
    [key:string]:any
  }
  const requestApi = reactive<ReqApi>({
    method:'get',
    url:'/api?noinfo'
  })
  const submitForm = (value:any) =>{
    console.log('查询参数',value)
    queryForm = value
  }
  const checkFn = (data:any)=>{
    console.log('查看数据',data)
  }
  const delFn = (data:any)=>{
    console.log('删除数据',data)
    Modal.confirm({
      title: 'Do you want to delete these items?',
      icon: createVNode(ExclamationCircleOutlined),
      content: data.email,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCancel() {},
    })
  }
  const editFn = (data:any)=>{
    console.log('编辑数据',data)
  }
  const checkOptionCallback = (data:any) =>{
    console.log('批量操作方法接口返回',data)
  }
</script>
<style>
.page-wrap{
  width: 100%;
  height: 100%;
}
</style>

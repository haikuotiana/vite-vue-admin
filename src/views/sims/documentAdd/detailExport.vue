<template>
  <div class="page-wrap">
    <dxSearchForm :formModel="formOtion" :defaultForm="queryForm" @submit="submitForm"></dxSearchForm>
    <dxTable :queryForm="queryForm" :columns="columns" :requestApi="requestApi"></dxTable>
  </div>
</template>
<script lang="ts" setup>
  import dxSearchForm from '@/components/dxSearchForm.vue';
  import dxTable from '@/components/dxTable.vue';
  import {formOtion,columns} from './optionSetting/detailExportOption'
  import {defaultParams} from '@/utils/common.ts'
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
</script>
<style>
.page-wrap{
  width: 100%;
  height: 100%;
}
</style>

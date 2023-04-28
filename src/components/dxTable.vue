<template>
  <div ref="dxTableWrap" class="dx-table-wrap">
    <a-table
    :columns="columns"
    :row-key="(record:any) => record.login.uuid"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
    size="small"
    :scroll="{ y:searchH }"
    ref="dxTable"
    class="ant-table-striped"
    :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
    </template>
  </a-table>
  </div>
</template>
<script lang="ts" setup>
// import type { TableProps } from 'ant-design-vue';
import { usePagination } from 'vue-request';
import useAppStore from '@/store/modules/app'
import http from '@/utils/request'
type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};
// type APIResult = {
//   results: {
//     gender: 'female' | 'male';
//     name: string;
//     email: string;
//     phone: string;
//   }[];
// };
const defaultHeight = ref<number>(0);
const dxTableWrap = ref<any>(null);
const props = defineProps({
  queryForm: {
    type: Object,
    required: false
  },
  columns:{
    type: Array,
    required: true
  },
  requestApi:{
    type: Object,
    required: true
  }
})
let {queryForm,requestApi} = toRefs(props)
console.log(requestApi,requestApi.value.method)
//分页信息
const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));  
const queryData = (params: APIParams) => {
  if(requestApi.value.method=='get'){
    return http.get(requestApi.value.url,{...params,...queryForm?.value});
  }else{
    return http.post(requestApi.value.url,{...params,...queryForm?.value});
  }
};

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(queryData, {
  formatResult: res => res.data.results,
  defaultParams: [
    {
      results: 20,
    },
  ],
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});
// 分页、排序、筛选变化时触发 const handleTableChange: TableProps['onChange'] = 
const handleTableChange = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
) => {
  console.log(pag)
  run({
    results: pag.pageSize!,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};
const onResize = ()=>{
  defaultHeight.value = dxTableWrap.value.clientHeight;
}
// 切换查询form展开/收起 动态计算表格高度
const searchH = computed(() => defaultHeight.value - useAppStore().searchH-20);
onMounted(()=>{
  defaultHeight.value = dxTableWrap.value.clientHeight;
  window.addEventListener("resize", onResize);
})
</script>
<style scoped>
.dx-table-wrap{
  width: 100%;
  height:calc(100% - 60px)
}
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>


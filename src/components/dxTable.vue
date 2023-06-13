<template>
  <div ref="dxTableWrap" class="dx-table-wrap">
    <div class="option-btn" ref="dxOptionBtn">
      <template v-for="(item) in batchBtn">
        <a-button :loading="loadingBtn&&checkedBtn==item.type" @click="checkOptionBtn(item)"  type="primary">
          <template #icon><icon-font :type="item.icon" /></template>
          {{item.name}}
        </a-button>
      </template>
    </div>
    <a-table
      :columns="columns"
      bordered
      :row-key="(record:any) => record.login.uuid"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      @change="handleTableChange"
      size="small"
      :scroll="{ y:searchH }"
      ref="dxTable"
      class="ant-table-striped"
      :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
        <template v-if="column.key === 'operation'">
          <a-button v-for="(b,i) in column.buttonOption" :key="i" :type="b.type" @click="checkBtn(b.callbackName,text)">{{b.name}}</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { usePagination } from 'vue-request';
import useAppStore from '@/store/modules/app'
import http from '@/utils/request'
import { createFromIconfontCN } from '@ant-design/icons-vue'
// 创建 IconFont 组件
const IconFont = createFromIconfontCN({ 
  scriptUrl:'//at.alicdn.com/t/c/font_4033022_a1udwwu360o.js' // iconfont图标库地址【目前使用的在线地址,后续使用本地静态文件】
})
type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};
interface optionType {
  name: string;
  type: string;
  url?: string;
  method?: string;
  icon:string;
}
const defaultHeight = ref<number>(0);
const dxTableWrap = ref<any>(null);
const dxOptionBtn = ref<any>(null);
const loadingBtn = ref<boolean>(false);
const checkedBtn = ref<string>('');
let selectedRowKeys = ref([]);
const props = defineProps({
  queryForm: {
    type: Object,
    required: false
  },
  columns:{
    type: Array,
    required: true
  },
  batchBtn:{
    type: Array as () => optionType[],
    required: false,
    default:[]
  },
  requestApi:{
    type: Object,
    required: true
  }
})
let {queryForm,requestApi} = toRefs(props)
console.log(requestApi,requestApi.value.method)
// const { proxy } = getCurrentInstance();
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

const emits = defineEmits(['onCheck','onDel','onEdit','optionCallback'])
const checkBtn = (name:any,data:any)=>{
  emits(name,data)
}
const checkOptionBtn = (item:any)=>{
  if(selectedRowKeys.value.length<=0){
    message.error(`请选择数据进行${item.name}操作`);
    return;
  }
  let ids= selectedRowKeys.value.join(',')
  if(item.url){//存在url 去调用接口，走统一逻辑，否则就走回调去具体页面处理逻辑
    checkedBtn.value = item.type;
    loadingBtn.value = true;
    if(item.method=='get'){
      http.get(item.url,{ids}).then(res=>{
        console.log(res)
        emits('optionCallback',res.data)
      }).catch(()=>{
        loadingBtn.value = false;
      });;
    }else{
      http.post(item.url,{ids}).then(res=>{
        console.log(res)
        emits('optionCallback',res.data)
      }).catch(()=>{
        loadingBtn.value = false;
      });
    }
  }else{
    loadingBtn.value = false;
    emits('optionCallback',selectedRowKeys)
  }
}
const onSelectChange = (checkKeys:[],rows:[]) => {
  console.log('selectedRowKeys changed: ', checkKeys,rows);
  selectedRowKeys.value = checkKeys
};
const onResize = ()=>{
  if(dxTableWrap.value){
    defaultHeight.value = window.innerHeight - useAppStore().searchH - 100;
  }
}
// 切换查询form展开/收起 动态计算表格高度
let searchH = computed(() => defaultHeight.value - useAppStore().searchH - (dxOptionBtn.value&&dxOptionBtn.value.clientHeight||0) - 30);
onMounted(()=>{
  /*
    面包屑高度 50px 
    margin 20px
    padding 30px
    合计 100px
  */
  defaultHeight.value = window.innerHeight - useAppStore().searchH - 100;//内容区域高度
  console.log(dxOptionBtn.value.clientHeight)
  window.addEventListener("resize", onResize);
})
</script>
<style scoped>
.dx-table-wrap{
  width: 100%;
  /* height:calc(100% - 100px) */
}
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
.option-btn{
  text-align: right;
}
.option-btn .ant-btn{
  margin:10px 0px 10px 10px;
}
</style>


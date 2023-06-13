<template>
  <div class="search-calss" ref="searchBox">
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24" style="flex-wrap:nowrap;">
        <a-col style="flex: 1;">
          <a-row :gutter="24">
            <template v-for="(item,i) in formModel" :key="i">
              <a-col v-show="expand || i <= 3" :span="6">
                <a-form-item :name="item.name" :label="item.label" :rules="item.rules">
                  <a-input v-if="item.type=='input'" v-model:value="formState[item.name]" :placeholder="item.placeholder||'请输入'+item.label" allow-clear></a-input>
                  <a-select v-if="item.type=='select'" v-model:value="formState[item.name]" :mode="item.mode" :placeholder="item.placeholder||'请选择'+item.label">
                    <a-select-option v-for="(o,i) in item.options" :value="o.value" :key="i">{{o.label}}</a-select-option>
                  </a-select>
                  <a-range-picker v-if="item.type=='date'" :locale="locale" v-model:value="formState[item.name]" value-format="YYYY-MM-DD" />
                </a-form-item>
              </a-col>
            </template>
          </a-row>
        </a-col>
        <a-col>
          <a-row>
            <a-col :span="24" style="text-align: right">
              <slot name="customFormBtn">
                <a-button type="primary" html-type="submit">查询</a-button>
                <!-- <a-button style="margin: 0 5px" @click="() => formRef?.resetFields()">清空</a-button> -->
              </slot>
              <a style="font-size: 12px" @click="expand = !expand;changeVisible()" v-if="formModel.length>4">
                <template v-if="expand">
                  <UpOutlined />
                </template>
                <template v-else>
                  <DownOutlined />
                </template>
                {{!expand?'展开':'收起'}}
              </a>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue';
  import {SearchItem} from '@/types/index'
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  import useAppStore from '@/store/modules/app'
  import http from '@/utils/request'
  let props = defineProps({
    formModel: {
      type: Array as () => SearchItem[],
      required: true
    },
    defaultForm:{
      type: Object,
      required: false
    }
  })
  let {formModel,defaultForm} = toRefs(props)
  const expand = ref(false);
  const formRef = ref<FormInstance>();
  const searchBox = ref<any>(null);
  const formState = reactive<any>(defaultForm);
  const emits = defineEmits(['submit'])
  const onFinish = (values: any) => {
    emits('submit', values)
    // console.log('Received values of form: ', values);
    // console.log('formState: ', formState);
  };
  const changeVisible = ()=>{
    setTimeout(()=>{
      let h = searchBox.value.clientHeight;
      console.log('当前查询区域高度',h)
      useAppStore().toggleSarch(h)
    })  
  }
  const queryOptions = (item:any)=>{
    http.get(item.optionsUrl,{}).then(res=>{
      console.log(res.data.results)
      item.options = res.data.results.map((a:any)=>{
        return {
          label:a.gender,
          value:a.cell
        }
      })
    });
  }
  const formSelectOption = ()=>{
    formModel.value.map((item:any)=>{
      if(item.type=='select'&&!item.options){
        queryOptions(item);
      }
    })
  } 
  onMounted(()=>{
    formSelectOption();
    let h = searchBox.value.clientHeight;
    console.log('默认当前查询区域高度',h)
    useAppStore().toggleSarch(h)
  })
</script>
<style>
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  height: 100%;
  text-align: center;
  padding-top: 80px;
}
[data-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
[data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}
.search-calss .ant-btn{
  margin: 0px 5px;
}
</style>

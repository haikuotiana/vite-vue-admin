import {SearchItem} from '@/types/index'

export const batchBtn = [{
  name:"修改",
  type:"edit",
  url:"/api/edit",
  method:"post",
  icon:"icon-caidan"
},{
  name:"删除",
  type:"del",
  url:"/api/del",
  method:"post",
  icon:"icon-caidan"
},{
  name:"明细",
  type:"detail",
  icon:"icon-caidan"
  // url:"/api/detail",
  // method:"post"
},{
  name:"重置",
  type:"reset",
  url:"/api/reset",
  method:"post",
  icon:"icon-caidan"
},{
  name:"未匹配商品",
  type:"shop",
  icon:"icon-caidan"
  // url:"/api/shop",
  // method:"post"
}]
export const formOtion = reactive<SearchItem[]>([{
  type:"select",
  name:"djlx",
  label:"单据类型",
  options:[{
    label:"全部",
    value:''
  },{
    label:"电子发票",
    value:'1'
  },{
    label:"卷式发票",
    value:'2'
  },{
    label:"普通发票",
    value:'3'
  }],
  valueType:'string',
  defaultValue:''
},{
  type:"input",
  name:"djbh",
  label:"单据编号",
  valueType:'string'
},{
  type:"select",
  name:"djlx",
  label:"单据状态",
  options:[{
    label:"有效",
    value:'1'
  },{
    label:"无效",
    value:'2'
  },{
    label:"开具失败",
    value:'3'
  },{
    label:"匹配失败",
    value:'4'
  }],
  valueType:'string',
  defaultValue:''
},{
  type:"date",
  name:"csrq",
  label:"单据日期",
  valueType:'array'
},{
  type:"input",
  name:"djbh",
  label:"客户税号",
  valueType:'string'
},{
  type:"input",
  name:"djbh",
  label:"客户名称",
  valueType:'string'
}])

export const columns = [
  {
    title: '单据编号',
    dataIndex: 'name',
    sorter: true,
    width: '120px',
    align: 'center',
    fixed: 'left',
    ellipsis: true,

  },
  {
    title: '客户名称',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '120px',
    align: 'center',
    fixed: 'left',
    ellipsis: true,
    
  },
  {
    title: '客户税号',
    dataIndex: 'email',
    align: 'center',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '行数',
    dataIndex: 'phone',
    align: 'center',
    width: '120px',
    ellipsis: true,
    
  },
  {
    title: '未税金额',
    dataIndex: 'phone',
    align: 'center',
    width: '120px',
    ellipsis: true,
    
  },
  {
    title: '日期',
    dataIndex: 'phone',
    align: 'center',
    width: '120px',
    ellipsis: true,
    
  },
  {
    title: '单据类型',
    dataIndex: 'phone',
    align: 'center',
    width: '120px',
    ellipsis: true,
    
  },
  {
    title: '客户地址及电话',
    dataIndex: 'phone',
    align: 'center',
    width: '120px',
    ellipsis: true,
    
  },
  {
    title: '备注',
    dataIndex: 'phone',
    align: 'center',
    width: '120px',
    ellipsis: true,
    
  },
  {
    title: '来源',
    dataIndex: 'phone',
    align: 'center',
    width: '120px',
    ellipsis: true,
    
  },
  {
    title: '特殊票种',
    dataIndex: 'phone',
    align: 'center',
    width: '120px',
    ellipsis: true,
    
  },
  {
    title: '失败原因',
    dataIndex: 'phone',
    align: 'center',
    width: '120px',
    ellipsis: true,
    
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 200,
    align: 'center',
    buttonOption:[{
      name:'查看',
      btnId:1,
      callbackName:'onCheck'
    },{
      name:'删除',
      btnId:2,
      callbackName:'onDel',
      type:'link'
    },{
      name:'编辑',
      btnId:3,
      callbackName:'onEdit',
      type:'link'
    }]
  }
];
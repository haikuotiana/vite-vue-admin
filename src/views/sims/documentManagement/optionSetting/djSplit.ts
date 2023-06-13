import {SearchItem} from '@/types/index'
export const formOtion = reactive<SearchItem[]>([{
  type:"input",
  name:"khCode",
  label:"客户代码",
  valueType:'string'
},{
  type:"input",
  name:"khName",
  label:"客户名称",
  valueType:'string'
},{
  type:"input",
  name:"khTaxno",
  label:"客户税号",
  valueType:'string'
},{
  type:"select",
  name:"cslx",
  label:"测试下拉",
  options:[{
    label:"选项1",
    value:'1'
  },{
    label:"选项2",
    value:'2'
  }],
  valueType:'string',
  defaultValue:'2'
},{
  type:"select",
  name:"dtlx",
  label:"动态下拉",
  valueType:'string',
  defaultValue:'2',
  optionsUrl:'/api?noinfo'
},{
  type:"select",
  name:"csdx",
  label:"测试多选",
  options:[{
    label:"选项1",
    value:'1'
  },{
    label:"选项2",
    value:'2'
  }],
  mode:"multiple",
  valueType:'array',
  defaultValue:'1,2'
},{
  type:"date",
  name:"csrq",
  label:"测试日期",
  valueType:'array'
}])

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    align: 'center'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
    align: 'center'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    align: 'center'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    align: 'center'
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
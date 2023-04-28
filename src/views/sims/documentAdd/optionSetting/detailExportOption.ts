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
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
];
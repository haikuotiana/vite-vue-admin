import {SearchItem} from '@/types/index'
export const formOtion = reactive<SearchItem[]>([{
  type:"select",
  name:"cslx",
  label:"特殊票种",
  options:[{
    label:"否",
    value:'1'
  },{
    label:"农产品收购",
    value:'2'
  },{
    label:"成品油",
    value:'3'
  },{
    label:"机动车",
    value:'4'
  }],
  valueType:'string',
  defaultValue:'2',
  rules:[{ required: true}]
},{
  type:"select",
  name:"cslx1",
  label:"发票类型",
  options:[{
    label:"专用发票",
    value:'1'
  },{
    label:"普通发票",
    value:'2'
  },{
    label:"电子发票",
    value:'3'
  },{
    label:"卷式发票",
    value:'4'
  }],
  valueType:'string',
  defaultValue:'2',
  rules:[{ required: true}]
}])
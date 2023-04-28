// 处理逻辑的代码，复用性高的方法汇总文件

// 【默认查询条件处理】
const defaultParams =(formOtion:any)=>{
  let params:any = {};
  formOtion.map((item:any)=>{
    if(item.valueType=='string'){
      params[item.name] = item.defaultValue?item.defaultValue:''
    }else if(item.valueType=='object'){
      params[item.name] = {}
    }else if(item.valueType=='array'){
      params[item.name] = item.defaultValue?item.defaultValue.split(','):[]
    }else{
      params[item.name] = null
    }
  })
  return params
}

export {
  defaultParams
}

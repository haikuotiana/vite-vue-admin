export interface MenuItem {
  key: string;
  title: string;
  name: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
}
export interface optionsType {
  value:string,
  label:string,
}
export interface SearchItem {
  type:string,
  name:string,
  label:string,
  placeholder?:string,
  labelWidth?:string,
  options?:optionsType[],
  mode?:string,
  valueType?:string,
  defaultValue?:string //多选 逗号分隔字符串 单选默认字符串
}


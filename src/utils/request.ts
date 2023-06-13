import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'ant-design-vue';
// 定义接口返回数据的结构
interface ResponseData {
  code: number;
  message: string;
  results: any;
}

// 定义请求配置的接口，继承 AxiosRequestConfig 接口
interface RequestConfig extends AxiosRequestConfig {
  showError?: boolean; // 是否显示错误信息，默认为 true
  ContentType?:string;
}

class HttpRequest {
  private axiosInstance: AxiosInstance;

  constructor() {
    // 创建 Axios 实例，设置基础 URL、超时时间和请求头信息
    this.axiosInstance = axios.create({
      baseURL: 'https://randomuser.me',//接口统一api
      timeout: 1000*60*10,//默认10分钟
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });

    // 添加请求拦截器，在请求发送之前进行一些处理，比如加入 token 等
    this.axiosInstance.interceptors.request.use((config: RequestConfig) => {
      return config;
    }, (error) => {
      // 处理请求错误
      return Promise.reject(error);
    });

    // 添加响应拦截器，在响应被 then 或 catch 处理之前进行一些处理，比如根据接口返回的 code 值进行错误处理
    this.axiosInstance.interceptors.response.use((response: AxiosResponse<ResponseData>) => {
      const { data } = response;
      console.log('接口响应',data,response)
      if (data.code !== 0 && response.config.showError !== false) {
        console.error(data.message);
      }
      return response;
    }, (error) => {
      // 处理响应错误
      console.log('接口异常',error)
      message.error(`接口异常【${error.message}】`);
      return Promise.reject(error);
    });
  }

  // 发送请求的方法，接受一个 RequestConfig 类型的参数，返回一个 Promise 类型的 AxiosResponse
  public request(config: RequestConfig): Promise<AxiosResponse<ResponseData>> {
    return this.axiosInstance.request(config);
  }

  // 发送 GET 请求的方法，接受一个 url 和可选的 params 和 config 参数，返回一个 Promise 类型的 AxiosResponse
  public get(url: string, params?: object, config?: RequestConfig): Promise<AxiosResponse<ResponseData>> {
    return this.axiosInstance.get(url, { params, ...config });
  }

  // 发送 POST 请求的方法，接受一个 url 和可选的 data 和 config 参数，返回一个 Promise 类型的 AxiosResponse
  public post(url: string, data?: object, config?: RequestConfig): Promise<AxiosResponse<ResponseData>> {
    return this.axiosInstance.post(url, data, config);
  }

  // 发送 PUT 请求的方法，接受一个 url 和可选的 data 和 config 参数，返回一个 Promise 类型的 AxiosResponse
  public put(url: string, data?: object, config?: RequestConfig): Promise<AxiosResponse<ResponseData>> {
    return this.axiosInstance.put(url, data, config);
  }

  // 发送 DELETE 请求的方法，接受一个 url 和可选的 config 参数，返回一个 Promise 类型的 AxiosResponse
  public delete(url: string, config?: RequestConfig): Promise<AxiosResponse<ResponseData>> {
    return this.axiosInstance.delete(url, config);
  }
}

// 导出一个实例化后的 HttpRequest 类，方便其他地方使用
export default new HttpRequest();

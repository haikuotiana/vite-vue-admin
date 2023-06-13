<template>
  <div class="page-wrap">
    <dxSearchForm :formModel="formOtion" :defaultForm="queryForm" @submit="submitForm" isCustomFormBtn>
      <template v-slot:customFormBtn>
        <a-button>价格</a-button>
        <a-button>红字</a-button>
        <a-button>折扣</a-button>
        <a-button>差额</a-button>
        <a-button>复制</a-button>
        <a-button html-type="button" @click="saveInfo">保存</a-button>
        <a-button html-type="submit">开具</a-button>
      </template>
    </dxSearchForm>
    <div class="invoice-box">
      <div class="title-box">增值税普通发票</div>
      <div class="bill-form">
        <!-- :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" -->
        <a-form :model="formState" ref="formRef" name="basic" autocomplete="off" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <div class="gf-info">
            <a-row>
              <a-col :span="1" class="tax-text">
                <span>购买方</span>
              </a-col>
              <a-col :span="11">
                <a-form-item label="名称" name="gfmc" has-feedback
                  :rules="[{ required: true, message: '请输入购买方名称' }]">
                  <a-input v-model:value="formState.gfmc" placeholder="购买方名称"/>
                </a-form-item>
                <a-form-item label="纳税人识别号" name="gfnsr"
                  :rules="[{ required: true, message: '请输入购买方纳税人识别号' }]">
                  <a-input v-model:value="formState.gfnsr" placeholder="购买方纳税人识别号"/>
                </a-form-item>
                <a-form-item label="地址、电话" name="gftel"
                  :rules="[{ required: true, message: '请输入购买方地址、电话' }]">
                  <a-input v-model:value="formState.gftel" placeholder="购买方地址、电话"/>
                </a-form-item>
                <a-form-item label="开户行及账号" name="gfkhh"
                  :rules="[{ required: true, message: '请输入购买方开户行及账号' }]">
                  <a-input v-model:value="formState.gfkhh" placeholder="购买方开户行及账号"/>
                </a-form-item>
              </a-col>
              <a-col :span="1"></a-col>
              <a-col :span="11" class="flex-style">
                <a-form-item label="手机号" name="phone"
                  :rules="[{ required: true, message: '请输入购买方手机号' }]">
                  <a-input v-model:value="formState.phone" placeholder="购买方手机号"/>
                </a-form-item>
                <a-form-item label="邮箱" name="email"
                  :rules="[{ required: true, message: '请输入购买方邮箱' }]">
                  <a-input v-model:value="formState.email" placeholder="购买方邮箱"/>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="detail-info">
            <a-table :data-source="formState.detailList" bordered :pagination="false" :scroll="{ y: 300 }">
              <a-table-column data-index="id" :width="50" align="center">
                <template #title>
                  <PlusCircleOutlined @click="addDetail" />
                </template>
                <template #default="{ record }">
                  <MinusCircleOutlined @click="removeDetail(record)" />
                </template>
              </a-table-column>
              <a-table-column data-index="fwmc" align="center" title="货物或应税劳务、服务名称" :width="250">
                <template #default="{ record, index }">
                  <a-form-item :name="['detailList', index, 'fwmc']" :wrapper-col="{ span: 24 }">
                    <a-input v-model:value="record.fwmc"/>
                  </a-form-item>
                </template>
              </a-table-column>
              <a-table-column data-index="ggxh" align="center" title="规格型号">
                <template #default="{ record, index }">
                  <a-form-item :name="['detailList', index, 'ggxh']" :wrapper-col="{ span: 24 }">
                    <a-input v-model:value="record.ggxh"/>
                  </a-form-item>
                </template>
              </a-table-column>
              <a-table-column data-index="dw" align="center" title="单位">
                <template #default="{ record, index }">
                  <a-form-item :name="['detailList', index, 'dw']" :wrapper-col="{ span: 24 }">
                    <a-input v-model:value="record.dw"/>
                  </a-form-item>
                </template>
              </a-table-column>
              <a-table-column data-index="sl" align="center" title="数量">
                <template #default="{ record, index }">
                  <a-form-item :name="['detailList', index, 'sl']" :wrapper-col="{ span: 24 }">
                    <a-input v-model:value="record.sl"/>
                  </a-form-item>
                </template>
              </a-table-column>
              <a-table-column data-index="dj" align="center" title="单价（含税）">
                <template #default="{ record, index }">
                  <a-form-item :name="['detailList', index, 'dj']" :wrapper-col="{ span: 24 }">
                    <a-input v-model:value="record.dj"/>
                  </a-form-item>
                </template>
              </a-table-column>
              <a-table-column data-index="je" align="center" title="金额（不含税）">
                <template #default="{ record, index }">
                  <a-form-item :name="['detailList', index, 'je']" :wrapper-col="{ span: 24 }">
                    <a-input v-model:value="record.je"/>
                  </a-form-item>
                </template>
              </a-table-column>
              <a-table-column data-index="taxRote" align="center" title="税率">
                <template #default="{ record, index }">
                  <a-form-item :name="['detailList', index, 'taxRote']" :wrapper-col="{ span: 24 }">
                    <a-input v-model:value="record.taxRote"/>
                  </a-form-item>
                </template>
              </a-table-column>
              <a-table-column data-index="se" align="center" title="税额">
                <template #default="{ record, index }">
                  <a-form-item :name="['detailList', index, 'se']" :wrapper-col="{ span: 24 }">
                    <a-input v-model:value="record.se"/>
                  </a-form-item>
                </template>
              </a-table-column>
            </a-table>
          </div>
          <div class="xf-info">
            <a-row>
              <a-col :span="1" class="tax-text">
                <span>销售方</span>
              </a-col>
              <a-col :span="11">
                <a-form-item label="名称" name="xfmc"
                  :rules="[{ required: true, message: '请输入名称' }]">
                  <a-input v-model:value="formState.xfmc" />
                </a-form-item>
                <a-form-item label="纳税人识别号" name="xfnsr"
                  :rules="[{ required: true, message: '请输入纳税人识别号' }]">
                  <a-input v-model:value="formState.xfnsr" />
                </a-form-item>
                <a-form-item label="地址、电话" name="xftel"
                  :rules="[{ required: true, message: '请输入地址、电话' }]">
                  <a-input v-model:value="formState.xftel" />
                </a-form-item>
                <a-form-item label="开户行及账号" name="xfkhh"
                  :rules="[{ required: true, message: '请输入开户行及账号' }]">
                  <a-input v-model:value="formState.xfkhh" />
                </a-form-item>
              </a-col>
              <a-col :span="1" class="tax-text"><span>备注</span></a-col>
              <a-col :span="11" class="flex-style">
                <a-form-item name="remark"
                  :wrapper-col="{ span: 24 }"
                  :rules="[{ required: true, message: '请输入备注' }]">
                  <a-textarea v-model:value="formState.remark" :rows="4" placeholder="备注"/>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="footer-info">
            <a-row>
              <a-col :span="6">
                <a-form-item label="收款人" name="skr" :label-col="{ span: 8 }">
                  <a-input v-model:value="formState.skr" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="复核人" name="fhr" :label-col="{ span: 8 }">
                  <a-input v-model:value="formState.fhr" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="开票人" name="kpr" :label-col="{ span: 8 }">
                  <a-input v-model:value="formState.kpr" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <p style="text-align:center;line-height: 40px;">销售方（章）</p>
              </a-col>
            </a-row>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dxSearchForm from '@/components/dxSearchForm.vue';
import { formOtion } from './optionSetting/ducumentEnterOption'
import { defaultParams } from '@/utils/common.ts'
import type { FormInstance } from 'ant-design-vue';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
let queryForm = reactive<any>(defaultParams(formOtion))
const submitForm = (value: any) => {
  console.log('查询参数', value)
  queryForm = value
}
type detailType = {
  fwmc: string;
  ggxh: string;
  dw: string;
  sl: string;
  dj: string;
  je: string;
  taxRote: string;
  se: string;
  id: number;
}
interface FormState {
  gfmc: string;
  gftel: string;
  gfnsr: string;
  gfkhh: string;
  phone: string;
  email: string;
  xfmc: string;
  xftel: string;
  xfnsr: string;
  xfkhh: string;
  remark: string;
  skr:string;
  fhr:string;
  kpr:string;
  detailList: Array<detailType>;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  gfmc: '',
  gftel:'',
  gfkhh:'',
  gfnsr: '',
  phone: '',
  email: '',
  xfkhh: '',
  xfmc:'',
  xfnsr:'',
  xftel: '',
  remark:'',
  skr:'',
  fhr:'',
  kpr:'',
  detailList: [{
    fwmc: "",
    ggxh: "",
    dw:"",
    sl:"",
    dj:"",
    je:"",
    taxRote:"",
    se:"",
    id: Date.now()
  }]
});
const removeDetail = (data: any) => {
  console.log(data)
  let index = formState.detailList.indexOf(data);
  if (index !== -1) {
    formState.detailList.splice(index, 1);
  }
}
const addDetail = () => {
  formState.detailList.push({
    fwmc: "",
    ggxh: "",
    dw:"",
    sl:"",
    dj:"",
    je:"",
    taxRote:"",
    se:"",
    id: Date.now(),
  });
}
const saveInfo = async () =>{
  try {
    const values = await formRef.value?.validateFields();
    console.log('Success:', values);
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
  }
}
</script>
<style>
.page-wrap {
  width: 100%;
  height: 100%;
}

.invoice-box {
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
}

.title-box {
  width: 100%;
  line-height: 60px;
  text-align: center;
  font-size: 25px;
  font-weight: 400;
  color: #333;
}
.gf-info,.detail-info,.xf-info{
  border: 1px solid #ccc;
}
.detail-info,.xf-info{
  border-top: none;
}
.tax-text {
  text-align: center;
  display: flex;
  justify-content: center;
}
.tax-text span {
  writing-mode: vertical-lr;
  font-size: 18px;
}
.flex-style {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.xf-info .flex-style .ant-row,
.xf-info .flex-style .ant-form-item-control-input,
.xf-info .flex-style .ant-form-item-control-input-content,
.xf-info .flex-style .ant-input{
  height: 100%;
}
.footer-info{
  width: 100%;
  margin-top:10px;
}
.gf-info>.ant-row,
.xf-info>.ant-row {
  position: relative;
}

.gf-info>.ant-row>.ant-col,
.xf-info>.ant-row>.ant-col {
  border-right: 1px solid #ccc;
  padding: 2px !important;
}

.gf-info>.ant-row>.ant-col:last-of-type,
.xf-info>.ant-row>.ant-col:last-of-type {
  border-right: none;
}

.gf-info .ant-form-item,
.xf-info .ant-form-item {
  margin-bottom: 2px !important;
}

.detail-info {
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.detail-info .ant-form-item {
  margin-bottom: 0;
}

.detail-info .ant-table-tbody .ant-table-cell {
  padding: 2px;
}

.detail-info .ant-table-thead .ant-table-cell {
  padding: 8px;
}
.bill-form .ant-form-item-explain.ant-form-item-explain-connected{
  position: absolute;
  right: 30px;
  top: 5px;
}
</style>

import {FC, useCallback, useEffect, useState} from "react";
import {Button, ButtonProps, Drawer, Form, Input, InputNumber, message, Select, Space} from "antd";
import TextArea from "antd/es/input/TextArea";
import {goodApi} from "@apis/tenant";
import _ from "lodash";

type GoodsSelectButtonProps = {
  record?:any;
  index?:any;
  onSuccess?: (record: any, index?: any) => void;
} & ButtonProps;

const GoodsSelectButton:FC<GoodsSelectButtonProps> = (props) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [goodsArr, setGoodsArr] = useState<any[]>([]);

  const goodsId = Form.useWatch("goodsId", form);

  useEffect(() => {
    if (open && props.record) {
      form.setFieldsValue(props.record);
    }
  }, [open, props.record]);

  useEffect(() => {
    setUnit();
    setGoods();
  }, [goodsId, goodsArr]);

  useEffect(() => {
    if (open) {
      loadGoods();
    } else {
      form.resetFields();
    }
  }, [open]);

  const loadGoods = useCallback(() => {
    goodApi.queryList({
      enabled: true
    }).then((res:any) => {
      setGoodsArr(res || []);
    }).catch(async (e) => {
      setGoodsArr([]);
      message.error(`${e.message}`);
    });
  }, []);

  const setUnit = useCallback(() => {
    const goods = goodsArr.filter(i => _.eq(i.id, goodsId));
    if (goods.length > 0) {
      form.setFieldValue("unit", goods[0].measureUnit);
    } else {
      form.setFieldValue("unit", null);
    }
  }, [goodsArr, goodsId, form]);

  const setGoods = useCallback(() => {
    const goods = goodsArr.filter(i => _.eq(i.id, goodsId));
    if (goods.length > 0) {
      form.setFieldValue("goods", goods[0]);
    } else {
      form.setFieldValue("goods", null);
    }
  }, [goodsArr, goodsId, form]);

  const handleSubmit = () => {
    form.validateFields().then((values:any) => {
      if (props.onSuccess) {
        props.onSuccess(values, props.index);
      }
      form.resetFields();
    })
  }

  const handleSubmitAndClose = () => {
    form.validateFields().then((values:any) => {
      if (props.onSuccess) {
        props.onSuccess(values, props.index);
      }
      setOpen(false);
    })
  }

  const handleClose = () => {
    setOpen(false);
  }

  const footer = (
    <Space>
      {!props.record && <Button type={"primary"} onClick={handleSubmit}>{"添加"}</Button>}
      <Button type={"primary"} onClick={handleSubmitAndClose}>{props.record ? "更新并关闭" : "添加并关闭"}</Button>
      <Button onClick={handleClose}>关闭</Button>
    </Space>
  );

  return <>
    <Button {...props} onClick={() => setOpen(true)}/>
    <Drawer title={"新增货品"} open={open} onClose={() => setOpen(false)} footer={footer}>
      <Form form={form} layout={"vertical"}>
        <Form.Item label={"货品"} name={"goodsId"} rules={[{required: true, message: "请选择货品"}]}>
          <Select options={goodsArr} fieldNames={{label: "name", value: "id"}} disabled={props?.record}/>
        </Form.Item>
        <Form.Item label={"单位"} name={"unit"}>
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item label={"计划入库数量"} name={"planInboundQuantity"} initialValue={0}>
          <InputNumber/>
        </Form.Item>
        <Form.Item label={"备注"} name={"remark"}>
          <TextArea rows={2}/>
        </Form.Item>
        <Form.Item name={"goods"} hidden={true}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  </>
}
export default GoodsSelectButton;
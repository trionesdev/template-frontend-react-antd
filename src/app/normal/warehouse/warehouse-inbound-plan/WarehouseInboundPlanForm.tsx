import {useNavigate, useParams} from "@trionesdev/commons-react";
import React, {FC, useEffect, useState} from "react";
import {Button, Col, DatePicker, Divider, Form, Input, message, Row, Select, Space, Table} from "antd";
import {Layout, TableToolbar} from "@trionesdev/antd-react-ext";
import {DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons";
import GoodsSelectButton from "@app/normal/warehouse/warehouse-inbound-plan/GoodsSelectButton.tsx";
import _ from "lodash";
import {TableRowSelection} from "antd/es/table/interface";
import {supplierApi, warehouseInboundPlanApi} from "@apis/tenant";
import {
  inboundTypeOptions,
  relatedOrderSourceOptions,
  warehouseInboundPlanStatusOptions
} from "@app/normal/warehouse/internal/warehouse.options.ts";
import dayjs from "dayjs";

const WarehouseInboundPlanForm:FC = () => {
  const {id} = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [suppliers, setSuppliers] = useState<any>([]);

  const items = Form.useWatch("items", form);

  useEffect(() => {
    if (id) {
      console.log("id: ", id);
      warehouseInboundPlanApi.queryById(id).then((res:any) => {
        if (res) {
          form.setFieldsValue({...res, ...{planInboundTime: dayjs(res?.planInboundTime)}});
        }
      }).catch(async (e) => {
        message.error(e.message);
      })
    }
  }, [id]);

  useEffect(() => {
    loadSupplier();
  }, []);

  const loadSupplier = () => {
    supplierApi.queryList({
      enabled: true,
    }).then((res:any) => {
      setSuppliers(res || []);
    }).catch(async (e) => {
      setSuppliers([]);
      message.error(`${e.message}`);
    })
  }

  const handleOnAddOrUpdateGoodsSuccess = (record: any, index?: any) => {
    const items = form.getFieldValue("items") || [];
    const newItems = _.cloneDeep(items);
    if (index !== undefined) {
      newItems.splice(index, 1, record);
    } else {
      newItems.push(record);
    }
    form.setFieldValue("items", newItems);
  }

  const handleOnDelete = (index:any) => {
    const items = form.getFieldValue("items") || [];
    const newItems = _.cloneDeep(items);
    newItems.splice(index, 1);
    form.setFieldValue("items", newItems);
  }

  const handleOnBatchDelete = () => {
    const items = form.getFieldValue("items") || [];
    const newItems = _.cloneDeep(items);
    const filterItems = newItems.filter((i:any) => !selectedRowKeys.includes(i.uuid));
    form.setFieldValue("items", filterItems);
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSubmit = () => {
    form.validateFields().then((values:any) => {
      setLoading(true);
      let request: Promise<any>;
      if (id) {
        const params = {...values};
        Object.assign(params, {id});
        request = warehouseInboundPlanApi.updateById(params);
      } else {
        request = warehouseInboundPlanApi.create(values);
      }
      request
        .then(async () => {
          message.success(`${id ? "更新" : "新增"}入库计划单成功`);
          navigate("/warehouse/warehouse-inbound-plans");
        })
        .catch(async (e) => {
          message.error(`${e.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    })
  }

  const handleCancel = () => {
    navigate("/warehouse/warehouse-inbound-plans");
  }

  const columns: any[] = [
    {
      title: '货品编码',
      dataIndex: ['goods', 'code'],
    },
    {
      title: '货品名称',
      dataIndex: ['goods', 'name'],
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '计划入库数量',
      dataIndex: 'planInboundQuantity'
    },
    {
      title: '体积',
      dataIndex: 'volume'
    },
    {
      title: '重量',
      dataIndex: 'weight'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      key: 'operation',
      align: "center",
      width: 150,
      render: (_: any, record: any, index: any) => {
        return (
          <Space>
            <GoodsSelectButton
              type={`link`}
              record={record}
              index={index}
              onSuccess={handleOnAddOrUpdateGoodsSuccess}>编辑</GoodsSelectButton>
            <Button size={`small`} type={`link`} danger={true} onClick={() => handleOnDelete(index)}>删除</Button>
          </Space>
        );
      },
    },
  ]

  const tableToolbar = (
    <TableToolbar
      title={<Space>
        <GoodsSelectButton type={`primary`} icon={<PlusCircleOutlined/>} onSuccess={handleOnAddOrUpdateGoodsSuccess}>添加货品</GoodsSelectButton>
        <Button type={`primary`} icon={<DeleteOutlined />} onClick={handleOnBatchDelete} danger disabled={selectedRowKeys.length === 0}>批量删除</Button>
    </Space>}/>);

  const handleOnRow:any = (record:any) => {
    if (!record.uuid) {
      record.uuid = Math.round(Math.random()*10000000000000);
    }
  }

  return <Layout direction={"horizontal"}>
    <Layout.Item style={{backgroundColor: 'white', width: "100%", marginBottom: "10px", padding: "15px"}}>
      <Form form={form}>
        <Row>
          <Col span={6}>入库计划单</Col>
          <Col span={6} offset={12} style={{textAlign: "right"}}>
            <Space>
              <Button type={"primary"} onClick={handleSubmit} loading={loading}>保存</Button>
              <Button onClick={handleCancel}>取消</Button>
            </Space>
          </Col>
        </Row>
        <Divider style={{margin: "10px 0px"}}/>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label={"编号"} name={"sn"}>
              <Input
                placeholder={"为空默认自动生成"}
                disabled={id !== null && id !== undefined}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={"入库类型"}
              name={"inboundType"}
              rules={[{required: true, message: "请选择入库类型"}]}>
              <Select options={inboundTypeOptions} placeholder={"请选择入库类型"} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={"供应商"}
              name={"supplierId"}
              rules={[{required: true, message: "请选择供应商"}]}>
              <Select options={suppliers} fieldNames={{label: "name", value: "id"}} placeholder={"请选择供应商"} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={"计划入库时间"}
              name={"planInboundTime"}
              rules={[{required: true, message: "请选择计划入库时间"}]}>
              <DatePicker placeholder={"请选择计划入库时间"} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label={"关联单据来源"} name={"relatedOrderSource"}>
              <Select options={relatedOrderSourceOptions} placeholder={"请选择关联单据来源"} allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={"关联单据单号"}
              name={"relatedOrderSn"}>
              <Input placeholder={"请输入关联单据单号"} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={"状态"}
              name={"status"}
              rules={[{required: true, message: "请选择状态"}]}
              initialValue={"PLANNING"}>
              <Select options={warehouseInboundPlanStatusOptions} placeholder={"请选择状态"} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={"备注"}
              name={"remark"}>
              <Input placeholder={"请输入备注"} />
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{margin: "0px"}}/>
        <Form.Item name={"items"} hidden={true} />
        {tableToolbar}
        <Table
          columns={columns}
          dataSource={items}
          rowSelection={rowSelection}
          rowKey={"uuid"}
          onRow={handleOnRow}/>
      </Form>
    </Layout.Item>
  </Layout>
}
export default WarehouseInboundPlanForm;
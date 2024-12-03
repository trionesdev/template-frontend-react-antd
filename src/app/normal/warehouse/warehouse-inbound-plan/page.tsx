import React, {FC, useEffect, useState} from "react";
import {PageResult} from "@apis";
import {useRequest} from "ahooks";
import {Button, Input, message, Space} from "antd";
import {DeleteOutlined, PlusCircleOutlined, RedoOutlined} from "@ant-design/icons";
import {GridTable, Layout, SearchToolbar, TableToolbar} from "@trionesdev/antd-react-ext";
import {warehouseInboundPlanApi} from "@apis/tenant";
import {useNavigate} from "@trionesdev/commons-react";
import {DateUtils} from "@trionesdev/commons";
import {
  inboundTypeOptions, relatedOrderSourceOptions,
  warehouseInboundPlanStatusOptions
} from "@app/normal/warehouse/internal/warehouse.options.ts";
import _ from "lodash";
import {TableRowSelection} from "antd/es/table/interface";

const WarehouseInboundPlanPage:FC = () => {
  const [pageParams, setPageParams] = useState({pageNum: 1, pageSize: 10})
  const [result, setResult] = useState<PageResult<any>>({rows: [], total: 0})
  const [searchFormData, setSearchFormData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [querySeq, setQuerySeq] = useState(0);
  const navigate = useNavigate();

  const {run: handleQuery, loading} = useRequest(() => {
    const params = {...pageParams, ...searchFormData}
    return warehouseInboundPlanApi.queryPage(params)
  }, {
    manual: true,
    onSuccess: (res: any) => {
      setResult(res)
    }
  })

  useEffect(() => {
    handleQuery()
  }, [pageParams, querySeq]);

  const handleEdit = (id:any) => {
    navigate(`/warehouse/warehouse-inbound-plans/edit/${id}`);
  }

  const handleRemove = (id:any) => {
    warehouseInboundPlanApi.deleteById(id).then(async () => {
      message.success(`删除成功`);
      setQuerySeq(querySeq + 1);
    }).catch(async e => {
      message.error(e.message);
    });
  }

  const handleBacthRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning(`请选择记录`);
      return;
    }

    warehouseInboundPlanApi.deleteByIds(selectedRowKeys).then(() => {
      message.success(`删除成功`);
      setQuerySeq(querySeq + 1);
    }).catch(async e => {
      message.error(e.message);
    });
  }

  const handleCancel = (id:any) => {
    warehouseInboundPlanApi.cancel(id).then(async () => {
      message.success(`取消成功`);
      setQuerySeq(querySeq + 1);
    }).catch(async e => {
      message.error(e.message);
    });
  }

  const columns: any[] = [
    {
      title: '单号',
      dataIndex: 'sn',
    },
    {
      title: '关联单据',
      dataIndex: 'relatedOrderSn',
    },
    {
      title: '关联单据来源',
      dataIndex: 'relatedOrderSource',
      render: (text: any) => {
        if (text) {
          return relatedOrderSourceOptions.find(i => _.eq(i.value, text))?.label
        } else {
          return "";
        }
      },
    },
    {
      title: '入库类型',
      dataIndex: 'inboundType',
      render: (text: any) => {
        if (text) {
          return inboundTypeOptions.find(i => _.eq(i.value, text))?.label
        } else {
          return "";
        }
      },
    },
    {
      title: '计划入库时间',
      dataIndex: 'planInboundTime',
      render: (text: any) => {
        if (text) {
          return DateUtils.formatDate(text);
        } else {
          return "";
        }
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any) => {
        if (text) {
          return warehouseInboundPlanStatusOptions.find(i => _.eq(i.value, text))?.label
        } else {
          return "";
        }
      },
    },
    {
      title: '供应商',
      dataIndex: ["supplier", "name"]
    },
    {
      title: '总重量（KG）',
      dataIndex: 'totalWeight'
    },
    {
      title: '总体积（立方米）',
      dataIndex: 'totalVolume'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (text: any) => {
        if (text) {
          return DateUtils.formatDateTime(text);
        } else {
          return "";
        }
      },
    },
    {
      title: '操作',
      key: 'operation',
      align: "center",
      width: 150,
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button size={`small`} type={`link`} onClick={() => handleEdit(record.id)}>编辑</Button>
            <Button size={`small`} type={`link`} onClick={() => handleCancel(record.id)}>取消</Button>
            <Button size={`small`} type={`link`} danger={true} onClick={() => handleRemove(record.id)}>删除</Button>
          </Space>
        );
      },
    },
  ]

  const searchFormItems = [
    {
      label: `编码`,
      name: `sn`,
      children: <Input allowClear />,
    },
  ];

  const handleAdd = () => {
    navigate("/warehouse/warehouse-inbound-plans/new");
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const toolbar = (
    <TableToolbar
      title={
        <Space>
          <Button type={`primary`} icon={<PlusCircleOutlined/>} onClick={handleAdd}>新增</Button>
          <Button type={`primary`} icon={<DeleteOutlined />} danger disabled={selectedRowKeys.length === 0} onClick={handleBacthRemove}>删除</Button>
        </Space>}
      extra={
        <Space>
          <Button icon={<RedoOutlined/>} type={`text`} onClick={handleQuery}/>
        </Space>}
    />);

  return (
    <Layout direction={"vertical"}>
      <Layout.Item style={{backgroundColor: 'white', marginBottom: "10px"}}>
        <SearchToolbar onSearch={(values) => setSearchFormData(values)} items={searchFormItems} />
      </Layout.Item>
      <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
        <GridTable
          toolbar={toolbar}
          fit={true} size={'small'} columns={columns} dataSource={result?.rows}
          rowKey={`id`}
          loading={loading}
          rowSelection={rowSelection}
          pagination={{
            current: pageParams.pageNum,
            total: result.total,
            pageSize: pageParams.pageSize,
            onChange: (page, pageSize) => {
              setPageParams({pageNum: page, pageSize: pageSize})
            }
          }}
        />
      </Layout.Item>
    </Layout>
  );
}
export default WarehouseInboundPlanPage;
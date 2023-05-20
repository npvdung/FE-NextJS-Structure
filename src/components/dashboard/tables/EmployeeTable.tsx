// 'use client';

import React, { useEffect, useState } from 'react';
import { Divider, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

export interface DataType {
    id: string;
    employeeID: string;
    status: string;
    office: string;
    businessTeam: string;
    jobPosition: string;
    employmentType: string;
    fullName: string;
    gender: string;
    dateOfBirth: number;
    email: string;
    phone: string;
    address: string;
    citizenId: string;
    netSalary: number;
    baseSalary: number;
    startWorkDate: string;
}

interface TableProps {
    dataSource: DataType[];
    setPagination;
    pagination;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: DataType;
    index: number;
    children: React.ReactNode;
}

const EmployeeTable: React.FC<TableProps> = ({ dataSource, setPagination, pagination }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState<DataType[]>([]);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: DataType) => record.id === editingKey;

    const edit = (record: Partial<DataType> & { id: React.Key }) => {
        form.setFieldsValue({
            employeeID: '',
            status: '',
            office: '',
            businessTeam: '',
            jobPosition: '',
            employmentType: '',
            fullName: '',
            gender: '',
            dateOfBirth: '',
            email: '',
            phone: '',
            address: '',
            citizenId: '',
            netSalary: '',
            baseSalary: '',
            startWorkDate: '',
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    const EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

     
    useEffect(() => {
        setData(dataSource);
    }, [dataSource]);

    const save = async (id: React.Key) => {
        try {
            const row = (await form.validateFields()) as DataType;
            console.log('row', row);
            // console.log('data', data);
            const newData = data.map((item) =>
                item.id != id
                    ? item
                    : {
                        ...row,
                        id: id.toString(),
                        employeeID: item.employeeID,
                      },
            );

            console.log('newData', newData);
            setData(newData);
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
        
    const columns = [
        {
            title: 'Sửa',
            width: 120,
            dataIndex: 'operation',
            _render: (_: any, record: DataType) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 2 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm okType="link" title="Sure to cancel?" onConfirm={cancel}>
                            <a className="ml-5">
                                <CloseCircleTwoTone />
                            </a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
            get render() {
                return this._render;
            },
            set render(value) {
                this._render = value;
            },
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'employeeID',
            width: 120,
            editable: false,
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            width: 200,
            editable: true,
        },

        {
            title: 'Văn phòng',
            dataIndex: 'office',
            width: 110,
            editable: true,
        },
        {
            title: 'Phòng ban',
            dataIndex: 'businessTeam',
            width: 110,
            editable: true,
        },
        {
            title: 'Vị trí',
            dataIndex: 'jobPosition',
            width: 120,
            editable: true,
        },
        {
            title: 'Loại hình',
            dataIndex: 'employmentType',
            width: 100,
            editable: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 100,
            editable: true,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            width: 90,
            editable: true,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            width: 120,
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 200,
            editable: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            width: 120,
            editable: true,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: 200,
            editable: true,
        },
        {
            title: 'CCCD',
            dataIndex: 'citizenId',
            width: 100,
            editable: true,
        },
        {
            title: 'Lương thực nhận',
            dataIndex: 'netSalary',
            width: 150,
            editable: true,
        },
        {
            title: 'Lương cơ bản',
            dataIndex: 'baseSalary',
            width: 120,
            editable: true,
        },
        {
            title: 'Ngày làm việc',
            dataIndex: 'startWorkDate',
            editable: true,
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const handleTableChange = (pagination) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize });
    };

    return (
        <div>
            <Divider />

            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    onChange={handleTableChange}
                    pagination={{
                        total: pagination?.total,
                        current: pagination?.current,
                        pageSize: pagination?.pageSize,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['2', '4', '5', '10'],
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        itemRender: (_, type, originalElement) => {
                            if (type === 'page') {
                                return <Link href={`?page=${_}`}>{_}</Link>;
                            }
                            return originalElement;
                        },
                    }}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    scroll={{ x: 2200 }}
                />
            </Form>
        </div>
    );
}};
export default EmployeeTable;

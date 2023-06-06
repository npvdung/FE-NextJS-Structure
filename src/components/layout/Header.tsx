'use client';

import React, { useEffect, useState } from 'react';
import { Layout, theme, Input, Button, Dropdown, message, Space } from 'antd';
import { SearchOutlined, DownOutlined, UserAddOutlined, UserDeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import AddEmployeeModal from '../dashboard/modals/AddEmployeeModal';

const { Header } = Layout;

interface HeadProps {
    officeData?: any[];
    jobPositionData? : any[];
    teamData?: any[];
    statusData?: any[];
}

const HeaderPage: React.FC<HeadProps> = ({officeData, jobPositionData, teamData, statusData}) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const suffix = <SearchOutlined />;
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        message.info('Click on menu item.');
        console.log(e);
        console.log(items);
    };

    const items: MenuProps['items'] = [
        {
            label: 'Đang làm việc',
            key: '1',
            icon: <UserAddOutlined />,
        },
        {
            label: 'Đã nghỉ việc',
            key: '2',
            icon: <UserDeleteOutlined />,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    const [open, setOpen] = useState(false);
    const afterClose = () => {};

    const addDone = () => {
        console.log('turn off modal');
        setOpen(false);
    };

    return (
        <>
            <Header className="grid grid-cols-6 gap-3" style={{ padding: 0, background: colorBgContainer }}>
                <div className="col-start-1 col-end-3 ml-6 mt-3 text-2xl font-medium flex">Danh sách nhân sự</div>
                <div className="col-end-7 col-span-2 grid grid-cols-9 gap-2">
                    <div className="col-start-1 col-end-4">
                        <Input placeholder="Tìm kiếm nhân sự" suffix={suffix} style={{ width: 200 }} />
                    </div>
                    <div className="col-start-5 col-end-7">
                        <Dropdown menu={menuProps} autoFocus={true}>
                            <Button>
                                <Space>
                                    <UserAddOutlined />
                                    Tình trạng
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <div className="col-start-8 col-end-9">
                        <Button type="primary" style={{ background: '#22c55e' }} onClick={() => setOpen(true)}>
                            <PlusOutlined />
                            Thêm
                        </Button>
                        <AddEmployeeModal></AddEmployeeModal>                   
                    </div>
                </div>
            </Header>
        </>
    );
}

export default HeaderPage

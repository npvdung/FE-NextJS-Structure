'use client';

import React, { useState } from 'react';
import {
    AppstoreOutlined,
    BookOutlined,
    BarChartOutlined,
    FlagOutlined,
    ShareAltOutlined,
    CreditCardOutlined,
    BellFilled,
    PlusCircleFilled,
    SettingFilled,
    SearchOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Input } from 'antd';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Danh sách nhân sự', '1', <AppstoreOutlined />),
    getItem('Hợp đồng lao động', '2', <BookOutlined />),
    getItem('Phát triển sự nghiệp', '3', <FlagOutlined />),
    getItem('Bảng lương định kỳ', '4', <CreditCardOutlined />),
    getItem('Báo cáo nhân sự', '5', <BarChartOutlined />),
];
export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const suffix = <SearchOutlined />;
    return (
        <>
            <Sider
                width={300}
                collapsedWidth={100}
                style={{ background: '#044288' }}
                collapsible
                collapsed={collapsed}
                onCollapse={(value: any) => setCollapsed(value)}
            >
                <div className="min-w-fit topside grid grid-cols-4 gap-1 " style={{ height: 54, margin: 10 }}>
                    <div className="rounded-full bg-gray-700 mx-2.5 my-1.5 ...">
                        <img src="" alt="" />
                    </div>
                    <div className="text-white col-span-3 ...">
                        <div className=" min-w-fit text-xl font-medium ml-6">Base Inc - Demo</div>
                        <div className=" text-slate-100/50 ml-6">Quản trị nhân sự</div>
                    </div>
                </div>

                <div className="min-w-fit topside grid grid-cols-4 gap-1 " style={{ height: 54, margin: 10 }}>
                    <div className="ml-6 my-1.5  ...">
                        <div className="h-12">
                            <ShareAltOutlined style={{ fontSize: '25px', color: 'white' }} />
                        </div>
                        <div className="h-12">
                            <SettingFilled style={{ fontSize: '23px', color: '#417BB0' }} />
                        </div>
                        <div className="h-12">
                            <BellFilled style={{ fontSize: '23px', color: '#417BB0' }} />
                        </div>
                        <div className="h-12 text-slate-100/50">
                            <PlusCircleFilled style={{ fontSize: '23px', color: '#417BB0' }} />
                        </div>
                    </div>
                    <div className="text-white col-span-3 ml-3 ...">
                        <div className="ml-1">
                            <Input placeholder="Tìm nhanh ..." suffix={suffix} style={{ width: 176 }} />
                        </div>
                        <div className="text-slate-100/75 text-base ml-2 my-2 font-normal ">Base Inc - Demo</div>
                        <div className="">
                            <Menu
                                style={{ background: '#044288', color: '#B6C9DD' }}
                                defaultSelectedKeys={['1']}
                                mode="inline"
                                items={items}
                            />
                        </div>
                    </div>
                </div>
            </Sider>
        </>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Layout, theme, Spin } from 'antd';
import EmployeeTable from '@/components/dashboard/tables/EmployeeTable';
import { DataType } from '@/components/dashboard/tables/EmployeeTable';
import Sidebar from '@/components/layout/Sidebar';
import BreadCrum from '@/components/layout/BreadCrum';
import HeaderPage from '@/components/layout/Header';
import { useEmployeeList } from '../../utils/hook/employee/employee';
import ContentPage from '@/components/layout/Content';

const { Content, Footer } = Layout;

const Dashboard: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 2,
    });

    const { data, isLoading, isError, error, isFetching } = useEmployeeList(pagination.current, pagination.pageSize);
    useEffect(() => {
        setDataSource((data as { data, total, current, pageSize})?.data);

    }, [data]);


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar/>
            <Layout className="site-layout">
                <HeaderPage/>
                <Content style={{ margin: '0 0' }}>
                    <div style={{ minHeight: 800, background: colorBgContainer, margin: '4 4' }}>
                        {data ? (
                            <ContentPage dataSource={data?.data} pagination={data} setPagination={setPagination} />
                        ) : (
                            <Spin className="flex justify-center" size="large" />
                        )}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;

'use client';

import React, { useState, useEffect } from 'react';
import { Layout, theme, Spin } from 'antd';
import Nav from '../../components/auth/nav';
import Head from '../../components/auth/head';
import TableContent from '../../components/auth/table';
import { DataType } from '../../components/auth/table';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../configs/auth/firebase/firebase';
import router from 'next/router';
import getAccessToken from '../../utils/firebase/getActiveAccessToken';
import axios from 'axios';
import { useEmployeeList } from '../../utils/hook/employee/employee';

const { Content, Footer } = Layout;

const Dashboard: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [office, setOffice] = useState([]);
    const [jobPosition, setJobPosition] = useState([]);
    const [team, setTeam] = useState([]);
    const [status, setStatus] = useState([]);


    //getOffice
    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('accesstoken');
            // console.log(token);
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };
            fetch('http://bi-hrm-be.sonatgame.com:5000/secure/office', requestOptions as any)
                .then(async function (res) {
                    const data = await res.json();
                    setOffice(data);
                    // console.log('office',data);
                })
                .catch((error) => console.log('error', error));
        };
        fetchApi();
    }, []);

    //getJobPosition
    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('accesstoken');
            // console.log(token);
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };
            fetch('http://bi-hrm-be.sonatgame.com:5000/secure/jobposition', requestOptions as any)
                .then(async function (res) {
                    const data = await res.json();
                    setJobPosition(data);
                    // console.log('Jobposition',data);
                })
                .catch((error) => console.log('error', error));
        };
        fetchApi();
    }, []);

    //getTeam
    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('accesstoken');
            // console.log(token);
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };
            fetch('http://bi-hrm-be.sonatgame.com:5000/secure/team', requestOptions as any)
                .then(async function (res) {
                    const data = await res.json();
                    setTeam(data);
                    // console.log('Jobposition',data);
                })
                .catch((error) => console.log('error', error));
        };
        fetchApi();
    }, []);

    //getStatus
    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('accesstoken');
            // console.log(token);
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };
            fetch('http://bi-hrm-be.sonatgame.com:5000/secure/status', requestOptions as any)
                .then(async function (res) {
                    const data = await res.json();
                    setStatus(data);
                    // console.log('Jobposition',data);
                })
                .catch((error) => console.log('error', error));
        };
        fetchApi();
    }, []);



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
            <Nav />
            <Layout className="site-layout">
                <Head officeData={office} jobPositionData={jobPosition} statusData={status} teamData={team}></Head>
                <Content style={{ margin: '0 0' }}>
                    <div style={{ minHeight: 800, background: colorBgContainer, margin: '4 4' }}>
                        {data ? (
                            <TableContent dataSource={data?.data} pagination={data} setPagination={setPagination} />
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

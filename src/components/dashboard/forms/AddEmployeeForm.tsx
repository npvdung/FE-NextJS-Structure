'use client';

import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useJobPosition } from '@/utils/hook/jobposition';
import { useOffice } from '@/utils/hook/office';
import { useTeam } from '@/utils/hook/team';
import { useStatus } from '@/utils/hook/status';
import { QueryObserverIdleResult, UseQueryResult, useQueryClient } from 'react-query';

const axios = require('axios');

interface AddProps {
    callback: () => void;
    // dataOffice: UseQueryResult<void | {
    //     dataOf: any;
    // } | undefined> 
}
// interface  QueryObserverIdleResult<TData, TError> {
//     dataOffice: TData;
// }

const AddEmployeeForm: React.FC<AddProps> = ( {callback}) => {
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };

    const [office, setOffice] = useState([]);
    const [jobPosition, setJobPosition] = useState([]);
    const [team, setTeam] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        setOffice((useOffice().data))
    },[]);

    // const { data, isLoading, isError, error, isFetching } = useJobPosition();
    // useEffect(() => {
    //     setOffice((data?.datadataJobPosition));

    // },[]);

    // const { data, isLoading, isError, error, isFetching } = useTeam();
    // useEffect(() => {
    //     setOffice((data?.dataTeam));

    // },[]);

    // const { data, isLoading, isError, error, isFetching } = useStatus();
    // useEffect(() => {
    //     setOffice((data?.dataStatus));

    // },[]);

    // const { data, isLoading, isError, error, isFetching } = useEmployeeList(pagination.current, pagination.pageSize);
    // useEffect(() => {
    //     setDataSource((data as { data, total, current, pageSize})?.data);

    // }, [data]);

    // const { data, isLoading, isError, error, isFetching } = useEmployeeList(pagination.current, pagination.pageSize);
    // useEffect(() => {
    //     setDataSource((data as { data, total, current, pageSize})?.data);

    // }, [data]);

    // const { data, isLoading, isError, error, isFetching } = useEmployeeList(pagination.current, pagination.pageSize);
    // useEffect(() => {
    //     setDataSource((data as { data, total, current, pageSize})?.data);

    // }, [data]);



    // const onClick = () => {
    //     console.log("onclick")
    // }
    // useEffect(()=>{
    //     console.log('lastoffice',offices);
    // },[offices])

    // useEffect(()=>{
    //     console.log('lastPosition', jobPosition);
    // }, [jobPosition])

    // useEffect(()=>{
    //     console.log('laststatus',status);
    // },[status])

    // useEffect(()=>{
    //     console.log('lastteam', team);
    // }, [team])
     


    const onFinish = (values: any) => {
        // event.preventDefault();
        // useEffect(() => {
        console.log('Received values of form: ', values);
        // console.log(values);
        const fetchApi = async () => {
            const token = localStorage.getItem('accesstoken');
            // console.log(token);
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${token}`);
            var raw = JSON.stringify({
                employeeID: values.employeeID,
                idStatus: values.status,
                idOffice: values.office,
                idTeam: values.businessTeam,
                idJobPosition: values.jobPosition,
                employmentType: values.employmentType,
                fullName: values.fullName,
                gender: values.gender,
                dateOfBirth: values.dateOfBirth,
                email: values.email,
                phone: values.phone,
                address: values.address,
                citizenId: values.citizenId,
                netSalary: values.netSalary,
                baseSalary: values.baseSalary,
                startWorkDate: values.startWorkDate,
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };
            fetch(`${process.env.NEXT_PUBLIC_BE_DOMAIN_URL}/secure/employee`, requestOptions as any)
                .then(function (response: any) {
                    console.log(response.json());
                    callback();
                })
                .catch(function (error: any) {
                    console.log(error);
                });
        };
        fetchApi();
    };

    return (
        <>
            <div className="flex justify-center">
                <Form
                    name="addEmployee"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                    validateMessages={validateMessages}
                    onFinish={onFinish}
                >
                    <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="employeeID" label="Mã nhân viên" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="gender" label="Giới tính">
                        <Radio.Group>
                            <Radio value="Nam"> Nam </Radio>
                            <Radio value="Nữ"> Nữ </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="status" label="Trạng thái">
                        <Select>
                            <Select.Option value={status[0].id}>{status[0].status}</Select.Option>
                            <Select.Option value={status[1].id}>{status[1].status}</Select.Option>
                            <Select.Option value={status[2].id}>{status[2].status}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="office" label="Nơi làm việc">
                        <Select>
                            <Select.Option value={office[0].id}>{office[0].office}</Select.Option>
                            <Select.Option value={office[1].id}>{office[1].office}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="businessTeam" label="Team">
                        <Select>
                            <Select.Option value={team[0].id}>{team[0].team}</Select.Option>
                            <Select.Option value={team[1].id}>{team[1].team}</Select.Option>
                            <Select.Option value={team[2].id}>{team[2].team}</Select.Option>
                            <Select.Option value={team[3].id}>{team[3].team}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="jobPosition" label="Vị trí công việc">
                        <Select>
                            <Select.Option value={jobPosition[0].id}>{jobPosition[0].jobPosition}</Select.Option>
                            <Select.Option value={jobPosition[1].id}>{jobPosition[1].jobPosition}</Select.Option>
                            <Select.Option value={jobPosition[2].id}>{jobPosition[2].jobPosition}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="employmentType" label="Loại công việc">
                        <Select>
                            <Select.Option value="Partime">Partime</Select.Option>
                            <Select.Option value="Fulltime">Fulltime</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="dateOfBirth" label="Ngày sinh" rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>

                    <Form.Item name="startWorkDate" label="Ngày vào làm">
                        <DatePicker />
                    </Form.Item>

                    <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="phone" label="Số điện thoại">
                        <Input />
                    </Form.Item>

                    <Form.Item name="citizenId" label="CCCD">
                        <Input />
                    </Form.Item>

                    <Form.Item name="address" label="Địa chỉ">
                        <Input />
                    </Form.Item>

                    <Form.Item name="baseSalary" label="Lương cơ bản">
                        <Input />
                    </Form.Item>

                    <Form.Item name="netSalary" label="Lương thực nhận">
                        <Input />
                    </Form.Item>

                    <Form.Item label="">
                        <Button htmlType="submit">Thêm</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default AddEmployeeForm;

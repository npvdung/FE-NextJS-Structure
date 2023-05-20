import React, { useState } from 'react'
import AddEmployeeForm from '../forms/AddEmployeeForm'
import { Modal } from 'antd'

export default function AddEmployeeModal() {
    const [open, setOpen] = useState(false);
    const afterClose = () => {};

    const onSubmitAddEmployee = () => {
        console.log('turn off modal');
        setOpen(false);
    };

  return (
    <div>
        <Modal
            title="Thêm nhân viên"
            centered
            open={open}
            okType={'default'}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            afterClose={afterClose}
            footer={null}
        >
            <AddEmployeeForm callback={onSubmitAddEmployee} offices={officeData} jobPosition={jobPositionData} team={teamData} status={statusData}/>
        </Modal>
    </div>
  )
}

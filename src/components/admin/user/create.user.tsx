import { createUserApi } from "@/services/api";
import { App, Button, Form, Input, Modal } from "antd";
import { FormProps } from "antd/lib";
import { useState } from "react";


interface IProps {
    openModalCreate:  boolean;
    setOpenModalCreate: (v : boolean) => void
    refreshTable: () => void
}

type FieldType = {
  fullName: string;
  password: string;
  email: string;
  phone: string;
}; 

const CreateUser = (props : IProps) => {
    const {openModalCreate, setOpenModalCreate, refreshTable} = props
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const {message, notification} = App.useApp()
    const [form] = Form.useForm()
    const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
        setIsSubmit(true)
        const resUserRegister = await createUserApi(values.fullName, values.password, values.email, values.phone)
        if(resUserRegister && resUserRegister.data){
            console.log(resUserRegister.data)
            message.success("Created New User Success")
            // form.resetFields();
            refreshTable()
            console.log("refreshtable")
            setOpenModalCreate(false)
        }else{
            notification.error({
                message: "Had an error !",
                description: resUserRegister.message
            })
        }
        setIsSubmit(false)
    }
    
    return (
        <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={openModalCreate}
        onOk={() => form.submit()}
        onCancel={() => {
            setOpenModalCreate(false)
            form.resetFields()
        }}
        confirmLoading={isSubmit}
      >
        <Form
                    layout='vertical'
                    name="basic"
                    form={form}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your full Name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                    label="Password"
                    labelCol={{ span: 24 }}
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                    label="Email"
                    labelCol={{ span: 24 }}
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                    label="Phone"
                    labelCol={{ span: 24 }}
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input style={{width:"100%"}}/>
                    </Form.Item>
                </Form>
      </Modal>
    )
}

export default CreateUser;
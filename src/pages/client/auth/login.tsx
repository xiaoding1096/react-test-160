import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { loginApi } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
   

type FieldType = {
  username: string;
  password: string;
};
const navigate = useNavigate();
const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  console.log('Success:', values);
  const resLogin = await loginApi(values.username, values.password)
  if(resLogin.data){
      console.log(resLogin.data)
      localStorage.setItem("access_token",resLogin.data.access_token)
      navigate('/')
  }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


  

    return (
        <div>
                <Form
                    layout='vertical'
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password />
                    </Form.Item>

                    

                    <Form.Item label={null}>
                        <Button type="primary" href='/'>
                        Home
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
        </div>
    )
}
export default LoginPage;
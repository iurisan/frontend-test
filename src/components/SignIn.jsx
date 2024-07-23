import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { signIn } from '../redux/reducers/appReducer';
import { Button } from './common/Button';
import { Card } from './common/Card';

const SignInContainer = styled(Card)`
  max-width: 400px;
  margin: 50px auto;
  padding: 50px;
`;

// max 128 chars between '@' and '.' and max 6 chars after last '.'
const emailPattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{1,128}\.[a-zA-Z]{1,6}$/);

const SignIn = () => {
  const [enableBtn, setEnableBtn] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(signIn(values)).then(() => {
      history.push('/');
    });
  };
  const onFinishFailed = (errorInfo) => {
    window.alert('Your email or password must be wrong. Please, try again.', errorInfo);
  };

  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setEnableBtn(true))
      .catch(() => setEnableBtn(false));
  }, [form, values]);

  return (
    <SignInContainer>
      <Form
        form={form}
        name="signin"
        labelCol={{
          span: 8
        }}
        style={{
          maxWidth: 500
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Username"
          name="username"
          validateFirst
          rules={[
            {
              required: true,
              message: 'Please enter your email!'
            },
            {
              pattern: emailPattern,
              message: 'Email is not a valid email!'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!'
            },
            {
              pattern: new RegExp(/^[A-Za-z\d]+$/),
              message: 'Must be alphanumeric'
            },
            {
              min: 8,
              max: 128,
              message: 'Between 8 and 128 characters'
            },
            {
              pattern: new RegExp(/(?=.*\d)/),
              message: 'At least one number'
            },
            {
              pattern: new RegExp(/(?=.*[A-Z])/),
              message: 'At least one capital letter'
            }
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!enableBtn}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </SignInContainer>
  );
};

export default SignIn;

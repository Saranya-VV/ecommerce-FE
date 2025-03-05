import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { fetchUserDetails, updateUserDetails, clearSuccess, clearError } from '../redux/userSlice';

const { Title } = Typography;

function Profile() {
  const [form] = Form.useForm();  // Create a form instance
  const dispatch = useDispatch();
  const { user, error, success, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetails());  // Fetch user details from Redux
  }, [dispatch]);

  useEffect(() => {
    // Only set form fields if user exists and has meaningful changes
    if (user && Object.keys(user).length > 0) {
      form.setFieldsValue(user);
    }
  }, [form, user]);  

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }
  }, [success, dispatch]);

  const handleUpdate = (values) => {
    dispatch(updateUserDetails(values));  
  };

  return (
    <div style={{ width: 400, margin: '100px auto', padding: 24, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: 8 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>Profile</Title>

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      {success && <Alert message={success} type="success" showIcon style={{ marginBottom: 16 }} />}

      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Enter your name" disabled={loading} />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Enter your email" disabled={loading} />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input placeholder="Enter your phone number" disabled={loading} />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input placeholder="Enter your address" disabled={loading} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Profile;

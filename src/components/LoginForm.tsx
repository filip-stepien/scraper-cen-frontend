import { useSignIn } from '@/hooks/useSignIn';
import { Form, Input, Button } from 'antd';

type FieldType = {
    password: string;
};

export function LoginForm() {
    const [form] = Form.useForm();
    const { loading, error, handleSubmit, clearError } = useSignIn(form);

    return (
        <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
            requiredMark={label => <div>{label}</div>}
            onInput={clearError}
            className="!w-full"
        >
            <Form.Item<FieldType>
                label="Hasło dostępu"
                name="password"
                className="w-full sm:w-[300px]"
                rules={[{ required: true, message: '' }]}
                validateStatus={error === null ? '' : 'error'}
                help={error}
            >
                <Input.Password
                    placeholder="Wprowadź hasło..."
                    className="w-full"
                    disabled={loading}
                />
            </Form.Item>
            <Form.Item label={null} className="w-full sm:w-[300px] pt-1.5!">
                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    loading={loading}
                >
                    Zaloguj
                </Button>
            </Form.Item>
        </Form>
    );
}

import {
    type FormProps,
    Form,
    Input,
    Button,
    Divider,
    Typography,
    Flex
} from 'antd';

type FieldType = {
    newPassword?: string;
    reapeatNewPassword?: string;
};

const { Title } = Typography;

const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
};

export function AuthSettings() {
    return (
        <>
            <Flex vertical>
                <Title level={5} style={{ margin: 0 }}>
                    Zmiana hasła
                </Title>
                <Divider style={{ margin: '12px 0 12px 0' }} />
            </Flex>
            <Form
                name='basic'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                layout='vertical'
            >
                <Form.Item<FieldType> label='Nowe hasło' name='newPassword'>
                    <Input.Password placeholder='Nowe hasło...' />
                </Form.Item>

                <Form.Item<FieldType>
                    label='Powtórz hasło'
                    name='reapeatNewPassword'
                >
                    <Input.Password placeholder='Powtórz nowe hasło...' />
                </Form.Item>

                <Form.Item label={null}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{ width: '100%', marginTop: 12 }}
                    >
                        Zapisz
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

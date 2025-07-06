import { InfoCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Divider,
    Drawer,
    Flex,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    TimePicker,
    Tooltip,
    Typography,
    type FormProps
} from 'antd';
import dayjs from 'dayjs';

type FieldType = {
    newPassword?: string;
    reapeatNewPassword?: string;
};

const { Title } = Typography;

type Props = {
    open?: boolean;
    onClose?: () => void;
};

const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
};

export function SettingsDrawer({ open, onClose }: Props) {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            title='Ustawienia'
            extra={
                <Space>
                    <Button onClick={onClose} type='primary'>
                        Zapisz
                    </Button>
                </Space>
            }
        >
            <Form
                name='basic'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                layout='vertical'
            >
                <Flex vertical style={{ marginTop: -6 }}>
                    <Title level={5} style={{ margin: 0 }}>
                        Zmiana hasła
                    </Title>
                    <Divider style={{ margin: '12px 0 12px 0' }} />
                </Flex>

                <Form.Item<FieldType> label='Nowe hasło' name='newPassword'>
                    <Input.Password placeholder='Nowe hasło...' />
                </Form.Item>

                <Form.Item<FieldType>
                    label='Powtórz hasło'
                    name='reapeatNewPassword'
                >
                    <Input.Password placeholder='Powtórz nowe hasło...' />
                </Form.Item>

                <Flex vertical>
                    <Title level={5} style={{ margin: 0 }}>
                        Dane
                    </Title>
                    <Divider style={{ margin: '12px 0 12px 0' }} />
                </Flex>

                <Form.Item label='Ilość przechowywanych cen na produkt'>
                    <InputNumber style={{ width: '100%' }} value={10} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 6 }}
                    label={
                        <Space>
                            <span>Rozpocznij pobieranie danych o godzinie</span>
                            <Tooltip title='Godzina o której nastąpi pierwsza aktualizacja danych po uruchomieniu aplikacji.'>
                                <InfoCircleOutlined
                                    style={{ cursor: 'help' }}
                                />
                            </Tooltip>
                        </Space>
                    }
                >
                    <TimePicker
                        format='HH:mm'
                        style={{ width: '100%' }}
                        value={null}
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 24 }}>
                    <Checkbox>Zaraz po uruchomieniu aplikacji</Checkbox>
                </Form.Item>

                <Form.Item label='Następnie aktualizuj dane'>
                    <Select
                        defaultValue='6h'
                        options={[
                            { value: '6h', label: 'Co 6 godzin' },
                            { value: '12h', label: 'Co 12 godzin' },
                            { value: '1d', label: 'Co 1 dzień' },
                            {
                                value: 'Co 14 dni',
                                label: '14d'
                            },
                            {
                                value: 'Co 30 dni',
                                label: '30d'
                            }
                        ]}
                    />
                </Form.Item>

                <Flex vertical>
                    <Space>
                        <Title level={5} style={{ margin: 0 }}>
                            Powiadomienia Telegram
                        </Title>
                        <Tooltip title='Powiadomienia wysyłane do użytkowników, którzy zainicjowali kontakt z botem przez Telegram.'>
                            <InfoCircleOutlined style={{ cursor: 'help' }} />
                        </Tooltip>
                    </Space>
                    <Divider style={{ margin: '12px 0 12px 0' }} />
                </Flex>

                <Form.Item style={{ marginBottom: 12 }}>
                    <Checkbox>
                        Wysyłaj powiadomienia o aktualizacji danych
                    </Checkbox>
                </Form.Item>

                <Button style={{ width: '100%' }}>
                    Wyczyść listę użytkowników bota
                </Button>
            </Form>
        </Drawer>
    );
}

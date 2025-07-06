import { ClearBotButton } from './ClearBotButton';
import { InfoLabel } from './InfoLabel';
import {
    Form,
    Flex,
    Divider,
    Input,
    InputNumber,
    TimePicker,
    Checkbox,
    Select,
    Typography,
    type FormProps
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

type SettingTitleProps = {
    title: string;
    tooltip?: string;
};

function SettingTitle({ title, tooltip }: SettingTitleProps) {
    return (
        <Flex vertical>
            {tooltip ? (
                <InfoLabel label={title} tooltip={tooltip} level={5} />
            ) : (
                <Title level={5} className='m-0!'>
                    {title}
                </Title>
            )}
            <Divider className='my-3!' />
        </Flex>
    );
}

export function SettingsForm() {
    return (
        <Form
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            layout='vertical'
        >
            <SettingTitle title='Zmiana hasła' />

            <Form.Item<FieldType> label='Nowe hasło' name='newPassword'>
                <Input.Password placeholder='Wprowadź nowe hasło...' />
            </Form.Item>

            <Form.Item<FieldType>
                label='Powtórz hasło'
                name='reapeatNewPassword'
            >
                <Input.Password placeholder='Powtórz nowe hasło...' />
            </Form.Item>

            <SettingTitle title='Dane' />

            <Form.Item label='Ilość przechowywanych cen na produkt'>
                <InputNumber className='w-full!' value={10} />
            </Form.Item>

            <Form.Item
                className='mb-3!'
                label={
                    <InfoLabel
                        label='Rozpocznij pobieranie danych o godzinie'
                        tooltip='Godzina o której nastąpi pierwsza aktualizacja danych po uruchomieniu aplikacji.'
                    />
                }
            >
                <TimePicker
                    format='HH:mm'
                    className='w-full'
                    value={null}
                    placeholder='Wybierz godzinę...'
                />
            </Form.Item>

            <Form.Item className='mb-6'>
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

            <SettingTitle
                title='Powiadomienia Telegram'
                tooltip='Powiadomienia wysyłane do użytkowników, którzy zainicjowali kontakt z botem przez Telegram.'
            />

            <Form.Item className='mb-3!'>
                <Checkbox>Wysyłaj powiadomienia o aktualizacji danych</Checkbox>
            </Form.Item>

            <ClearBotButton />
        </Form>
    );
}

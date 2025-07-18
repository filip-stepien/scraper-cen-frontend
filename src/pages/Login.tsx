import { Divider, Flex, Typography } from 'antd';
import { LoginForm } from '@/components/LoginForm';

const { Title } = Typography;

export function Login() {
    return (
        <Flex
            align="center"
            justify="center"
            className="min-w-screen min-h-screen bg-background"
        >
            <Flex
                align="center"
                vertical
                className="bg-white !p-6 sm:!p-8 rounded-md shadow-primary h-screen w-screen sm:h-fit sm:w-fit"
            >
                <Title level={3}>Logowanie</Title>
                <Divider className="mt-2!" />
                <LoginForm />
            </Flex>
        </Flex>
    );
}

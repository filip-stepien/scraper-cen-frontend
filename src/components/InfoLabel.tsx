import { InfoCircleOutlined } from '@ant-design/icons';
import { Space, Tooltip, Typography } from 'antd';

type Props = {
    label: string;
    tooltip: string;
    level?: 1 | 2 | 3 | 4 | 5;
};

const { Title } = Typography;

export function InfoLabel({ label, tooltip, level }: Props) {
    return (
        <Space>
            {level ? (
                <Title level={level} className='m-0!'>
                    {label}
                </Title>
            ) : (
                <span>{label}</span>
            )}
            <Tooltip title={tooltip}>
                <InfoCircleOutlined className='cursor-help' />
            </Tooltip>
        </Space>
    );
}

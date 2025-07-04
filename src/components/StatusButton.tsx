import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

export function StatusButton() {
    return (
        <Button
            icon={<SyncOutlined spin style={{ color: 'rgb(22, 119, 255)' }} />}
        >
            Status
        </Button>
    );
}

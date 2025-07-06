import { LoadingOutlined } from '@ant-design/icons';
import { Drawer, Steps } from 'antd';

type Props = {
    open?: boolean;
    onClose?: () => void;
};

export function StatusDrawer({ open, onClose }: Props) {
    return (
        <Drawer open={open} onClose={onClose} title='Status'>
            <Steps
                size='default'
                direction='vertical'
                current={1}
                items={[
                    {
                        title: 'Rozpocznij pobieranie danych.',
                        description: '21.02.2002 | 21:21'
                    },
                    {
                        title: 'Pobierz dane ze strony Castorama.',
                        description: '21.02.2002 | 21:21',
                        icon: <LoadingOutlined spin />
                    },
                    {
                        title: 'Pobieranie danych zakończone.',
                        description: '21.02.2002 | 21:21'
                    }
                ]}
            />
        </Drawer>
    );
}

import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';

type Props = {
    clicked?: boolean;
    onClick?: () => void;
};

const lookbackHours = import.meta.env.VITE_PRICE_LOOKBACK_HOURS;

export function DisplayNewProductsButton({ clicked, onClick }: Props) {
    return (
        lookbackHours && (
            <Space className="flex items-center">
                <Button
                    type={clicked ? 'primary' : 'default'}
                    onClick={() => onClick?.()}
                >
                    Pokaż tylko nowe
                </Button>
                <Tooltip
                    title={`Nowe produkty to te, które zostały zaktualizowane w ciągu ostatnich ${lookbackHours}\u00A0godzin.`}
                >
                    <InfoCircleOutlined className="!text-sm !text-font-secondary cursor-help" />
                </Tooltip>
            </Space>
        )
    );
}

import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';

type Props = {
    clicked?: boolean;
    onClick?: () => void;
    className?: string;
};

const lookbackHours = import.meta.env.VITE_PRICE_LOOKBACK_HOURS;

export function DisplayNewProductsButton(props: Props) {
    const { clicked, onClick, className } = props;
    return (
        lookbackHours && (
            <Space className="flex items-center ">
                <Button
                    type={clicked ? 'primary' : 'default'}
                    onClick={() => onClick?.()}
                    className={className}
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

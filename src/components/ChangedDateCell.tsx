import { isProductNew } from '@/lib/products';
import { Flex, Tag } from 'antd';
import dayjs from 'dayjs';

type Props = {
    changedAt?: number;
};

export function ChangedDateCell({ changedAt }: Props) {
    const isNew = isProductNew(changedAt);

    return changedAt ? (
        <Flex className="gap-2.5" align="center">
            <span>{dayjs.unix(changedAt).format('DD.MM.YYYY')}</span>
            {isNew && (
                <Tag className="w-fit" color="blue">
                    <span className="!text-xs">Nowe dane</span>
                </Tag>
            )}
        </Flex>
    ) : (
        'Brak danych'
    );
}

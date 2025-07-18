import { Select, type SelectProps } from 'antd';

type Props = {
    className?: string;
};

export function CompanySelect({ className }: Props) {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const options: SelectProps['options'] = [
        { value: 'castorama', label: <span>Castorama</span> }
    ];

    return (
        <Select
            className={className}
            defaultValue={options.at(0)?.value?.toString()}
            onChange={handleChange}
            options={options}
        />
    );
}

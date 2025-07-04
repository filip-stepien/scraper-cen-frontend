import { Select, type SelectProps } from 'antd';

export function CompanySelect() {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const options: SelectProps['options'] = [
        { value: 'castorama', label: <span>Castorama</span> }
    ];

    return (
        <Select
            defaultValue={options.at(0)?.value?.toString()}
            onChange={handleChange}
            options={options}
        />
    );
}

import { Flex, Spin } from 'antd';

export function Loading() {
    return (
        <Flex
            align='center'
            justify='center'
            className='min-w-screen min-h-screen '
        >
            <Spin size='large' tip='Ładowanie...'>
                <div className='p-[100px] ' />
            </Spin>
        </Flex>
    );
}

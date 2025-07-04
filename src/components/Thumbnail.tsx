import { Spin } from 'antd';
import { useState } from 'react';

type Props = {
    imageUrl: string;
    sizePx: number;
};

export function Thumbnail({ imageUrl, sizePx }: Props) {
    const [loading, setLoading] = useState(true);

    const handleClick = () => {
        window.open(imageUrl, '_blank');
    };

    return (
        <div
            onClick={handleClick}
            style={{
                width: `${sizePx}px`,
                height: `${sizePx}px`,
                overflow: 'hidden',
                borderRadius: '4px',
                cursor: 'pointer',
                position: 'relative'
            }}
        >
            {loading && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff'
                    }}
                >
                    <Spin size='small' />
                </div>
            )}
            <img
                src={imageUrl}
                alt='Thumbnail'
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: loading ? 'none' : 'block'
                }}
            />
        </div>
    );
}

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
                minWidth: `${sizePx}px`,
                minHeight: `${sizePx}px`,
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
                        backgroundColor: '#fff',
                        zIndex: 1
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
                    objectFit: 'contain',
                    opacity: loading ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            />
        </div>
    );
}

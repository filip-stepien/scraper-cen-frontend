import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartZoom from 'chartjs-plugin-zoom'; // Import pluginu
import type { PriceData } from '@/types';
import dayjs from 'dayjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartZoom
);

type Props = {
    data: Required<PriceData>[];
    height?: number;
    fontSize?: number;
};

const options: any = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        x: {
            offset: true,
            ticks: {
                maxTicksLimit: 10
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Wykres cen'
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true
                },
                pinch: {
                    enabled: true
                },
                drag: {
                    enabled: true
                },
                mode: 'x'
            }
        }
    }
};

export function PriceChart({ data, height = 300 }: Props) {
    return (
        <Line
            height={height}
            options={options}
            data={{
                labels: data.map(entry =>
                    dayjs.unix(entry.changedAt).format('DD.MM.YYYY')
                ),
                datasets: [
                    {
                        label: 'Cena',
                        data: data.map(entry => entry.price),
                        backgroundColor: '#1890ff',
                        borderColor: '#1890ff',
                        tension: 0.05
                    }
                ]
            }}
        />
    );
}

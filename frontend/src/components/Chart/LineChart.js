import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['1','2','3','4','5','6','7','8','9','10'],
    datasets: [
        {
            label: 'My Assets Flow Chart',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [60, 50, 80, 81, 56, 55, 40, 60, 65, 69]
        }
    ]
}

export default class LineChart extends React.Component {
    render() {
        return (
            <div>
                <Line ref="chart" chartData={data} width={100} height={250} options={{ maintainAspectRatio: false }} />
            </div>
        );
    }

    // componentDidMount() {
    //     const { datasets } = this.refs.chart.chartInstance.data
    //     console.log(datasets[0].data);
    // }
}




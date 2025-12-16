import React from 'react'
import './SalesPerformace.css';
import ReactApexChart from 'react-apexcharts';

const SalesPerformance = ({ data }) => {

    const [state, setState] = React.useState({
        series: [data?.summary?.totalReview],
        options: {
            chart: {
                type: 'radialBar',
                height: 300,
                offsetY: -5,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -140,
                    endAngle: 140,
                    track: {
                        background: 'rgba(198, 27, 26, 0.2)',
                        strokeWidth: '97%',
                        margin: 20, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: '#444',
                            opacity: 1,
                            blur: 2
                        }
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            show: false
                        }
                    }
                }
            },
            grid: {
                padding: {
                    top: -10
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'linear',
                    gradientToColors: ['var(--primary-light-color)'], // Last color in the gradient
                    stops: [13.68, 49.84, 86.01], // Matching percentages of the gradient
                    colorStops: [
                        {
                            offset: 13.68,
                            color: 'var(--primary-light-color)',
                            opacity: 1,
                        },
                        {
                            offset: 49.84,
                            color: 'var(--primary-light-color)',
                            opacity: 1,
                        },
                        {
                            offset: 86.01,
                            color: 'var(--primary-light-color)',
                            opacity: 1,
                        },
                    ],
                },
            },
            stroke: {
                dashArray: 10,
            },
            labels: ['Average Results'],
        },
    });

    const [strockedCircleState, setStrockedCircleState] = React.useState({
        series: [data?.summary?.totalReview],
        options: {
            chart: {
                height: 250,
                type: 'radialBar',
                offsetY: 0
            },
            plotOptions: {
                radialBar: {
                    startAngle: -140,
                    endAngle: 140,
                    
                    track: {
                        fill: 'var(--primary-light-color)',
                        strokeWidth: '100%'
                    },
                    dataLabels: {
                        name: {
                            fontSize: '10px',
                            color: 'var(--text-gray)',
                            offsetY: 20,

                        },
                        value: {
                            offsetY: -20,
                            fontSize: '30px',
                            color: '#000',
                            formatter: function (val) {
                                return val + "%";
                            }
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'linear',
                    gradientToColors: ['var(--primary-light-color)'], // Last color in the gradient
                    stops: [13.68, 49.84, 86.01], // Matching percentages of the gradient
                    colorStops: [
                        {
                            offset: 13.68,
                            color: 'var(--primary-light-color)',
                            opacity: 1,
                        },
                        {
                            offset: 49.84,
                            color: 'var(--primary-light-color)',
                            opacity: 1,
                        },
                        {
                            offset: 86.01,
                            color: 'var(--primary-light-color)',
                            opacity: 1,
                        },
                    ],
                },
            },
            stroke: {
                dashArray: 10,
            },
            labels: ['Out of 100 points'],
        },
    });

    React.useEffect(() => {
        if (data?.summary?.totalReview !== undefined) {
            setState((prev) => ({
                ...prev,
                series: [data.summary.totalReview],
            }));
            setStrockedCircleState((prev) => ({
                ...prev,
                series: [data.summary.totalReview],
            }));
        }
    }, [data]);

    return (
        <div className='sales-performance-inner-container'>
            <div className='sales-performance-head-head'>
                <p>Reviews</p>
            </div>
            <div className='sales-performance-body'>
                <div id="chart" className='radial-chart-container'>
                    <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="radialBar"
                        height={300}
                    />

                </div>
                <div id="chart2" className='inner-lined-chart'>
                    <ReactApexChart
                        options={strockedCircleState.options}
                        series={strockedCircleState.series}
                        type="radialBar"
                        height={250}
                    />
                </div>
                <div id="html-dist"></div>
                <div className='sale-performance-under-line'></div>
                <div className='sale-performance-comments-container'>
                    <h3>You'r Good</h3>
                    <p>Your sales performance is better than 30% of other users</p>
                </div>
            </div>
        </div>
    )
}

export default SalesPerformance

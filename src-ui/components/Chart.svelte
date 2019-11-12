<script>
    import { onMount } from 'svelte'
    import ApexCharts from 'apexcharts'

    import { marketData } from '~/lib/market'
    import { formatDate } from '~/lib/helpers'

    let container
    let chart

    let shadowContainer
    let shadowChart

    let mode = '1h'
    let modes = ['1h', '24h', '7d', '1m']

    $: updateData($marketData, chart, mode)

    const updateData = (data) => {
        if (!data || !chart) {
            return
        }

        const set = data['history-usd'].data[mode]

        set.sort((a, b) => a[0] - b[0])

        let max = 0
        let min = 100

        const series = [
            {
                data: [
                    {
                        x: set[set.length - 1][0],
                        y: parseFloat(set[set.length - 1][1])
                    }
                ]
            },
            {
                data: set.map(([time, close]) => {
                    if (close > max) {
                        max = close
                    }
                    if (close < min) {
                        min = close
                    }
                    return {
                        x: time,
                        y: close
                    }
                })
            }
        ]
        chart.updateSeries(series)

        const shadowSeries = [
            {
                data: set.map(({ time, close }) => {
                    return {
                        x: time,
                        y: close + (max - close) * 0.4
                    }
                })
            }
        ]
        shadowChart.updateSeries(shadowSeries)

        shadowChart.updateOptions({
            yaxis: {
                min
            }
        })
    }

    onMount(() => {
        const options = {
            chart: {
                type: 'line',
                height: '100%',
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: false
                }
            },
            stroke: {
                curve: 'smooth'
            },
            series: [
                {
                    name: '$',
                    data: [0, 1, 2]
                }
            ],
            legend: {
                show: false
            },
            xaxis: {
                show: false,
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                show: false
            },
            grid: {
                show: false,
                padding: {
                    left: 0,
                    right: 0
                }
            },
            tooltip: {
                marker: {
                    show: false
                },
                x: {
                    show: true,
                    formatter: (val) => formatDate(val)
                },
                y: {
                    show: true,
                    formatter: (val) => `${val}`,
                    title: {
                        formatter: (seriesName) => ''
                    }
                }
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0],
                formatter: function(value) {
                    return value
                },
                style: {
                    fontSize: '12px'
                }
            },
            markers: {
                size: [5, 0],
                colors: ['#3569D7'],
                strokeColors: '#fff',
                strokeWidth: 2,
                fillOpacity: 1,
                strokeOpacity: 1,
                hover: {
                    size: 5
                }
            }
        }

        chart = new ApexCharts(container, options)
        chart.render()

        const shadowOptions = Object.assign({}, options, {
            chart: {
                type: 'area',
                height: '100%',
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: false
                }
            },
            stroke: {
                curve: 'smooth',
                width: 0
            },
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    colorStops: [
                        {
                            offset: 30,
                            color: 'var(--chart-bg)',
                            opacity: 1
                        },
                        {
                            offset: 100,
                            color: 'var(--bg)',
                            opacity: 1
                        }
                    ]
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0
            }
        })

        shadowChart = new ApexCharts(shadowContainer, shadowOptions)
        shadowChart.render()
    })
</script>

<style>
    charts,
    chart {
        display: block;
        position: relative;
        width: 100%;
        height: 200px;
    }

    @media only screen and (max-height: 600px) {
        charts,
        chart {
            height: 160px;
        }
    }

    charts {
        overflow: hidden;
        margin-bottom: 5px;
        transform: translate3d(0, 0, 0);
    }
    chart:nth-of-type(1) {
        position: absolute;
        left: -10px;
        top: 20px;
        width: calc(100% - 30px);
        z-index: 2;
    }

    chart:nth-of-type(2) {
        position: absolute;
        width: calc(100% + 100px);
        left: 50%;
        top: 0px;
        transform: translate(-50%, 0);
        pointer-events: none;
    }

    nav {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 180px;
        margin: 0 auto;
        transform: translate3d(0, 0, 0);
    }
    button {
        font-size: 12px;
        font-weight: 600;
        padding: 3px 11px;
        border-radius: 20px;
        color: var(--fg);
        background: none;
    }

    button.active {
        background: var(--chart-button-bg);
        color: var(--chart-button-fg);
    }
    :global(.apexcharts-datalabels text) {
        font-weight: 600;
        fill: var(--fg);
        transform: translate(0, -8px);
    }
    :global(.apexcharts-line) {
        stroke: var(--chart-fg);
        stroke-width: 3;
    }
</style>

<charts>
    <chart bind:this={container} />
    <chart bind:this={shadowContainer} />
</charts>
<nav>
    {#each modes as item}
        <button
            class:active={item === mode}
            on:click={() => {
                mode = item
            }}>
            {item}
        </button>
    {/each}
</nav>

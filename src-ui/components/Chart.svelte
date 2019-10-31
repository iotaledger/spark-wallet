<script>
    import { onMount } from 'svelte'
    import ApexCharts from 'apexcharts'

    import { marketData } from '~/lib/market'
    import { formatDate } from '~/lib/helpers'

    let container
    let chart

    let shadowContainer
    let shadowChart

    let mode = '1d'
    let modes = ['1d', '1w', '1m', '3m']

    $: updateData($marketData, chart, mode)

    const updateData = (data) => {
        if (!data || !chart) {
            return
        }

        let set = []

        switch (mode) {
            case '1d':
                set = data.hourly.slice(-24)
                break
            case '1w':
                set = data.hourly.filter((_item, index) => index % 6 === 0)
                break
            case '1m':
                set = data.daily.slice(-30)
                break
            case '3m':
                set = data.daily.filter((_item, index) => index % 3 === 0)
                break
        }

        let max = 0
        let min = 100

        const series = [
            {
                data: [
                    {
                        x: set[set.length - 1].time,
                        y: set[set.length - 1].close
                    }
                ]
            },
            {
                data: set.map(({ time, close }) => {
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
                height: 180,
                width: 345,
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
                height: 180,
                width: 400,
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
        height: 180px;
    }
    charts {
        overflow: hidden;
        margin-bottom: 20px;
    }
    chart:nth-of-type(1) {
        position: absolute;
        left: -10px;
        top: 20px;
        z-index: 2;
    }

    chart:nth-of-type(2) {
        position: absolute;
        width: 400px;
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

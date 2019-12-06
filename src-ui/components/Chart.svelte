<script>
    import { onMount } from 'svelte'
    import Chartist from 'chartist'

    import { marketData } from '~/lib/market'
    import { fiatCurrency } from '~/lib/app'
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

        const dataSet = set
            .filter((_item, index) => index % 2 !== 0)
            .map(([time, close]) => {
                const value = parseFloat(close) * $marketData.rates[$fiatCurrency]
                if (value > max) {
                    max = value
                }
                if (value < min) {
                    min = value
                }
                return {
                    x: time,
                    y: value
                }
            })

        const series = {
            labels: dataSet.map((item) => item.x),
            series: [dataSet.map((item) => item.y)]
        }

        const shadowSeries = {
            labels: dataSet.map((item) => item.x),
            series: [dataSet.map((item) => item.y + (max - item.y) * 0.4)]
        }

        setTimeout(() => {
            chart.update(series)
            shadowChart.update(shadowSeries)
        }, 100)
    }

    onMount(() => {
        const options = {
            fullWidth: true,
            chartPadding: {
                left: 0,
                right: 40,
                top: 0,
                bottom: 0
            },
            showPoint: true,
            axisY: {
                showLabel: false,
                showGrid: false,
                offset: 0
            },
            axisX: {
                showLabel: false,
                showGrid: false,
                offset: 0
            },
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 2,
                fillHoles: false
            })
        }

        chart = new Chartist.Line(container, null, options)

        shadowChart = new Chartist.Line(
            shadowContainer,
            null,
            Object.assign(options, {
                showArea: true,
                showLine: false,
                chartPadding: 0
            })
        )

        chart.on('draw', function(data) {
            if (data.type === 'point') {
                const circle = new Chartist.Svg('circle', {
                    cx: data.x,
                    cy: data.y,
                    r: 6
                })
                data.group
                    .elem('text', {
                        x: data.x - 12,
                        y: data.y - 16,
                        textAnchor: 'middle',
                        align: 'center'
                    })
                    .text('$' + Math.round(data.value.y * 1000) / 1000)
                data.element.replace(circle)
            }
        })
    })
</script>

<style>
    charts {
        display: block;
        position: relative;
        width: 100%;
        height: 200px;
    }

    chart,
    charts svg {
        display: block;
        position: absolute;
        width: 100%;
        height: 160px;
    }

    #chartGradient .gradient-top {
        stop-color: var(--chart-bg);
    }

    #chartGradient .gradient-bottom {
        stop-color: var(--bg);
    }

    charts {
        overflow: hidden;
        margin-bottom: 5px;
        transform: translate3d(0, 0, 0);
    }

    charts > svg {
        position: absolute;
    }

    chart:nth-of-type(1) {
        top: 30px;
        z-index: 2;
    }

    chart:nth-of-type(2) {
        width: calc(100% + 40px);
        left: 50%;
        top: 0px;
        transform: translate(-50%, 0);
        pointer-events: none;
    }

    :global(chart:nth-of-type(1) path) {
        fill: none;
        stroke: var(--chart-fg);
        stroke-width: 3;
    }

    :global(chart:nth-of-type(1) circle, chart:nth-of-type(1) text) {
        display: none;
    }

    :global(chart:nth-of-type(1) circle:last-of-type) {
        display: block;
        stroke: #fff;
        fill: #3569d7;
        stroke-width: 3;
    }

    :global(chart:nth-of-type(1) text:last-of-type) {
        display: block;
        fill: var(--fg);
        font-weight: 600;
        font-size: 12px;
    }

    :global(chart:nth-of-type(2) path) {
        fill: url(#chartGradient);
        stroke: none;
    }

    nav {
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
</style>

<charts>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <linearGradient id="chartGradient" gradientTransform="rotate(90)">
            <stop class="gradient-top" offset="0%" />
            <stop class="gradient-bottom" offset="100%" />
        </linearGradient>
    </svg>
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

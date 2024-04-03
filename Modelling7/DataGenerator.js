function GenerateData(p) {
    let Positions = [[], [], [], [], []]

    const ampl = Number(p.Amplitude)
    const df = Number(p.DeltaFrequency)
    const f1 = Number(p.Frequency)
    const f2 = f1 + df

    const w1 = 2 * Math.PI * f1
    const w2 = 2 * Math.PI * f2
    const dw = w1 - w2

    const [num, delim] = [10000, 500000]
    Positions[0] = Array.from({ length: num }, (_, i) => i / delim)
    Positions[1] = Positions[0].map(x => ampl * Math.cos(w1 * x))
    Positions[2] = Positions[0].map(x => ampl * Math.cos(w2 * x))
    Positions[3] = Positions[0].map(x => 2 * ampl * Math.cos(w1 * x) * Math.cos(dw * x))
    Positions[4] = Positions[0].map(x => 2 * ampl * Math.cos(dw  * x))


    return Positions
}

export function DrawChart(p) {
    const elements = GenerateData(p)

    let data = [
        {
            x: elements[0],
            y: elements[1],
            type: 'scatter',
            mode: 'lines',
            name: 'Волна 1',
            line: {
                width: 2
            }
        },
        {
            x: elements[0],
            y: elements[2],
            type: 'scatter',
            mode: 'lines',
            name: 'Волна 2',
            line: {
                width: 2
            },
            color: 'red'
        },
        {
            x: elements[0],
            y: elements[3],
            type: 'scatter',
            mode: 'lines',
            name: 'Биение',
            line: {
                width: 2
            },
            color: 'blue'
        },
        {
            x: elements[0],
            y: elements[4],
            type: 'scatter',
            mode: 'lines',
            name: 'Амплитуда биения',
            line: {
                width: 2
            },
            color: 'green'
        }
    ];

    let layout = {
        annotations: [{
            xref: 'paper',
            yref: 'paper',
            x: 0,
            xanchor: 'right',
            y: 1,
            yanchor: 'bottom',
            text: "x, м",
            showarrow: false
        }, {
            xref: 'paper',
            yref: 'paper',
            x: 1,
            xanchor: 'left',
            y: 0,
            yanchor: 'top',
            text: 't, с',
            showarrow: false
        }]
    };

    Plotly.newPlot('chart-container', data, layout);
}
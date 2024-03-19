function GenerateData(p) {
    let Positions = [[], [], []]
    const I_0 = p.ε / p.R
    const time = 5 * p.L / p.R;
    Positions[0] = Array.from({length: 100}, (_, i) => i * time / 100)
    const e = Positions[0].map(x => Math.exp(-p.R * x / p.L))
    Positions[1] = e.map(x => I_0 * (1 - x))
    Positions[2] = e.map(x => I_0 * x)
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
            name: 'Замыкание цепи',
            line: {
                width: 2
            }
        },
        {
            x: elements[0],
            y: elements[2],
            type: 'scatter',
            mode: 'lines',
            name: 'Размыкание цепи',
            line: {
                width: 2
            }
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
            text: 'I, А',
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
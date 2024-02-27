const nu0 = 1.2566370614 * 10e-6

export function GenerateData(p) {
    let Positions = [[], []]
    for (let i = -10 * p.R; i < 10 * p.R; i += 0.05) {
        Positions[0].push(i)
        Positions[1].push(p.N * nu0 * p.I * p.R * p.R / 2 * (1 / (i * i + p.R * p.R) ** 1.5 + 1 / ((i - p.R) ** 2 + p.R * p.R) ** 1.5))
    }

    return Positions
}

export function DrawChart(elements) {
    let data = [
        {
            x: elements[0],
            y: elements[1],
            type: 'scatter',
            mode: 'lines',
            line: {
                width: 5
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
            text: 'B(x), Тл',
            showarrow: false
        }, {
            xref: 'paper',
            yref: 'paper',
            x: 1,
            xanchor: 'left',
            y: 0,
            yanchor: 'top',
            text: 'x, м',
            showarrow: false
        }]
    };

    Plotly.newPlot('chart-container', data, layout);
}
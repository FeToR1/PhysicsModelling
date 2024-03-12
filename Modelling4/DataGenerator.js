function E(t, B, f) {
    const w = 2 * Math.PI * f
    return B * w * Math.sin(w * t)
}

function GenerateData(p) {
    let Positions = [[], [], []]
    const [num, delim] = [10000, 1000] // 100 seconds
    Positions[0] = Array.from({ length: num }, (_, i) => i / delim)
    Positions[1] = Positions[0].map(x => E(x, p.B, p.f))
    Positions[2] = Positions[1].map(x => x / p.R)

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
            name: 'ε(t)',
            line: {
                width: 2
            }
        },
        {
            x: elements[0],
            y: elements[2],
            type: 'scatter',
            mode: 'lines',
            name: 'I(t)',
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
            text: 'ε, В; I, А',
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
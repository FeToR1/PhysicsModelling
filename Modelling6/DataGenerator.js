function GenerateData(p) {
    let Positions = [[], [], [], []]

    const C = p.C * 1e-6

    const time = p.L / p.R;
    Positions[0] = Array.from({length: 200}, (_, i) => i * time / 200)

    const q_0 = p.L / p.R
    const w0 = 1 / Math.sqrt(p.L * C)
    const beta = p.R / 2 / p.L

    const w = Math.sqrt(Math.abs(w0 * w0 - beta * beta))

    // q = q_0 * exp(-beta * t) * cos(w * t)
    Positions[1] = Positions[0].map(t => q_0 * Math.exp(-beta * t) * Math.cos(w * t))
    // I = dq/dt
    Positions[2] = Positions[0].map(t => -beta * q_0 * Math.exp(-beta * t) * Math.cos(w * t) - w * q_0 * Math.exp(-beta * t) * Math.sin(w * t))
    // U = I * R
    Positions[3] = Positions[2].map(I => I * p.R)

    console.log(Positions)
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
            name: 'q(t)',
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
        },
        {
            x: elements[0],
            y: elements[3],
            type: 'scatter',
            mode: 'lines',
            name: 'U(t)',
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
            text: 'q, Кл; I, А; U, В',
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
function calculateIntensity(N, a, lambda, d, theta) {
    const [alpha, beta] = [Math.PI * a * Math.sin(theta) / lambda, Math.PI * d * Math.sin(theta) / lambda]
    return Math.pow(Math.sin(N * beta) / Math.sin(beta), 2) * Math.pow(Math.sin(alpha) / alpha, 2)
}

function GenerateData(p) {
    let {N, a, lambda, d, theta} = p
    N = Number(N)
    a = Number(a) * 1e-3
    lambda = Number(lambda) * 1e-9
    d = Number(d) * 1e-3
    let rad = theta

    let Positions = [[], []]
    const [start, end, length] = [-rad, rad, 1000]
    Positions[0] = Array.from({length: length}, (_, i) => start + i * (end - start) / length)
    Positions[1] = Positions[0].map(theta => calculateIntensity(N, a, lambda, d, theta))

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
            name: 'Интенсивность',
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
            text: "I/I<sub>0</sub>",
            showarrow: false
        }, {
            xref: 'paper',
            yref: 'paper',
            x: 1,
            xanchor: 'left',
            y: 0,
            yanchor: 'top',
            text: 'θ, рад',
            showarrow: false
        }]
    };

    Plotly.newPlot('chart-container', data, layout);
}

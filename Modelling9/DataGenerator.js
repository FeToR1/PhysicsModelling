function GenerateData(p) {
    let {lambda, n1, n2, d, L} = p
    lambda *= 1e-9
    d *= 1e-6
    // console.log()

    let Positions = [[], [], L / d * lambda / n1 * n2]
    const [num, delim] = [1000, 1000]

    Positions[0] = Array.from({length: num}, (_, i) => i / delim)
    Positions[1] = Positions[0].map(x => Math.cos(n1 / n2 * d * x * Math.PI / lambda / L) ** 2 * 255) // Интенсивность

    return Positions
}


export function DrawChart(p) {
    const elements = GenerateData(p)

    let data = []
    for (let i = 0; i < elements[0].length; i++) {
        data.push({
            type: 'line', x0: elements[0][i] * 1000, y0: 0, x1: elements[0][i] * 1000, y1: 10, line: {
                color: `rgb(${elements[1][i]},${elements[1][i]},${elements[1][i]})`,
            }
        })
    }

    const layout = {
        title: 'Интерферреционные полосы',
        xaxis: {
            range: [0, elements[0].length],
            tickvals: Array.from({length: 11}, (_, i) => i * elements[2] * 500),
            // showticklabels: false
            title: '1/500 м'
        },
        yaxis: {
            range: [0, 10],
            // showticklabels: false
            title: "м"
        },
        width: 1500,
        height: 500,
        shapes: data
    };


    Plotly.newPlot('chart-container', [], layout);

}
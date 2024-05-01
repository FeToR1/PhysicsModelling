function GenerateData(p) {
    let {lambda, n1, n2, d, L} = p
    lambda *= 1e-9
    d *= 1e-6

    let Positions = [[], []]
    const [num, delim] = [1000, 1]
    Positions[0] = Array.from({length: num}, (_, i) => i / delim)
    Positions[1] = Positions[0].map(x => Math.cos(n1 / n2 * d * x * Math.PI / lambda / L) ** 2 * 255) // Интенсивность

    return Positions


}


export function DrawChart(p) {
    const elements = GenerateData(p)

    let data = []
    for (let i = 0; i < elements[0].length; i++) {
        data.push({
            type: 'line', x0: elements[0][i], y0: 0, x1: elements[0][i], y1: 10, line: {
                color: `rgb(${elements[1][i]},${elements[1][i]},${elements[1][i]})`,
            }
        })
    }

    console.log(data)

    var layout = {
        title: 'Интерферреционные полосы', xaxis: {
            range: [0, elements[0].length]
        }, yaxis: {
            range: [0, 10]
        }, width: 1500, height: 500, shapes: data
    };


    // let layout = []
    // for (let i = 0; i < elements[0].length; i++) {
    //     layout.push({
    //         type: 'line',
    //         x0: elements[0][i],
    //         y0: 0,
    //         x1: elements[0][i],
    //         y1: elements[1][i],
    //         line: {
    //             color: 'rgb(55, 128, 191)',
    //             width: 3
    //         }
    //     })
    // }

    console.log(layout)

    Plotly.newPlot('chart-container', [], layout);

    // Plotly.newPlot('', data);
}
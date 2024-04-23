function fourierTransform(signal) {
    return signal.map((_, k, arr) => {
        let [re, im] = arr.reduce(([accRe, accIm], val, n) => {
            let phi = -2 * Math.PI * k * n / arr.length;
            return [accRe + val * Math.cos(phi), accIm + val * Math.sin(phi)];
        }, [0, 0]);
        return Math.hypot(re, im);
    });
}
function GenerateData(p) {
    let Positions = [[], [], [], [], [], [], []]
    let { Fn, An, Fm, Am } = p
    let K = An/Am // Коэффициент модуляции

    const [num, delim] = [1000, 10000]
    Positions[0] = Array.from({ length: num }, (_, i) => i / delim)
    Positions[1] = Positions[0].map(x => An * Math.cos(Fn * x)) // Волна несущая
    Positions[2] = Positions[0].map(x => Am * Math.cos(Fm * x)) // Волна информационная
    Positions[3] = Positions[0].map(x => (1 + K * Math.cos(Fm * x)) * An * Math.cos(Fn * x)) // Результат модуляции

    Positions[4] = fourierTransform(Positions[1])
    Positions[5] = fourierTransform(Positions[2])
    Positions[6] = fourierTransform(Positions[3])

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
            name: 'Волна несущая',
            line: {
                width: 2
            }
        },
        {
            x: elements[0],
            y: elements[2],
            type: 'scatter',
            mode: 'lines',
            name: 'Волна модулирующая',
            line: {
                width: 2
            },
        },
        {
            x: elements[0],
            y: elements[3],
            type: 'scatter',
            mode: 'lines',
            name: 'Результат модуляции',
            line: {
                width: 2
            },
        },
    ];

    let data2 = [
        {
            x: elements[0],
            y: elements[4],
            type: 'scatter',
            mode: 'lines',
            name: 'Спектр несущего сигнала',
            line: {
                width: 2
            },
        },
        {
            x: elements[0],
            y: elements[5],
            type: 'scatter',
            mode: 'lines',
            name: 'Спектр информационного сигнала',
            line: {
                width: 2
            },
        },
        {
            x: elements[0],
            y: elements[6],
            type: 'scatter',
            mode: 'lines',
            name: 'Спектр моделированного сигнала',
            line: {
                width: 2
            },

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
            text: "x, мм",
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
    Plotly.newPlot('chart-container2', data2, layout);
}
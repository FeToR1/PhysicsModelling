function fourierTransform(signal) {
    const N = signal.length;
    const result = new Array(N).fill([0, 0]);

    for (let k = 0; k < N; k++) {
        let sumRe = 0;
        let sumIm = 0;

        for (let n = 0; n < N; n++) {
            let phi = -2 * Math.PI * k * n / N;
            sumRe += signal[n] * Math.cos(phi);
            sumIm += signal[n] * Math.sin(phi);
        }

        result[k] = [sumRe, sumIm];
    }

    return result.map(([re, im]) => Math.hypot(re, im));
}

function GenerateData(p) {
    let Positions = [[], [], [], [], [], [], [], []]
    let { Fn, An, Fm, Am } = p
    Fn = Number(Fn)
    An = Number(An)
    Fm = Number(Fm)
    Am = Number(Am)

    const [num, delim] = [5000, 0.001]
    Positions[0] = Array.from({ length: num }, (_, i) => i * delim)
    Positions[1] = Positions[0].map(x =>  An * Math.sin(2 * Math.PI * Fn * x)) // Волна несущая
    Positions[2] = Positions[0].map(x => Am * Math.cos(2 * Math.PI * Fm * x)) // Волна информационная
    Positions[3] = Positions[0].map(x =>
        An * Math.sin(2 * Math.PI * Fn * x) + 0.5 * Am * (
            Math.sin(2 * Math.PI * (Fn + Fm) * x) +
            Math.sin(2 * Math.PI * (Fn - Fm) * x)
        )
    ) // Результат модуляции

    const part = 0.015

    Positions[4] = fourierTransform(Positions[1]).slice(0, num * part)

    let max = Positions[4].reduce((acc, val) => val > acc ? val : acc, 0)
    let max_ind = Positions[4].reduce((acc, val, ind) => val === max ? ind : acc, 0)
    const Fn1 =  2 * Math.PI * Fm / max_ind

    Positions[4] = Positions[4].map(x => x / max * An)
    Positions[5] = fourierTransform(Positions[2]).slice(0, num * part).map(x => x / max * Am)
    Positions[6] = fourierTransform(Positions[3]).slice(0, num * part).map(x => x / max * Am)

    Positions[7] = Array.from({ length: num * part }, (_, i) => i * Fn1 * 10)

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
            x: elements[7],
            y: elements[4],
            type: 'scatter',
            mode: 'lines',
            name: 'Спектр несущего сигнала',
            line: {
                width: 2
            },
        },
        {
            x: elements[7],
            y: elements[5],
            type: 'scatter',
            mode: 'lines',
            name: 'Спектр информационного сигнала',
            line: {
                width: 2
            },
        },
        {
            x: elements[7],
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
            text: 'циклическая частота, рад/с',
            showarrow: false
        }]
    };


    Plotly.newPlot('chart-container', data, layout);
    Plotly.newPlot('chart-container2', data2, layout);
}
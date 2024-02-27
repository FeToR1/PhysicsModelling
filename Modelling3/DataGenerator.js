const nu0 = 1.2566370614

function Distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1)
}

function makeArrow(x, y, angle, length, color = 'black') {
    console.log(color)
    return {
        xref: 'x',
        x: x + length * Math.cos(angle),

        yref: 'y',
        y: y + length * Math.sin(angle),

        axref: 'x',
        ax: x,

        ayref: 'y',
        ay: y,

        arrowcolor: color,
    }

}


function perc2color(perc, min, max) {
    const base = (max - min);

    if (base === 0) {
        perc = 0;
    } else {
        perc = (perc - min) / base * 100;
    }
    let r, g, b = 0;
    if (perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    } else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    const h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}

function CalcB(p) {
    let pos = []
    const B = (I, r) => {
        return (nu0 * I) / (2 * Math.PI * r)
    }

    for (let i = -100; i <= 100; i += 5) {
        for (let j = -100; j < 100; j += 5) {
            let [B_x, B_y] = [0, 0]

            for (let k = 0; k < 5; k++) {
                let I_k = p[`I${k}`]
                let pos_x_I_k = p[`pos_x_I${k}`]
                let pos_y_I_k = p[`pos_y_I${k}`]
                let r = Distance(i, j, pos_x_I_k, pos_y_I_k)
                let angle_r = angle(i, j, pos_x_I_k, pos_y_I_k)
                let B_mod = B(I_k, r)
                B_x -= B_mod * Math.sin(angle_r)
                B_y += B_mod * Math.cos(angle_r)
            }

            pos.push([i, j, angle(B_x, B_y, 0, 0), Math.sqrt(B_x ** 2 + B_y ** 2)])
        }
    }
    return pos

}

export function DrawChart(p) {
    let posB = CalcB(p);

    let data = [
        {
            x: [0],
            y: [0],
            type: 'scatter',
            mode: 'lines',
            line: {
                width: 5
            }
        }
    ];

    let layout = {
        annotations: [],
    };


    let maxB = Math.max(...posB.map(x => {
        if (isNaN(x[3])) {
            return 0
        }
        return x[3]
    }))
    let minB = Math.min(...posB.map(x => {
        if (isNaN(x[3])) {
            return 0
        }
        return x[3]
    }))

    for (let i = 0; i < posB.length; i++) {
        let [x, y, angle, B] = posB[i]
        if (isNaN(angle)) {
            continue
        }

        layout.annotations.push(makeArrow(x, y, angle, 5, perc2color(B, minB, maxB)))
    }

    Plotly.newPlot('chart-container', data, layout);
}
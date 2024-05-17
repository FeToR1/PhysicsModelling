function WaveLength2Color(wavelength) {
    let Gamma = 0.80,
        IntensityMax = 255,
        factor, red, green, blue;
    if ((wavelength >= 380) && (wavelength < 440)) {
        red = -(wavelength - 440) / (440 - 380);
        green = 0.0;
        blue = 1.0;
    } else if ((wavelength >= 440) && (wavelength < 490)) {
        red = 0.0;
        green = (wavelength - 440) / (490 - 440);
        blue = 1.0;
    } else if ((wavelength >= 490) && (wavelength < 510)) {
        red = 0.0;
        green = 1.0;
        blue = -(wavelength - 510) / (510 - 490);
    } else if ((wavelength >= 510) && (wavelength < 580)) {
        red = (wavelength - 510) / (580 - 510);
        green = 1.0;
        blue = 0.0;
    } else if ((wavelength >= 580) && (wavelength < 645)) {
        red = 1.0;
        green = -(wavelength - 645) / (645 - 580);
        blue = 0.0;
    } else if ((wavelength >= 645) && (wavelength < 781)) {
        red = 1.0;
        green = 0.0;
        blue = 0.0;
    } else {
        red = 0.0;
        green = 0.0;
        blue = 0.0;
    }

    if ((wavelength >= 380) && (wavelength < 420)) {
        factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
    } else if ((wavelength >= 420) && (wavelength < 701)) {
        factor = 1.0;
    } else if ((wavelength >= 701) && (wavelength < 781)) {
        factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);
    } else {
        factor = 0.0;
    }

    if (red !== 0) {
        red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
    }
    if (green !== 0) {
        green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
    }
    if (blue !== 0) {
        blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
    }
    return `rgba(${red}, ${green}, ${blue})`;

}


function GenerateData(p) {
    let {R, n, lambda} = p

    let Positions = [[], [], WaveLength2Color(lambda)]

    lambda *= 1e-9
    R *= 1e-3

    for (let m = 1; m < 40; m++) {
        Positions[0].push(5e6 * Math.sqrt((m - 1 / 2) * lambda * R / n)) // светлые полосы
        Positions[1].push(5e6 * Math.sqrt(m * R * lambda / n)) // тёмные полосы
    }

    console.log(Positions)
    return Positions
}

export function DrawChart(p) {
    const elements = GenerateData(p)

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const pos = ctx.canvas.width / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';

    for (let i = elements[0].length - 1; i >= 0; i--) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(pos, pos, elements[1][i], 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = elements[2];
        ctx.beginPath();
        ctx.arc(pos, pos, elements[0][i], 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    ctx.canvas.style.filter = 'blur(5px)';

}
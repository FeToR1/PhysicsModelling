const nu0 = 1.2566370614 * 10e-6

export function GenerateData(p) {
    let Positions = [[], []]
    for (let i = -10 * p.R; i < 10 * p.R; i += 1) {
        Positions[0].push(i)
        Positions[1].push(p.N * nu0 * p.I * p.R * p.R / 2 * (1 / (i * i + p.R * p.R) ** 1.5 + 1 / ((i - p.R) ** 2 + p.R * p.R) ** 1.5))
    }

    return Positions
}
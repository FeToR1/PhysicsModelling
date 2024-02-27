export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

export function getValues(data) {
    return Object.fromEntries(
        data.map(x => [
            x.name,
            document.querySelector(`input[name=${x.name}]`).value
        ])
    )
}
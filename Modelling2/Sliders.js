function TemplateSlider(item) {
    return `
                <div class="slider-container">
                    <label for="paramSlider">Параметр ${item.name}:</label>
                    <input type="range" name="${item.name}" min="${item.min}" max="${item.max}" value="${item.value}" class="slider" step="${item.step}">
                    <p>Значение: <span id="param_${item.name}">${item.value}</span> ${item.unit}</p>
                </div>
                `;
}

export function ChangeHTML(name, value) {
    document.getElementById(`param_${name}`).innerHTML = value;
}

export const generateSliders = (data) => {
    let sliders = '<div id="all_sliders">';
    data.forEach((item) => {
        sliders += TemplateSlider(item);
    });
    return sliders + '</div>';
}
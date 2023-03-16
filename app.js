const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', ev => {
    ev.preventDefault();

    if (ev.code.toLowerCase() === 'space') {
        setRandomColors();
    }
})

document.addEventListener('click', ev => {
    ev.preventDefault();

    const type = ev.target.dataset.type

    if (type === 'lock') {
        const node = ev.target.tagName.toLowerCase() === 'i' ? ev.target : ev.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }
    if (type === 'copy') {
        copyHexCode(ev.target.textContent);
    }
})

function getRandomColor() {
    const hexCode = '0123456789ABCDEF';
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hexCode[Math.floor(Math.random()*hexCode.length)]
    }

    return `#${color}`
}

function setRandomColors() {
    columns.forEach(col => {
        const isLocked = col.querySelector("i").classList.contains('fa-lock');
        const color = getRandomColor();
        const text = col.querySelector('h3');
        const lock = col.querySelector('button');

        if (isLocked){
            return
        }

        text.textContent = color;
        col.style.background = color;

        detectTextColor(text, color);
        detectTextColor(lock, color);
    })
}

function copyHexCode(hex) {
    return navigator.clipboard.writeText(hex);
}

function detectTextColor (text, currentColor) {
    const lumLevel = chroma(currentColor).luminance();
    text.style.color = lumLevel > 0.5? 'black' : 'white'
}


setRandomColors()


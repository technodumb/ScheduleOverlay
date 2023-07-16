const MINUS = document.getElementById('minimize');
const CLOSE_APP = document.getElementById('close');
const TOGGLE = document.getElementById('toggle');
const BODY = document.getElementsByTagName('body')[0];
const btnClass = document.getElementsByClassName('btn');

MINUS.addEventListener('click', minimize);
CLOSE_APP.addEventListener('click', close_app);

TOGGLE.addEventListener('click', () => {
    // TOGGLE background color
    if (BODY.style.backgroundColor == 'transparent') {
        BODY.style.backgroundColor = '#00000080';
        btnClass[0].style.setProperty('--btn-filter', 'invert(1)');
        btnClass[1].style.setProperty('--btn-color', 'white');
        btnClass[2].style.setProperty('--btn-color', 'white');
    }
    else {
        BODY.style.backgroundColor = 'transparent';
        btnClass[0].style.setProperty('--btn-filter', 'invert(0.5)');
        btnClass[1].style.setProperty('--btn-color', '#ffffff80');
        btnClass[2].style.setProperty('--btn-color', '#ffffff80');
    }
});

function minimize() {
    app.window.minimize();
}

function close_app() {
    app.window.close();
}

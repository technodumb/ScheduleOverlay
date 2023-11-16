// ipcRenderer require

const MINUS = document.getElementById('minimize');
const CLOSE_APP = document.getElementById('close');
const TOGGLE = document.getElementById('toggle');
const OPEN = document.getElementById('open');
const ADD = document.getElementById('add');

const SCHEDULE_BODY = document.getElementById('schedule-body');
const BODY = document.getElementsByTagName('body')[0];

const btnClass = document.getElementsByClassName('btn');
const scheduleTag = document.getElementById('schedule');
const scheduleTitleTag = document.getElementById('schedule-title');

document.addEventListener('DOMContentLoaded', resizeTo);

MINUS.addEventListener('click', minimize);
CLOSE_APP.addEventListener('click', close_app);
OPEN.addEventListener('click', openFile);
TOGGLE.addEventListener('click', toggle);
ADD.addEventListener('click', addFile);

scheduleTitleTag.addEventListener('click', toggle);


function minimize() {
    app.window.minimize();
}

function close_app() {
    app.window.close();
}

async function resizeTo(){
    const height = BODY.offsetHeight + 100;
    app.window.resizeTo(400, height);
}

async function openFile() {
    const fileData = await app.window.openFile();
    console.log(fileData);
    const lines = fileData.split('\n');
    SCHEDULE_BODY.innerHTML = '';
    for (let i = 0; i < lines.length; i++) {
        // skip line if empty or whitespace
        if (lines[i].trim() === '') {
            continue;
        }
        SCHEDULE_BODY.innerHTML += `<li>${lines[i]}</li>`;
    }
    // get new height of content and resize window
    await resizeTo();
}

function toggle(){
    // console.log(scheduleTag.style.backgroundColor)
    if (scheduleTag.style.backgroundColor == 'transparent' || scheduleTag.style.backgroundColor == '') {
        scheduleTag.style.backgroundColor = '#00000080';
        // btnClass[0].style.setProperty('--btn-filter', 'invert(0.8)');
        // btnClass[1].style.setProperty('--btn-filter', 'invert(0.8)');
        // btnClass[2].style.setProperty('--btn-color', '#ffffffB0');
        // btnClass[3].style.setProperty('--btn-color', '#ffffffB0');
    }
    else if(scheduleTag.style.backgroundColor == 'rgba(0, 0, 0, 0.5)') {
        scheduleTag.style.borderColor = '#ffffffff';
        scheduleTag.style.backgroundColor = '#000000';
        // btnClass[0].style.setProperty('--btn-filter', 'invert(0.5)');
        // btnClass[1].style.setProperty('--btn-filter', 'invert(0.5)');
        // btnClass[2].style.setProperty('--btn-color', '#ffffff80');
        // btnClass[3].style.setProperty('--btn-color', '#ffffff80');
    }
    else {
        scheduleTag.style.backgroundColor = 'transparent';
        scheduleTag.style.borderColor = 'transparent';
        // btnClass[0].style.setProperty('--btn-filter', 'invert(0.5)');
        // btnClass[1].style.setProperty('--btn-filter', 'invert(0.5)');
        // btnClass[2].style.setProperty('--btn-color', '#ffffff80');
        // btnClass[3].style.setProperty('--btn-color', '#ffffff80');
    }
}

async function addFile() {
    const fileData = await app.window.addFile();
    console.log(fileData);
    const lines = fileData.split('\n');
    SCHEDULE_BODY.innerHTML = '';
    for (let i = 0; i < lines.length; i++) {
        // skip line if empty or whitespace
        if (lines[i].trim() === '') {
            continue;
        }
        SCHEDULE_BODY.innerHTML += `<li>${lines[i]}</li>`;
    }
    // get new height of content and resize window
    await resizeTo();
    
}
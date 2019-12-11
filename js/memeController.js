'use strict'


function init() {
    gCanvas = document.getElementById('canvas-container');
    gCanvas.width = window.innerWidth - 50
    gCanvas.height = window.innerHeight - 100;
    gCtx = gCanvas.getContext('2d')
    renderImgGallery()
    window.addEventListener('resize',
        function () {
            gCanvas = document.getElementById('canvas-container');
            gCanvas.width = window.innerWidth - 50
            gCanvas.height = window.innerHeight - 100;
        })
}


function renderImg() {

    var gImg = new Image();
    gImg.src = gCurrImg
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0)
        for (var i = 0; i < gMeme.txts.length; i++) {
            var txt = getTextToRender(i)
            var fontSize = getFontSize(i) + "px IMPACT"
            var xPos = getlineX(i)
            var yPos = getlineY(i)
            gCtx.font = fontSize;
            gCtx.fillStyle = 'white'
            if (gCurrLine === i) {
                drawTextBG(gCtx, txt, getFontSize(i), xPos, yPos)
            }
            gCtx.fillText(txt, xPos, yPos);
            gCtx.strokeText(txt, xPos, yPos);
        }
    }
}

function onTextInput() {
    var txt = document.querySelector('.input').value
    setMemText(txt)
    renderImg()
}

function renderImgGallery() {
    var strHTML = gImgs.map(function (img) {
        return `<img src=${img.url} class="img" onclick="onImgSelceted(${img.id})">`
    })
    var elGallary = document.querySelector('.gallery')
    console.log(elGallary);

    elGallary.innerHTML = strHTML.join('')
}

function onImgSelceted(imgId) {
    toggleCanvas()
    gCurrImg = getImgToRender(imgId)
    setcurrImgId(imgId)
    renderImg()
}

function toggleCanvas() {
    var elCanvas = document.querySelector(".main-container");
    if (elCanvas.style.display === "none") {
        elCanvas.style.display = "block";
    } else {
        elCanvas.style.display = "none";
    }

    var elGallary = document.querySelector(".gallery");
    if (elGallary.style.display === "grid") {
        elGallary.style.display = "none";
    } else {
        elGallary.style.display = "grid";
    }
}


function onchangeTextSize(diff) {
    updateFontSize(diff)
    renderImg()
}

function onMoveLine(diff) {
    udpatelineLocation(diff)
    renderImg()
}

function onChangeLine() {
    ClearTextBg(gCtx, getTextToRender(gCurrLine), getFontSize(gCurrLine), getlineX(gCurrLine), getlineY(gCurrLine))
    updateCurrLine()
    document.querySelector('.input').value = gMeme.txts[gCurrLine].line
    renderImg()
}



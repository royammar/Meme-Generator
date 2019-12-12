'use strict'
var gisclicked = false

function init() {
    gCanvas = document.getElementById('canvas-container');
    gCanvas.width = 500
    gCanvas.height = 500;
    gCtx = gCanvas.getContext('2d')
    renderImgGallery()
}


function renderImg() {
    var gImg = new Image();
    gImg.src = gCurrImg
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0)
        for (var i = 0; i < gMeme.txts.length; i++) {
            var txt = getTextToRender(i)
            var font = getFont()
            var fontSize = getFontSize(i) + "px " + font
            var xPos = getlineX(i)
            var yPos = getlineY(i)
            gCtx.font = fontSize;
            gCtx.fillStyle = getFontColor(i)
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
        elCanvas.style.display = null;
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
    document.querySelector(".color-btn").value = gMeme.txts[gCurrLine].color
    renderImg()
}


function canvasClicked(ev) {
    for (var i = 0; i < gMeme.txts.length; i++) {
        var x = getlineX(i)
        var y = getlineY(i)
        var txt = getTextToRender(i)
        var width = gCtx.measureText(txt).width;
        var fontSize = getFontSize(i)

        if (ev.offsetX > x &&
            ev.offsetX < x + width &&
            ev.offsetY < y &&
            ev.offsetY > y - fontSize) {
            gisclicked = true
            gCurrLine = i
            renderImg()
            document.querySelector('.input').value = txt
            document.querySelector(".color-btn").value = gMeme.txts[gCurrLine].color
        }
    }
}


function draw(ev) {
    if (!gisclicked) return
    gMeme.txts[gCurrLine].Xpos = ev.offsetX
    gMeme.txts[gCurrLine].Ypos = ev.offsetY
    renderImg()

}

function stop() {
    gisclicked = false
}

function onDeleteLine() {
    deleteCurrLine()
    document.querySelector('.input').value = ' '
    renderImg()
}


function onColorChange() {
    var color = document.querySelector(".color-btn").value;
    updateColorLine(color)
    renderImg()
}


function onChangeFont() {
    var font = document.querySelector('.font-input').value
    updateFont(font)
    renderImg()
}

function onShareClick() {
    var elModal = document.querySelector(".modal");
    if (elModal.style.display === 'none') {
        elModal.style.display = ''
    }
    else {
        elModal.style.display = 'none';
    }
}



function downloadImg(elLink) {

    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
    var elModal = document.querySelector(".modal");
    elModal.style.display = 'none';
}


function onShareClicked(elShare, ev) {
    uploadImg(elShare, ev)
    var elModal = document.querySelector(".modal");
    elModal.style.display = 'none';
}


function onSaveClicked() {
updategMemes()
}
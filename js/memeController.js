'use strict'

function init() {
    gCanvas = document.getElementById('canvas-container');
    gCanvas.width = 500
    gCanvas.height = 500;
    gCtx = gCanvas.getContext('2d')
    gTCanvas = document.getElementById('temp-canvas-container');
    gTCanvas.width = 500
    gTCanvas.height = 500;
    gTCtx = gTCanvas.getContext('2d')

    renderImgGallery()
}


function renderImg() {
    var gImg = new Image();
    gImg.src = gCurrImg
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0)
        gTCtx.drawImage(gImg, 0, 0)

        for (var i = 0; i < gMeme.txts.length; i++) {
            var txt = getTextToRender(i)
            var font = getFont()
            var fontSize = getFontSize(i) + "px " + font
            var xPos = getlineX(i)
            var yPos = getlineY(i)
            gCtx.font = fontSize;
            gTCtx.font = fontSize;
            gCtx.fillStyle = getFontColor(i)
            gTCtx.fillStyle = getFontColor(i)
            if (gCurrLine === i) {
                drawTextBG(gCtx, txt, getFontSize(i), xPos, yPos)
            }
            gCtx.fillText(txt, xPos, yPos);
            gCtx.strokeText(txt, xPos, yPos);
            gTCtx.fillText(txt, xPos, yPos);
            gTCtx.strokeText(txt, xPos, yPos);

        }
    }
}


function onTextInput() {
    var txt = document.querySelector('.input').value
    setMemText(txt)
    renderImg()
}

function renderImgGallery() {
    var imgsToRender=getImgsToRender()
    console.log(imgsToRender);
    
    var strHTML = imgsToRender.map(function (img) {
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
    document.querySelector(".search-box").classList.toggle('show');
    elCanvas.style.display = null;
    var elGallary = document.querySelector(".gallery");
    elGallary.style.display = "none";

}
function toggleGallery() {
    document.querySelector(".search-box").classList.toggle('show');
    var elGallary = document.querySelector(".gallery");
    elGallary.style.display = "grid";
    var elCanvas = document.querySelector(".main-container");
    elCanvas.style.display = "none";
    var elMemeGallary = document.querySelector(".meme-container");
    elMemeGallary.style.display = "none";
    var elCanvas = document.querySelector(".main-container");
    elCanvas.style.display = "none";
}

function toggleMemeGallery() {
    document.querySelector(".search-box").classList.toggle('show');
    var memestoRender = loadData()
    var elMemeGallary = document.querySelector(".meme-container");
    elMemeGallary.style.display = 'grid';
    var elGallary = document.querySelector(".gallery");
    elGallary.style.display = "none";
    var elCanvas = document.querySelector(".main-container");
    elCanvas.style.display = "none";
    var strHTML = memestoRender.map(function (meme) {
        return `<img onClick="onMemeSelcted(this)" src="${meme}" alt=""  class="img"></img>`
    })
    elMemeGallary.innerHTML = strHTML.join('')
}

function onMemeSelcted(elMeme) {
var elMemeModal= document.querySelector(".meme-modal")
elMemeModal.style.display=''
var elMemeModalImg=document.querySelector(".meme-modal .meme-img")
elMemeModalImg.src=elMeme.src
toggleMenu()
}

function toggleMenu() {
     document.querySelector(".meme-modal .meme-img").classList.toggle('hide');
    document.body.classList.toggle('menu-open');
    
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
            if (gCurrLine !== i) updateCurrLine()
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
    var imgContent = gTCanvas.toDataURL('image/jpeg');
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


function onSearch() {
var keyWordToSrc=document.querySelector('.search').value
setImgFilter(keyWordToSrc)
renderImgGallery()
}
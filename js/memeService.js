'use strict'
var imgsToRender=[]
var gMemes = []
var gCanvas = ''
var gCtx = ''
var gCurrImg = ''
var gid = 0
var gLineSwitcher = 1
var gFont = 'Impact'
var gCurrLine = 0
var gisclicked = false
var gTCanvas=''
var gTCtx=''
var gImgFilter=''
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gMeme = {
    selectedImgId: 0, selectedTxtIdx: 0,
    txts: [{ line: '', size: 20, align: 'left', color: '#FFFFFF', Xpos: 50, Ypos: 20 },
    { line: '', size: 20, align: 'left', color: '#FFFFFF', Xpos: 50, Ypos: 430 }]
}
var gImgs = [{ id: 0, url: 'img/0.jpg', keywords: ['funny'] },
{ id: 1, url: 'img/1.jpg', keywords: ['cute', 'animals'] },
{ id: 2, url: 'img/2.jpg', keywords: ['cute', 'animals', 'baby'] },
{ id: 3, url: 'img/3.jpg', keywords: ['baby', 'funny'] },
{ id: 4, url: 'img/4.jpg', keywords: ['cute', 'animals'] },
{ id: 5, url: 'img/5.jpg', keywords: ['funny'] },
{ id: 6, url: 'img/6.jpg', keywords: ['funny', 'baby'] },
{ id: 7, url: 'img/7.jpg', keywords: ['funny'] },
{ id: 8, url: 'img/8.jpg', keywords: ['funny'] },
{ id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
{ id: 10, url: 'img/10.jpg', keywords: ['funny'] },
{ id: 11, url: 'img/11.jpg', keywords: ['funny', 'Sport'] },
{ id: 12, url: 'img/12.jpg', keywords: ['Happy', 'DiCAaprio'] },
{ id: 13, url: 'img/13.jpg', keywords: ['scarry'] },
{ id: 14, url: 'img/14.jpg', keywords: ['funny'] },
{ id: 15, url: 'img/15.jpg', keywords: ['funny'] },
{ id: 16, url: 'img/16.jpg', keywords: ['scarry'] },
{ id: 17, url: 'img/17.jpg', keywords: ['funny', 'Cartoon'] },
];


function getImgToRender(imgId) {
    return gImgs[imgId].url
}


function getTextToRender(lineIndex) {

    return gMeme.txts[lineIndex].line
}


function setMemText(txt) {
    gMeme.txts[gCurrLine].line = txt
}

function setcurrImgId(imgId) {
    gMeme.selectedImgId = imgId
}


function updateFontSize(diff) {
    gMeme.txts[gCurrLine].size += diff
}

function getFontSize(lineIndex) {
    return gMeme.txts[lineIndex].size
}

function udpatelineLocation(diff) {

    gMeme.txts[gCurrLine].Ypos += diff
}


function getlineX(lineIndex) {

    return gMeme.txts[lineIndex].Xpos


}

function getlineY(lineIndex) {
    return gMeme.txts[lineIndex].Ypos
}


function updateCurrLine() {
    gCurrLine += gLineSwitcher
    gLineSwitcher *= -1
}

function drawTextBG(gCtx, txt, font, x, y) {
    gCtx.save();
    gCtx.font = font;
    gCtx.textBaseline = 'center';
    gCtx.fillStyle = '#f50';
    var width = gCtx.measureText(txt).width;
    gCtx.beginPath();
    gCtx.rect(x-4, y - font + 4, width + 8, font+4);
    gCtx.fillStyle = '#000';
    gCtx.stroke()
    gCtx.closePath()
    gCtx.restore();
}


function ClearTextBg(gCtx, txt, font, x, y) {
    gCtx.save();
    gCtx.fillStyle = '#f50';
    gCtx.font = font;
    var width = gCtx.measureText(txt).width;
    gCtx.clearRect(x-4, y - font + 4, width + 8, font+4);
    gCtx.restore();
}


function deleteCurrLine() {
    gMeme.txts[gCurrLine].line = ''
    gMeme.txts[gCurrLine].size = 20
    gMeme.txts[gCurrLine].Xpos = 50
    if (gCurrLine === 0) {

        gMeme.txts[gCurrLine].Ypos = 20
    }
    else {
        gMeme.txts[gCurrLine].Ypos = 430
    }
}


function updateColorLine(color) {
    gMeme.txts[gCurrLine].color = color
}

function getFontColor(lineIndex) {
    return gMeme.txts[lineIndex].color
}


function updateFont(font) {
    gFont = font
}

function getFont() {
    return gFont
}

function updategMemes() {
    var meme = gTCanvas.toDataURL('image/jpeg')
    gMemes.push(meme)
    saveToStorage('gMemes', gMemes);
}


function loadData() {
    gMemes = loadFromStorage('gMemes', []);
    return gMemes
}

function setImgFilter(keyWordToSrc) {

gImgFilter=keyWordToSrc
 
}

function getImgsToRender() {
    
        imgsToRender=gImgs.filter(function(img){
          var words= img.keywords.some(function(keyword){
            // debugger
           return keyword.includes(gImgFilter)
           })
            return words
            })

    return imgsToRender
}
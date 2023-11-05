let columns = 26;
let row = 100;
let headerContainer = document.querySelector(".header");
let serialNoContainer = document.querySelector(".sno");
let bodyMani = document.querySelector(".main")

function headerOne(){
    for(let i = 0;i <= columns; i++){
        let creatingHeaderBlocks = document.createElement("div");
        creatingHeaderBlocks.className = "headerblocks";
        if(i !== 0){
            creatingHeaderBlocks.innerText = String.fromCharCode(64+i);
        }
        headerContainer.appendChild(creatingHeaderBlocks);
    }
}
headerOne();

function serialNoOne(){
    for(let i = 1 ; i <= row ; i++){
        let createRowSnoBlocks = document.createElement("div");
        createRowSnoBlocks.className = "row-blocks";
            createRowSnoBlocks.innerText= i;
        serialNoContainer.appendChild(createRowSnoBlocks);
    }
}
serialNoOne()

function createRow(rowNumber){
    let rowsOfBody = document.createElement("div");
    rowsOfBody.className="rowsOfBody";
    for(let i=1;i<=columns;i++){
        let creatRowColumns = document.createElement("div");
        creatRowColumns.className = "creatRowColumns";
        creatRowColumns.contentEditable=true;
        rowsOfBody.appendChild(creatRowColumns);

        creatRowColumns.id = String.fromCharCode(64+i)+rowNumber;
        creatRowColumns.addEventListener("focus",focusOnMe);
        creatRowColumns.addEventListener("input",onFormChange);
    }
    bodyMani.appendChild(rowsOfBody);
}
function runningBodyRow(){
    for(let i=1 ; i <= row;i++){
        createRow(i)
    }
}
runningBodyRow();

const activeCell = document.querySelector(".active-call");
const fontSizeInput = document.querySelector("#fontSize");
const fontFamilyInput = document.querySelector("#fontFamily");
let form = document.querySelector("#form");


let elementOn = null;


let state ={};


const defaultProperties={
    fontFamily:'sans',
    fontSize : 16,
    color : "#000000",
    textAlign : "left",
    backgroundColor : "#ffffff",
    isBold : false,
    isItalic : false,
    isUnderlined : false
};

function focusOnMe(event){
    let elementId = event.target.id;
    activeCell.innerText = elementId;
    elementOn = event.target;
    if(state[elementId]){
        resetOptions(state[elementId]);
    }else{
        resetOptions(defaultProperties);
    }
}

function resetOptions(optionsState){

    form.fontSize.value = optionsState.fontSize;
    form.fontFamily.value = optionsState.fontFamily;
    form.textalign.value = optionsState.textAlign;
    form.bold.checked = optionsState.isBold;
    form.italic.checked = optionsState.isItalic;
    form.underlined.checked = optionsState.isUnderlined;
    form.textcolor.value = optionsState.color;
    form.bgcolor.value = optionsState.backgroundColor
}


// resetOptions({
//     fontFamily:'monospace',
//     fontSize : 19,
//     color : "#000",
//     textAlign : "left",
//     backgroundColor : "#fff",
//     isBold : false,
//     isItalic : false,
//     isUnderlined : false
// });

function onFormChange(){
     if(!elementOn){
        alert("please select a cell to make changes");
        form.reset();
        return;
     }
     let currentState = {
        textColor: form.textcolor.value,
        backgroundColor: form.bgcolor.value,
        fontSize:form.fontsize.value,
        fontFamily:form.fontFamily.value,
        isBold:form.bold.checked,
        isItalic:form.italic.checked,
        isUnderlined:form.underlined.checked,
        textAlign:form.textalign.value
     }
     applyStyleOnCell(currentState);
     state[elementOn.id] = {...currentState,value: elementOn.innerText};
}

function applyStyleOnCell(styleObject){
    console.log(styleObject);
    elementOn.style.fontSize = `${styleObject.fontSize}px`;
    elementOn.style.fontFamily = styleObject.fontFamily;
    elementOn.style.color = styleObject.textColor;
    elementOn.style.backgroundColor = styleObject.backgroundColor;
    elementOn.style.textAlign = styleObject.textAlign;
    if(styleObject.isBold){
        elementOn.style.fontWeight = "bold";
    }else{
        elementOn.style.fontWeight = "normal";
    }
    if(styleObject.isItalic){
        elementOn.style.fontStyle = "italic";
    }else{
        elementOn.style.fontStyle = "normal";
    }
    if(styleObject.isUnderlined){
        elementOn.style.textDecoration = "underline";
    }else{
        elementOn.style.textDecoration = "none";
    }
}
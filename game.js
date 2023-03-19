
var colorGuess;
var colorMy;

const click1 = new Audio("click1.wav");
const click2 = new Audio("click2.wav");

function change(str, value){
    switch (str) {
        case 'r' :
            colorMy.r = trataValor(colorMy.r + value);
            break;
        case 'g' :
            colorMy.g = trataValor(colorMy.g + value);
            break;
        case 'b' :
            colorMy.b = trataValor(colorMy.b + value);
            break;
    }
    console.log(colorMy);
    setColor(colorMy);
    setLabel();
    click1.play();
}

function setColor(item){
    const newColor = 'rgb(' +  item.r + ',' +  item.g + ',' +  item.b + ')';
    const element = document.getElementById(item.id);
    element.style.backgroundColor = newColor;
}

function setLabel(){
    document.getElementById('lblR').innerHTML = colorMy.r;
    document.getElementById('lblG').innerHTML = colorMy.g;
    document.getElementById('lblB').innerHTML = colorMy.b;
}

function randomColor() { 
    const min = 0;
    const max = 255;
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generate(){
    colorMy = {
        id:'btnColorMy',
        r: randomColor(),
        g: randomColor(),
        b: randomColor(),
    }
    colorGuess = {
        id:'btnColorGuess',
        r: randomColor(),
        g: randomColor(),
        b: randomColor(),
    }
}

function trataValor(value){
    return value > 255 ? 255 : value < 0 ? 0 : value;
}

function guess() {
    // Extrai os valores RGB de cada cor
    const r1 = colorMy.r, g1 = colorMy.g, b1 = colorMy.b;
    const r2 = colorGuess.r, g2 = colorGuess.g, b2 = colorGuess.b;
  
    // Calcula a diferença entre cada componente de cor
    const diffR = Math.abs(r1 - r2);
    const diffG = Math.abs(g1 - g2);
    const diffB = Math.abs(b1 - b2);
  
    // Calcula a média das diferenças
    const avgDiff = (diffR + diffG + diffB) / 3;
  
    // Calcula a porcentagem de similaridade
    const similarity = 100 - (avgDiff / 255 * 100);
    let msg = '';
    if(similarity > 80){
        msg = 'Parabens!\nSimilaridade de ' + similarity.toFixed(2) + '%'
    } else if(similarity > 60){
        msg = 'Você pode melhorar!\nSimilaridade de ' + similarity.toFixed(2) + '%'
    } else {
        msg = 'Foi longe!\nSimilaridade de ' + similarity.toFixed(2) + '%'
    }
    click2.play();
    alert(msg);
    restart();
}
  
function restart(){
    generate();
    setColor(colorMy);
    setColor(colorGuess);
    setLabel();
}

restart();

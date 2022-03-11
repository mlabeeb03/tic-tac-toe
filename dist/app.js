const x_class = 'x';
const c_class = 'c';
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.querySelector('#winningMessage');
const restartButton = document.querySelector('#restartButton');

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const cellElements = document.querySelectorAll('[data-cell]');
let cTurn;

startGame();

restartButton.addEventListener('click',startGame);
function startGame(){
    let cTurn = false;
    for(let cell of cellElements){
        cell.classList.remove(c_class);
        cell.classList.remove(x_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    }

    winningMessageElement.classList.remove('show');
}

function handleClick(e){
    const cell = e.target;
    const currentClass = cTurn ? c_class : x_class;

    placeMark(currentClass, cell);

    if(checkWin(currentClass)){
        endGame(false);
    } else if(isDraw()){
        endGame(true);
    } else {
        //change turn
        cTurn = !cTurn;
    }
}

function placeMark(currentClass, cell){
    cell.classList.add(currentClass);
}

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerHTML = 'Draw!';
    } else{
        winningMessageTextElement.innerHTML = `${cTurn ? 'O Wins!' : 'X Wins!'}`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(c_class);
    })
}
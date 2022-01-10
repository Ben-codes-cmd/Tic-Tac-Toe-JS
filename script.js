function player(selection, name){
    return {
        selection,
        name
    }
}

//IIFE
const GAMEBOARD = (() => {
    let board;

    const initialize = () => {
        for(let i = 0; i < indexList.length; i++){
            indexList[i].addEventListener("click", updateBoard, {once: true});
            board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            indexList[i].innerHTML = "";
        }
        result.innerHTML = "";
        continueButton.classList.add("hide");
    }

    const updateBoard = (e) =>{
        let index = parseInt(e.target.dataset.pos);
        board[parseInt(index)] = CONTROLLER.getCur().selection;
        e.target.innerHTML = CONTROLLER.getCur().selection;
        if(checkWin(index) == "WIN"){
            result.innerHTML = `${CONTROLLER.getCur().name} Wins!`;
            freeze();
            continueButton.classList.remove("hide");
        }else if(checkWin(index) == "TIE"){
            result.innerHTML = "Cat's game!";
            freeze();
            continueButton.classList.remove("hide");
        }
        CONTROLLER.switchTurn();
}

    const checkWin = (index) => {
        // check diagonals
        if(index % 2 == 0){
            if((board[0] === board[4] && board[0] === board[8]) && board[0] != " " || (board[2] === board[4] && board[2] === board[6] && board[2] != " ")){
                return "WIN";
            }
        }
        switch(index % 3){
            // horizontal
            // vertical 
            // column 1, 2, 3fff
            case 0:
                if(board[index] === board[index + 1] && board[index] === board[index + 2]){ // this line?
                    return "WIN";
                }
                if(board[0] === board[3] && board[0] === board[6]){
                    return "WIN";
                }
                break;
            case 1:
                if(board[index - 1] === board[index] && board[index] === board[index + 1]){
                    return "WIN";
                }
                if(board[1] === board[4] && board[1] === board[7]){
                    return "WIN";
                }
                break;
            case 2:
                if(board[index] === board[index - 1] && board[index] === board[index - 2]){
                    return "WIN";
                }
                if(board[2] === board[5] && board[2] === board[8]){
                    return "WIN";
                }
                break;
        }
        for(let i = 0; i < 9; i++){
            if(board[i] === " "){
                return "CONTINUE";
            }
        }
        return "TIE";
    }

    const getBoard = () => {
        return board;
    }

    const freeze = () => {
        for(let i = 0; i < indexList.length; i++){
           indexList[i].removeEventListener("click", updateBoard, {once: true});
        }
    }

    // return in object
    return{
        initialize,
        getBoard
    }
})();

const CONTROLLER = (() => {
    let p1 = player("X", "Player 1");
    let p2 = player("O", "Player 2");
    let cur = p1;

    const switchTurn = () => {
        if(cur === p1){
            cur = p2;
        }else{
            cur = p1;
        }
    }

    const getCur = () => {
        return cur;
    }

    const reset = () => {
        cur = p1;
        GAMEBOARD.initialize();
    }
    // return in object
    return {
        switchTurn,
        getCur,
        reset
    }
})();

const indexList = Array.from(document.querySelectorAll(".cell"));
const result = document.getElementById("result");
const continueButton = document.getElementById("continue");
continueButton.addEventListener("click", CONTROLLER.reset);

for(let i = 0; i < indexList.length; i++){
    indexList[i].dataset.pos = i;
}

GAMEBOARD.initialize();

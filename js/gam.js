window.addEventListener("load", start);

//-----------------------Global Variables-------------------------------

var paragraph = '';

var paragraphMoves = '';

//Stores number of valid clicks
var clickCounter = 0;

//Stoers number of remaining matches to dound
var remaining = 8;

//Stores the number of moves
var moves = 0;

//stores three selected cells in one move.
var cell1 = ""; 
var cell2 = "";
var cell3 ="";

//boardArray is a two-D array that models the game board. Stores numbers -1 to 8. 
// 0: trap card
// 1 - 8: game cards. We will have 3 instances of each number.
// -1: the card is found in previous moves.
var boardArray;

var seconds=0;
var minutes=0;
//-----------------------FUNCTIONS-------------------------------


/* TODO: Call reset game method, after loading the html components */

function start(){
	resetGame();
	document.getElementById("seconds").innerHTML = "0:0";
	window.setInterval("updateTimer()",1000);
	window.setInterval("updateTimerMin()",60000);
	paragraph = document.getElementById("remaining");
	paragraphMoves = document.getElementById("moves");
	paragraph.innerHTML = "Remaining matches: " + remaining;
	paragraphMoves.innerHTML = "Moves played: " + moves;
	
}

function resetGame(){
	//we manually define a non-random array containing 1 zero (trap card) and 3 instances of each number between 1 - 8 (game cards). 
	boardArray=[
				  [0,1,1,1,2],
				  [2,2,3,3,3],
				  [4,4,4,5,5],
				  [5,6,6,6,7],
				  [7,7,8,8,8]
				];
	
	//Now shuffle your array to set the numbers randomly.
	boardArray = shuffle(boardArray);
	
	clickCounter = 0;
	cell1="";
	cell2="";
	cell3="";
	moves=0;
	remaining=8;
	seconds=0;
	minutes=0;
	
	setAllCardsToBlank();
	paragraph.innerHTML = "Remaining matches: " + remaining;
	paragraphMoves.innerHTML = "Moves played: " + moves;
}


function shuffle(array) {
    /*ToDo: implement an algorithm that shuffles the numbers in a 2D array. This function will be used to shuffle the numbers between 0-8 in the boardArray. 
	An example of shuffling numbers in a 1D array is given in the assignemnt description.*/

	for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            var i1 = Math.floor(Math.random() * (array.length));
            var j1 = Math.floor(Math.random() * (array[i].length));

            var temp = array[i][j];
            array[i][j] = array[i1][j1];
            array[i1][j1] = temp;
        }
    }	
	
	return array;
}


function setAllCardsToBlank(){
	cardImages = document.getElementsByClassName("cards");
	
	for(i = 0; i< cardImages.length; i++){
		cardImages[i].src = "pics/blank.png"
	}
}


function openCard(tableCell){
	row = tableCell.parentNode.rowIndex;
	column = tableCell.cellIndex;
	
	//ToDo: Open the console and see the output of this line when you click on each table cell.
	console.log("You clicked in cell: (" + row +"," + column +")")	
	
	if(boardArray[row][column] == 0){ // the value 0 shows the trap cell 
		
		trapDetected(tableCell);
		
	}else if(boardArray[row][column] != -1){ // != -1 are cells that the matchings are found before.
		if ((tableCell != cell1) && (tableCell != cell2)){ //checks to see if the three selected cells are distinct cells.
			
			clickCounter++;
			
			imagePath = 'pics/' + boardArray[tableCell.parentNode.rowIndex][tableCell.cellIndex] + '.png'
        	tableCell.innerHTML = "<img src="+imagePath+" class='cards'>"
        	
			//If it is the third selection, call the referee function to check the selected cells.
        	if(clickCounter % 3 == 0) {
                cell3 = tableCell;
                // waits fo 500 milli seconds and then will call the referee function.
                setTimeout(referee, 500);
				clickCounter = 0;
				moves++;
				paragraphMoves.innerHTML = "Moves played: " + moves;
        	}

			//otherwise, store the selected cells and wait for the next card selection.
			else{
                cell1 = cell2;
                cell2 = tableCell;
        	}
		}
	}
	
	
}

function trapDetected(tableCell){
	imagePath = 'pics/' + boardArray[tableCell.parentNode.rowIndex][tableCell.cellIndex] + '.png'
    tableCell.innerHTML = "<img src="+imagePath+" class='cards'>"
    setTimeout(gameOver, 500); // reveals the trap image, waits for 2 seconds and then calls the gameOver function.	
}

function gameOver(){
	alert("Game Over!");
        resetGame();
}


function referee(){
	row1 = cell1.parentNode.rowIndex;
	col1 = cell1.cellIndex;
	row2 = cell2.parentNode.rowIndex;
	col2 = cell2.cellIndex;
	row3 = cell3.parentNode.rowIndex;
	col3 = cell3.cellIndex;
	
	
	if ((boardArray[row1][col1] == boardArray[row2][col2]) && 
	    (boardArray[row1][col1] == boardArray[row3][col3])){
		/* ToDo: if the numbers in the boradArray representing the card image are same, then
	   change the value of boardArray to -1, to prevent selection of these cells.
		*/
			boardArray[row1][col1] = -1;
			boardArray[row2][col2] = -1;
			boardArray[row3][col3] = -1;
			remaining--;
			paragraph.innerHTML = "Remaining matches: " + remaining;
	}
	else
	{
		/*ToDo: 
		close the 3 selected cards (replace the image with blank image)
		*/
		imagePath = 'pics/blank.png'
    	cell1.innerHTML = "<img src="+imagePath+" class='cards'>"
    	cell2.innerHTML = "<img src="+imagePath+" class='cards'>"
    	cell3.innerHTML = "<img src="+imagePath+" class='cards'>"
	}
	cell1="";
	cell2="";
	cell3="";
}

/*ToDo: Add a timer to your program to show how manu seconds has passed after starting the game. An example of a timer was created in your class*/

function updateTimer(){
	++seconds;
	document.getElementById("seconds").innerHTML = minutes+":"+seconds;
}
function updateTimerMin(){
	++minutes;
	seconds=0;
}



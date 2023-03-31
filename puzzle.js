var rows = 5;
var columns = 5;

var currTile;
var otherTile;


window.onload = function() {
    
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            
            let tile = document.createElement("img");
            tile.src = "./puzzle/blank.jpg";

            
            tile.addEventListener("dragstart", dragStart); 
            tile.addEventListener("dragover", dragOver);   
            tile.addEventListener("dragenter", dragEnter); 
            tile.addEventListener("dragleave", dragLeave); 
            tile.addEventListener("drop", dragDrop);       
            tile.addEventListener("dragend", dragEnd);      

            document.getElementById("board").append(tile);
        }
    }

    
    let pieces =[];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); 
    }
    
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }
    

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./puzzle/" + pieces[i] + ".jpg";

        
        tile.addEventListener("dragstart", dragStart); 
        tile.addEventListener("dragover", dragOver);   
        tile.addEventListener("dragenter", dragEnter); 
        tile.addEventListener("dragleave", dragLeave); 
        tile.addEventListener("drop", dragDrop);       
        tile.addEventListener("dragend", dragEnd);      

        document.getElementById("pieces").append(tile);
    }


    
}


function dragStart() {
    currTile = this; 
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; 
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }

    
    
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    checkCorrect();

}

function checkCorrect() {
    let board = document.getElementById("board");
    let tiles = board.getElementsByTagName("img");
    let correct = true;
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      let tileSrc = tile.src.substring(tile.src.lastIndexOf("/") + 1);
      let tileNumber = parseInt(tileSrc.substring(0, tileSrc.lastIndexOf(".")));
      if (tileNumber !== i + 1) {
        correct = false;
        break;
      }
    }
    if (correct) {
      alert("Congratulations, you solved the puzzle!");
    }
  }

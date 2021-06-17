document.addEventListener('DOMContentLoaded', () => {
    const gridUser=document.querySelector(".grid-user")
    const gridComputer=document.querySelector(".grid-computer")

  const width = 10;
  const userSquares=[];
  const computerSquares=[];
//Create Board
  const createBoard = (grid,squares) => {
    for (let index = 0; index <width*width; index++) {
        
      const square=document.createElement("div")
      square.dataset.id=index
      grid.appendChild(square)
      squares.push(square)
      console.log(userSquares)

    }
  };


createBoard(gridUser,userSquares)
createBoard(gridComputer,computerSquares)


//Ships
  const shipArray={

        


  }



});




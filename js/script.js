document.addEventListener('DOMContentLoaded', () => {
  const gridUser = document.querySelector('.grid-user');
  const gridComputer = document.querySelector('.grid-computer');

  const width = 10;
  const userSquares = [];
  const computerSquares = [];
  //Create Board
  const createBoard = (grid, squares) => {
    for (let index = 0; index < width * width; index++) {
      const square = document.createElement('div');
      square.dataset.id = index;
      grid.appendChild(square);
      squares.push(square);
    }
  };

  createBoard(gridUser, userSquares);
  createBoard(gridComputer, computerSquares);

  //Ships
  const shipArray = [
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, width],
      ],
    },

    {
      name: 'submarine',
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },

    {
      name: 'cruiser',
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },

    {
      name: 'battleship',
      directions: [
        [0, 1, 2],
        [0, width, width * 2, width * 3],
      ],
    },
    {
      name: 'carrier',
      directions: [
        [0, 1, 2],
        [0, width, width * 2, width * 3, width * 4],
      ],
    },
  ];

  //Draw computer ships random locations
  const generate = (ship) => {
    let randomDirection = Math.floor(Math.random()*ship.directions.length);//0,1
    let current=ship.directions[randomDirection]
    if(randomDirection===0) direction=1
    if(randomDirection===1) direction=10 
    let randomStart=Math.abs(Math.floor(Math.random()*computerSquares.length-(ship.directions[0].length*direction)))
    const isTaken=current.some(index=>computerSquares[randomStart+index].classList.contains("taken"))
    const isAtRightEdge=current.some(index=>(randomStart+index)%width===width-1)
    const isAtLeftEdge=current.some(index=>(randomStart+index)%width===0)


    if(!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index=>computerSquares[randomStart+index].classList.add("taken",ship.name))
    else generate(ship)
  
  };

  generate(shipArray[0])
  generate(shipArray[1])
  generate(shipArray[2])
  generate(shipArray[3])
  generate(shipArray[4])


});

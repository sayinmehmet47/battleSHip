document.addEventListener('DOMContentLoaded', () => {
  const gridUser = document.querySelector('.grid-user');
  const gridComputer = document.querySelector('.grid-computer');
  const rotate = document.getElementById('rotate');
  const destroyerContainer = document.querySelector('.destroyer-container');
  const cruiserContainer = document.querySelector('.cruiser-container');
  const battleshipContainer = document.querySelector('.battleship-container');
  const carrierContainer = document.querySelector('.carrier-container');
  const submarineContainer = document.querySelector('.submarine-container');

  const start = document.getElementById('start');
  const ships = document.querySelectorAll('.ship');
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
    let randomDirection = Math.floor(Math.random() * ship.directions.length); //0,1
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.abs(
      Math.floor(
        Math.random() * computerSquares.length -
          ship.directions[0].length * direction
      )
    );
    const isTaken = current.some((index) =>
      computerSquares[randomStart + index].classList.contains('taken')
    );
    const isAtRightEdge = current.some(
      (index) => (randomStart + index) % width === width - 1
    );
    const isAtLeftEdge = current.some(
      (index) => (randomStart + index) % width === 0
    );

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
      current.forEach((index) =>
        computerSquares[randomStart + index].classList.add('taken', ship.name)
      );
    else generate(ship);
  };

  generate(shipArray[0]);
  generate(shipArray[1]);
  generate(shipArray[2]);
  generate(shipArray[3]);
  generate(shipArray[4]);

  //rotate the ships
  let rotateType = true;
  rotate.addEventListener('click', () => {
    rotateType = !rotateType;
    destroyerContainer.classList.toggle('destroyer-container-vertical');
    submarineContainer.classList.toggle('submarine-container-vertical');
    carrierContainer.classList.toggle('carrier-container-vertical');
    battleshipContainer.classList.toggle('battleship-container-vertical');
    cruiserContainer.classList.toggle('cruiser-container-vertical');
  });

  let containerTarget = [];

  //move around user ship
  const dragStart = (e) => {
    //console.log(e.target);
  };

  const dragOver = (e) => {
    //console.log(e.target);
  };
  const dragEnter = (e) => {
    //e.target.classList.add('taken submarine');
    containerTarget.push(e.target);
  };
  const dragLeave = (e) => {
    //console.log(e.target);
  };
  const dragDrop = (e) => {
    //console.log(e.target);
  };
  const dragEnd = (e) => {
    const draggedElementType =
      e.target.firstChild.nextElementSibling.id.split(/[^a-z]+/)[0];

    let childCount = e.target.childElementCount;
    let currentElement = containerTarget.reverse()[0];
    let location = Number(currentElement.dataset.id);

    console.log(location);
    if (rotateType) {
      for (let index = 0; index < childCount; index++) {
        currentElement.classList.add(`${draggedElementType}`);
        currentElement.classList.add('taken');

        currentElement = currentElement.nextSibling;
      }
    } else {
      for (let index = 0; index < childCount + 1; index++) {
        currentElement.classList.add(`${draggedElementType}`);
        currentElement.classList.add('taken');

        currentElement = document.querySelector(`[data-id="${location}"]`);
        location += 10;
      }
    }

    e.target.remove();
  };

  ships.forEach((ship) => ship.addEventListener('dragstart', dragStart));
  userSquares.forEach((square) => addEventListener('dragstart', dragStart));
  userSquares.forEach((square) => addEventListener('dragover', dragOver));
  userSquares.forEach((square) => addEventListener('dragenter', dragEnter));
  userSquares.forEach((square) => addEventListener('dragleave', dragLeave));
  userSquares.forEach((square) => addEventListener('drop', dragDrop));
  userSquares.forEach((square) => addEventListener('dragend', dragEnd));

  //display none the ships in computer section
  let takenShips = document.querySelectorAll('.grid-computer .taken');
  let Turn = document.getElementById('turn');
  let scoreTable = document.getElementById('score');

  const score = () => {
    const computerShips = document.querySelectorAll('.grid-computer .taken');
    const userShips = document.querySelectorAll('.grid-user .taken');
    const containers = document.querySelector('.container');
    const destroyedAllComputer = Array.from(computerShips).every((e) =>
      e.classList.contains('destroyed')
    );

    const destroyedAllUser = Array.from(userShips).every((e) =>
      e.classList.contains('destroyed')
    );
    console.log(destroyedAllComputer);
    if (destroyedAllComputer) {
      scoreTable.innerText = 'YOU WIN!!!';
      containers.style.pointerEvents = 'none';
    }
    if (destroyedAllUser) {
      scoreTable.innerText = 'COMPUTER WIN!!!';
      containers.style.pointerEvents = 'none';
    }
  };

  const computerShot = () => {
    Turn.innerText = 'COMPUTER';
    const randomNumber = Math.floor(Math.random() * 100);
    const destroyed = document.querySelector(
      `.grid-user [data-id="${randomNumber}"]`
    );

    setTimeout(() => {
      if (destroyed.classList.contains('taken')) {
        destroyed.classList.add('destroyed');
        score();
        Turn.innerText = 'USER';
      } else {
        destroyed.classList.add('empty-shot');
        Turn.innerText = 'USER';
        score();
      }
    }, 2000);
  };

  start.addEventListener('click', () => {
    const gridDisplay = document.querySelector('.grid-display');
    gridDisplay.style.display = 'none';
    takenShips.forEach((e) => {
      e.classList.toggle('d-none');
    });
    computerShot();
  });

  computerSquares.forEach((element) => {
    element.addEventListener('click', (e) => {
      if (Turn.innerText === 'USER') {
        if (e.target.classList.contains('taken')) {
          e.target.classList.remove('d-none');
          e.target.classList.add('destroyed');
          computerShot();
          score();
        } else {
          e.target.classList.add('empty-shot');

          computerShot();
          score();
        }
      }
    });
  });

  document.querySelector('#restart').addEventListener('click', () => {
    location.reload();
  });
});

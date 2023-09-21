function init() {

    // ! VARIABLES & ELEMENTS

    // ? ELEMENTS
    
    // CREATE GRID
    const grid = document.querySelector('.grid')

    // ? VARIABLES

    //BOARD CONFIG
    const width = 21
    const height = 17
    const cellCount = width * height
    let cells = []

    // CHARACTER CONFIG
    const startingPosition = 346
    let currentPosition = startingPosition
    let previousPosition = startingPosition;

    let frogLog = null;
    let frogTurtle = null;

    let lives = 5;

    // ENVIRONMENT STYLING
    function addClassToCell(position, className) {
        cells[position].classList.add(className)
    }

    // ENVIRONMENT LOCATIONS CONFIG
    const topLocations = [67, 70, 73, 76, 79] // score locations
   
    const startLine = Array.from({ length: width }, (_, i) => cellCount - width + i); // start line

    const topRow = Array.from({length: (2*width)}, (_, i) => (2*width) - (2*width) + i);

    const secondTopRow = Array.from({length: width}, (_, i) => (3*width) - width + i);

    const middleRowStart = (Math.floor(height / 2) * width) + width
    const middleRow = Array.from({length: width }, (_, i) => middleRowStart+i) // middle row

    const rightBorderStart = width - 2;  
    const leftBorderStart = 0;           
    
    const rightBorder = Array.from({length: height}, (_, i) => [ // three right hand borders
        (i * width) + rightBorderStart, 
        (i * width) + rightBorderStart + 1,
        18 + (i* width)
    ]).flat();
    
    const leftBorder = Array.from({length: height}, (_, i) => [  // three left hand borders
        (i * width) + leftBorderStart,  
        (i * width) + leftBorderStart + 1,
        2 + (i*width)
    ]).flat();


    // CARS CONFIG
    const cars = [
        {    // Car 0
            startPosition: cellCount - (width + 1), 
            currentPosition: cellCount - (width + 1),
            speed: 1
        },
        {    // Car 1
            startPosition: cellCount - (width + 1) - 5,
            currentPosition: cellCount - (width + 1) - 5,
            speed: 1
        },
        {    // Car 2
            startPosition: cellCount - (width + 1) - 11,
            currentPosition: cellCount - (width + 1) - 11,
            speed: 1
        },
        {    // Car 3
            startPosition: cellCount - (width * 3 + 1),
            currentPosition: cellCount - (width * 3 + 1),
            speed: 1
        },
        {    // Car 4
            startPosition: cellCount - (width * 3 + 1) - 4,
            currentPosition: cellCount - (width * 3 + 1) - 4,
            speed: 1
        },
        {    // Car 5
            startPosition: cellCount - (width * 3 + 1) - 9,
            currentPosition: cellCount - (width * 3 + 1) - 9,
            speed: 1
        },
        {    // Car 6 (TRUCK 1)
            startPosition: cellCount - ((width * 5) + 1),
            currentPosition: cellCount - ((width * 5) + 1),
            speed: 1
        },
        
        {    // Car 7 (TRUCK 2)
            startPosition: cellCount - ((width * 5) + 1) - 6,
            currentPosition: cellCount - ((width * 5) + 1) - 6,
            speed: 1
        },
    ];

    const rightStart = (height - 3) * width;
    const carsRight = [
        {    // Car 0
            startPosition: rightStart, 
            currentPosition: rightStart,
            speed: 1
        },
        {    // Car 1
            startPosition: rightStart + 4, 
            currentPosition: rightStart + 4,
            speed: 1
        },
        {    // Car 2
            startPosition: rightStart + 8, 
            currentPosition: rightStart + 8,
            speed: 1
        },
        {    // Car 3
            startPosition: (rightStart - (2*width)) + 4, 
            currentPosition: (rightStart - (2*width)) + 4,
            speed: 1
        },

    ]
    // PLATFORMS CONFIG

    // LOGS
    const logs = [
        {    // Log 0
            startPosition: rightStart - (7*width),
            currentPosition: rightStart - (7*width),
            speed: 1
        },
        {    // Log 1
            startPosition: rightStart - (7*width) + 5, 
            currentPosition: rightStart - (7*width) + 5,
            speed: 1
        },
        {    // Log 2
            startPosition: rightStart - (7*width) + 10, 
            currentPosition: rightStart - (7*width) + 10,
            speed: 1
        },
        {    // Log 3
            startPosition: rightStart - (8*width) + 10, 
            currentPosition: rightStart - (8*width) + 10,
            speed: 1
        },
        {    // Log 4
            startPosition: rightStart - (8*width) + 2, 
            currentPosition: rightStart - (8*width) + 2,
            speed: 1
        },
        {    // Log 5
            startPosition: rightStart - (10*width), 
            currentPosition: rightStart - (10*width),
            speed: 1
        },
        {    // Log 6
            startPosition: rightStart - (10*width)+7, 
            currentPosition: rightStart - (10*width)+7,
            speed: 1
        },
        {    // Log 7
            startPosition: rightStart - (10*width)+14, 
            currentPosition: rightStart - (10*width)+14,
            speed: 1
        }
    ]

    // TURTLES

    const turtles = [
        {    // turtle 0
            startPosition: cellCount - (width * 8) - 5,
            currentPosition: cellCount - (width * 8) - 5,
            speed: 1
        },
        {    // turtle 1
            startPosition: cellCount - (width * 8) - 9,
            currentPosition: cellCount - (width * 8) - 9,
            speed: 1
        },
        {    // turtle 2
            startPosition: cellCount - (width * 8) - 13,
            currentPosition: cellCount - (width * 8) - 13,
            speed: 1
        },
        {    // turtle 3
            startPosition: cellCount - (width * 8) - 17,
            currentPosition: cellCount - (width * 8) - 17,
            speed: 1
        },
        {    // turtle 4
            startPosition: cellCount - (width * 8) - 21,
            currentPosition: cellCount - (width * 8) - 21,
            speed: 1
        },
        {    // turtle 5
            startPosition: cellCount - (width * 11) -1,
            currentPosition: cellCount - (width * 11) -1 ,
            speed: 1
        },
        {    // turtle 6
            startPosition: cellCount - (width * 11) -5,
            currentPosition: cellCount - (width * 11) -5,
            speed: 1
        },
        {    // turtle 7
            startPosition: cellCount - (width * 11) -9,
            currentPosition: cellCount - (width * 11) -9,
            speed: 1
        },
        {    // turtle 8
            startPosition: cellCount - (width * 11) -13,
            currentPosition: cellCount - (width * 11) -13,
            speed: 1
        },

    ]

    // END GAME VARIABLES
    let intervalIDs = [];

    let frogPlacement; // 1 or null
    let winStage; // 1 or null
    let winGame; // 1 or null
    let loseLife; // 1 or null

    // ! FUNCTIONS
    // CREATE GRID CELLS
    function createGrid(){
    //Use the cellCount to create our grid cells
        for (let i = 0; i < cellCount; i++){
            const cell = document.createElement('div')
            // Add index to div element
            cell.innerText = i
            // Add index as an attribute
            cell.dataset.index = i

            //Add height and width to each grid cell (div) 
            //Not Dynamically:
            // cell.style.height = '10%'
            // cell.style.width = '10%'

            // Dynamically:
            cell.style.height = `${100 / height}%`
            cell.style.width = `${100 / width}%`

            // Add cell to grid
            grid.appendChild(cell)
            // Add newly created div cell to cells array
            cells.push(cell)
            
        }
            // Add frogger character class to starting posiiton
            addFrogger(startingPosition)

    }

    // ? ADD FROGGER CLASS
    function addFrogger(position) {
        console.log('FROGGER BEING ADDED TO THE FOLLOWING CELL ->', position);
        cells[position].classList.add('frogger')
        previousPosition = position;  // Store the position where frogger is currently

    }

    // ? REMOVE FROGGER CLASS
    function removeFrogger() {
        console.log('FROGGER REMOVED')
        cells[previousPosition].classList.remove('frogger');
        
    }

    // ? ADD FROGGER SCORED CLASS

    function addIcon(position) {
        console.log('ICON BEING ADDED TO THE FOLLOWING CELL ->', position);
        cells[position].classList.add('icon') 
    }

    // ? Handle Frogger movement
    function handleMovement(event) {
        const key = event.keyCode

        const up = 38
        const down = 40
        const left = 37
        const right = 39

        // Remove frogger from previous position before
        // updating current position to new cell
        removeFrogger()

        // Check which key was pressed and execute code
        if (key === up && currentPosition >= width) {
            console.log('Up')
            currentPosition-=width
                } else if (key === down & currentPosition + width <= cellCount-1) {
                console.log('Down')
                currentPosition+=width
                } else if (key === left && currentPosition % width !== 0) {
                console.log('Left')
                currentPosition--
                } else if (key === right && currentPosition % width !== width -1) {
                console.log('Right')
                currentPosition++
                } else {
                    console.log('INVALID KEY');
                }
        
        //  Check if frogger has scored

        if (topLocations.includes(currentPosition)) {
            addIcon(currentPosition)
            currentPosition = startingPosition
        
        }
        //  Add frogger class once currentPosition has been updated
        addFrogger(currentPosition)

        checkForCollision();
        
    }

    //? ADD CAR CLASS

    function addCar(car) {
        cells[car.currentPosition].classList.add('car');
        if(car === cars[7] || car === cars[6]) {
            cells[car.currentPosition + 1].classList.add('car');
        }
    }
    
    //? REMOVE CAR CLASS

    function removeCar(car) {
        cells[car.currentPosition].classList.remove('car');
        if(car === cars[7] || car === cars[6]) {
            cells[car.currentPosition + 1].classList.remove('car');
        }
    }

    //? ADD LOG CLASS
    function addLog(brownLog) {
        cells[brownLog.currentPosition].classList.add('log');
        cells[brownLog.currentPosition + 1].classList.add('log');
        cells[brownLog.currentPosition + 2].classList.add('log');
          if (brownLog === logs[3] || brownLog === logs[4]) {
                cells[brownLog.currentPosition].classList.add('log');
                cells[brownLog.currentPosition + 1].classList.add('log');
                cells[brownLog.currentPosition + 2].classList.add('log');
                cells[brownLog.currentPosition + 3].classList.add('log');
                cells[brownLog.currentPosition + 4].classList.add('log');
            } if (brownLog === logs[5] || brownLog === logs[6] || brownLog === logs[7]) {
                    cells[brownLog.currentPosition].classList.add('log');
                    cells[brownLog.currentPosition + 1].classList.add('log');
                    cells[brownLog.currentPosition + 2].classList.add('log');
                    cells[brownLog.currentPosition + 3].classList.add('log');
    }
}
    //? REMOVE LOG CLASS
    function removeLog(brownLog) {
        cells[brownLog.currentPosition].classList.remove('log');
        cells[brownLog.currentPosition + 1].classList.remove('log');
        cells[brownLog.currentPosition + 2].classList.remove('log');
            if (brownLog === logs[3] || brownLog === logs[4]) {
                cells[brownLog.currentPosition].classList.remove('log');
                cells[brownLog.currentPosition + 1].classList.remove('log');
                cells[brownLog.currentPosition + 2].classList.remove('log');
                cells[brownLog.currentPosition + 3].classList.remove('log');
                cells[brownLog.currentPosition + 4].classList.remove('log');
             } if (brownLog === logs[5] || brownLog === logs[6] || brownLog === logs[7]) {
                    cells[brownLog.currentPosition].classList.remove('log');
                    cells[brownLog.currentPosition + 1].classList.remove('log');
                    cells[brownLog.currentPosition + 2].classList.remove('log');
                    cells[brownLog.currentPosition + 3].classList.remove('log');
            }
    }


    //? ADD TURTLE CLASS
    function addTurtle(turtle) {
            if (turtle === turtles[5] || turtle === turtles[6] || turtle === turtles[7] || turtle === turtles[8]) {
                cells[turtle.currentPosition].classList.add('turtle');
                cells[turtle.currentPosition + 1].classList.add('turtle');
            } else { cells[turtle.currentPosition].classList.add('turtle');
                     cells[turtle.currentPosition + 1].classList.add('turtle');
                     cells[turtle.currentPosition + 2].classList.add('turtle');
    }
    }
    //? REMOVE TURTLE CLASS
    function removeTurtle(turtle) {
        if (turtle === turtles[5] || turtle === turtles[6] || turtle === turtles[7] || turtle === turtles[8]) {
            cells[turtle.currentPosition].classList.remove('turtle');
            cells[turtle.currentPosition + 1].classList.remove('turtle');
             } else { cells[turtle.currentPosition].classList.remove('turtle');
                      cells[turtle.currentPosition + 1].classList.remove('turtle');
                      cells[turtle.currentPosition + 2].classList.remove('turtle');
    }
}
    // //? ADD CAR [RIGHT MOVEMENT] CLASS

    // function addCar(carRight) {
    //     cells[carRight.currentPosition].classList.add('car');
    //     if(carRight === cars[7] || carRight === cars[6]) {
    //         cells[carRight.currentPosition - 1].classList.add('car'); // Note the -1 for right-moving cars
    //     }
    // }
        
    // function removeCar(carRight) {
    //     cells[carRight.currentPosition].classList.remove('car');
    //     if(carRight === cars[7] || carRight === cars[6]) {
    //         cells[carRight.currentPosition - 1].classList.remove('car'); // Note the -1 for right-moving cars
    //     }
    // }

    //? Handle car movement LEFT

    function moveCar(car) {
        removeCar(car);
        car.currentPosition -= car.speed; // Move car to the left
        
        // Reset car if it reaches left edge
        if (car === cars[6] || car === cars[7]) {   // logic for trucks
            if (car.currentPosition % width === width - 2 || car.currentPosition < 0) {
                let rowOfStartingPosition = Math.floor(car.startPosition / width);
                car.currentPosition = (rowOfStartingPosition + 1) * width - 2;
            }
        } else if (car.currentPosition % width === width - 1 || car.currentPosition < 0) {
            
            // Determine the row of the car's starting position
            let rowOfStartingPosition = Math.floor(car.startPosition / width);

            // Set the currentPosition to the rightmost cell of that row
            car.currentPosition = (rowOfStartingPosition + 1) * width - 1;

             }
    
        addCar(car);

        checkForCollision();
    }

    // Controls car speed
    cars.forEach((car, index) => {
        let interval;
        if ([0, 1, 2].includes(index)) {
            interval = 1000;
        } else if ([6, 7].includes(index)) {
            interval = 500;
        } else {
            interval = 800
        }
        const logIntervalIDCar = setInterval(() => moveCar(car), interval);
        intervalIDs.push(logIntervalIDCar)
    })

    //? Handle car movement RIGHT

    function moveCarRight(carRight) {
        removeCar(carRight);
        carRight.currentPosition += carRight.speed; // Move car to the right
            
        // Reset car if it reaches right edge
        if (carRight.currentPosition % width === 0 || carRight.currentPosition >= cellCount) {
            
            // Determine the row of the car's starting position
            let rowOfStartingPosition = Math.floor(carRight.startPosition / width);
            
            // Set the currentPosition to the rightmost cell of that row
            carRight.currentPosition = rowOfStartingPosition * width;
        }
        addCar(carRight);

        checkForCollision();
    }
    
    // Controls car speed
    carsRight.forEach((carRight, index) => {
        let interval;
        if ([0, 1, 2].includes(index)) {
            interval = 1000;
        } else {
            interval = 500
        }
        const logIntervalIDCarRight = setInterval(() => moveCarRight(carRight), interval);
        intervalIDs.push(logIntervalIDCarRight);

    })

    // carsRight.forEach((carRight, index) => {
    //     let interval = 900;
    //     setInterval(() => moveCarRight(carRight), interval);
    // })


//? Handle log movement 

function moveLog(brownLog) {
    removeLog(brownLog);
    brownLog.currentPosition += brownLog.speed; // Move log to the right

    if (frogLog === brownLog) {  // If frog is on this log
        removeFrogger();
        currentPosition += brownLog.speed;  // Move frog with the log
        addFrogger(currentPosition);
    }
        
    // Reset log if it reaches right edge
    if (brownLog.currentPosition % width === width -1 || brownLog.currentPosition >= cellCount) {
        let rowOfStartingPosition = Math.floor(brownLog.startPosition / width);
        brownLog.currentPosition = rowOfStartingPosition * width;
    }
    addLog(brownLog);
    checkForCollision();
}

// Controls log speed
logs.forEach((brownLog, index) => {
    let interval;
    if ([0, 1 ,2].includes(index)) {
        interval = 1200;
    } else if ([3, 4].includes(index)) {
        interval = 300;
    } else {
        interval = 500;
    }
    const logIntervalIDLog = setInterval(() => moveLog(brownLog), interval);
    intervalIDs.push(logIntervalIDLog)
})

    //? Handle turtle movement 

    function moveTurtle(turtle) {
        removeTurtle(turtle);
        turtle.currentPosition -= turtle.speed; // Move turtle to the left
        
        if (frogTurtle === turtle) {  // If frog is on this log
            removeFrogger();
            currentPosition -= turtle.speed;  // Move frog with the log
            addFrogger(currentPosition);
        }
            
        // Reset turtle if it reaches left edge
            if (turtle.currentPosition % width === width - 2 || turtle.currentPosition < 0) {
                let rowOfStartingPosition = Math.floor(turtle.startPosition / width);
                turtle.currentPosition = (rowOfStartingPosition + 1) * width - 2;
            }
    
        addTurtle(turtle);
        checkForCollision();
    }

    // Controls turtle speed
    turtles.forEach((turtle, index) => {
        let interval;
        if ([0, 1, 2, 3, 4].includes(index)) {
            interval = 400;
        } else if ([5, 6, 7, 8].includes(index)) {
            interval = 500;
        } else {
            interval = 800
        }
        const logIntervalIDTurtle = setInterval(() => moveTurtle(turtle), interval);
        intervalIDs.push(logIntervalIDTurtle);
    })


    //? CHECK FOR COLLISIONS

    // Kill frogger if he's hit by car or truck
    function checkForCollision() {
        for (let car of cars) {
            if (currentPosition === car.currentPosition) {
                froggerDead();
                return;
            }
            if ((car === cars[6] || car === cars[7]) && currentPosition === car.currentPosition + 1) {
                froggerDead();
                return;
        }}
        for (let car of carsRight) {
            if (currentPosition === car.currentPosition) {
                froggerDead();
                return;
            }
        }
    
    // Allow frogger to ride the logs
        frogLog = null; // Reset
    
        for (let log of logs) {
            let logStart = log.currentPosition;
            let logEnd = logStart + 2;
    
            if ([3, 4].includes(logs.indexOf(log))) {
                logEnd = logStart + 4; 
            } else if ([5, 6, 7].includes(logs.indexOf(log))) {
                logEnd = logStart + 3; 
            }
            
            if (currentPosition >= logStart && currentPosition <= logEnd) {
                frogLog = log;  // Assign the log the frog is on
                break;
            }
        }
    // Allow frogger to ride the turtles
        frogTurtle = null; // Reset

        for (let turtle of turtles) {
            let turtleStart = turtle.currentPosition;
            let turtleEnd = turtleStart + 1;
    
            if ([0, 1, 2, 3, 4].includes(turtles.indexOf(turtle))) {
                turtleEnd = turtleStart + 2; 
            } 
            if (currentPosition >= turtleStart && currentPosition <= turtleEnd) {
                frogTurtle = turtle;  // Assign the turtle the frog is on
                break;
            }
        }
    
    // Kill frogger if he falls in water 
        if (currentPosition >= 87 && currentPosition <=185) {
            if (!cells[currentPosition].classList.contains('log') &&
            !cells[currentPosition].classList.contains('turtle')) {
                froggerDead();
                return;
            }
        }

    // Kill frogger if he goes off screen 
        if (leftBorder.includes(currentPosition) || rightBorder.includes(currentPosition)) {
            froggerDead();
            return;
        }
    }

    // When frogger dies, reset him
    function froggerDead() {
        lives--
        updateLifeCounter()

        if (lives<=0) {
            gameOver();
        } else {
            removeFrogger();
            currentPosition = startingPosition
            addFrogger(currentPosition)
        }
    }

    // When frogger dies, lose a life
    function updateLifeCounter() {
        document.getElementById('lifeCounter').innerText = "Lives: " + lives;
    }
 
    // Game over 
        function gameOver() {
            intervalIDs.forEach(id => clearInterval(id));
            while (grid.firstChild) {
                grid.removeChild(grid.lastChild);
            }
            cells = []; 
            currentPosition = startingPosition; 
            document.removeEventListener('keydown', handleMovement);
            const gameOverAlert = document.getElementById('gameOver');
            if (gameOverAlert) {  // Check if the element is not null
                gameOverAlert.style.display = 'block';
            } else {
                console.error('Element with ID "game-over-alert" not found!');
            }
        }
    // ! EVENTS
    document.addEventListener('keydown', handleMovement)

    // ! PAGE LOAD / RENDER
    createGrid() // Create grid

    addCar(cars[1]);
    addCar(cars[2]);
    addCar(cars[4]);
    addCar(cars[5]);
    addCar(cars[7]);

    addCar(carsRight[0]);
    addCar(carsRight[1]);
    addCar(carsRight[2]);
    addCar(carsRight[3]);

    addLog(logs[0]);
    addLog(logs[1]);
    addLog(logs[2]);
    addLog(logs[3]);
    addLog(logs[4]);
    addLog(logs[5]);
    addLog(logs[6]);
    addLog(logs[7]);

    addTurtle(turtles[0]);
    addTurtle(turtles[1]);
    addTurtle(turtles[2]);
    addTurtle(turtles[3]);
    addTurtle(turtles[4]);
    addTurtle(turtles[5]);
    addTurtle(turtles[6]);
    addTurtle(turtles[7]);
    addTurtle(turtles[8]);

    // Make them move once before the interval starts
    moveCar(cars[1]); // should this be starting from 1? or 0?
    moveCar(cars[2]);
    moveCar(cars[4]);
    moveCar(cars[5]);
    moveCar(cars[7]);

    moveCarRight(carsRight[0]);
    moveCarRight(carsRight[1]);
    moveCarRight(carsRight[2]);
    moveCarRight(carsRight[3]);

    moveLog(logs[0]);
    moveLog(logs[1]);
    moveLog(logs[2]);
    moveLog(logs[3]);
    moveLog(logs[4]);
    moveLog(logs[5]);
    moveLog(logs[6]);
    moveLog(logs[7]);

    moveTurtle(turtles[0]);
    moveTurtle(turtles[1]);
    moveTurtle(turtles[2]);
    moveTurtle(turtles[3]);
    moveTurtle(turtles[4]);
    moveTurtle(turtles[5]);
    moveTurtle(turtles[6]);
    moveTurtle(turtles[7]);
    moveTurtle(turtles[8]);

    topLocations.forEach(position => {  // Add Score locations
        addClassToCell(position, 'topLocations');
    });

    startLine.forEach(position => {    // add Start Line
        addClassToCell(position, 'startLine');
    });

    middleRow.forEach(position => {
        addClassToCell(position, 'middleRow') // add middle row
    })

    topRow.forEach(position => {
        addClassToCell(position, 'topRow') // add top row
    })

    secondTopRow.forEach(position => {
        addClassToCell(position, 'secondTopRow') // add second top row
    })

    rightBorder.forEach(position => {
        addClassToCell(position, 'rightBorder') // hide right hand border
    })

    leftBorder.forEach(position => {
        addClassToCell(position, 'leftBorder') // hide left hand border
    })
}

document.getElementById('startButton').addEventListener('click', function() {
init()
this.style.display = 'none';
})
function init() {

    // ! VARIABLES & ELEMENTS

    // ? ELEMENTS
    
    // CREATE GRID
    const grid = document.querySelector('.grid')

    // ? VARIABLES

    //BOARD CONFIG
    const width = 17
    const height = 15
    const cellCount = width * height
    let cells = []

    // CHARACTER CONFIG
    const startingPosition = 246
    let currentPosition = startingPosition

    // ENVIRONMENT STYLING
    function addClassToCell(position, className) {
        cells[position].classList.add(className)
    }

    // ENVIRONMENT LOCATIONS CONFIG
    const topLocations = [2, 5, 8, 11, 14] // score locations
   
    const startLine = Array.from({ length: width }, (_, i) => cellCount - width + i); // start line

    const middleRowStart = Math.floor(height / 2) * width
    const middleRow = Array.from({length: width }, (_, i) => middleRowStart+i) // middle row

    const rightBorderStart = width
    const rightBorder = Array.from({length:height}, (_,i) => (i+1) * rightBorderStart -1)

    const leftBorder = Array.from({length:height}, (_,i) => i * width)


    // CARS CONFIG
    const cars = [
        {    // Car 0
            startPosition: cellCount - (width + 1), 
            currentPosition: cellCount - (width + 1),
            speed: 1
        },
        {    // Car 1
            startPosition: cellCount - (width + 1) - 4,
            currentPosition: cellCount - (width + 1) - 4,
            speed: 1
        },
        {    // Car 2
            startPosition: cellCount - (width + 1) - 9,
            currentPosition: cellCount - (width + 1) - 9,
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
            startPosition: cellCount - (width * 3 + 1) - 8,
            currentPosition: cellCount - (width * 3 + 1) - 8,
            speed: 1
        },
        {    // Car 6
            startPosition: cellCount - ((width * 5) + 1),
            currentPosition: cellCount - ((width * 5) + 1),
            speed: 1
        },
        
        {    // Car 7
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

    const logs = [
        {    // Log 0
            startPosition: cellCount - (rightStart - (2*width)) + 4, 
            currentPosition: cellCount - (rightStart - (2*width)) + 4,
            speed: 1
        },
    ]

    // END GAME VARIABLES

    let frogPlacement; // 1 or null
    let winStage; // 1 or null
    let winGame; // 1 or null
    let loseLife; // 1 or null
    let gameOver; // 1 or null

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
    }

    // ? REMOVE FROGGER CLASS
    function removeFrogger() {
        console.log('FROGGER REMOVED')
        cells[currentPosition].classList.remove('frogger')
    }

    // ? ADD FROGGER SCORED CLASS

    function addIcon(position) {
        console.log('ICON BEING ADDED TO THE FOLLOWING CELL ->', position);
        cells[position].classList.add('icon') 
    }

    // ? Handle frogger LEFT movement
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
    }

    //? ADD CAR CLASS

    function addCar(car) {
        cells[car.currentPosition].classList.add('car');
        if(car === cars[7] || car === cars[6]) {
            cells[car.currentPosition + 1].classList.add('car');
        }
    }
    
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
        
    }
    
    function removeLog(brownLog) {
        cells[brownLog.currentPosition].classList.remove('log');
            cells[brownLog.currentPosition + 1].classList.remove('log');
            cells[brownLog.currentPosition + 2].classList.remove('log');
        
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
        setInterval(() => moveCar(car), interval);
    })

    //? Handle car movement RIGHT

    function moveCarRight(carRight) {
        removeCar(carRight);
        carRight.currentPosition += carRight.speed; // Move car to the right
            
        // Reset car if it reaches right edge
        if (carRight.currentPosition % width === 0 || carRight.currentPosition >= cellCount) {
            let rowOfStartingPosition = Math.floor(carRight.startPosition / width);
            carRight.currentPosition = rowOfStartingPosition * width;
            // carRight.currentPosition = carRight.startPosition;
        }
        addCar(carRight);
    }
    
    // Controls car speed
    carsRight.forEach((carRight, index) => {
        let interval;
        if ([0, 1, 2].includes(index)) {
            interval = 1000;
        } else {
            interval = 500
        }
        setInterval(() => moveCarRight(carRight), interval);
    })

    // carsRight.forEach((carRight, index) => {
    //     let interval = 900;
    //     setInterval(() => moveCarRight(carRight), interval);
    // })


//? Handle log movement right

function moveLog(brownLog) {
    removeLog(brownLog);
    brownLog.currentPosition += brownLog.speed; // Move car to the right
        
    // Reset car if it reaches right edge
    if (brownLog.currentPosition % width === 0 || brownLog.currentPosition >= cellCount) {
        let rowOfStartingPosition = Math.floor(brownLog.startPosition / width);
        brownLog.currentPosition = rowOfStartingPosition * width;
        // carRight.currentPosition = carRight.startPosition;
    }
    addLog(brownLog);
}

// Controls car speed
logs.forEach((brownLog, index) => {
    let interval;
    if ([0].includes(index)) {
        interval = 1200;
    } else {
        interval = 500
    }
    setInterval(() => moveLog(brownLog), interval);
})

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

    // Make them move once before the interval starts
    moveCar(cars[1]);
    moveCar(cars[2]);
    moveCar(cars[4]);
    moveCar(cars[5]);
    moveCar(cars[7]);

    moveCarRight(carsRight[0]);
    moveCarRight(carsRight[1]);
    moveCarRight(carsRight[2]);
    moveCarRight(carsRight[3]);

    moveLog(logs[0]);

    topLocations.forEach(position => {  // Add Score locations
        addClassToCell(position, 'topLocations');
    });

    startLine.forEach(position => {    // add Start Line
        addClassToCell(position, 'startLine');
    });

    middleRow.forEach(position => {
        addClassToCell(position, 'middleRow') // add middle row
    })

    rightBorder.forEach(position => {
        addClassToCell(position, 'rightBorder') // hide right hand border
    })

    leftBorder.forEach(position => {
        addClassToCell(position, 'leftBorder') // hide left hand border
    })
}

window.addEventListener('DOMContentLoaded', init)
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
        {
            startPosition: cellCount - (width + 1),
            currentPosition: cellCount - (width + 1),
            speed: 1
        },
        {
            startPosition: cellCount - (width + 1) - 5,
            currentPosition: cellCount - (width + 1) - 5,
            speed: 1
        },
        {
            startPosition: cellCount - (width + 1) - 10,
            currentPosition: cellCount - (width + 1) - 10,
            speed: 1
        }
    ];

    // PLATFORMS CONFIG

    // END GAME VARIABLES

    let frogPlacement; // 1 or null
    let winStage; // 1 or null
    let winGame; // 1 or null
    let loseLife; // 1 or null
    let gameOver; // 1 or null

    //! ENVIRONMENT STATE
    // CREATE SCORE LOCATIONS


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

    // ? Handle frogger movement
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
    }
    
    function removeCar(car) {
        cells[car.currentPosition].classList.remove('car');
    }

    //? Handle car movement

    function moveCar(car) {
        removeCar(car);
        car.currentPosition -= car.speed; // Move car to the left
    
        // Reset car if it reaches left edge
        if (car.currentPosition < cellCount - (width * 2)) {
            if (car !== cars[0]) { // If it's not the first car
                car.currentPosition = cars[0].startPosition; // Set its current position to the startPosition of the first car
            } else {
                car.currentPosition = car.startPosition; // For all other cars, use their own startPosition
            }
        }
        addCar(car);
    }

    cars.forEach(car => {
        moveCar(car);
        setInterval(() => moveCar(car), 1000);
    });

    // ! EVENTS
    document.addEventListener('keydown', handleMovement)

    // ! PAGE LOAD / RENDER
    createGrid() // Create grid


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
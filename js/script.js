function init() {

    // ! VARIABLES & ELEMENTS

    // ? ELEMENTS
    
    // CREATE GRID
    const grid = document.querySelector('.grid')

    // ? VARIABLES

    //BOARD CONFIG
    const width = 10
    const height = 10
    const cellCount = width * height
    let cells = []

    // CHARACTER CONFIG
    const startingPosition = 0
    let currentPosition = startingPosition

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
            // Add cat character class to starting posiiton
            addCat(startingPosition)

    }

    // ? ADD CAT CLASS
    function addCat(position) {
        console.log('CAT BEING ADDED TO THE FOLLOWING CELL ->', position);
        cells[position].classList.add('cat')
    }

    // ? REMOVE CAT CLASS
    function removeCat() {
        console.log('CAT REMOVED')
        cells[currentPosition].classList.remove('cat')
    }

    // ? Handle movementt
    function handleMovement(event) {
        const key = event.keyCode

        const up = 38
        const down = 40
        const left = 37
        const right = 39

        // Remove cat from previous position before
        // updating current position to new cell
        removeCat()

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
        //Add cat class once currentPosition has been updated
        addCat(currentPosition)
    }


    // ! EVENTS
    document.addEventListener('keydown', handleMovement)

    // ! PAGE LOAD
    createGrid() // Create grid

}

window.addEventListener('DOMContentLoaded', init)
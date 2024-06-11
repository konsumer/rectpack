// this is the entry-point for web

import Inventory from './inventory.js'

// this is the display-layer, and is web-specific
class InventoryCanvas extends Inventory {
  constructor (width, height, items = [], emptyColor = 'white', gridColor = 'black', canvas = document.body.appendChild(document.createElement('canvas')), infoDiv = document.body.appendChild(document.createElement('div'))) {
    super(width, height, items)
    this.emptyColor = emptyColor
    this.gridColor = gridColor
    this.infoDiv = infoDiv
    this.ctx = canvas.getContext('2d')

    // make the canvas 10x grid size
    this.ctx.canvas.width = width * 10
    this.ctx.canvas.height = height * 10
  }

  draw () {
    // clear
    this.ctx.fillStyle = this.emptyColor
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    // make grid
    this.ctx.strokeStyle = this.gridColor
    for (const x in this.grid) {
      for (const y in this.grid[x]) {
        this.ctx.strokeRect(x * 10, y * 10, 10, 10)
      }
    }

    this.infoDiv.innerHTML = ''

    // draw items
    for (const item of this.items) {
      this.ctx.fillStyle = uuidToColor(item.id)
      this.ctx.fillRect(item.pos.x * 10, item.pos.y * 10, item.size.x * 10, item.size.y * 10)

      // add to list
      const d = document.createElement('div')
      d.className = 'listitem'
      d.style.backgroundColor = this.ctx.fillStyle
      d.textContent = `${item.id}: ${item.pos.x}x${item.pos.y}`
      d.addEventListener('click', () => {
        inventory.removeItem(item.id)
        inventory.draw()
      })
      this.infoDiv.appendChild(d)
    }

    // this is just to see a text version of same thing
    console.log(this.getText())
  }
}

// really dumb function to make a color for a UUID
const uuidToColor = uuid => `#${uuid.split('-').pop().substr(-6)}`

// this is the actual UI

const inventory = new InventoryCanvas(30, 30)
inventory.draw()

const [button1x1, button1x2, button3x3, button3x6] = document.querySelectorAll('button')

button1x1.addEventListener('click', () => {
  if (inventory.addItem({ id: crypto.randomUUID(), size: { x: 1, y: 1 } })) {
    inventory.draw()
  } else {
    window.alert('No room for 1x1.')
  }
})

button1x2.addEventListener('click', () => {
  if (inventory.addItem({ id: crypto.randomUUID(), size: { x: 1, y: 2 } })) {
    inventory.draw()
  } else {
    window.alert('No room for 1x2.')
  }
})

button3x3.addEventListener('click', () => {
  if (inventory.addItem({ id: crypto.randomUUID(), size: { x: 3, y: 3 } })) {
    inventory.draw()
  } else {
    window.alert('No room for 3x3.')
  }
})

button3x6.addEventListener('click', () => {
  if (inventory.addItem({ id: crypto.randomUUID(), size: { x: 3, y: 6 } })) {
    inventory.draw()
  } else {
    window.alert('No room for 3x6.')
  }
})

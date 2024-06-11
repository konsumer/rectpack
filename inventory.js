/*

Item:
  id
  size:
    x
    y
  pos:
    x
    y
*/

export default class Inventory {
  constructor (width, height, items = []) {
    this.width = width
    this.height = height

    // this will track the list of rects
    this.items = items
    for (const item of items) {
      this.addItem(item)
    }

    // this will track the full grid
    // not really used, but helpful if you want to draw the gird, in some situations (X/O for example)
    this.grid = [...new Array(width)].map(() => [...new Array(height)].fill(0))
  }

  // try to add an item, if available, return new rect or false
  addItem (item) {
    const pos = this.findAvailablePosition(item)

    if (pos) {
      item.pos = pos
      this.items.push(item)

      // update grid, using first char of id
      for (let x = 0; x < item.size.x; x++) {
        for (let y = 0; y < item.size.y; y++) {
          this.grid[y + pos.y][x + pos.x] = item.id[0]
        }
      }
      return item
    }

    // could not add
    return false
  }

  removeItem (id) {
    const itemIndex = this.items.findIndex(i => i.id === id)

    // not found
    if (itemIndex === -1) {
      return false
    }

    // update the grid
    const item = this.items[itemIndex]
    for (let x = 0; x < item.size.x; x++) {
      for (let y = 0; y < item.size.y; y++) {
        this.grid[y + item.pos.y][x + item.pos.x] = 0
      }
    }

    // remove item from this.items
    this.items.splice(itemIndex, 1)

    return true
  }

  // could the item fit in the grid position?
  itemCanFit (position, item) {
    for (let y = position.y; y < position.y + item.size.y; y++) {
      if (y >= this.height) {
        return false
      }

      for (let x = position.x; x < position.x + item.size.x; x++) {
        if (x >= this.width) {
          return false
        }

        if (this.grid[y][x] !== 0) {
          return false
        }
      }
    }

    return true
  }

  // find a x/y position for item or false
  findAvailablePosition (item) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const pos = { x, y }
        if (this.itemCanFit(pos, item)) {
          return pos
        }
      }
    }

    // no space
    return false
  }

  // this is just a representation of grid, not really needed
  getText () {
    return this.grid.map(l => l.map(i => i || '□').join(' ')).join('\n')
  }
}

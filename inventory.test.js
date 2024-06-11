/* global test expect */

import Inventory from './inventory.js'

test('should create a 20x10 grid', () => {
  const i = new Inventory(20, 10)
  expect(i.grid.length).toEqual(20)
  expect(i.grid[0].length).toEqual(10)
})

test('should add a 1x1 item to a grid', () => {
  const i = new Inventory(10, 10)
  const item = { id: 'testing', size: { x: 1, y: 1 } }
  const { pos } = i.addItem(item)
  expect(pos.x).toEqual(0)
  expect(pos.y).toEqual(0)

  expect(i.getText()).toEqual(
`t □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □`)
})

test('should add a 10x10 item to a grid', () => {
  const i = new Inventory(10, 10)
  const item = { id: 'testing', size: { x: 10, y: 10 } }
  const { pos } = i.addItem(item)
  expect(pos.x).toEqual(0)
  expect(pos.y).toEqual(0)

  expect(i.getText()).toEqual(
`t t t t t t t t t t
t t t t t t t t t t
t t t t t t t t t t
t t t t t t t t t t
t t t t t t t t t t
t t t t t t t t t t
t t t t t t t t t t
t t t t t t t t t t
t t t t t t t t t t
t t t t t t t t t t`)
})

test('should not add a 10x10 item to a 5x5 grid', () => {
  const i = new Inventory(5, 5)
  const item = { id: 'testing', size: { x: 10, y: 10 } }
  const r = i.addItem(item)
  expect(r).toEqual(false)

  expect(i.getText()).toEqual(
`□ □ □ □ □
□ □ □ □ □
□ □ □ □ □
□ □ □ □ □
□ □ □ □ □`)
})

test('should fit multiple items', () => {
  const i = new Inventory(10, 10)
  const a = i.addItem({ id: 'a', size: { x: 2, y: 1 } })
  const b = i.addItem({ id: 'b', size: { x: 1, y: 1 } })
  const c = i.addItem({ id: 'c', size: { x: 2, y: 6 } })
  const d = i.addItem({ id: 'd', size: { x: 2, y: 1 } })
  const e = i.addItem({ id: 'e', size: { x: 1, y: 1 } })
  const f = i.addItem({ id: 'f', size: { x: 1, y: 1 } })
  const g = i.addItem({ id: 'g', size: { x: 1, y: 1 } })
  const h = i.addItem({ id: 'h', size: { x: 5, y: 4 } })

  expect(a.pos.x).toEqual(0)
  expect(a.pos.y).toEqual(0)
  expect(b.pos.x).toEqual(2)
  expect(b.pos.y).toEqual(0)
  expect(c.pos.x).toEqual(3)
  expect(c.pos.y).toEqual(0)
  expect(d.pos.x).toEqual(5)
  expect(d.pos.y).toEqual(0)
  expect(e.pos.x).toEqual(7)
  expect(e.pos.y).toEqual(0)
  expect(f.pos.x).toEqual(8)
  expect(f.pos.y).toEqual(0)
  expect(g.pos.x).toEqual(9)
  expect(g.pos.y).toEqual(0)
  expect(h.pos.x).toEqual(5)
  expect(h.pos.y).toEqual(1)

  expect(i.getText()).toEqual(
`a a b c c d d e f g
□ □ □ c c h h h h h
□ □ □ c c h h h h h
□ □ □ c c h h h h h
□ □ □ c c h h h h h
□ □ □ c c □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □`)
})

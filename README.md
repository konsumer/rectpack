This is an example rect-packing routine for "tetris inventory" implemented in js. It can work as a graphical web program, or in non-graphical unit-tests. You will need nodejs installed to run it, locally.

```
# install tools
npm i

# run local web-server
npm start

# run unit-tests
npm test

# run a nice watching unit-test ui (good for working on it, as you will see problems right away)
npm run test:watch

# build the web example in dist/ (not needed if running local, just do `npm start`)
npm run build
```

It is also published [here](http://konsumer.js.org/rectpack/).

Basically, it illustrates understanding the problem first, and creating unit-tests & simple visualization code to verify everything is doing what it should.

`JeffM` from raylib discord came up with it originally in C++ [here](inventory.cpp).

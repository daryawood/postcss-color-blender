const postcss = require('postcss');
const plugin = require('..');

const test = (input, output) => postcss([plugin]).process(input)
  .then(result => {
    expect(result.css).toEqual(output);
    expect(result.warnings().length).toBe(0);
  })
  .catch(err => {
    return err;
  });

describe('should mix hex colors properly', () => {
  it('should change property name from color-blender to background-color', () => {
    test('.elem { color-blender: #232323; }', '.elem { background-color: #232323; }', {});
  });

  it('should mix two colors', () => {
    test('.elem { color-blender: #ff0000, #00ff00; }', '.elem { background-color: #808000; }', {});
  });

  it('should mix two colors', () => {
    test('.elem { color-blender: #000000, #ffffff; }', '.elem { background-color: #808080; }', {});
  });

  it('should mix two shorthand hex colors', () => {
    test('.elem { color-blender: #000, #fff; }', '.elem { background-color: #808080; }', {});
  });

  it('should mix two colors', () => {
    test('.elem { color-blender: #111111, #666666; }', '.elem { background-color: #3c3c3c; }', {});
  });

  it('should mix two shorthand hex colors', () => {
    test('.elem { color-blender: #111, #666; }', '.elem { background-color: #3c3c3c; }', {});
  });

  it('should mix shorthand and common hex colors', () => {
    test('.elem { color-blender: #111, #666666; }', '.elem { background-color: #3c3c3c; }', {});
  });

  it('should mix three colors', () => {
    test('.elem { color-blender: #ff0000, #0000ff, #ff00ff; }', '.elem { background-color: #aa00aa; }', {});
  });

  it('should mix three shorthand hex colors', () => {
    test('.elem { color-blender: #333, #222, #111; }', '.elem { background-color: #222222; }', {});
  });

  it('should mix four colors', () => {
    test('.elem { color-blender: #00ffff, #3c3c3c, #125678, #fadafa; }', '.elem { background-color: #529bab; }', {});
  });
});

describe('should mix rgb colors properly', () => {
  it('should mix two colors', () => {
    test('.elem { color-blender: rgb(0, 0, 0), rgb(255, 255, 255); }', '.elem { background-color: #808080; }', {});
  });

  it('should mix three colors', () => {
    test('.elem { color-blender: rgb(255, 0, 0), rgb(0, 0, 255), rgb(255, 0, 255); }', '.elem { background-color: #aa00aa; }', {});
  });
});

describe('should mix rgba colors properly', () => {
  it('should mix two colors', () => {
    test('.elem { color-blender: rgba(0, 0, 0, .1), rgba(255, 255, 255, 1.0); }', '.elem { background-color: #808080; }', {});
  });

  it('should mix three colors', () => {
    test('.elem { color-blender: rgba(255, 0, 0, 0.2), rgba(0, 0, 255, 0.3), rgba(255, 0, 255, 1); }', '.elem { background-color: #aa00aa; }', {});
  });
});

describe('should mix various colors properly', () => {
  it('should mix three colors', () => {
    test('.elem { color-blender: #FF0000, rgba(0, 0, 255, 0.3), rgb(255, 0, 255); }', '.elem { background-color: #aa00aa; }', {});
  });

  it('should mix three colors', () => {
    test('.elem { color-blender: #F00, rgba(0, 0, 255, 0.3), rgb(255, 0, 255); }', '.elem { background-color: #aa00aa; }', {});
  });

  it('should mix two colors', () => {
    test('.elem { color-blender: #111, #666666; }', '.elem { background-color: #3c3c3c; }', {});
  });
});

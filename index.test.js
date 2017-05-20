const postcss = require('postcss');
const plugin = require('./');

const test = (input, output) => postcss([plugin]).process(input)
  .then(result => {
    expect(result.css).toEqual(output);
    expect(result.warnings().length).toBe(0);
  });

describe('postcss-color-blender', () => {
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

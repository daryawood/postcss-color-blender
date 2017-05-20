# PostCSS Color Blender

[PostCSS] plugin to mix hex colors and set it to the background-color property.

[PostCSS]: https://github.com/postcss/postcss

## Install

```
npm intall postcss-color-blender --save-dev
```

## Examples

```css
.foo {
  color-blender: #111, #666666;
}

.bar {
  color-blender: #00ffff, #3c3c3c, #125678, #fadafa;
}
```

```css
.foo {
  background-color: #3c3c3c;
}

.bar {
  background-color: #529bab;
}
```

## Usage

```js
postcss([ require('postcss-color-blender') ])
```

See [PostCSS] docs for examples for your environment.

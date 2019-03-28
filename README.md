# PostCSS Color Blender

[PostCSS] plugin to mix hex, rgba and rgba colors and set it to the background-color property.

[PostCSS]: https://github.com/postcss/postcss

## Install

```
npm intall postcss-color-blender --save-dev
```

## Examples

### Hex

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

### Rgb

```css
.foo42 {
  color-blender: rgb(0, 0, 0), rgb(255, 255, 255);
}
```

```css
.foo42 {
  background-color: #808000;
}
```

### Rgba

```css
.bar42 {
  color-blender: rgba(0, 0, 0, .1), rgb(255, 255, 255, 1);
}
```

```css
.bar42 {
  background-color: #808000;
}
```

## Usage

```js
postcss([ require('postcss-color-blender') ])
```

See [PostCSS] docs for examples for your environment.

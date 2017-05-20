import postcss from 'postcss';

const hexThreeRegex = /#([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})/i;
const hexSixRegex = /#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i;

const convertDecimalToHex = decimalValue => (decimalValue < 10 ? `0${decimalValue}` : decimalValue.toString(16));

const reformatHex = shortHex => {
  const hex = shortHex.match(hexThreeRegex);

  return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
};

const mixColors = colorsArray => {
  if (colorsArray.length === 1) {
    return colorsArray[0];
  }

  const ratio = 1 / colorsArray.length;
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;

  colorsArray.forEach(color => {
    const matchedColor = color.match(hexSixRegex) || reformatHex(color).match(hexSixRegex);

    rSum += parseInt(matchedColor[1], 16);
    gSum += parseInt(matchedColor[2], 16);
    bSum += parseInt(matchedColor[3], 16);
  });

  const r = Math.round(rSum * ratio);
  const g = Math.round(gSum * ratio);
  const b = Math.round(bSum * ratio);

  return `#${convertDecimalToHex(r)}${convertDecimalToHex(g)}${convertDecimalToHex(b)}`;
};

module.exports = postcss.plugin('postcss-color-blender', () => root => {
  root.walkDecls(decl => {
    if (decl.prop === 'color-blender') {
      const mixedColor = mixColors(decl.value.replace(/\s+/g, '').split(','));

      decl.prop = 'background-color';
      decl.value = mixedColor;
    }
  });
});

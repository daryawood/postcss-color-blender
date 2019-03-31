const postcss = require('postcss');


const hexThreeString = '#([a-f\\d]{1})([a-f\\d]{1})([a-f\\d]{1})';
const hexThreeRegex = new RegExp(hexThreeString, 'i');
const hexThreeRegexG = new RegExp(hexThreeString, 'ig');

const hexSixString = '#([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})';
const hexSixRegex = new RegExp(hexSixString, 'i');
const hexSixRegexG = new RegExp(hexSixString, 'ig');

const rgbString = '[rR][gG][bB]\\((\\d*,?\\s?)(\\d*,?\\s?)(\\d*,?\\s?)\\)';
const rgbRegex = new RegExp(rgbString);
const rgbRegexG = new RegExp(rgbString, 'g');

const rgbaString = '[rR][gG][bB][aA]\\((\\d*,?\\s?)(\\d*,?\\s?)(\\d*,?\\s?)(\\d?.?\\d?)\\)';
const rgbaRegex = new RegExp(rgbaString);
const rgbaRegexG = new RegExp(rgbaString, 'g');

const convertDecimalToHex = decimalValue => (decimalValue < 10 ? `0${decimalValue}` : decimalValue.toString(16));
const intToHex = int => convertDecimalToHex(parseInt(int, 10));

const shortHexToLong = shortHex => {
  const hex = shortHex;

  return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
};
const rgbToHex = rgbMatch => `#${intToHex(rgbMatch[1]) + intToHex(rgbMatch[2]) + intToHex(rgbMatch[3])}`;

const reformatToHex = colorsArray => colorsArray.map(color => {
  const rgbMatch = color.match(rgbRegex);
  const rgbaMatch = color.match(rgbaRegex);
  const shortHex = color.match(hexThreeRegex);

  if (rgbMatch !== null && rgbMatch.length === 4) {
    return rgbToHex(rgbMatch);
  } else if (rgbaMatch !== null && rgbaMatch.length === 5) {
    return rgbToHex(rgbaMatch);
  } else if (color.length === 4 && shortHex !== null) {
    return shortHexToLong(shortHex);
  }

  return color;
});

const mixColors = colorsArray => {
  if (colorsArray.length === 1) {
    return colorsArray[0];
  }

  const ratio = 1 / colorsArray.length;
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;

  colorsArray.forEach(color => {
    const matchedColor = color.match(hexSixRegex);

    rSum += parseInt(matchedColor[1], 16);
    gSum += parseInt(matchedColor[2], 16);
    bSum += parseInt(matchedColor[3], 16);
  });

  const r = Math.round(rSum * ratio);
  const g = Math.round(gSum * ratio);
  const b = Math.round(bSum * ratio);

  return `#${convertDecimalToHex(r)}${convertDecimalToHex(g)}${convertDecimalToHex(b)}`;
};

const prepareColorArray = colorsString => {
  const hex3Array = colorsString.replace(hexSixRegexG, '').match(hexThreeRegexG) || [];
  const hexArray = colorsString.match(hexSixRegexG) || [];
  const rgbArray = colorsString.match(rgbRegexG) || [];
  const rgbaArray = colorsString.match(rgbaRegexG) || [];

  return [...hex3Array, ...hexArray, ...rgbArray, ...rgbaArray];
};

module.exports = postcss.plugin('postcss-color-blender', () => root => {
  root.walkDecls(decl => {
    if (decl.prop === 'color-blender') {
      const colorsArray = prepareColorArray(decl.value);
      const mixedColor = mixColors(reformatToHex(colorsArray));

      decl.prop = 'background-color';
      decl.value = mixedColor;
    }
  });
});

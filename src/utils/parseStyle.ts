function getProperty(pair: string[]) {
  const name = pair[0]
    .trim()
    .replace(/(-.)/g, (match: string) => match[1].toUpperCase());
  return { [name]: pair[1].trim() };
}

/**
 *  Parse the added styles to the widget via the 'style' field in the modeler.
 * @public
 * @method
 * @param {string} style - styles as string
 * @return {Object} the resulted style object
 */
export default function parseStyle(style = '') {
  try {
    return style.split(';').reduce((styleObject, line) => {
      const pair = line.split(':');
      return pair.length === 2
        ? { ...styleObject, ...getProperty(pair) }
        : styleObject;
    }, {});
  } catch (error) {
    console.log('Failed to parse style', style, error); // eslint-disable-line no-console
  }
  return {};
}

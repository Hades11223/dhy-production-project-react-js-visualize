export function formatName(namebn) {
  if (!namebn) return '';
  const name = namebn.trim();
  const formattedName = name.replace(/\s+/g, ' ');
  const arr = formattedName.split(' ');

  return arr.reduce((finalTex, item, i) => {
    if (i > 0 && i < arr.length - 2) {
      finalTex = finalTex.concat(`${item.charAt(0)}. `);
    } else {
      finalTex = finalTex.concat(`${item} `);
    }
    return finalTex;
  }, '');
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatShortName(namebn) {
  if (!namebn) return '';
  const arr = namebn.split(' ');
  return (
    arr
      .map((item, index) => {
        if (index < arr.length - 1) return item[0].toUpperCase();
        return '';
      })
      .filter((item) => item)
      .join('.') +
    ' ' +
    arr.pop()
  );
}
export function formatNumber(number) {
  var str = '' + number;
  var pad = '0000';
  return pad.substring(0, pad.length - str.length) + str;
}
export function groupBy(data, property) {
  return data.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

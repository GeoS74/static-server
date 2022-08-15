module.exports = (mdFile) => {
  const result = mdFile.split('\n').map((line, index) =>
    // if(index > 3) return;
    // console.log(`${index}: ${line}`)
    _processing(line));
  return result.join('\n');
};

const regexp = {
  title: new RegExp('#+\\s', 'g'),
};

function _processing(str) {
  str = _title(str);
  return str;
}

function _title(str) {
  const matched = str.match(regexp.title);
  if (!matched) {
    return str;
  }
  return `${str.replaceAll(regexp.title, `<h${matched[0].length - 1}>`)}</h${matched[0].length - 1}>`;
}

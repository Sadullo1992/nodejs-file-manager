const cmdLineParser = (line) => {
  // if single quote exists, replace with double quote
  const str = line.replace(/'/g, '"');
  // split space and double quote
  const regex = /[^\s"]+|"([^"]*)"/gi;
  const parsedArr = [];

  let match;
  do {
    match = regex.exec(str);
    if (match !== null) parsedArr.push(match[1] ? match[1] : match[0]);
  } while (match !== null);

  return parsedArr;
};

export default cmdLineParser;

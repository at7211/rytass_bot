module.exports = num => {
  if (!num) return;

  switch (num) {
    case '一':
      return 1;

    case '二':
    case '兩':
      return 2;

    case '三':
      return 3;

    case '四':
      return 4;

    case '五':
      return 5;

    case '六':
      return 6;

    case '七':
      return 7;

    case '八':
      return 8;

    case '九':
      return 9;

    case '十':
      return 10;
    default:
      return null;
  }
};

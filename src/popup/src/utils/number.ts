const persianDigits = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
const englishDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// convert Persian digits => English digits in a string
export const englishNumber = (digit: string) => {
  for (let i = 0; i < 10; i++) {
    digit = digit.replace(new RegExp(persianDigits[i], 'g'), englishDigits[i]);
  }
  return digit;
};

export const persianNumber = (number: number) => {
  return new Intl.NumberFormat('fa-IR').format(number);
};

export const getPrice = (price: number, withUnit = true) => {
  const formattedPrice = new Intl.NumberFormat('fa-IR', {
    currency: 'IRR',
  }).format(price);
  return withUnit ? `${formattedPrice} تومان` : formattedPrice;
};

export const formattedNumber = (value: string | number, places?: number) => {
  const number = typeof value === 'string' ? Number(value) : value;
  return roundNumber(number, places).toLocaleString();
};

const roundNumber = (num: number, places?: number) => {
  if (!places) {
    return Math.round(num);
  }

  const val = Math.pow(10, places);
  return Math.round(num * val) / val;
};

export const convertHoursToDay = (hours: number) => {
  return roundNumber(hours / 24, 2);
};

export const convertDistanceToTehranShomal = (distances: number) => {
  return roundNumber(distances / 198, 1);
};

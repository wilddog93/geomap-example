import { addMonths, format, subYears } from "date-fns";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// convert longLatDMS
const dmsToDecimal = (degrees: number, minutes: number, seconds: number, direction: string): number => {
  let decimalDegrees = degrees + minutes / 60 + seconds / 3600;

  if (direction === 'S' || direction === 'W') {
    decimalDegrees = -decimalDegrees;
  }

  return decimalDegrees;
}

export const convertDMS = (latDMS: string, lonDMS: string): { latitude: any, longitude: any } => {
  const latMatch = latDMS.match(/(\d+)°(\d+)'(\d+\.\d+)"([NS])/);
  const lonMatch = lonDMS.match(/(\d+)°(\d+)'(\d+\.\d+)"([EW])/);

  if (!latMatch || !lonMatch) {
    throw new Error('Invalid DMS format');
  }

  const latDegrees = parseFloat(latMatch[1]);
  const latMinutes = parseFloat(latMatch[2]);
  const latSeconds = parseFloat(latMatch[3]);
  const latDirection = latMatch[4];

  const lonDegrees = parseFloat(lonMatch[1]);
  const lonMinutes = parseFloat(lonMatch[2]);
  const lonSeconds = parseFloat(lonMatch[3]);
  const lonDirection = lonMatch[4];

  const latitude = dmsToDecimal(latDegrees, latMinutes, latSeconds, latDirection);
  const longitude = dmsToDecimal(lonDegrees, lonMinutes, lonSeconds, lonDirection);

  return { latitude, longitude };
}

// hitung per 1 thn kebelakang
export const getYearly = (date: Date, year: number) => {
  const oneYearAgo = subYears(date, year);

  // Array untuk menyimpan tanggal-tanggal hasil
  const resultArray: string[] = [];

  // Loop melalui setiap bulan dalam satu tahun ke belakang
  for (let i = 0; i < 12; i++) {
    const currentDateForMonth = addMonths(oneYearAgo, i);
    const formattedDate = format(currentDateForMonth, "yyyy-MM-dd");
    resultArray.push(formattedDate);
  }

  return resultArray;
};

export const objectToQueryString = (obj:any) => {
  if(!obj) return;
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

// money
export type FormatMoneyProps = {
  amount: number | string | any;
  decimalCount?: number;
  decimal?: string;
  thousands?: string;
};

export const formatMoney = ({
  amount,
  decimalCount = 0,
  decimal = ".",
  thousands = ",",
}: FormatMoneyProps) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
};

export const replaceStringNoSpace = (value:string) => {
  if(!value) return;
  return value.replace(/\s/g, "");
}

export const splitStringTobeArray = (value:string) => {
  if(!value) return [""];
  return value.split(/[\,]+/)
}
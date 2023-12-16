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
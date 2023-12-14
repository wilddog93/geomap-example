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
const getYearly = (date: Date, year: number): Date => {
  const yearsAgo = date.getFullYear() - year;
  const dateResult = new Date(date);
  dateResult.setFullYear(yearsAgo);
  return dateResult;
};
export const groupDataGHGFluxByMonth = (data: any[]) => {
    const groupedData: { [key: string]: { [key: string]: number | any } } = {};

    data.forEach((item) => {
      const date = new Date(item.date);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      if (!groupedData[month]) {
        groupedData[month] = {};
      }

      if (!groupedData[month][item.landCover]) {
        groupedData[month][item.landCover] = {
          airTemperatureTotal: 0,
          soilTemperatureTotal: 0,
          soilMoistureTotal: 0,
          waterTableTotal: 0,
          ch4Total: 0,
          co2Total: 0,
          count: 0,
        };
      }

      groupedData[month][item.landCover].airTemperatureTotal +=
        item.airTemperature || 0;
      groupedData[month][item.landCover].soilTemperatureTotal +=
        item.soilTemperature || 0;
      groupedData[month][item.landCover].soilMoistureTotal +=
        item.soilMoisture || 0;
      groupedData[month][item.landCover].waterTableTotal +=
        item.waterTable || 0;
      groupedData[month][item.landCover].ch4Total += item.ch4 || 0;
      groupedData[month][item.landCover].co2Total += item.co2 || 0;
      groupedData[month][item.landCover].count += 1;
    });

    return groupedData;
  };

  export const groupTes = (data: any[]) => {
    const airTemperatureTotal: {
      [key: string]: { [key: string]: number | any };
    } = {};
    const soilTemperatureTotal: {
      [key: string]: { [key: string]: number | any };
    } = {};
    const soilMoistureTotal: { [key: string]: { [key: string]: number | any } } =
      {};
    const waterTableTotal: { [key: string]: { [key: string]: number | any } } =
      {};
    const ch4Total: { [key: string]: { [key: string]: number | any } } = {};
    const co2Total: { [key: string]: { [key: string]: number | any } } = {};
  
    data.forEach((item) => {
      const date = new Date(item.date);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      if (!airTemperatureTotal[month]) {
        airTemperatureTotal[month] = {};
      }
      if (!soilTemperatureTotal[month]) {
        soilTemperatureTotal[month] = {};
      }
      if (!soilMoistureTotal[month]) {
        soilMoistureTotal[month] = {};
      }
      if (!waterTableTotal[month]) {
        waterTableTotal[month] = {};
      }
      if (!ch4Total[month]) {
        ch4Total[month] = {};
      }
      if (!co2Total[month]) {
        co2Total[month] = {};
      }
  
      if (!airTemperatureTotal[month][item.landCover]) {
        airTemperatureTotal[month][item.landCover] = {
          airTemperatureTotal: 0,
          count: 0,
        };
      }
  
      if (!soilTemperatureTotal[month][item.landCover]) {
        soilTemperatureTotal[month][item.landCover] = {
          airTemperatureTotal: 0,
          count: 0,
        };
      }
  
      if (!soilMoistureTotal[month][item.landCover]) {
        soilMoistureTotal[month][item.landCover] = {
          airTemperatureTotal: 0,
          count: 0,
        };
      }
      if (!waterTableTotal[month][item.landCover]) {
        waterTableTotal[month][item.landCover] = {
          airTemperatureTotal: 0,
          count: 0,
        };
      }
      if (!ch4Total[month][item.landCover]) {
        ch4Total[month][item.landCover] = {
          airTemperatureTotal: 0,
          count: 0,
        };
      }
      if (!co2Total[month][item.landCover]) {
        co2Total[month][item.landCover] = {
          airTemperatureTotal: 0,
          count: 0,
        };
      }
  
      airTemperatureTotal[month][item.landCover].airTemperatureTotal +=
        item.airTemperature || 0;
      soilTemperatureTotal[month][item.landCover].soilTemperatureTotal +=
        item.soilTemperature || 0;
      soilMoistureTotal[month][item.landCover].soilMoistureTotal +=
        item.soilMoisture || 0;
      waterTableTotal[month][item.landCover].waterTableTotal +=
        item.waterTable || 0;
      ch4Total[month][item.landCover].ch4Total += item.ch4 || 0;
      co2Total[month][item.landCover].co2Total += item.co2 || 0;
  
      // count
      airTemperatureTotal[month][item.landCover].count += 1;
      soilTemperatureTotal[month][item.landCover].count += 1;
      soilMoistureTotal[month][item.landCover].count += 1;
      waterTableTotal[month][item.landCover].count += 1;
      ch4Total[month][item.landCover].count += 1;
      co2Total[month][item.landCover].count += 1;
    });
  
    return {
      airTemperatureTotal,
      soilTemperatureTotal,
      soilMoistureTotal,
      waterTableTotal,
      ch4Total,
      co2Total,
    };
  };
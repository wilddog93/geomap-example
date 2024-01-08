import { BoxPlotDatum, ResponsiveBoxPlot } from "@nivo/boxplot";
interface BoxPlotProps {
  data: BoxPlotDatum[];
}
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BoxPlotCharts: React.FC<BoxPlotProps> = ({ data = [] }) => {
    const customColor = ["#576CBC", "#E2703A", "#4E9F3D", "#A12568"]
  return (
    <div className="w-full h-[400px]">
      <ResponsiveBoxPlot
        data={data}
        margin={{ top: 60, right: 140, bottom: 60, left: 60 }}
        //   minValue={0}
        //   maxValue={10}
        // groups={['Alpha', 'Beta']}
        subGroupBy="subgroup"
        padding={0.12}
        enableGridX={true}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        // colors={{ scheme: "blues" }}
        colors={customColor}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 36,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 0,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "value",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        borderRadius={2}
        borderWidth={2}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        medianWidth={2}
        medianColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        whiskerEndSize={0.6}
        whiskerColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        motionConfig="stiff"
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemWidth: 60,
            itemHeight: 20,
            itemsSpacing: 3,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            symbolSize: 20,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BoxPlotCharts;

import IChartData from 'interfaces/IChartData';
import React from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import TChartKey from 'types/TChartKey';
import TRawForecastData from 'types/TRawForecastData';

interface IProps {
  data: TRawForecastData;
}

function Chart(props: IProps) {
  const processedData: {[index: string]: IChartData} = {};

  Object.entries(props.data).forEach(([key, rows]) => {
    if (typeof rows !== 'object') return;

    rows.forEach((row) => {
      if (!processedData[row.date as string]) {
        processedData[row.date] = {[key]: row.value, name: row.date};
      } else {
        processedData[row.date][key as TChartKey] = row.value;
      }
    });
  });

  return (
    <LineChart width={600} height={300} data={Object.values(processedData)}>
      <Line type='monotone' dataKey='meals' stroke='#00ff00' />
      <Line type='monotone' dataKey='exercises' stroke='#ff0000' />
      <Line type='monotone' dataKey='glucoseLevels' stroke='#0000ff' />
      <Line type='monotone' dataKey='weights' stroke='#f0f0f0' />
      <CartesianGrid stroke='#ccc' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}

export default Chart;

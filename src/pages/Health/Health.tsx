import React, {useEffect, useState} from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import {ChartFragment, useChartLazyQuery} from 'generated/graphql';
import './Health.scss';
import {useApolloClient} from '@apollo/client';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';

type ChartKey = 'meals' | 'weights' | 'exercises' | 'glucoseLevels';
type IRawForecastData = {[key in ChartKey]: ChartFragment[]};

interface IChartData {
  name: string;
  glucoseLevels?: number;
  weights?: number;
  meals?: number;
  exercises?: number;
}

function Health() {
  const [data, setData] = useState<IChartData[]>([]);

  const processAndSetData = (forecast: IRawForecastData) => {
    const processedData: {[index: string]: IChartData} = {};

    Object.entries(forecast).forEach(([key, rows]) => {
      if (typeof rows !== 'object') return;

      rows.forEach((row) => {
        if (!processedData[row.date as string]) {
          processedData[row.date] = {[key]: row.value, name: row.date};
        } else {
          processedData[row.date][key as ChartKey] = row.value;
        }
      });
    });

    setData(Object.values(processedData));
  };

  const [loadChart, {error, loading}] = useChartLazyQuery({
    client: useApolloClient(),
    onCompleted: (res) => {
      if (res.forecast) {
        processAndSetData(res.forecast);
      }
    },
  });

  useEffect(() => {
    loadChart();
  }, [loadChart]);

  return (
    <div className='weight-page'>
      <h1>Health page</h1>

      {error && <Message type='error' title='Cannot fetch chart data.' />}
      {loading && <Loading />}

      <LineChart width={600} height={300} data={data}>
        <Line type='monotone' dataKey='meals' stroke='#00ff00' />
        <Line type='monotone' dataKey='exercises' stroke='#ff0000' />
        <Line type='monotone' dataKey='glucoseLevels' stroke='#0000ff' />
        <Line type='monotone' dataKey='weights' stroke='#f0f0f0' />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default Health;

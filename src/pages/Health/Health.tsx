import React, {useEffect, useState} from 'react';
import {useChartLazyQuery} from 'generated/graphql';
import './Health.scss';
import {useApolloClient} from '@apollo/client';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import Chart from 'components/Health/Chart';
import TRawForecastData from 'types/TRawForecastData';

function Health() {
  const [data, setData] = useState<TRawForecastData>();

  const [loadChart, {error, loading}] = useChartLazyQuery({
    client: useApolloClient(),
    onCompleted: (res) => {
      if (res.forecast) {
        setData(res.forecast);
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
      {data && <Chart data={data} />}
    </div>
  );
}

export default Health;

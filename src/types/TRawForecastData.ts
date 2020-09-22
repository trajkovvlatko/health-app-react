import {ChartFragment} from 'generated/graphql';
import TChartKey from './TChartKey';

type TRawForecastData = {[key in TChartKey]: ChartFragment[]};
export default TRawForecastData;

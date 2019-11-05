import React from 'react';

import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  FlexibleXYPlot
} from 'react-vis';

import 'react-vis/dist/main.scss'


export default function Final(props) {
 
    const {data} = props;
    let flatData = data.flat();
    
    const objectData = flatData.map(coord => 
        ({x:coord.timestamp,y:coord.ecg})
      )

    
   
    
    
   
  
  return (
    <FlexibleXYPlot xType="time" height={300}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis title="Time (ms)" />
      <YAxis title="ECG (mV)" />
       <LineSeries
        data={objectData}
        animation={"gentle"}
      /> 
    </FlexibleXYPlot>
  );
}
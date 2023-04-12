import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const options: Highcharts.Options = {
  title: {
    text: 'My chart',
  },
  series: [
    {
      name: 'vds_wsub',
      type: 'line',
      data: [
        {
          name: 'Астраханьгазпром',
          x: 1.3181,
          y: 20444.906195843847,
        },
        {
          name: 'Когалымнефтегаз',
          x: 1.4659870000000002,
          y: 19547.57211652679,
        },
        {
          name: 'Якутская ТЭК',
          x: 1.4856474244894,
          y: 17700.20810192281,
        },
        {
          name: 'Сургутгаздобыча',
          x: 4.999467424489399,
          y: 16312.606703476185,
        },
      ],
    },
    {
      name: 'vds_sub',
      type: 'line',
      data: [
        {
          name: 'Когалымнефтегаз',
          x: 0.147887,
          y: 29009.029327711363,
        },
        {
          name: 'Астраханьгазпром',
          x: 1.4659870000000002,
          y: 25893.262836499664,
        },
        {
          name: 'Якутская ТЭК',
          x: 1.4856474244894,
          y: 24810.482824211416,
        },
        {
          name: 'Сургутгаздобыча',
          x: 4.999467424489399,
          y: 22179.304418474505,
        },
        {
          name: 'Урайнефтегаз',
          x: 5.055385424489399,
          y: 19528.838387790784,
        },
        {
          name: 'Волгограднефтепереработка',
          x: 18.984285424489396,
          y: 18951.12009989673,
        },
      ],
    },
  ],
};


const App = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default App;

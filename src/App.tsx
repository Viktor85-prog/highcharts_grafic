import React, { useRef, useState, useEffect } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const options: Highcharts.Options = {
  title: {
    text: 'Графики',
  },
  series: [ ],
};

function addDataToOptions (data: any,currentYear: number) {
	debugger
	options.series = [];
	options.series?.push({
		name: 'С учетом субсидий',
		type: 'line',
		data:data[currentYear]?.vds_wsub});
	options.series?.push({
		name: 'Без учета субсидий',
		type: 'line',
		data:data[currentYear]?.vds_sub});
}


const App = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [error, setError] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [currentYear, setCurrentYear] = useState<number>(2024);
  
  function onValueChange(event:any) {
    setCurrentYear(event.target.value);
  }

  useEffect(() => {
	  fetch("https://iori3.ranepa.ru/science_api/v1/oil_refining/1/")
		.then(res => res.json())
		.then(
		  (result) => {
			setIsLoaded(true);
			setItems(result.volume_marginality_relation);
			setCurrentYear(2021);
		  },
		  (error) => {
			setIsLoaded(true);
			setError(error);
		  }
		)
	}, [])
	useEffect(()=> {
		addDataToOptions(items, currentYear);
	}, [currentYear])

	if (error) {
		return <div>Ошибка: {error}</div>
	} else if (!isLoaded) {
		return <div>Загрузка...</div>;
	} else {
		return (<>
			<div className="select-btns"onChange={(e:any)=> onValueChange(e)} >
				<label className="select-btn">
					<input className="select-btn-radio" type="radio" name="year" hidden  value="2021"/>
					<span className="select-btn-view">2021</span>
				</label>
				<label className="select-btn">
					<input className="select-btn-radio" type="radio" name="year" hidden value="2022" />
					<span className="select-btn-view">2022</span>
				</label>
				<label className="select-btn">
					<input className="select-btn-radio" type="radio" name="year" hidden value="2023"/>
					<span className="select-btn-view">2023</span>
				</label>
				<label className="select-btn">
					<input className="select-btn-radio" type="radio" name="year" hidden value="2024"/>
					<span className="select-btn-view">2024</span>
				</label>
			</div>
			<HighchartsReact
			highcharts={Highcharts}
			options={options}
			allowChartUpdate={true}
			ref={chartComponentRef}
			{...props}
			/>
			</>
		)}
};

export default App;

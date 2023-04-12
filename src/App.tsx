import React, { useRef, useState, useEffect } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const options: Highcharts.Options = {
  title: {
    text: 'Графики',
  },
  series: [ ],
};

function addDataToOptions (data: any) {
	debugger
	options.series = [];
	options.series?.push({
		name: 'С учетом субсидий',
		type: 'line',
		data:data[2021]?.vds_wsub});
	options.series?.push({
		name: 'Без учета субсидий',
		type: 'line',
		data:data[2021]?.vds_sub});
}


const App = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [error, setError] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [currentYear, setCurrentYear] = useState<number>();
  
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
		addDataToOptions(items);
	}, [currentYear])

	if (error) {
		return <div>Ошибка: {error}</div>
	} else if (!isLoaded) {
		return <div>Загрузка...</div>;
	} else {
		return (<>
			<div className="select-btns">
				<label className="select-btn">
					<input className="select-btn-radio" type="radio" name="year" hidden />
					<span className="select-btn-view">2021</span>
				</label>
				<label className="select-btn">
					<input className="select-btn-radio" type="radio" name="year" hidden />
					<span className="select-btn-view">2022</span>
				</label>
				<label className="select-btn">
					<input className="select-btn-radio" type="radio" name="year" hidden/>
					<span className="select-btn-view">2023</span>
				</label>
				<label className="select-btn">
					<input className="select-btn-radio" type="radio" name="year" hidden/>
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

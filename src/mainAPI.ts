export const fetchData = (
	path: string,
    callback?: (resp: any) => void,
    errorCallback?: (resp: any) => void
	) => {
		return (
			fetch(path)
				.then(data => data.json())
				.then((data: any) => {
					return callback ? callback(data) : data;
				})
				.catch((err: any) => (errorCallback ? errorCallback(err.response.data) : Promise.reject(err.response.data)))
		)
}
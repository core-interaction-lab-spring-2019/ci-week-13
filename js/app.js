window.addEventListener('load', ()=> {

	let long;
	let lat;

	let description = document.querySelector('.current-description');
	let degrees = document.querySelector('.current-temp');
	let timezone = document.querySelector('.location__timezone');
	let body = document.querySelector('body');
	
	if(navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(position => {

			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'http://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/b37667a21bdc871f0bbf54ca09f6cbfc/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);

					const { temperature, summary, icon } = data.currently;
					const timezone_location = data.timezone;
					const timezone_edit = timezone_location.replace(/_/g, " ");

					//set DOM element values w/ values from the API

					description.textContent = summary;
					degrees.textContent = temperature;
					timezone.textContent = timezone_edit;

					body.classList.add(icon);

				});

		});

	}
});
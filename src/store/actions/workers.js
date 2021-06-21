export const FETCH_WORKERS = "FETCH_WORKERS";

export const fetchWorkers = () => {
	return async (dispatch, getState) => {
		const token = getState().auth.idToken;

		const response = await fetch(
			"https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/myWorkers",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok && response.status === 404)
			return dispatch({ type: FETCH_WORKERS, workers: [] });
		if (!response.ok) throw new Error("Ha ocurrido un error.");

		let workers = [];

		const resData = await response.json();

		resData.body.forEach((worker) => {
			workers.push(worker);
		});

		dispatch({
			type: FETCH_WORKERS,
			workers: workers,
		});
	};
};

export const inviteWorker = (categories, tags, expiration) => {
	return async (dispatch, getState) => {
		const token = getState().auth.idToken;

		const response = await fetch(
			"https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/invite/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Request-Headers": true,
					"Access-Control-Request-Method": "POST",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					categories,
					tags,
					expiration,
				}),
			}
		);

		const resData = await response.json();

		if (!response.ok) {
			console.error(resData);
			throw new Error();
		}

		return resData.body;
	};
};

export const newWorker = ({ email, password, name }) => {
	return async (dispatch, getState) => {
		const token = getState().auth.idToken;
		const response = await fetch(
			"https://us-central1-partime-60670.cloudfunctions.net/api/auth/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Request-Headers": true,
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					email: email,
					password: password,
					name: name,
				}),
			}
		);

		if (!response.ok) throw new Error("Ha ocurrido un error.");

		const resData = await response.json();

		return resData.body;
	};
};

export const checkLink = (link) => {
	return async (dispatch, getState) => {
		const token = getState().auth.idToken;

		const response = await fetch(
			`https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/checkLink/${link}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Request-Headers": true,
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const resData = await response.json();

		if (!response.ok && response.status === 404) return 404;
		if (!response.ok && response.status === 401) return 401;
		if (!response.ok) throw new Error("Ha ocurrido un error.");

		return resData.body;
	};
};

export const registerWorker = ({
	workerData,
	uid,
	listed,
	categories,
	tags,
	name,
	email,
}) => {
	return async (dispatch, getState) => {
		const token = getState().auth.idToken;
		const response = await fetch(
			"https://us-central1-partime-60670.cloudfunctions.net/api/user/worker/newUser",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Request-Headers": true,
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					name: name,
					birthday: workerData.birthday,
					contact: {
						email: email,
						phoneNumber: workerData.contact.phoneNumber,
						location: {
							address: workerData.contact.location.address,
							lat: workerData.contact.location.lat,
							lng: workerData.contact.location.lng,
						},
					},
					gender: workerData.gender,
					bio: workerData.bio,
					images: {
						main: workerData.images.main,
						profesional: workerData.images.profesional,
					},
					uid: uid,
					listed: [listed],
					categories: categories,
					tags: tags,
				}),
			}
		);

		if (!response.ok) throw new Error("Ha ocurrido un error.");

		const resData = await response.json();

		return resData.body;
	};
};

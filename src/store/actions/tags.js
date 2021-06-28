export const FETCH_TAGS = "FETCH_TAGS";
export const EDIT_TAGS = "EDIT_TAGS";
export const CREATE_TAGS = "CREATE_TAGS";

export const fetchTags = () => {
	return async (dispatch, getState) => {
		const token = localStorage.getItem("fbase_key");

		const response = await fetch(
			"https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/tags",
			{
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok && response.status === 404)
			return dispatch({ type: FETCH_TAGS, tags: [] });
		if (!response.ok) throw new Error("Ha ocurrido un error.");

		let tags = [];

		const resData = await response.json();

		resData.body.forEach((tag) => {
			tags.push(tag);
		});

		dispatch({
			type: FETCH_TAGS,
			tags: tags,
		});
	};
};

export const editTags = (action, userList, tagList) => {
	return async (dispatch, getState) => {
		const token = localStorage.getItem("fbase_key");

		const response = await fetch(
			`https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/tags/edit/${action}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"Access-Control-Request-Method": "PUT",
					"Access-Control-Request-Headers": true,
				},
				body: JSON.stringify({
					tags: tagList,
					users: userList,
				}),
			}
		);

		if (!response.ok) {
			console.log("ERROR");
			const resData = await response.json();
			console.error(resData);
			throw new Error("Ha ocurrido un error.");
		}

		dispatch({
			type: EDIT_TAGS,
			payload: {
				action: action,
				userList: userList,
				tagList: tagList,
			},
		});
	};
};

export const createTags = (tagList) => {
	return async (dispatch, getState) => {
		const token = localStorage.getItem("fbase_key");

		console.log(tagList);

		const response = await fetch(
			`https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/tags`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					tags: tagList,
				}),
			}
		);

		const resData = await response.json();

		if (!response.ok) {
			console.log("ERROR");
			console.error(resData);
			throw new Error();
		}

		dispatch({
			type: CREATE_TAGS,
			tagList: tagList,
		});
	};
};

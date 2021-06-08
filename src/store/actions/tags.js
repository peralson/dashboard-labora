export const FETCH_TAGS = 'FETCH_TAGS';

export const fetchTags = () => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/tags',
      {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
      }
    );

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_TAGS, tags: [] });
    if (!response.ok) throw new Error('Ha ocurrido un error.');

    let tags = [];

    const resData = await response.json();

    resData.body.forEach((tag) => {
      tags.push(tag);
    });

    console.log('tags: ', tags);

    dispatch({
      type: FETCH_TAGS,
      tags: tags,
    });
  };
};

export const editTags = async (action, userList, tagList) => {
  console.log('prefetch');
  // const token = getState().auth.token

  const response = await fetch(
    `https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/tags/edit/${action}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: tagList,
        users: userList,
      }),
    }
  );
  console.log('postfetch');
  const resData = await response.json();
  if (response.error) {
    const errorResData = await response.json();
    console.log(errorResData);
  }

  console.log(resData);

  console.log(response.body.json());
};

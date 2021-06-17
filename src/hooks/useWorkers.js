import { useSelector } from "react-redux";

export const useInviteWorkers = async (categories, tags, expiration) => {
  const token = useSelector((state) => state.auth.idToken);

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
    },
  );

  const resData = await response.json();

  if (!response.ok) {
    console.error(resData);
    throw new Error();
  }

  return resData.body;
};

export const useNewWorkers = async (name, email, password) => {
  const token = useSelector((state) => state.auth.idToken);

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
        email,
        password,
        name,
      }),
    },
  );

  if (!response.ok) {
    const resData = await response.json();
    console.error(resData);
    throw new Error();
  }
};

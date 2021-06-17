import { useSelector } from 'react-redux'

const useOffer = async (id) => {
  const token = useSelector(state => state.auth.idToken)

  const response = await fetch(
    `https://us-central1-partime-60670.cloudfunctions.net/api/event/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    },
  );

  if (!response.ok) throw new Error("Vaya... algo salió mal.");

  const resData = await response.json();

  return resData.body[0];
};

export default useOffer;

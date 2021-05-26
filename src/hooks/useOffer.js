const useOffer = async (id) => {
  const response = await fetch(
    `https://us-central1-partime-60670.cloudfunctions.net/api/offer/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) throw new Error("Vaya... algo salió mal.");

  const resData = await response.json();

  return resData.body[0];
};

export default useOffer;

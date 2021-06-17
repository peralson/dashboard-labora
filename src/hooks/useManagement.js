const useManagement = async (id) => {
  const response = await fetch(
    `https://us-central1-partime-60670.cloudfunctions.net/api/job/checkStatus/${id}`,
    { headers: { "Content-Type": "application/json" } },
  );

  const resData = await response.json();

  if (!response.ok && response.status === 404) {
    throw new Error("Parece que no hay ningún trabajador");
  } else if (!response.ok) {
    throw new Error();
  }

  return resData.body;
};

export default useManagement;

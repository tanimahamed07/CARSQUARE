export const getAllCars = async (searchParams) => {
  const getParams = new URLSearchParams(searchParams).toString();
  console.log(getParams);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cars?${getParams}`,
  );
  // await new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve();
  //   }, 3000)
  // );
  const data = await res.json();
  return data;
};

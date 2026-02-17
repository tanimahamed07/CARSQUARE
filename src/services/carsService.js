// export const getAllCars = async (searchParams) => {
//   const getParams = new URLSearchParams(searchParams).toString();
//   console.log(getParams);

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/cars?${getParams}`,
//   );
//   // await new Promise((resolve) =>
//   //   setTimeout(() => {
//   //     resolve();
//   //   }, 3000)
//   // );
//   const data = await res.json();
//   return data;
// };

export const getAllCars = async (searchParams) => {
  const params = await searchParams;

  const getParams = new URLSearchParams(params).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/inventory?${getParams}`,
    { cache: "no-store" },
  );

  const data = await res.json();
  return data;
};

export const getCarById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return null; // Or throw an error
  }

  const data = await res.json();
  return data.car; // Returning data.car because your API wraps it in an object
};
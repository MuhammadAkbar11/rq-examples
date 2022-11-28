import { URL } from "@utils/contants.utils";

export const getMarketService = async (page = 1) => {
  const url = `${URL}?vs_currency=idr&per_page=10&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Fetching Error");
  }
  return await response.json();
};

import { api, urls } from ".";

export const getStatistics = async () => {
  try {
    const response = await api.get(urls.statistics.getAll);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch statistics");
  }
};

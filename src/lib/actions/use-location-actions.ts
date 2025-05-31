import { Location } from "../hooks/use-fetch-locations";
import { api } from "../services/api";
import { useEntityActions } from "./use-entity-actions";

const createLocation = async (
  location: Omit<Location, "id"> & { companyId: string }
): Promise<Location> => {
  const { data } = await api.post("/locations", location);
  return data;
};

const updateLocation = async (location: Location): Promise<Location> => {
  const { data } = await api.put(`/locations/${location.id}`, location);
  return data;
};

const deleteLocation = async (locationId: string) => {
  await api.delete(`/locations/${locationId}`);
};

export const useLocationActions = () => {
  return useEntityActions<
    Location,
    Omit<Location, "id"> & { companyId: string },
    Location
  >("locations", {
    createFn: createLocation,
    updateFn: updateLocation,
    deleteFn: deleteLocation,
  });
};

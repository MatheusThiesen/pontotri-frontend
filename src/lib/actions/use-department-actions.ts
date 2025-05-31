import { Department } from "../hooks/use-fetch-departments";
import { api } from "../services/api";
import { useEntityActions } from "./use-entity-actions";

const createDepartment = async (
  department: Omit<Department, "id"> & { companyId: string }
): Promise<Department> => {
  const { data } = await api.post("/departments", department);
  return data;
};

const updateDepartment = async (
  department: Department
): Promise<Department> => {
  const { data } = await api.put(`/departments/${department.id}`, department);
  return data;
};

const deleteDepartment = async (departmentId: string) => {
  await api.delete(`/departments/${departmentId}`);
};

export const useDepartmentActions = () => {
  return useEntityActions<
    Department,
    Omit<Department, "id"> & { companyId: string },
    Department
  >("departments", {
    createFn: createDepartment,
    updateFn: updateDepartment,
    deleteFn: deleteDepartment,
  });
};

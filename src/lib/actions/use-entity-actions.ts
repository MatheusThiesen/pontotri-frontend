import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type MutationConfig<_TData, TError, _TVariables> = {
  onSuccess?: () => void;
  onError?: (error: TError) => void;
};

export function useEntityActions<
  TData,
  TVariablesCreate = Partial<TData>,
  TVariablesUpdate = TData
>(
  entityKey: string,
  options: {
    createFn: (input: TVariablesCreate) => Promise<TData>;
    updateFn: (input: TVariablesUpdate) => Promise<TData>;
    deleteFn?: (id: string) => Promise<void>;
    config?: MutationConfig<TData, Error, TVariablesCreate | TVariablesUpdate>;
  }
): {
  createMutation: UseMutationResult<TData, Error, TVariablesCreate>;
  updateMutation: UseMutationResult<TData, Error, TVariablesUpdate>;
  deleteMutation?: UseMutationResult<void, Error, string>;
} {
  const queryClient = useQueryClient();
  const { createFn, updateFn, deleteFn, config } = options;

  const createMutation = useMutation<TData, Error, TVariablesCreate>({
    mutationFn: createFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityKey] });
      config?.onSuccess?.();
    },
    onError: config?.onError,
  });

  const updateMutation = useMutation<TData, Error, TVariablesUpdate>({
    mutationFn: updateFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityKey] });
      config?.onSuccess?.();
    },
    onError: config?.onError,
  });

  const deleteMutation = deleteFn
    ? useMutation<void, Error, string>({
        mutationFn: deleteFn,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [entityKey] });
          config?.onSuccess?.();
        },
        onError: config?.onError,
      })
    : undefined;

  return { createMutation, updateMutation, deleteMutation };
}

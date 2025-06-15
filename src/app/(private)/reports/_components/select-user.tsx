"use client";

import { Combobox, ComboboxDataProps } from "@/components/form/Combobox";
import { useFetchUsers } from "@/lib/hooks/use-fetch-users";

export function SelectUser({
  selectedUser,
  onChange,
}: {
  selectedUser?: ComboboxDataProps;
  onChange: (data: ComboboxDataProps | null) => void;
}) {
  const { data: fetchUsers } = useFetchUsers({ page: 1, pagesize: 250 });

  const userOptions: ComboboxDataProps[] =
    fetchUsers?.data.map((user) => ({
      value: user.id,
      label: user.name,
    })) ?? [];

  return (
    <Combobox
      label="Usuário"
      data={userOptions}
      onChange={onChange}
      className="w-56"
    />
  );
}

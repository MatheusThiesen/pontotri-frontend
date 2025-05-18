"use client";

import {
  ListingHeader,
  ListingMain,
  ListingPage,
  ListingTitle,
} from "@/components/layouts/listing";
import { TableListDepartments } from "./_components/table-list";

export default function Requests() {
  return (
    <ListingPage>
      <ListingHeader>
        <ListingTitle>Meus Departamentos</ListingTitle>
      </ListingHeader>

      <ListingMain>
        <TableListDepartments />
      </ListingMain>
    </ListingPage>
  );
}

"use client";

import {
  ListingHeader,
  ListingMain,
  ListingPage,
  ListingTitle,
} from "@/components/layouts/listing";
import { TableListRequests } from "./_components/TableListRequests";

export default function Requests() {
  return (
    <ListingPage>
      <ListingHeader>
        <ListingTitle>Meus Colaboradores</ListingTitle>
      </ListingHeader>

      <ListingMain>
        <TableListRequests />
      </ListingMain>
    </ListingPage>
  );
}

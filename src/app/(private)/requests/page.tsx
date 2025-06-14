"use client";

import {
  ListingHeader,
  ListingMain,
  ListingPage,
  ListingTitle,
} from "@/components/layouts/listing";
import { TableListRequests } from "./_components/table-list-requests";

export default function Requests() {
  return (
    <ListingPage>
      <ListingHeader>
        <ListingTitle>Meus Pedidos</ListingTitle>
      </ListingHeader>

      <ListingMain>
        <TableListRequests />
      </ListingMain>
    </ListingPage>
  );
}

"use client";

import {
  ListingHeader,
  ListingMain,
  ListingPage,
  ListingTitle,
} from "@/components/layouts/listing";
import { TableListLocations } from "./_components/table-list";

export default function Requests() {
  return (
    <ListingPage>
      <ListingHeader>
        <ListingTitle>Minhas Localizações</ListingTitle>
      </ListingHeader>

      <ListingMain>
        <TableListLocations />
      </ListingMain>
    </ListingPage>
  );
}

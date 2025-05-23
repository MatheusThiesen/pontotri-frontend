"use client";

import {
  ListingHeader,
  ListingMain,
  ListingPage,
  ListingTitle,
} from "@/components/layouts/listing";
import { withAuth } from "@/components/with-auth";
import { TableListRequests } from "./_components/TableListRequests";

function UsersPage() {
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

export default withAuth(UsersPage, {
  allowedRoles: ["ADMIN", "OWNER"],
});

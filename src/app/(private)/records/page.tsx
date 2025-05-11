import {
  ListingHeader,
  ListingMain,
  ListingPage,
  ListingTitle,
} from "@/components/layouts/listing";
import { TableListRecords } from "./_components/TableListRecords";

export default function Records() {
  return (
    <ListingPage>
      <ListingHeader>
        <ListingTitle>Meus Registros</ListingTitle>
      </ListingHeader>

      <ListingMain>
        <TableListRecords />
      </ListingMain>
    </ListingPage>
  );
}

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import Header from "~/components/header";
import { useRouter } from "next/navigation";

type Listing = {
  id: string;
  propertyId: string;
  jobType: string;
  contractorType: string;
  readyToHire: boolean;
  title: string;
  description: string;
  budget: number;
};

export default function listings() {
  const query = api.list.all.useQuery();
  const listing = query.data || [];

  const router = useRouter();

  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (query.error) {
    return <Text>Error: {query.error.message}</Text>;
  }

  return (
    <Header>
      <Box>
        <Heading>My Listings</Heading>
        <Button onClick={() => router.push("/addListing")}>
          Create Listing
        </Button>
        {listing.map((listing: Listing) => (
          <Box key={listing.id}>
            <Heading>{listing.title}</Heading>
          </Box>
        ))}
      </Box>
    </Header>
  );
}

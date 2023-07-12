import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import CleanerHeader from "~/components/header-cleaners";
import { api } from "~/utils/api";

type Listing = {
  id: string;
  Title: string;
  Address: string;
  City: string;
  State: string;
  Beds: number;
};

export default function Marketplace() {
  const router = useRouter();
  const query = api.list.all.useQuery();

  const listings: Listing[] = query.data || [];

  const handleClick = (listingId: string) => {
    router.push(`/Cleaner/${listingId}`);
  };

  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (query.error) {
    return <Text>Error: {query.error.message}</Text>;
  }

  return (
    <CleanerHeader>
      <Container>
        <Box>
          <Heading>Marketplace</Heading>
          {listings.map((listing: Listing, index: number) => (
            <Box
              key={index}
              borderWidth="2px"
              p="14"
              cursor="pointer"
              rounded="2xl"
              onClick={() => handleClick(listing.id)}
              _hover={{ bg: "gray.100" }}
              _focus={{ outline: "none", boxShadow: "outline" }}
              role="group"
              transition="background 0.3s"
            >
              <Heading fontSize="xl">{listing.Title}</Heading>
              <Text fontSize="md" fontWeight="medium">
                {listing.City}, {listing.State}
              </Text>
              <Text fontSize="md" fontWeight="medium">
                Beds: {listing.Beds}
              </Text>
            </Box>
          ))}
        </Box>
      </Container>
    </CleanerHeader>
  );
}

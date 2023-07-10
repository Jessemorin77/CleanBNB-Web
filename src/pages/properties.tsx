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

type Property = {
  id: string;
  Address: string;
  City: string;
  State: string;
  Zip: number;
  Beds: number;
  Baths: number;
  Sqft: number;
  Type: string;
  Status: string;
  Image: string;
  Desc: string;
};
import { useRouter } from "next/navigation";
export default function Properties() {
  const query = api.property.all.useQuery();

  const router = useRouter();
  const properties = query.data || [];

  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (query.error) {
    return <Text>Error: {query.error.message}</Text>;
  }

  return (
    <Header>
      <Container maxW="container.md">
        <Box p={4}>
          <Heading as="h1" mb={4}>
            My Properties
          </Heading>
          <Button
            colorScheme="blue"
            mb={4}
            onClick={() => router.push("/addProperty")}
          >
            Add Property
          </Button>
          {properties.map((property: Property) => (
            <Box key={property.id}>
              <Heading>{property.Address}</Heading>
            </Box>
          ))}
        </Box>
      </Container>
    </Header>
  );
}

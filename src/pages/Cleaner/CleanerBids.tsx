import { Box, Container, Heading, Text } from "@chakra-ui/react";
import CleanerHeader from "~/components/header-cleaners";
import { api } from "~/utils/api";

type Bid = {
  id: string;
  userId: string;
  listingId: string;
  bidAmount: number | null;
  bidMessage: string | null;
  bidStatus: string | null;
  bidDate: Date;
};

export default function CleanerBids() {
  const query = api.bid.byUserId.useQuery();

  const bids = query.data || [];

  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (query.error) {
    return <Text>Error: {query.error.message}</Text>;
  }

  return (
    <CleanerHeader>
      <Container>
        <Box py={8}>
          <Heading as="h1" size="xl" mb={4}>
            My Cleaner Bids
          </Heading>
          {bids.map((bid: Bid) => (
            <Box
              key={bid.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              mb={4}
            >
              <Heading as="h2" size="lg" mb={2}>
                Bid Message: {bid.bidMessage || "N/A"}
              </Heading>
              <Text fontSize="lg" mb={2}>
                Bid Amount: {bid.bidAmount ?? "N/A"}
              </Text>
              <Text fontSize="lg" mb={2}>
                Bid Status: {bid.bidStatus || "N/A"}
              </Text>
              <Text fontSize="lg">
                Bid Date: {bid.bidDate.toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </Box>
      </Container>
    </CleanerHeader>
  );
}

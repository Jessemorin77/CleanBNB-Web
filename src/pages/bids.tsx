import { Box, Button, Container, Heading, Alert, useToast } from "@chakra-ui/react";
import Header from "~/components/header";
import { api } from "~/utils/api";

type Bid = {
  id: string;
  userId: string;
  listingId: string;
  bidAmount?: number | null | undefined;
  bidMessage?: string | null | undefined;
  bidStatus: string;
};

export default function Bids() {
  const query = api.bid.all.useQuery();
  const acceptMutation = api.bid.accept.useMutation();
  const declineMutation = api.bid.decline.useMutation();
  const deleteMutation = api.bid.delete.useMutation();
  const bids = query.data || [];
  const toast = useToast();

  const handleAccept = (bidId: string, userId: string) => {
    acceptMutation.mutate(
      { bidId, userId },
      {
        onSuccess: (data) => {
          if (data?.chatId) {
            toast({
              title: "Bid accepted",
              description: "Chat created successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Bid accepted",
              description: "Failed to create chat.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        },
        onError: (error) => {
          toast({
            title: "Bid accepted",
            description: `Failed to accept bid. Error: ${error.message}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  const handleDecline = (bidId: string) => {
    declineMutation.mutate(bidId);
    alert("bid declined");
  };

  const handleDelete = (bidId: string) => {
    deleteMutation.mutate(bidId);
    alert("bid deleted");
  };

  return (
    <Header>
      <Container>
        <Box>
          <Heading>My Bids</Heading>
          {bids.map((bid: Bid) => (
            <div className="p-10" key={bid.id}>
              <Box border="2px" p="5">
                <Heading>{bid.bidAmount}</Heading>
                <Heading>{bid.bidMessage}</Heading>
                <Heading>{bid.bidStatus}</Heading>
                <Button colorScheme="blue" onClick={() => handleAccept(bid.id, bid.userId)}>
                  Accept
                </Button>
                <Button colorScheme="blue" onClick={() => handleDecline(bid.id)}>
                  Decline
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(bid.id)}>
                  Delete
                </Button>
              </Box>
            </div>
          ))}
        </Box>
      </Container>
    </Header>
  );
}





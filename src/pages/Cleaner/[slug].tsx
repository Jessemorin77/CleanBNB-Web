import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input
  } from "@chakra-ui/react";
  import { FormEvent, useState } from "react";
  import { useRouter } from "next/router";
  import { api } from "~/utils/api";
  import Header from "~/components/header";
  
  type Property = {
    id: string;
    Address: string;
    City: string;
    State: string;
    Beds: number;
    Baths: number;
    Sqft: number;
    Type: string;
    Status: string;
    Image: string;
    Desc: string;
  };
  
  type Listing = {
    id: string;
    title: string;
    jobType: string;
    description: string;
    budget: number;
    contractorType: string;
  };
  
  type Bid = {
    listingId: string;
    bidAmount?: number;
    bidMessage?: string;
    bidStatus?: string;
  };
  
  export default function ListingDetails() {
    const router = useRouter();
    const { slug } = router.query;
  
    const mutation = api.bid.create.useMutation();
    const query = api.list.byId.useQuery(slug as string);
    const listing = query.data;
  
    const [bid, setBid] = useState<Bid>({
      listingId: "",
      bidAmount: undefined,
      bidMessage: "",
    });
    const [isLoading, setIsLoading] = useState(false);
  
    const handleBidSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      mutation.mutate({
        listingId: slug as string,
        bidAmount: bid.bidAmount,
        bidMessage: bid.bidMessage,
        bidStatus: "Open",
      });
      setIsLoading(false)
      alert("Bid submitted")
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setBid((prevBid) => ({
        ...prevBid,
        [name]: value,
      }));
    };
  
    if (query.isLoading) {
      return <Text>Loading...</Text>;
    }
  
    if (query.error) {
      return <Text>Error: {query.error.message}</Text>;
    }
  
    if (!listing) {
      return <Text>Property not found.</Text>;
    }
  
    return (
      <Header>
        <Container>
          <Box>
            <Heading>{listing?.title}</Heading>
            <Text>City: {listing?.budget}</Text>
            <Text>State: {listing?.contractorType}</Text>
            <Text>Beds: {listing?.description}</Text>
            <Text>Baths: {listing?.jobType}</Text>
            <form onSubmit={handleBidSubmit}>
              <NumberInput
                name="bidAmount"
                value={bid.bidAmount}
                onChange={valueAsString =>
                  setBid(prevBid => ({ ...prevBid, bidAmount: parseInt(valueAsString) || undefined }))
                }
                placeholder="Bid Amount"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Input
                name="bidMessage"
                value={bid.bidMessage}
                onChange={handleChange}
                placeholder="Bid Message"
              />
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Place Bid
              </Button>
            </form>
          </Box>
        </Container>
      </Header>
    );
  }
  
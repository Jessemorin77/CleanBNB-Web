import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";
import Header from "~/components/header";
import { api } from "~/utils/api";

type Listing = {
  propertyId: string;
  jobType: string;
  contractorType: string;
  readyToHire: boolean;
  title: string;
  description: string;
  budget: number;
};

type Property = {
  id: string;
  Address: string;
};

export default function AddListing() {
  const mutation = api.list.create.useMutation();
  const propertyQuery = api.property.all.useQuery();

  const [listing, setListing] = useState<Listing>({
    propertyId: "",
    jobType: "",
    contractorType: "",
    readyToHire: true,
    title: "",
    description: "",
    budget: 0,
  });

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPropertyId = e.target.value;
    setListing((prevListing) => ({
      ...prevListing,
      propertyId: selectedPropertyId,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'budget') {
      const parsedValue = parseFloat(value); // Parse the value to a number

      setListing((prevListing) => ({
        ...prevListing,
        [name]: parsedValue,
      }));
    } else {
      setListing((prevListing) => ({
        ...prevListing,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(listing);
      console.log("Listing created successfully");
      // Show confirmation message or perform any other desired actions
    } catch (error) {
      console.log("Error creating listing:", error.message);
      // Show error message or perform any other desired actions
    }
  };

  if (propertyQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (propertyQuery.isError) {
    return <div>Error: {propertyQuery.error?.message}</div>;
  }

  return (
    <Header>
      <Container>
        <Box>
          <Heading>Create Listing</Heading>
          <form onSubmit={handleSubmit}>
            <Stack>
              <Select
                name="propertyId"
                value={listing.propertyId}
                onChange={handlePropertyChange}
                placeholder="Select Property"
              >
                {propertyQuery.data?.map((property: Property) => (
                  <option key={property.id} value={property.id}>
                    {property.Address}
                  </option>
                ))}
              </Select>

              <Input
                name="jobType"
                value={listing.jobType}
                onChange={handleChange}
                placeholder="Job Type"
              />

              <Input
                name="contractorType"
                value={listing.contractorType}
                onChange={handleChange}
                placeholder="Contractor Type"
              />

              <Input
                name="title"
                value={listing.title}
                onChange={handleChange}
                placeholder="Title"
              />

              <Input
                name="description"
                value={listing.description}
                onChange={handleChange}
                placeholder="Description"
              />

              <Input
                name="budget"
                value={listing.budget}
                onChange={handleChange}
                placeholder="Budget"
              />

              <Button type="submit" colorScheme="blue">
                Create Listing
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Header>
  );
}


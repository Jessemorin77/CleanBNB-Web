import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Header from "~/components/header";
import { api } from "~/utils/api";
import React, { ChangeEvent, FormEvent } from "react";

type Property = {
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

export default function AddProperty() {
  const mutation = api.property.create.useMutation();

  const [property, setProperty] = useState<Property>({
    Address: "",
    City: "",
    State: "",
    Zip: 0,
    Beds: 0,
    Baths: 0,
    Sqft: 0,
    Type: "",
    Status: "",
    Image: "",
    Desc: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "Zip" || name === "Beds" || name === "Baths" || name === "Sqft") {
      setProperty((prevProperty) => ({
        ...prevProperty,
        [name]: parseInt(value, 10),
      }));
    } else {
      setProperty((prevProperty) => ({ ...prevProperty, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await mutation.mutateAsync(property);
      setProperty({
        Address: "",
        City: "",
        State: "",
        Zip: 0,
        Beds: 0,
        Baths: 0,
        Sqft: 0,
        Type: "",
        Status: "",
        Image: "",
        Desc: "",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Header>
      <Container maxW="container.md">
        <Box p={4}>
          <Heading as="h1" mb={4}>
            Add Property
          </Heading>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Input
                  name="Address"
                  value={property.Address}
                  onChange={handleChange}
                  placeholder="Address"
                />
                <Input
                  name="City"
                  value={property.City}
                  onChange={handleChange}
                  placeholder="City"
                />
                <Input
                  name="State"
                  value={property.State}
                  onChange={handleChange}
                  placeholder="State"
                />
                <Input
                  name="Zip"
                  value={property.Zip === 0 ? "" : property.Zip.toString()}
                  onChange={handleChange}
                  placeholder="ZIP"
                />
                <Input
                  name="Beds"
                  value={property.Beds === 0 ? "" : property.Beds.toString()}
                  onChange={handleChange}
                  placeholder="Beds"
                />
                <Input
                  name="Baths"
                  value={property.Baths === 0 ? "" : property.Baths.toString()}
                  onChange={handleChange}
                  placeholder="Baths"
                />
                <Input
                  name="Sqft"
                  value={property.Sqft === 0 ? "" : property.Sqft.toString()}
                  onChange={handleChange}
                  placeholder="Sqft"
                />
                <Input
                  name="Type"
                  value={property.Type}
                  onChange={handleChange}
                  placeholder="Type"
                />
                <Input
                  name="Status"
                  value={property.Status}
                  onChange={handleChange}
                  placeholder="Status"
                />
                <Input
                  name="Image"
                  value={property.Image}
                  onChange={handleChange}
                  placeholder="Image"
                />
                <Input
                  name="Desc"
                  value={property.Desc}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                  {isLoading ? "Submitting" : "Add Property"}
                </Button>
              </Stack>
            </form>
          ) : (
            <Text>Property submitted successfully!</Text>
          )}
        </Box>
      </Container>
    </Header>
  );
}

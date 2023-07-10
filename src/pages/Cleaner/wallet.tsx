import { Box, Container, Heading } from "@chakra-ui/react";
import CleanerHeader from "~/components/header-cleaners";

export default function wallet() {
  return (
    <CleanerHeader>
      <Container>
        <Box>
          <Heading>Wallet</Heading>
        </Box>
      </Container>
    </CleanerHeader>
  );
}

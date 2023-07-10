import { Box, Container, Heading } from "@chakra-ui/react";
import CleanerHeader from "~/components/header-cleaners";

export default function cleaner() {
  return (
    <CleanerHeader>
      <Container>
        <Box>
          <Heading>Cleaners Page</Heading>
        </Box>
      </Container>
    </CleanerHeader>
  );
}

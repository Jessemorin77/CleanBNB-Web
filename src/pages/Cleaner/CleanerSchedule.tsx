import { Box, Container, Heading } from "@chakra-ui/react";
import CleanerHeader from "~/components/header-cleaners";

export default function CleanerSchedule() {
  return (
    <CleanerHeader>
      <Container>
        <Box>
          <Heading>Cleaners Schedule</Heading>
        </Box>
      </Container>
    </CleanerHeader>
  );
}

import { Box, Input, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

type Message = {
  id: string;
  content: string;
  createdAt: Date;
};

const MessageScreen = () => {
  const router = useRouter();
  const toast = useToast();
 const { slug }  = router.query

  // Fetch messages for the current chat
  const { data: messages, isLoading } = api.message.getByChatId.useQuery(slug as string);
console.log("chatId!!!!!!",slug)
    const chatMutation = api.message.create.useMutation()

    const handleSendMessage = () => {
        const content = "Your message content"; // Get the message content from the input field
        const { chatId } = router.query;
      
        if (typeof chatId === 'string') {
          chatMutation.mutate({ chatId, content }, {
            onSuccess: () => {
              toast({
                title: 'Message sent',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            },
            onError: () => {
              toast({
                title: 'Failed to send message',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            },
          });
        } else {
          // Handle the case when chatId is undefined or not a string
          console.error('Invalid chatId');
        }
      };

  return (
    <Box p={4}>
      <Box mb={4}>
        {messages?.map((message) => (
          <Box key={message.id} mb={2}>
            <p>{message.content}</p>
          </Box>
        ))}
      </Box>
      <Box display="flex">
        <Input placeholder="Type a message" flex="1" mr={2} />
        <Button colorScheme="blue" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default MessageScreen;


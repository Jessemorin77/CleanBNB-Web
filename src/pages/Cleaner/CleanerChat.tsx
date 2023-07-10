import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading } from '@chakra-ui/react';
import { api } from '~/utils/api';
import Link from 'next/link';
import CleanerHeader from '~/components/header-cleaners';

type Chat = {
  id: string;
  createdAt: Date;
  participants: {
    userId: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
};

const ChatsPage = () => {
  const router = useRouter();

  // Fetch the user's chats
  const { data: chats, isLoading } = api.chat.all.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CleanerHeader>
    <Heading>Chats</Heading>
      {chats?.map((chat) => (
        <Link href={`/Cleaner/chat/${chat.id}`} key={chat.id}>
          <div>
            <p>
              Chat ID: {chat.id}
              <br />
              Participants:
              {chat.participants.map((participant) => {
                const user = participant.user;
                return user ? (
                  <span key={user.id}> {user.name} </span>
                ) : (
                  <span key={participant.userId}> Unknown User </span>
                );
              })}
            </p>
          </div>
        </Link>
      ))}
    </CleanerHeader>
  );
};

export default ChatsPage;













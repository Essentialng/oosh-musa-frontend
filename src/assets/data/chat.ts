interface ChatMessage {
    senderId: number;
    text: string;
    timestamp: string;
  }


export const sampleChat:ChatMessage[]= [
    {
      senderId: 1,
      text: 'Hey Bob, how are you?',
      timestamp: '2024-10-11T10:00:00Z',
    },
    {
      senderId: 2,
      text: 'Hi Alice, I am good! How about you?',
      timestamp: '2024-10-11T10:01:00Z',
    },
    {
      senderId: 1,
      text: 'I am great, thanks for asking! What are you up to today?',
      timestamp: '2024-10-11T10:02:00Z',
    },
    {
      senderId: 2,
      text: 'Just working on a new project. Do you want to grab coffee later?',
      timestamp: '2024-10-11T10:03:00Z',
    },
    {
      senderId: 1,
      text: 'Sure, that sounds great! How about 3 PM?',
      timestamp: '2024-10-11T10:04:00Z',
    },
    {
      senderId: 2,
      text: 'Perfect, see you then!',
      timestamp: '2024-10-11T10:05:00Z',
    },
    {
      senderId: 1,
      text: 'Hello ist three and i cant find you?',
      timestamp: '2024-10-11T03:00:00Z',
    },
    {
      senderId: 2,
      text: 'Sorry man, got an emergency!',
      timestamp: '2024-10-11T03:05:00Z',
    },
  ];
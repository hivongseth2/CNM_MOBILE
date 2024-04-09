import { getListMessenges } from '@/selectors/MessengesSelector';
import { useSelector } from 'react-redux';

export const getConversationName = (conversation, user) => {
  let conversationName;

  if (conversation.conversationType === 'PRIVATE') {
    conversationName =
      conversation.participants[0].userId == user.userId
        ? conversation.participants[1].fullName
        : conversation.participants[0].fullName;
  } else if (conversation.conversationType === 'GROUP') {
    // conversation = conversation.name ||
    // for(let i=0; i<conversation.participants.length)
  }

  return conversationName;
};

export const getConversationByUser = (conversations, user) => {
  let selected = null;
  [...conversations].forEach((conversation) => {
    const { participants } = conversation;
    [...participants].forEach((p) => {
      if (p.userId === user.user.userId) {
        console.log('ut25 ', conversation);
        selected = conversation;
      }
    });
  });
  return (
    selected || {
      messages: [],
    }
  );
};

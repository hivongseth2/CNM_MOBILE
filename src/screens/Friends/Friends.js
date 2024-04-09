import { getAllFriendRequestAction } from '@/actions/FriendRequestAction';
import { getListFriendRequest } from '@/selectors/FriendSelector';
import { getUser } from '@/selectors/UserSelectors';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState, useFocusEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export function Friends() {
  const friendsRQ = useSelector(getListFriendRequest);
  const user = useSelector(getUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFriendRequestAction());
  }, []);

  useEffect(() => {
    console.log('friend request ', friendsRQ);
    console.log(user);
  }, [friendsRQ, user]);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </View>
  );
}

{
  /* const getConversationName = (conversation) => {
  let conversationName;

  if (conversation.conversationType === 'PRIVATE') {
    conversationName =
      conversation.participants[0].userId == user.userId
        ? conversation.participants[1].fullName
        : conversation.participants[0].fullName;
  }else if (conversation.conversationType === "GROUP"){
      // conversation = conversation.name || 
      // for(let i=0; i<conversation.participants.length)
  }

  return conversationName
} */
}

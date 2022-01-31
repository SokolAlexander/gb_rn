import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {DeleteButtonProps} from './DeleteButton.types';

export const DeleteButton = ({id, onPress}: DeleteButtonProps) => {
  const handlePress = () => {
    onPress(id);
  };

  return (
    <Pressable onPress={handlePress}>
      <Icon name="cross" size={30} color="black" />
    </Pressable>
  );
};

import React, {useState} from 'react';
import {TextInput} from 'react-native';

import {styles} from './TextField.styles';
import {TextFieldProps} from './TextField.types';

export const TextField = ({onSubmit}: TextFieldProps) => {
  const [newTodoText, setNewTodoText] = useState('');

  const handleSubmitEditing = () => {
    if (newTodoText) {
      setNewTodoText('');
      onSubmit(newTodoText);
    }
  };

  return (
    <TextInput
      value={newTodoText}
      onChangeText={setNewTodoText}
      style={styles.textField}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

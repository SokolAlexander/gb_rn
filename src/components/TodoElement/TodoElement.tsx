import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {Checkbox} from '../Checkbox/Checkbox';
import {TodoElementProps} from './TodoElement.types';
import {styles} from './TodoElement.styles';
import {DeleteButton} from '../DeleteButton/DeleteButton';

export const TodoElement = ({
  todo,
  onSelect,
  onDelete,
  onPress,
}: TodoElementProps) => (
  <View key={`${todo.id}-${todo.title}`} style={styles.todoContainer}>
    <Checkbox id={todo.id} onPress={onSelect} checked={todo.completed} />
    <Pressable style={styles.textContainer} onPress={() => onPress(todo.id)}>
      <Text style={[styles.todoText, todo.completed && styles.todoTextCrossed]}>
        {todo.title}
      </Text>
    </Pressable>
    <DeleteButton id={todo.id} onPress={onDelete} />
  </View>
);

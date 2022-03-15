import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {selectTodoById} from '../../store/selectors';
import {styles} from './TodoDetails.styles';
import {TodoDetailsProps} from './TodoDetails.types';

export const TodoDetails = ({route, navigation}: TodoDetailsProps) => {
  const todo = useSelector(selectTodoById(route.params.todoId));

  useEffect(() => {
    navigation.setOptions({
      title: todo.title,
    });
  }, [route.params.todoId, navigation]);

  return (
    <View style={styles.todoContainer}>
      <Text>Todo Details: {route.params.todoId}</Text>
      <Text>{todo.title}</Text>
      {todo.completed && <Text>Completed</Text>}
    </View>
  );
};

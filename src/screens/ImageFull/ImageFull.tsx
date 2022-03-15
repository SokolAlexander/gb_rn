import React from 'react';
import {Alert, Button, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changeTodo} from '../../store/actions';
import {selectTodoById} from '../../store/selectors';

import {styles} from './ImageFull.styles';
import {ImageFullProps} from './ImageFull.types';

export const ImageFull = ({route, navigation}: ImageFullProps) => {
  const dispatch = useDispatch();

  const todo = useSelector(selectTodoById(route.params.todoId));
  const handleConfirm = () => {
    const newTodo = {
      ...todo,
      assets: todo.assets.filter(({uri}) => uri !== route.params.assetUri),
    };

    dispatch(changeTodo(newTodo));
    navigation.pop();
  };

  const handlePress = () => {
    Alert.alert('Are you sure?', 'You will be deleting this image', [
      {
        text: 'Delete',
        onPress: handleConfirm,
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  return (
    <>
      <Image
        source={{uri: route.params.assetUri}}
        resizeMode="contain"
        style={styles.image}
      />
      <Button title="Delete image" onPress={handlePress} />
    </>
  );
};

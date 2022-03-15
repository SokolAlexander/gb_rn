import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import {SaveButton} from '../../components/SaveButton/SaveButton';
import {changeTodo} from '../../store/actions';
import {selectTodoById} from '../../store/selectors';
import {styles} from './TodoDetails.styles';
import {TodoDetailsProps} from './TodoDetails.types';

export const TodoDetails = ({route, navigation}: TodoDetailsProps) => {
  const dispatch = useDispatch();
  const todo = useSelector(selectTodoById(route.params.todoId));

  const [text, setText] = useState(todo.title);
  const [isDirty, setIsDirty] = useState(false);

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
      },
      ({assets}) => {
        if (assets) {
          dispatch(
            changeTodo({
              ...todo,
              assets: [...(todo.assets || []), ...assets],
            }),
          );
        }
      },
    );
  };

  const handleSave = useCallback(() => {
    dispatch(changeTodo({...todo, title: text}));
    navigation.goBack();
  }, [todo, text, dispatch, navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: todo.title,
    });
  }, [route.params.todoId, navigation, todo]);

  useEffect(() => {
    setIsDirty(text !== todo.title);
  }, [text, todo.title]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton disabled={!isDirty} onPress={handleSave} />
      ),
    });
  }, [isDirty, navigation, handleSave]);

  return (
    <View style={styles.todoContainer}>
      <TextInput value={text} onChangeText={setText} style={styles.input} />
      <Text>Todo Details: {route.params.todoId}</Text>
      <Text>{todo.title}</Text>
      {todo.completed && <Text>Completed</Text>}
      <Button title="Add image" color="#ffc484" onPress={handleSelectImage} />
      <Text>Attachments</Text>
      {todo.assets?.map(asset => {
        return (
          <View key={asset.fileName}>
            <Image source={{uri: asset.uri}} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

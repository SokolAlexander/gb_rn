import React, {useCallback, useEffect, useState} from 'react';
import {Button, Switch, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import {SaveButton} from '../../components/SaveButton/SaveButton';
import {changeTodo} from '../../store/actions';
import {selectTodoById} from '../../store/selectors';
import {styles} from './TodoDetails.styles';
import {TodoDetailsProps} from './TodoDetails.types';
import {SmallImage} from '../../components/SmallImage/SmallImage';

export const TodoDetails = ({route, navigation}: TodoDetailsProps) => {
  const dispatch = useDispatch();
  const todo = useSelector(selectTodoById(route.params.todoId));

  const [text, setText] = useState(todo.title);
  const [isDirty, setIsDirty] = useState(false);

  const handleSetPush = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const date = new Date();
    date.setHours(12);
    date.setMinutes(0);
    date.setSeconds(0);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY, // repeat once a week
    };
    await notifee.createTriggerNotification(
      {
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          asForegroundService: true,
          pressAction: {
            id: 'default',
          },
        },
        data: {
          id: todo.id,
        },
      },
      trigger,
    );
  };

  const handleCancelPush = async () => {
    await notifee.cancelTriggerNotification(todo.id);
  };

  const handleSwitch = async () => {
    if (todo.notificationIsOn) {
      await handleCancelPush();
    } else {
      await handleSetPush();
    }
    dispatch(changeTodo({...todo, notificationIsOn: !todo.notificationIsOn}));
  };

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

  const openFullImage = (uri: string) => {
    navigation.push('ImageFull', {todoId: todo.id, assetUri: uri});
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
      <View style={styles.switchWrapper}>
        <Text>Notification</Text>
        <Switch value={todo.notificationIsOn} onChange={handleSwitch} />
      </View>
      <Button title="Add image" color="#ffc484" onPress={handleSelectImage} />
      <Text>Attachments</Text>
      {todo.assets?.map(asset => {
        return (
          <SmallImage key={asset.uri} asset={asset} onPress={openFullImage} />
        );
      })}
    </View>
  );
};

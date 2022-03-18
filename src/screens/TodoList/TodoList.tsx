import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Button,
  ListRenderItemInfo,
  SectionList,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import notifee, {
  AndroidImportance,
  EventType,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import {ListSection, TodoItem, TodoListProps} from './TodoList.types';
import {styles} from './TodoList.styles';
import {selectTodos} from '../../store/selectors';
import {changeTodo, deleteTodo, fetchTodos} from '../../store/actions';
import {TextField} from '../../components/TextField/TextField';
import {TodoElement} from '../../components/TodoElement/TodoElement';

export const TodoList = ({navigation}: TodoListProps) => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const sections = useMemo(
    () =>
      Object.values(todos).reduce<ListSection[]>(
        (acc, todo) => {
          if (!todo.completed) {
            acc[0].data.push(todo);
          } else {
            acc[1].data.push(todo);
          }
          return acc;
        },
        [
          {data: [], title: 'Todo'},
          {data: [], title: 'Complete'},
        ],
      ),
    [todos],
  );

  const requestTodos = async () => {
    dispatch(fetchTodos());
  };

  useEffect(() => {
    requestTodos();
  }, []);

  const handleComplete = useCallback(
    id => {
      const todoToChange = {...todos[id], completed: !todos[id].completed};
      dispatch(changeTodo(todoToChange));
    },
    [todos, dispatch],
  );

  const addTodo = useCallback((text: string) => {
    const newTodo: TodoItem = {
      title: text,
      id: `todo-${Date.now()}`,
      completed: false,
      assets: [],
    };
    dispatch(changeTodo(newTodo));
  }, []);

  const removeTodo = useCallback((id: string) => {
    dispatch(deleteTodo(id));
  }, []);

  const handleTodoPress = useCallback(
    (id: string) => {
      navigation.push('TodoDetails', {todoId: id});
    },
    [navigation],
  );

  const renderTodo = useCallback(
    ({item}: ListRenderItemInfo<TodoItem>) => (
      <TodoElement
        todo={item}
        onSelect={handleComplete}
        onDelete={removeTodo}
        onPress={handleTodoPress}
      />
    ),
    [handleComplete, removeTodo, handleTodoPress],
  );

  const renderSectionHeader = useCallback(({section}) => {
    return (
      <Text style={styles.sectionHeader}>
        {section.title}: {section.data.length}
      </Text>
    );
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.ACTION_PRESS: {
          if (detail?.pressAction?.id === 'stop') {
            notifee.stopForegroundService();
            console.log(
              'User pressed an action with the id: ',
              detail.pressAction.id,
            );
          }
          break;
        }
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  const isAppOpenedByNotif = async () => {
    const initNotif = await notifee.getInitialNotification();
    if (initNotif) {
      const {id} = initNotif.notification.data;
      navigation.reset({
        index: 0,
        routes: [
          {name: 'TodoList'},
          {
            name: 'TodoDetails',
            params: {
              todoId: id,
            },
          },
        ],
      });
    }
    console.log(initNotif);
  };

  useEffect(() => {
    isAppOpenedByNotif();
  }, []);

  const sendPush = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 10000, // Через 10 секунд
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
          actions: [
            {
              title: 'OK',
              icon: 'https://my-cdn.com/icons/snooze.png',
              pressAction: {
                id: 'ok',
                launchActivity: 'default',
              },
            },
            {
              title: 'Stop',
              pressAction: {
                id: 'stop',
              },
            },
          ],
        },
        data: {
          id: '1',
        },
      },
      trigger,
    );
  };

  return (
    <View style={styles.todosContainer}>
      <Button title="Send push" onPress={sendPush} />
      <SectionList
        ListHeaderComponent={() => <TextField onSubmit={addTodo} />}
        sections={sections}
        renderItem={renderTodo}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

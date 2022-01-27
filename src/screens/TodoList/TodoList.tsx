import React, {
  useCallback,
  useEffect,
  //useState
} from 'react';
import {ScrollView, Text, View, Pressable} from 'react-native';

// import {config} from '../../config';
// import {TodoItem} from './TodoList.types';
import {styles} from './TodoList.styles';
import {Checkbox} from '../../components/Checkbox/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {selectTodos} from '../../store/selectors';
import {changeTodo, fetchTodos} from '../../store/actions';

export const TodoList = () => {
  // const [todos, setTodos] = useState<TodoItem[]>([]);
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const requestTodos = async () => {
    // try {
    //   const response = await fetch(config.todosUrl);
    //   const result = await response.json();

    //   setTodos(result);
    // } catch (e) {
    //   console.warn(e);
    // }
    dispatch(fetchTodos());
  };

  useEffect(() => {
    requestTodos();
  }, []);

  const handleComplete = useCallback(
    id => {
      const todoToChange = {...todos[id], completed: !todos[id].completed};
      dispatch(changeTodo(todoToChange));
      // setTodos(prevTodos =>
      //   prevTodos.map(todo =>
      //     todo.id !== id
      //       ? todo
      //       : {
      //           ...todo,
      //           completed: !todo.completed,
      //         },
      //   ),
      // );
    },
    [todos, dispatch],
  );

  return (
    <ScrollView contentContainerStyle={styles.todosContainer}>
      {Object.values(todos).map(todo => (
        <View key={`${todo.id}-${todo.title}`} style={styles.todoContainer}>
          <Checkbox
            id={todo.id}
            onPress={handleComplete}
            checked={todo.completed}
          />
          <Pressable onPress={() => handleComplete(todo.id)}>
            <Text
              style={[
                styles.todoText,
                todo.completed && styles.todoTextCrossed,
              ]}>
              {todo.title}
            </Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

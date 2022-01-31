import React, {
  useCallback,
  useEffect,
  //useState
} from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  ScrollView,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// import {config} from '../../config';
import {TodoItem} from './TodoList.types';
import {styles} from './TodoList.styles';
import {selectTodos} from '../../store/selectors';
import {changeTodo, deleteTodo, fetchTodos} from '../../store/actions';
import {TextField} from '../../components/TextField/TextField';
import {TodoElement} from '../../components/TodoElement/TodoElement';

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

  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      title: text,
      id: `todo-${Date.now()}`,
      completed: false,
    };
    dispatch(changeTodo(newTodo));
  };

  const removeTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const renderTodo = ({item}: ListRenderItemInfo<TodoItem>) => (
    <TodoElement todo={item} onSelect={handleComplete} onDelete={removeTodo} />
  );

  return (
    <View style={styles.todosContainer}>
      <FlatList
        ListHeaderComponent={() => <TextField onSubmit={addTodo} />}
        data={Object.values(todos).reverse()}
        renderItem={renderTodo}
      />
    </View>
  );
};

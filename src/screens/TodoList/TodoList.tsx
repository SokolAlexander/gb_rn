import React, {
  useCallback,
  useEffect,
  useMemo,
  //useState
} from 'react';
import {ListRenderItemInfo, SectionList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// import {config} from '../../config';
import {ListSection, TodoItem} from './TodoList.types';
import {styles} from './TodoList.styles';
import {selectTodos} from '../../store/selectors';
import {changeTodo, deleteTodo, fetchTodos} from '../../store/actions';
import {TextField} from '../../components/TextField/TextField';
import {TodoElement} from '../../components/TodoElement/TodoElement';

export const TodoList = () => {
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
    };
    dispatch(changeTodo(newTodo));
  }, []);

  const removeTodo = useCallback((id: string) => {
    dispatch(deleteTodo(id));
  }, []);

  const renderTodo = useCallback(
    ({item}: ListRenderItemInfo<TodoItem>) => (
      <TodoElement
        todo={item}
        onSelect={handleComplete}
        onDelete={removeTodo}
      />
    ),
    [handleComplete, removeTodo],
  );

  const renderSectionHeader = useCallback(({section}) => {
    return (
      <Text style={styles.sectionHeader}>
        {section.title}: {section.data.length}
      </Text>
    );
  }, []);

  return (
    <View style={styles.todosContainer}>
      <SectionList
        ListHeaderComponent={() => <TextField onSubmit={addTodo} />}
        sections={sections}
        renderItem={renderTodo}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

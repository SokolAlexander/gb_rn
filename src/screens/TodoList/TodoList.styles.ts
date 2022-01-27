import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  todosContainer: {
    padding: 16,
  },
  todoContainer: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
  },
  todoText: {
    flexShrink: 1,
    marginLeft: 16,
    lineHeight: 30,
    textTransform: 'capitalize',
  },
  todoTextCrossed: {
    textDecorationLine: 'line-through',
  },
});

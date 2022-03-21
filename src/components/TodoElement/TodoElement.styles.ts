import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingBottom: 10,
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
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});

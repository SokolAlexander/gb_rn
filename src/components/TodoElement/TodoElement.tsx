import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {Checkbox} from '../Checkbox/Checkbox';
import {TodoElementProps} from './TodoElement.types';
import {styles} from './TodoElement.styles';
import {DeleteButton} from '../DeleteButton/DeleteButton';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const maxOffset = -50;

export const TodoElement = ({
  todo,
  onSelect,
  onDelete,
  onPress,
}: TodoElementProps) => {
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value},
        // {translateY: offset.value.y},
        // {scale: withSpring(isPressed.value ? 1.2 : 1)},
      ],
    };
  });
  const start = useSharedValue(0);

  const animatedDeleteStyles = useAnimatedStyle(() => ({
    transform: [{scaleX: offset.value / maxOffset}],
  }));

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationX < -start.value && e.translationX > maxOffset) {
        offset.value = e.translationX + start.value;
      }
    })
    .onEnd(() => {
      start.value = offset.value;
      console.log(offset.value);
    });

  return (
    <Animated.View
      key={`${todo.id}-${todo.title}`}
      style={[styles.todoContainer, animatedStyles]}
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}>
      <Checkbox id={todo.id} onPress={onSelect} checked={todo.completed} />
      <Pressable style={styles.textContainer} onPress={() => onPress(todo.id)}>
        <Text
          style={[styles.todoText, todo.completed && styles.todoTextCrossed]}>
          {todo.title}
        </Text>
      </Pressable>
      <GestureDetector gesture={gesture}>
        <View style={{width: 20, height: 50, backgroundColor: 'red'}} />
      </GestureDetector>
      <Animated.View style={animatedDeleteStyles}>
        <DeleteButton id={todo.id} onPress={onDelete} />
      </Animated.View>
    </Animated.View>
  );
};

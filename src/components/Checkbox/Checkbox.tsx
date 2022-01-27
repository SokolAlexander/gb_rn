import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './Checkbox.styles';

import {CheckboxProps} from './Checkbox.types';

export const Checkbox = ({checked, onPress, id}: CheckboxProps) => {
  const handlePress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity style={styles.root} onPress={handlePress}>
      {checked && <View style={styles.inner} />}
    </TouchableOpacity>
  );
};

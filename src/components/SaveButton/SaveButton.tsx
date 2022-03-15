import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from './SaveButton.styles';
import {SaveButtonProps} from './SaveButton.types';

export const SaveButton = ({disabled, onPress}: SaveButtonProps) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[styles.saveBtn, disabled && styles.disabled]}>
    <Icon name="check" color="white" size={20} />
  </TouchableOpacity>
);

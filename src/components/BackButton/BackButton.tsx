import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from './BackButton.styles';
import {BackButtonProps} from './BackButton.types';

export const BackButton = ({onPress}: BackButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.root}>
    <Icon name="chevron-left" size={25} />
  </TouchableOpacity>
);

import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {styles} from './SmallImage.styles';
import {SmallImageProps} from './SmallImage.types';

export const SmallImage = ({asset, onPress}: SmallImageProps) => {
  const handlePress = () => {
    onPress(asset.uri as string);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={{uri: asset.uri}} style={styles.image} />
    </TouchableOpacity>
  );
};

import {Asset} from 'react-native-image-picker';

export type SmallImageProps = {
  asset: Asset;
  onPress: (uri: string) => void;
};

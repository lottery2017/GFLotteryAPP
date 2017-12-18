
import {
    Dimensions,
    PixelRatio,
} from 'react-native';

export const ScreenWidth = Dimensions.get('window').width; // 屏幕宽度

export const ScreenHeight = Dimensions.get('window').height; // 屏幕高度

export const ScreenScale = Dimensions.get('window').scale; // 屏幕scale

export const onePixel = 1 / PixelRatio.get(); // 一像素

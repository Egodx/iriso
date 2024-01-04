import { StyleSheet, Dimensions } from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.1);
const captureHeight = Math.floor(WINDOW_HEIGHT * 0.2);
const cameraIconSize = Math.floor(WINDOW_HEIGHT * 0.09);
const closeIcon = Math.floor(WINDOW_HEIGHT * 0.09);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff2222',
    opacity: 0.8,
    zIndex: 2,
  },
  control: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 38,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capture: {
    backgroundColor: '#f5f6f5',
    borderRadius: captureHeight / 3,
    height: captureHeight,
    width: captureHeight * 1.9,
    marginHorizontal: 31,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});

export default styles;
export { cameraIconSize, closeIcon };

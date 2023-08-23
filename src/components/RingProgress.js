import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, CircleProps } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RingProgress = ({ radius = 150, strokeWidth = 40, progress, color }) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  const fill = useSharedValue(0);

  fill.value = withTiming(progress, { duration: 1500 });

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference],
  }));

  const circleDefaultProps = {
    r: innerRadius,
    cx: radius,
    cy: radius,
    originX: radius,
    originY: radius,
    strokeWidth: strokeWidth,
    stroke: color, // Use the color prop here
    strokeLinecap: 'round',
    rotation: '-90',
  };

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: 'center',
      }}
    >
      <Svg>
        {/* Background */}
        <Circle {...circleDefaultProps} opacity={0.2} />
        {/* Foreground */}
        <AnimatedCircle animatedProps={animatedProps} {...circleDefaultProps} />
      </Svg>

      <AntDesign
        name="arrowright"
        size={strokeWidth * 0.8}
        color="black"
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: strokeWidth * 0.1,
        }}
      />
    </View>
  );
};

export default RingProgress;

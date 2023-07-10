import styled, { keyframes } from 'styled-components';

export const offset = 187;
export const duration = 1.4;

export const rotator = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`;

export const colors = keyframes`
  0% { stroke: #4285F4; }
  25% { stroke: #DE3E35; }
  50% { stroke: #F7C223; }
  75% { stroke: #1B9A59; }
  100% { stroke: #4285F4; }
`;

export const dash = keyframes`
 0% { stroke-dashoffset: ${offset}; }
 50% {
   stroke-dashoffset: ${offset / 4};
   transform: rotate(135deg);
 }
 100% {
   stroke-dashoffset: ${offset};
   transform: rotate(450deg);
 }
`;

export const Circle = styled.circle`
  stroke-dasharray: ${offset};
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${dash} ${duration}s ease-in-out infinite,
    ${colors} ${duration * 4}s ease-in-out infinite;
`;

export const Spinner = styled.svg`
  animation: ${rotator} ${duration}s linear infinite;
`;
import React, { useState } from 'react';
import Animated from 'animated/lib/targets/react-dom';
import SwipeableViews from 'react-swipeable-views';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import { Location } from '@reach/router';
import { navigate, withPrefix } from 'gatsby';
import { bindKeyboard } from 'react-swipeable-views-utils';
import styled from '@emotion/styled';

const KeyboardBoundSwipeableViews = styled(bindKeyboard(SwipeableViews))`
  @media (max-aspect-ratio: 1/1) {
    padding: calc((100vh - 80vw) * 0.5) 10vw;
  }

  @media (min-aspect-ratio: 1/1) {
    padding: 10vh calc((100vw - 80vh) * 0.5);
  }

  overflow-y: hidden;

  .react-swipeable-view-container {
    overflow-x: visible;
    overflow-y: visible;
    [data-swipeable='true'] {
      overflow-x: visible !important;
      overflow-y: visible !important;
    }
  }
`;

const AnimatedDiv = styled(Animated.div)`
  height: 80vh;
  width: 80vh;
  max-height: 80vw;
  max-width: 80vw;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const handleChangeIndex = (location, position) => index => {
  let pathname = location.pathname;
  let prefix = withPrefix('/');
  if (pathname.startsWith(prefix)) {
    pathname = pathname.substr(prefix.length);
  }
  navigate(`${pathname}/#${index}`);
  Animated.spring(position, { toValue: index }).start();
};

const handleSwitch = (position, setPosition) => index => {
  position.setValue(index);
  setPosition(position);
};

const handleKeyDown = (index, children) => event => {
  if (keycode(event) === 'enter') {
    console.log(children[index]);
    if (children[index].key.match(/^\//)) {
      navigate(children[index].key);
    } else {
      window.location = children[index].key;
    }
  }
};

const CoverFlow = ({ children }) => {
  const [position, setPosition] = useState(new Animated.Value(0));
  return (
    <Location>
      {({ location }) => {
        let index = Math.min(
          Math.max(
            0,
            isNaN(parseInt(location.hash.substring(1), 10))
              ? 0
              : parseInt(location.hash.substring(1))
          ),
          children.length
        );
        if (position._value !== index) {
          handleSwitch(position, setPosition)(index);
        }
        return (
          <EventListener
            target="window"
            onKeyDown={handleKeyDown(index, children)}
          >
            <KeyboardBoundSwipeableViews
              index={index}
              enableMouseEvents={true}
              onChangeIndex={handleChangeIndex(location, position)}
              onSwitching={handleSwitch(position, setPosition)}
            >
              {children.length < 1 ? (
                <></>
              ) : children.length === 1 ? (
                <AnimatedDiv
                  key="0"
                  style={Object.assign({
                    opacity: '1',
                    transform: [{ scale: 1 }, { translateX: '0%' }],
                    zIndex: 1,
                  })}
                >
                  {children[0]}
                </AnimatedDiv>
              ) : (
                children.map((child, currentIndex) => {
                  const inputRange = children.map((_, i) => i);
                  const scale = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => {
                      return currentIndex === i ? 1 : 0.7;
                    }),
                  });
                  const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => {
                      return currentIndex === i ? 1 : 0.3;
                    }),
                  });
                  const translateX = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => {
                      return (100 / 2) * (i - currentIndex);
                    }),
                  });
                  return (
                    <AnimatedDiv
                      key={String(currentIndex)}
                      style={Object.assign({
                        opacity,
                        transform: [{ scale }, { translateX }],
                        zIndex: index === currentIndex ? 1 : null,
                      })}
                    >
                      {child}
                    </AnimatedDiv>
                  );
                })
              )}
            </KeyboardBoundSwipeableViews>
          </EventListener>
        );
      }}
    </Location>
  );
};

export default CoverFlow;

export const CoverItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;

  overflow-y: hidden;
  overflow-x: hidden;

  font-family: sans-serif;
  font-size: 2vw;
  padding: 2vw;

  background: ${props => (props.colors && props.colors.cover) || '#663399'};

  h1 {
    font-size: 4vh;
    text-align: center;
    hyphens: auto;
  }

  a {
    color: ${props => (props.colors && props.colors.text) || '#fff'};
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                       supported by Chrome and Opera */
`;

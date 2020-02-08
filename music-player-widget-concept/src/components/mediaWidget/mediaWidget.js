import React, { useState, useEffect } from 'react'
import {useSpring, animated, config} from 'react-spring'
import _throttle from 'lodash/throttle'

import * as Vibrant from 'node-vibrant'

import Player from './player'
import styles from './MediaWidget.module.scss'

import songs from '../../json/tracks.json'

function MediaWidget() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const currentTrack = songs[currentTrackIndex]
  const [backgroundGradient, setbackgroundGradient] = useState()

  const [isHoldingDownPlay, setIsHoldingDownPlay] = useState(false)

  const defaultGradient = {
    background: "linear-gradient(#f2994a, #f2c94c)"
  }

  const [props, set, stop] = useSpring(() => ({background: "linear-gradient(#f2994a, #f2c94c)"}))

  const [rotateDirection, setRotationDirection] = useState('rotate3d(1, 0, 0, -15deg)')
  const rotateProps = useSpring(
    { 
      transform: isHoldingDownPlay ? `perspective(15cm) ${rotateDirection}` : 'perspective(15cm) rotate3d(0, 0, 0, 0deg)', 
      config: config.default
    },
  )

  useEffect(() => {
    if (!backgroundGradient) {
      updateBackgroundGradient()
    }      
  })

  const onNextTrack = () => {
    console.log((currentTrackIndex + 1), songs.length)
    if ((currentTrackIndex + 1) < songs.length) {
      setCurrentTrackIndex(currentTrackIndex+1)
      updateBackgroundGradient()
    }
  }

  const onPrevTrack = () => {
    console.log((currentTrackIndex - 1), songs.length)
    if ((currentTrackIndex - 1) >= 0) {
      setCurrentTrackIndex(currentTrackIndex-1)
      updateBackgroundGradient()
    }
  }

  // Get the pallete from the current track coverart  
  const updateBackgroundGradient = async () => {
    console.log('update background gradient')
    let palette = await Vibrant.from(currentTrack.coverart).getPalette()

    set({
      background: "linear-gradient(" + palette.Vibrant.getHex() + ", " + palette.DarkVibrant.getHex() +")"
    })
  }

  const onControlClickHandler = (state) => {
    if (state.button === 'play') {
      setRotationDirection('rotate3d(1, 0, 0, -15deg)')
    }

    if (state.button === 'next') {
      setRotationDirection('rotate3d(0, 1, 0, 15deg)')
    }

    if (state.button === 'prev') {
      setRotationDirection('rotate3d(0, 1, 0, -15deg)')
    }

    setIsHoldingDownPlay(state.type !== 'mousedown' ? false : true)
  } 

  const containerStyle = backgroundGradient ? backgroundGradient : defaultGradient

  console.log(containerStyle)

  return (
    <animated.div style={props} className={styles.container}>
      <animated.div style={rotateProps}>
          <Player 
            song={currentTrack} 
            songs={songs} 
            currentIndex={currentTrackIndex} 
            onControlClick={onControlClickHandler}
            onNextTrack={onNextTrack} 
            onPrevTrack={onPrevTrack} />
        </animated.div>
      </animated.div>
  )
}

export default MediaWidget
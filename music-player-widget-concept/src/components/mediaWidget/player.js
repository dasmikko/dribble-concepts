import React from 'react'
import {useTransition, animated} from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture' 

import PlayerStyles from './Player.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'


function Player (props) {
  console.log(props)

  console.log(props.songs[props.currentIndex])

  const transitions = useTransition(props.songs[props.currentIndex], item => item.coverart, {
    initial: { opacity: 1, transform: 'rotate(-360deg)' },
    from: { opacity: 0, transform: 'rotate(0deg)' },
    enter: { opacity: 1, transform: 'rotate(-360deg)' },
    leave: { opacity: 0, transform: 'rotate(0deg)'},
  })

  const onClickHandler = (e, controlItem) => {
    let mouseEvent = e.nativeEvent
    let type = mouseEvent.type
    let button = mouseEvent.button

    console.log(button)

    // Only listen for left click
    if (button === 0) {
      props.onControlClick({
        type: type,
        button: controlItem
      })
    }
  }

  return (
    <div 
      className={PlayerStyles.playerContainer} 
      onMouseLeave={(e) => onClickHandler(e, 'null')} 
      onTouchEnd={(e) => onClickHandler(e, 'null')}
      onMouseUp={(e) => onClickHandler(e, 'null')}
    >
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          className={PlayerStyles.coverart}
          style={{ ...props, backgroundImage: `url(${item.coverart}` }}
        />
      ))}
      
      <div className={PlayerStyles.songInfo}>
        <div className={PlayerStyles.artist}>{props.song.name}</div>
        <div>{props.song.artist}</div>
      </div>

      <div className={PlayerStyles.controls}>
        <div className={PlayerStyles.prev} onClick={props.onPrevTrack} onMouseDown={(e) => onClickHandler(e, 'prev')}>
          <FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPlay} />
        </div>

        <animated.div onMouseDown={(e) => onClickHandler(e, 'play')}>
          <FontAwesomeIcon icon={faPlay} />
        </animated.div>
        
        <div className={PlayerStyles.next} onClick={props.onNextTrack} onMouseDown={(e) => onClickHandler(e, 'next')}>
          <FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPlay} />
        </div>
      </div>
    </div>
  )
}

export default Player
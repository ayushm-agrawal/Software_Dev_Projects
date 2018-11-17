import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  render () {
    return <ReactPlayer url='https://www.youtube.com/watch?v=mLRjb6LdUFM' playing />
  }
}

export default VideoPlayer;
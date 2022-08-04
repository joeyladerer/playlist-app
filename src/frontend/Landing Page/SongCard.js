import { Box, Text, Image } from '@chakra-ui/react'
import React from 'react'
import style from './SongCard.module.css'

import heart from '../../assets/SongCard/heart.png'
import shuffle from '../../assets/SongCard/shuffle.png'
import backwardSkip from '../../assets/SongCard/backwardskip.png'
import pause from '../../assets/SongCard/pause.png'
import forwardSkip from '../../assets/SongCard/forwardskip.png'
import replay from '../../assets/SongCard/replay.png'

function SongCard ({
    width,
    song,
    artist,
    image,
    timeElapsed,
    timeRemaining,
    timeBarPosition
}) {
    // width was passed in according to a 1728 x 1117 screen
    const height = `${width * 1.5}px`
    const contentWidth = width*.83
    const songInfoTopMargin = width*.03
    const songNameTextSize = width*.05
    const artistNameTextSize = width*.025
    const timeBarTopMargin = width*.05
    const timeTextFontSize = width*.04
    const timeTextTopMargin = width*.03
    const controlsTopMargin = width*.03



    return (
            <Box className={style.Container} style={{"width": `${width}px`, "height": height}}>

                    <Image src={image} boxSize={`${contentWidth}px`} />

                    <Box className={style.SongInfoContainer} 
                        style={{"width": `${contentWidth}px`, "margin-top": `${songInfoTopMargin}px`}}>
                        <Box>
                            <Text style={{color: 'white', "font-size": `${songNameTextSize}px`}}>{song}</Text>
                            <Text style={{color: '#D9D9D9', "font-size": artistNameTextSize, "margin-top": '2px'}}>{artist}</Text>
                        </Box>
                        <Image src={heart} boxSize={`${width*.06}px`} />
                    </Box>

                    <Box className={style.TimeBarContainer} 
                        style={{"margin-top": `${timeBarTopMargin}px`}}>
                        <Box height={'1px'} width={`${contentWidth*timeBarPosition - 2}px`} background={'#C7C9F2'} />
                        <Box borderRadius={'full'} background={'#C7C9F2'} width={'4px'} height={'4px'} />
                        <Box height={'1px'} width={`${contentWidth*(1-timeBarPosition) - 2}px`} background={'white'} />
                    </Box>

                    <Box className={style.TimeTextContainer} 
                        style={{
                            "width": `${contentWidth}px`,
                            "font-size": `${timeTextFontSize}px`, 
                            "margin-top": `${timeTextTopMargin}px`
                            }}>
                        <Text>{timeElapsed}</Text>
                        <Text>{timeRemaining}</Text>
                    </Box>

                    <Box className={style.ControlsContainer} 
                        style={{"width": `${contentWidth}px`, "margin-top": `${controlsTopMargin}px`}}>
                        <Image src={shuffle} boxSize={`${contentWidth * .1}px`} />
                        <Image src={backwardSkip} boxSize={`${contentWidth * .1}px`} />
                        <Image src={pause} boxSize={`${contentWidth * .2}px`} />
                        <Image src={forwardSkip} boxSize={`${contentWidth * .1}px`} />
                        <Image src={replay} boxSize={`${contentWidth * .1}px`} />
                    </Box>
            </Box>
    )
}

export default SongCard
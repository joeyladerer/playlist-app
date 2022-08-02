import { Box, Button, flexbox } from "@chakra-ui/react";
import React, { useState } from "react";

function SongContainer(props) {

    // const song = songObj.song
    // console.log(props.song)

    const handleInc = () => {
        props.updateSong(props.song.songId, 1)
    }

    const handleDec = () => {
        props.updateSong(props.song.songId, -1)
    }

    return (
        <Box>
            <Box>{props.song.songName + '  '}</Box>
            <Button onClick={handleInc}>+</Button>
            <Box>{props.song.totalVotes}</Box>
            <Button onClick={handleDec}>-</Button>
        </Box>
    )
}

export default SongContainer
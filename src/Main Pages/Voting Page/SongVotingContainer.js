import { Box, Button } from "@chakra-ui/react";
import React from "react";


// display songs in the voting page
function SongVotingContainer(props) {

    // voting handlers, calls updateSong as a callback
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

export default SongVotingContainer
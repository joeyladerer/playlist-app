import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";


// display songs in the voting page
function SongVotingContainer(props) {
    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)

    // voting handlers, calls updateSong as a callback
    // 'action' is used to specify what the user is doing on the click (state dependent)
    // "REMOVE_UP": removing an existing upvote
    // "SWITCH_UP": removing a downvote and adding an upvote simultaneously
    // "ADD_UP": adding an upvote
    // the "DOWN" commands are the opposite of the "UP" commands
    const handleInc = () => {
        const action = upvote ? "REMOVE_UP" : downvote ? "SWITCH_UP" : "ADD_UP"
        setUpvote(!upvote)
        setDownvote(false)
        props.updateSong(props.song.songId, action)
    }
    const handleDec = () => {
        const action = downvote ? "REMOVE_DOWN" : upvote ? "SWITCH_DOWN" : "ADD_DOWN"
        setDownvote(!downvote)
        setUpvote(false)
        props.updateSong(props.song.songId, action)
    }

    return (
        <Box>
            <Box>{props.song.songName + '  '}</Box>
            <Button colorScheme={upvote ? 'green' : 'gray'} onClick={handleInc}>+</Button>
            <Box>{props.song.netVoteCount}</Box>
            <Button colorScheme={downvote ? 'red' : 'gray'} onClick={handleDec}>-</Button>
        </Box>
    )
}

export default SongVotingContainer
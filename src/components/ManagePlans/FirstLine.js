import React from 'react'
import { Text, Stack } from '@chakra-ui/react'
import { FaQuestionCircle } from "react-icons/fa";
const FirstLine = () => {
    return (
        
        <div>
            <Stack direction='row'>
                <Text fontSize='25px' as='b'>Rates and Availability / Rate Plans & Packages </Text><FaQuestionCircle />
            </Stack>
            <Text fontSize='9px' > You can create speacial rate plans and packages(such as discounted daily rates or service upsells)by clicking the NEW RATE PLAN button below.Rate plan and packages can be craeted for any time period or day of the week and with length of stay limitations,among other restrictions. </Text>
            <Text fontSize='10px' as='b' marginTop={2}> Where can I use these rate plans?</Text>
            <Stack direction='row'>
                <Text fontSize='10px'> -NEW! OTAs/ Distribution Channels</Text><FaQuestionCircle fontSize='10' />
            </Stack>
            <Text fontSize='10px'>-Reservations booked on your property's website (via the booking engine)</Text>
            <Text fontSize='10px'>-Manual reservations created in this system</Text>
            <Stack>
            </Stack>
            <Text fontSize='12px'>Rate plan form fields marked with can be sent to select OTAs/channels once rate are mapped and if supported by the channel.</Text>

            <Text fontSize='12px'>Click here to learn about channel rate plan mapping/syncing and which channels support this feature.</Text>
        </div>
    )
}

export default FirstLine
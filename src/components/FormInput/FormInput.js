import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/react'

import React from "react"

const FormInput = () => {
    const [input, setInput] = React.useState('')

    const handleInputChange = (e) => setInput(e.target.value)

    const isError = input === ''
    return (

        <FormControl isInvalid={isError} >
                <FormLabel fontSize={'xs'}>Name</FormLabel>
                    <Input type='text' size={'xs'} value={input} onChange={handleInputChange}  width="100%" />
                    {isError ? (
                        <FormErrorMessage>Name is required.</FormErrorMessage>
                    ) : ""}
        </FormControl>
    )
}

export default FormInput
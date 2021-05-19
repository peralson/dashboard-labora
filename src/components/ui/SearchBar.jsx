import React from 'react'
import { Box } from '@chakra-ui/layout'

const SearchBar = ({ placeholder, onChange }) => (
    <Box
        flex="1"
        bg='translucid'
        borderRadius='4px'
        pl={2}
    >
        <input placeholder={placeholder} onChange={onChange} style={inputStyle} />
    </Box>
);

const inputStyle = {
    background: 'transparent',
    height: '100%',
    width: '100%',
}

export default SearchBar

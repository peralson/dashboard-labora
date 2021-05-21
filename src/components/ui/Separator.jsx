import React from 'react'
import { Box } from '@chakra-ui/layout'

const Separator = ({ top, bottom}) => (
    <Box
        w={'100%'}
        borderBottomWidth={'1px'}
        borderColor={'translucid'}
        marginBottom={bottom}
        marginTop={top}
    />
);

export default Separator

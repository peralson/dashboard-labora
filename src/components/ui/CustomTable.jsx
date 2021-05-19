import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/layout'
import Separator from './Separator'

const CustomTable = ({ children, columns }) => (
    <Box bg='darkLight' borderRadius={4}>
        <Flex alignItems="center" p={2}>
            <Box flex="1"></Box>
            {columns.map((column, index) => (
                <Text key={index} flex="4" color="translucid">
                    {column.toUpperCase()}
                </Text>
            ))}
            <Box flex="8"></Box>
        </Flex>
        <Separator />
        {children}
    </Box>
)

export default CustomTable

import React, { useContext } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { SelectedItem } from '../../context/SelectedItemContext'
import CustomImg from './CustomImg'

const ApplicationItem = ({ application, index }) => {
    const { selectedItem, setSelectedItem } = useContext(SelectedItem)
    const isActive = selectedItem
        ? selectedItem.id === application.id
        : false

    return (
        <Box
            cursor={"pointer"}
            key={application.id}
            minW={'180px'}
            p={2}
            pt={3}
            bg="translucid"
            borderRadius={4}
            ml={index !== 0 && 2}
            border={isActive ? "1px solid white" : "1px solid transparent"}
            onClick={() => setSelectedItem(application)}
        >
            <Flex alignItems="center">
                <CustomImg
                    w={7}
                    h={7}
                    borderRadius={15}
                    border={"1px solid"}
                    borderColor={"darkLight"}
                    backgroundPosition={"center"}
                    backgroundRepeat={"no-repeat"}
                    backgroundSize={"cover"}
                    mr={2}
                    image={application.worker.workerData.images.main}
                    alt={application.worker.workerData.name}
                />
                <Box flex="1">
                    <Text fontSize="10" mb={2.5} color="primary" lineHeight=".5">
                        {application.offerName.toUpperCase()}
                    </Text>
                    <Text fontSize="14px" lineHeight=".5">
                        {application.worker.workerData.name}
                    </Text>
                </Box>
            </Flex>
            {application.tags.length > 0 && (
                <Flex mt={4}>
                    {application.tags.map((tag, index) => (
                        <Text
                            key={index}
                            fontSize={14}
                            color={"white"}
                            bg={"darkLight"}
                            p={"4px 6px"}
                            borderRadius={4}
                            lineHeight={1}
                            ml={index !== 0 && 1}
                        >
                            #{tag}
                        </Text>
                    ))}
                </Flex>
            )}
        </Box>
    )
}

export default ApplicationItem

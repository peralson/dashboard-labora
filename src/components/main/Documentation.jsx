import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/layout'

const Documentation = ({ content }) => {
	const [open, setOpen] = useState(false)
	return (
		<Flex
			alignItems={"center"}
			p="8px 16px"
			w={"100%"}
			mb={3}
			borderRadius={8}
			borderColor="darkLight"
			borderWidth={2}
		>
			<Text flex={1} color="white">
				¿Qué puedo hacer aquí?
			</Text>
			<Text
				onClick={() => setOpen(!open)}
				_hover={{ background: "translucid" }}
				bg={open && "translucid"}
				borderRadius={10}
				p={1}
				cursor="pointer"
				color="primary"
			>
				Ver
			</Text>
		</Flex>
	)
}

export default Documentation

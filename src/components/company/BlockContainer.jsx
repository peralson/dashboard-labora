import React from "react";
import { Text, Flex, Box, Grid } from "@chakra-ui/react";

const BlockContainer = ({ title, desc, children, cta, onClick, ...rest }) => (
  <Box px={5} {...rest}>
    <Flex mb={2} alignItems={"center"} justifyContent={"space-between"}>
      <Text fontWeight={"bold"}>{title}</Text>
      {cta && onClick && (
        <Text
          onClick={onClick}
          fontSize={14}
          cursor={"pointer"}
          borderRadius={8}
          color={"primary"}
          py={1}
          px={2}
          _hover={{ bg: "darkLight" }}
        >
          {cta}
        </Text>
      )}
    </Flex>
    <Text fontSize={14} fontStyle={"italic"} color={"grey.dark"}>
      {desc}
    </Text>
    {children && (
      <Grid mt={4} templateColumns={`repeat(${children.length}, 1fr)`} gap={4}>
        {children}
      </Grid>
    )}
  </Box>
);

export default BlockContainer;

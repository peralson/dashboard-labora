import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";

// Components
import CustomImg from "../ui/CustomImg";

const AdminItem = ({ admin, ...rest }) => (
  <Flex
    width={"100%"}
    alignItems={"center"}
    bg={"darkLight"}
    {...rest}
    py={2}
    px={4}
    borderRadius={8}
    borderWidth={1}
    borderColor={"translucid"}
  >
    <CustomImg image={admin.photo} w={"30px"} borderRadius={"50%"} />
    <Box ml={5} flex={1}>
      <Text fontWeight={"bold"}>{admin.name}</Text>
      <Text fontSize={14} color={"grey.dark"} fontStyle={"italic"}>
        {admin.mail}
      </Text>
    </Box>
  </Flex>
);

export default AdminItem;

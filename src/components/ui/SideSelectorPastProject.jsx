import React, { useContext } from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

// Custom
import {
  SelectedItemManage,
  SelectedManageSide,
} from '../../context/SelectedItemContext';

const SideSelectorPastProject = ({ title, desc, image, data, ...rest }) => {
  const { selectedItemManage, setSelectedItemManage } =
    useContext(SelectedItemManage);
  const { setSelectedManageSide } = useContext(SelectedManageSide);
  const isActive = selectedItemManage === title

  return (
    <Flex
      _hover={{ borderColor: "white" }}
      py={3}
      px={4}
      cursor={"pointer"}
      bg={"darkLight"}
      w={"100%"}
      borderRadius={10}
      borderWidth={1}
      borderColor={isActive ? "white" : "translucid"}
      onClick={() => {
        if (isActive) {
          setSelectedItemManage(null);
          setSelectedManageSide(null);
        } else {
          setSelectedItemManage(data);
          setSelectedManageSide(title);
        }
      }}
      {...rest}
    >
      <Image src={image} w={"21px"} mr={3} />
      <Box>
        <Text fontSize={14} fontWeight={"bold"}>
          {title}
        </Text>
        {desc && <Text fontSize={12} mt={1}>
          {desc}
        </Text>}
      </Box>
    </Flex>
  );
};
export default SideSelectorPastProject;

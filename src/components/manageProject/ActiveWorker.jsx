import React, { useState } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

// SVG
import closeIcon from "../../assets/svg/close.svg";
import openIcon from "../../assets/svg/open.svg";

// Components
import CustomImg from "../ui/CustomImg";

const ActiveWorker = ({ job }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      py={2}
      px={3}
      borderRadius={10}
      borderWidth={1}
      borderColor={"darkLight"}
      mb={2}
    >
      <Flex alignItems={"center"} onClick={() => setOpen(!open)}>
        <CustomImg
          image={job.image}
          alt={job.name}
          borderRadius={"50%"}
          w={"40px"}
        />
        <Box mx={4} flex={1}>
          <Text fontSize={12} color={"primary"}>
            {job.offer}
          </Text>
          <Text fontSize={14}>{job.name}</Text>
        </Box>
        <Image src={!open ? openIcon : closeIcon} w={2} />
      </Flex>
    </Box>
  );
};

export default ActiveWorker;

import React from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

// SVG
import phone from "../../assets/svg/phone.svg";

// Components
import CustomImg from "../ui/CustomImg";

const InActiveWorker = ({ job }) => (
  <Box
    py={2}
    px={3}
    borderRadius={10}
    borderWidth={1}
    borderColor={"darkLight"}
    mb={2}
  >
    <Flex>
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
      <Box my={"auto"} as={"a"} href={`tel:${job.phoneNumber}`}>
        <Image src={phone} w={"20px"} />
      </Box>
    </Flex>
  </Box>
);

export default InActiveWorker;

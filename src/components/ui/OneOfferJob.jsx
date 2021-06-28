import React, { useContext } from "react";
import { Flex, Text } from "@chakra-ui/layout";

// Context
import {
  SelectedItemManage,
  SelectedManageSide,
} from '../../context/SelectedItemContext';

// Components
import CustomImg from './CustomImg'

const OneOfferJob = ({ job }) => {
  const { selectedItemManage, setSelectedItemManage } =
    useContext(SelectedItemManage);
  const { setSelectedManageSide } = useContext(SelectedManageSide);

  const isActive = selectedItemManage && selectedItemManage.id === job.id;

  return (
    <Flex
      _hover={{ borderColor: "white" }}
      cursor={"pointer"}
      borderWidth={1}
      bg={"darkLight"}
      borderColor={isActive ? "white" : "translucid"}
      borderRadius={20}
      w={"100%"}
      p={4}
      flexDirection={"column"}
      alignItems={"center"}
      onClick={() => {
        if (isActive) {
          setSelectedItemManage(null);
          setSelectedManageSide(null);
        } else {
          setSelectedItemManage(job);
          setSelectedManageSide("Job");
        }
      }}
    >
      <CustomImg
        image={job.worker.workerData.images.main}
        borderRadius={50}
        borderWidth={2}
        borderColor={"translucid"}
        alt={job.worker.workerData.name}
        maxH={"64px"}
        maxW={"64px"}
      />
      <Text textAlign={"center"} mt={3} fontSize={16} fontWeight={"bold"}>
        {job.worker.workerData.name}
      </Text>
      {job.worker.tags.length !== 0 && (
        <Flex flexWrap={"wrap"} mt={1} alignItems={"center"}>
          {job.worker.tags.map((tag, index) => (
            <Text
              key={index}
              mt={1}
              mr={1}
              fontSize={12}
              color={"primary"}
              bg={"dark"}
              p={1}
              borderRadius={4}
            >
              #{tag}
            </Text>
          ))}
        </Flex>
      )}
      <Text
        py={1}
        lineHeight={2}
        fontSize={12}
        textAlign={"center"}
        color={"primary"}
      >
        Ver más
      </Text>
    </Flex>
  );
};

export default OneOfferJob;

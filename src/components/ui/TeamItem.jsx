import React, { useState } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

// SVG
import closeIcon from "../../assets/svg/close.svg";
import openIcon from "../../assets/svg/open.svg";
import correct from "../../assets/svg/correct.svg";
import eye from "../../assets/svg/eye.svg";

// Components
import CustomImg from "./CustomImg";
import SideTitle from "./SideTitle";
import FlexText from "./FlexText";
import Separator from "./Separator";
import DeleteButton from "./DeleteButton";

const TeamItem = ({ index, member }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      mb={index !== 0 && 2}
      py={3}
      px={4}
      borderWidth={1}
      borderRadius={20}
      borderColor={"darkLight"}
    >
      <Flex alignItems={"center"}>
        <CustomImg
          image={member.workerData.images.main}
          alt={member.workerData.name}
          w={"40px"}
          h={"40px"}
          borderRadius={"50%"}
        />
        <Box flex={1} ml={4}>
          <Text mb={1} fontWeight={"bold"}>
            {member.workerData.name}
          </Text>
          <Flex>
            {member.tags.map((tag, index) => (
              <Text
                key={index}
                ml={index !== 0 && 1}
                px={1}
                py={0.5}
                fontSize={12}
                borderRadius={4}
                bg={"darkLight"}
                color={"primary"}
              >
                #{tag}
              </Text>
            ))}
          </Flex>
        </Box>
        <Image
          p={1}
          ml={2}
          src={isOpen ? closeIcon : openIcon}
          alt={"toggler"}
          cursor={"pointer"}
          onClick={() => setIsOpen(!isOpen)}
          w={4}
        />
      </Flex>
      {isOpen && (
        <Box mt={4}>
          <SideTitle mt={2}>Legal</SideTitle>
          <Box mb={4}>
            <FlexText
              left={"Alta en SS"}
              right={<Image src={correct} w={"12px"} />}
            />
            <Separator top={1} bottom={1} />
            <FlexText
              left={"Contrato firmado"}
              right={<Image src={correct} w={"12px"} />}
            />
          </Box>
          <Box
            as={"a"}
            target={"_blank"}
            href={`https://us-central1-partime-60670.cloudfunctions.net/api/contract/${member.id}?type=job`}
          >
            <Flex
              py={2}
              borderRadius={10}
              bg={"darkLight"}
              alignItems={"center"}
              w={"100%"}
              justifyContent={"center"}
            >
              <Text color={"primary"} mr={2} fontSize={14}>
                Ver contrato
              </Text>
              <Image src={eye} w={"14px"} />
            </Flex>
          </Box>
          <Flex mt={2} justifyContent={"center"}>
            <DeleteButton noHover onDelete={() => {}} type={"al miembro"} fontSize={12}> 
              Expulsar del equipo
            </DeleteButton>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default TeamItem;

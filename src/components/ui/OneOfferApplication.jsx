import React, { useState, useContext } from "react";
import { Flex, Text } from "@chakra-ui/layout";

// Custom
import { SelectedItemIndie } from "../../context/SelectedItemContext";
import { connect } from 'react-redux'
import { handleApplication } from '../../store/actions/applications'

// Components
import CustomImg from './CustomImg'

const OneOfferApplication = ({ application, handleApplication }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {
    selectedItemIndie,
    setSelectedItemIndie
  } = useContext(SelectedItemIndie);

  const isActive = selectedItemIndie && selectedItemIndie.id === application.id;

  console.log(application);
  console.log(error);

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
      onClick={() =>
        isActive
          ? setSelectedItemIndie(null)
          : setSelectedItemIndie(application)
      }
    >
      <CustomImg
        image={application.worker.workerData.images.main}
        borderRadius={50}
        borderWidth={2}
        borderColor={"translucid"}
        alt={application.worker.workerData.name}
        maxH={"52px"}
        maxW={"52px"}
      />
      <Text textAlign={"center"} mt={2} fontSize={16} fontWeight={"bold"}>
        {application.worker.workerData.name}
      </Text>
      {application.worker.tags.length !== 0 && (
        <Flex flexWrap={"wrap"} mt={1} alignItems={"center"} justifyContent={"center"}> 
          {application.worker.tags.map((tag, index) => (
            <Text
              key={index}
              mt={2}
              mr={1}
              fontSize={12}
              color={"primary"}
              bg={"primaryLight"}
              px={1}
              py={0.5}
              borderRadius={4}
            >
              #{tag}
            </Text>
          ))}
        </Flex>
      )}
      <Text
        w={"100%"}
        mt={4}
        borderRadius={10}
        bg={"translucid"}
        py={1}
        lineHeight={2}
        fontSize={14}
        textAlign={"center"}
        cursor={"pointer"}
        fontWeight={"bold"}
        color={"white"}
        onClick={() => {
          setLoading(true)
          handleApplication(application.id_event, application.id_offer, application.id, "accept")
            .then(() => setSelectedItemIndie(null))
            .catch(() => setError("aceptar"))
            .finally(() => setLoading(false))
        }}
      >
        {loading ? "Aceptando..." : "Aceptar"}
      </Text>
      <Text
        mt={1}
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

const mapDispatchToProps = {
  handleApplication
}

export default connect(null, mapDispatchToProps)(OneOfferApplication);

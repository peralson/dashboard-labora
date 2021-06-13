import React, { useState, useEffect, useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Custom
import {
  SelectedItemManage,
  SelectedManageSide,
} from '../../../context/SelectedItemContext';
import { getTotalCost } from '../../../lib/getTotalCost'
import { formattedSalary } from '../../../lib/formattedSalary'
import moment from "moment";
import "moment/locale/es";

// Redux & Actions
import { connect } from 'react-redux';
import { fetchPastProjects } from '../../../store/actions/projects';

const PastProjectCard = ({ data }) => {
  const { selectedItemManage, setSelectedItemManage } =
    useContext(SelectedItemManage);
  const { setSelectedManageSide } = useContext(SelectedManageSide);
  const isActive = selectedItemManage
    ? selectedItemManage.id === data.id
    : false;

  return (
    <Flex
      cursor={"pointer"}
      borderRadius={8}
      py={2}
      px={3}
      mt={2}
      alignItems={"center"}
      border={"1px solid"}
      borderColor={isActive ? "white" : "darkLight"}
      _hover={{ borderColor: "white" }}
      onClick={() => {
        if (isActive) {
          setSelectedItemManage(null);
          setSelectedManageSide(null);
        } else {
          setSelectedItemManage(data);
          setSelectedManageSide("projects");
        }
      }}
    >
      <Text flex={2} fontSize={12} mr={2}>
        {data.projectData.name
          ? data.projectData.name
          : data.projectOffers[0].offerData.name
          ? data.projectOffers[0].offerData.name
          : "Sin nombre"}
      </Text>
      <Text flex={3} fontSize={12} mr={2}>
        {data.projectData.location.address}
      </Text>
      <Text ml={2} flex={1} fontSize={12} mr={2}>
        {data.projectOffers.length}
      </Text>
      <Text flex={1} fontSize={12} mr={2}>
        {formattedSalary(getTotalCost(data.projectOffers)) + ' €'}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.projectData.dates[0]._seconds ===
        data.projectData.dates[data.projectData.dates.length - 1]._seconds
          ? moment(data.projectData.dates[0]._seconds * 1000).format("D MMMM")
          : `${moment(data.projectData.dates[0]._seconds * 1000).format(
              "D MMMM",
            )} - ${moment(
              data.projectData.dates[data.projectData.dates.length - 1]
                ._seconds * 1000,
            ).format("D MMMM")}`}
      </Text>
      <Flex flex={1}>
        <Box
          w={"30px"}
          h={"30px"}
          borderRadius={1000}
          border={"2px solid"}
          borderColor="darkLight"
          bg={data.status === "finished" ? "green" : "yellow"}
        ></Box>
      </Flex>
    </Flex>
  );
};

const ManageProjects = ({ search, pastProjects, fetchPastProjects }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (pastProjects.length === 0) {
        setLoading(true)
      }
      setError(null);
      try {
        await fetchPastProjects();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPastProjects = pastProjects && pastProjects.filter(
    (project) =>
      project.projectData.name.toLowerCase().includes(search) ||
      project.projectData.location.address.toLowerCase().includes(search) ||
      project.projectOffers.some((offer) =>
        offer.offerData.name.toLowerCase().includes(search)
      ) ||
      project.projectOffers.some((offer) =>
        offer.offerData.category.toLowerCase().includes(search)
      )
  );

  return (
    loading ? (
      <Text textAlign={"center"} py={10}>
        Cargando...
      </Text>
    ) : error ? (
      <Text textAlign={"center"} py={10}>
        Ha ocurrido un error
      </Text>
    ) : (
      <Flex w="100%" flexDirection="column">
        {pastProjects && filteredPastProjects.map((item, index) => (
          <PastProjectCard key={index} data={item} />
        ))}
      </Flex>
    )
  );
};

const mapDispatchToProps = {
  fetchPastProjects,
};

const mapStateToProps = (state) => {
  return {
    pastProjects: state.projects.pastProjects,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjects);

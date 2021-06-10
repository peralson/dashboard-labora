import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/layout";

// Components
import ErrorMessage from "./ErrorMessage";

const TeamSide = ({ id, type, totalMembers }) => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // (() => {
    fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/job/${type}/${id}`,
      { headers: { "Content-Type": "application/json" } },
    )
      .then((blob) => blob.json())
      .then((data) => setTeam(data.body))
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setLoading(false));
    // })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {loading ? (
        <Text>Cargando equipo...</Text>
      ) : (
        <Box>
          {error && (
            <ErrorMessage
              noMargin
              title={"Ha ocurrido un error al intentar encontrar al equipo"}
              onClose={() => setError(null)}
            />
          )}
          <Text mt={error && 3} fontSize={19} color={"primary"}>
            Tu equipo
          </Text>
          <Text fontSize={24} fontWeight={"bold"}>
            {totalMembers === 1 ? "Un miembro" : `${totalMembers} miembros`}
          </Text>
          {team.map((member, index) => (
            <Text key={index}>{member.workerData.name}</Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TeamSide;

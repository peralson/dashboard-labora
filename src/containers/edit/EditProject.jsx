import React, { useState, useReducer } from "react";
import { Grid } from "@chakra-ui/layout";

// Custom
import { connect } from "react-redux";

// SVG
import back from "../../assets/svg/back.svg";
import edit from "../../assets/svg/edit.svg";

// Components
import Main from "../../components/main/Main";
import TopMain from "../../components/main/TopMain";
import Side from "../../components/main/Side";
import SideSticky from "../../components/main/SideSticky";
import SideBoxContainer from "../../components/ui/SideBoxContainer";
import NewTopHeaderBar from "../../components/new/NewTopHeaderBar";
import TopButton from "../../components/ui/TopButton";
import CustomInput from "../../components/new/CustomInput";

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };

    case "setDesc":
      return { ...state, description: action.payload };

    default:
      return state;
  }
};

const EditProject = ({ match, history, projects }) => {
  const { id } = match.params;
  const project = projects.find((p) => p.id === id);

  const [state, dispatch] = useReducer(reducer, {
    name: project.projectData.name,
    description: project.projectData.description,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <>
      <Main>
        <TopMain>
          <NewTopHeaderBar
            leftButton={
              <TopButton
                left
                icon={back}
                onSelect={() => history.push(`/ofertas/p/${id}`)}
              >
                Volver
              </TopButton>
            }
            rightButton={
              <TopButton right icon={edit} onSelect={onSubmit}>
                {isLoading ? "Guardando..." : "Guardar"}
              </TopButton>
            }
          >
            {isLoading ? "Editando..." : "Editar proyecto"}
          </NewTopHeaderBar>
        </TopMain>
        <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
          <CustomInput
            title={"Nombre"}
            value={state.name}
            placeholder={"Nombre de la oferta"}
            onChange={(e) =>
              dispatch({ type: "setName", payload: e.target.value })
            }
          />
          <CustomInput
            multiline
            optional
            title="Descripción"
            value={state.description}
            onChange={(e) =>
              dispatch({ type: "setDesc", payload: e.target.value })
            }
          />
        </Grid>
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer></SideBoxContainer>
        </SideSticky>
      </Side>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.allProjects,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);

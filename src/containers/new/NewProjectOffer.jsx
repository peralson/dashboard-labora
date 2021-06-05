import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { createProjectOffer } from "../../store/actions/projects";

// Custom
import { NewProjectOfferContext } from "../../context/newCreations";
import {
  initialState,
  reducer,
  validateNameDescCat,
  validateSchedule,
} from "../../lib/forms/newProjectOfferState";

// SVG
import next from "../../assets/svg/next.svg";
import back from "../../assets/svg/back.svg";

// Containers
import NameDescCat from "../innerContainers/new/projectOffer/NameDescCat";
import SchedulePicker from "../innerContainers/new/projectOffer/SchedulePicker";

// Validation
import NameDescCatValidation from "../../components/new/projectOffer/NameDesCatValidation";
import ScheduleValidation from "../../components/new/projectOffer/ScheduleValidation";

// Components
import Main from "../../components/main/Main";
import TopMain from "../../components/main/TopMain";
import Side from "../../components/main/Side";
import SideSticky from "../../components/main/SideSticky";
import NewTopHeaderBar from "../../components/new/NewTopHeaderBar";
import TopButton from "../../components/ui/TopButton";
import SideBoxContainer from "../../components/ui/SideBoxContainer";

const NewProjectOffer = ({ match, history, createProject }) => {
  const projectId = match.params.id;

  const [process, setProcess] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isNameDescCatValid } = validateNameDescCat(state);
  const { isScheduleValid } = validateSchedule(state);

  return (
    <NewProjectOfferContext.Provider value={{ state, dispatch }}>
      <Main>
        <TopMain>
          <NewTopHeaderBar
            leftButton={
              process === 1 ? (
                <Link to={`/ofertas/p/${projectId}`}>
                  <TopButton danger onClick={() => setProcess(1)}>
                    Cancelar
                  </TopButton>
                </Link>
              ) : (
                <TopButton
                  left
                  icon={back}
                  onSelect={() => setProcess((state) => state - 1)}
                >
                  Volver
                </TopButton>
              )
            }
            rightButton={
              process === 1 ? (
                <TopButton
                  right
                  inactive={!isNameDescCatValid}
                  icon={next}
                  onSelect={() => isNameDescCatValid && setProcess(2)}
                >
                  Siguiente
                </TopButton>
              ) : process === 2 ? (
                <TopButton
                  right
                  inactive={!isScheduleValid}
                  icon={next}
                  onSelect={() => isScheduleValid && setProcess(3)}
                >
                  Siguiente
                </TopButton>
              ) : null
            }
          >
            Nueva Oferta
          </NewTopHeaderBar>
        </TopMain>
        {process === 1 && <NameDescCat />}
        {process === 2 && <SchedulePicker projectId={projectId} />}
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer>
            {process === 1 && <NameDescCatValidation />}
            {process === 2 && <ScheduleValidation />}
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </NewProjectOfferContext.Provider>
  );
};

const mapDispatchToProps = {
  createProjectOffer,
};

export default connect(null, mapDispatchToProps)(NewProjectOffer);
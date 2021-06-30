import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { createOfferSingle } from '../../store/actions/projects'

// Custom
import { NewOfferContext } from "../../context/newCreations";
import {
  initialState,
  reducer,
  validateNameDescCatDates,
  validateSchedule,
  validateLegalPayrolls,
  validateQtyTags,
  validateForm
} from "../../lib/forms/newOfferState";

// SVG
import next from "../../assets/svg/next.svg";
import back from "../../assets/svg/back.svg";

// InnerContainers
import NameDescCatDates from "../innerContainers/new/offer/NameDescCatDates";
import OfferSchedulePicker from "../innerContainers/new/offer/OfferSchedulePicker"
import OfferLegalPayrolls from "../innerContainers/new/offer/OfferLegalPayrolls"
import OfferQtyTags from "../innerContainers/new/offer/OfferQtyTags"

// Validations
import NameDescCatDatesValidation from '../../components/new/offer/NameDescCatDatesValidation'
import OfferScheduleValidation from '../../components/new/offer/OfferScheduleValidation'
import OfferLegalPayrollsValidation from '../../components/new/offer/OfferLegalPayrollsValidation'
import OfferQtyTagsValidation from '../../components/new/offer/OfferQtyTagsValidation'

// Components
import Main from "../../components/main/Main";
import TopMain from "../../components/main/TopMain";
import NewTopHeaderBar from "../../components/new/NewTopHeaderBar";
import Side from "../../components/main/Side";
import TopButton from "../../components/ui/TopButton";
import SideSticky from "../../components/main/SideSticky";
import SideBoxContainer from "../../components/ui/SideBoxContainer";
import ErrorMessage from "../../components/ui/ErrorMessage";

const NewOffer = ({ createOfferSingle, history }) => {
  const [process, setProcess] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isNameDescCatDatesValid } = validateNameDescCatDates(state);
  const { isScheduleValid } = validateSchedule(state);
  const { isLegalPayrollValid } = validateLegalPayrolls(state);
  const { isQtyTagsValid } = validateQtyTags(state);
  const isValid = validateForm(state);

  const handleCreate = async () => {
    if (isQtyTagsValid && isValid) {
      setError(null);
      setLoading(true);
      try {
        await createOfferSingle(state);
        history.push(`../../../../`);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <NewOfferContext.Provider value={{ state, dispatch }}>
      <Main>
        <TopMain>
          <NewTopHeaderBar
            leftButton={
              process === 1 ? (
                <Link to={`/`}>
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
                  inactive={!isNameDescCatDatesValid}
                  icon={next}
                  onSelect={() => isNameDescCatDatesValid && setProcess(2)}
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
              ) : process === 3 ? (
                <TopButton
                  right
                  inactive={!isLegalPayrollValid}
                  icon={next}
                  onSelect={() => isLegalPayrollValid && setProcess(4)}
                >
                  Siguiente
                </TopButton>
              ) : (
                <TopButton
                  inactive={!isQtyTagsValid && isValid}
                  onSelect={handleCreate}
                >
                  Crear
                </TopButton>
              )
            }
          >
            {loading ? "Creando oferta..." : "Nueva Oferta"}
          </NewTopHeaderBar>
        </TopMain>
        {error && (
          <ErrorMessage
            onClose={() => setError(null)}
            title="Oh! Vaya... algo salió mal"
            secondary="Ha habido un problema creando la oferta. Inténtalo más tarde."
          />
        )}
        {process === 1 && <NameDescCatDates />}
        {process === 2 && <OfferSchedulePicker />}
        {process === 3 && <OfferLegalPayrolls />}
        {process === 4 && <OfferQtyTags />}
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer>
            {process === 1 && <NameDescCatDatesValidation />}
            {process === 2 && <OfferScheduleValidation />}
            {process === 3 && <OfferLegalPayrollsValidation />}
            {process === 4 && <OfferQtyTagsValidation />}
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </NewOfferContext.Provider>
  );
};

const mapDispatchToProps = {
  createOfferSingle
}

export default connect(null, mapDispatchToProps)(NewOffer);

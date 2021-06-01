import React from "react";
import { Link } from "react-router-dom";

// svg
import next from "../../assets/svg/next.svg";

// Components
import Main from "../../components/main/Main";
import TopMain from "../../components/main/TopMain";
import NewTopHeaderBar from "../../components/new/NewTopHeaderBar";
import Side from "../../components/main/Side";
import TopButton from "../../components/ui/TopButton";
import SideSticky from "../../components/main/SideSticky";
import SideBoxContainer from "../../components/ui/SideBoxContainer";

const NewOffer = () => {
  return (
    <>
      <Main>
        <TopMain>
          <NewTopHeaderBar
            leftButton={
              <Link to={`../../`}>
                <TopButton danger onClick={() => {}}>
                  Cancelar
                </TopButton>
              </Link>
            }
            rightButton={
              <TopButton right inactive={true} icon={next}>
                Siguiente
              </TopButton>
            }
          >
            Nueva Oferta
          </NewTopHeaderBar>
        </TopMain>
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer></SideBoxContainer>
        </SideSticky>
      </Side>
    </>
  );
};

export default NewOffer;

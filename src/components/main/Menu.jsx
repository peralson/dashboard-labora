import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import MenuItem from '../ui/MenuItem';

// Img
import Logo from '../../assets/img/Logo.png';
import offersActive from '../../assets/svg/offers-active.svg'
import offers from '../../assets/svg/offers.svg'
import people from '../../assets/svg/people.svg'
import peopleActive from '../../assets/svg/people-active.svg'
import settings from '../../assets/svg/settings.svg'
import settingsActive from '../../assets/svg/settings-active.svg'

const Menu = () => {
  const currentLocation = useLocation();
  const isHere = pathname => currentLocation.pathname.includes(pathname);

  return (
    <Flex flexDirection="column" alignItems="center" height="100vh">
      <Box position="fixed">
        <Box mb={5} mt={5}>
          <Link to="/">
            <img src={Logo} alt="Logo de Labora" width="110px" />
          </Link>
        </Box>
        <Link to="/ofertas">
          <MenuItem
            text="Ofertas"
            image={offers}
            activeImage={isHere('ofertas') || currentLocation.pathname === '/' ? offersActive : null}
            top
          />
        </Link>
        <Link to="/trabajadores">
            <MenuItem
              text="Trabajadores"
              image={people}
              activeImage={isHere('trabajadores') ? peopleActive : null}
            />
        </Link>
        <Link to="/gestion">
            <MenuItem
              text="Gestión"
              image={settings}
              activeImage={isHere('gestion') ? settingsActive : null}
            />
        </Link>
        <Link to="/empresa">
          <MenuItem
            text="Empresa"
            image={settings}
            activeImage={isHere('empresa') ? settingsActive : null}
          />
        </Link>
      </Box>
    </Flex>
  );
};

export default Menu;

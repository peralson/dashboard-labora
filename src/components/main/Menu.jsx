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
import settings from '../../assets/svg/settings.svg'

const Menu = () => {
  const currentLocation = useLocation();
  const isHere = pathname => currentLocation.pathname.includes(pathname);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex position="fixed" flexDirection="column" height="92%">
        <Box flex="1">
          <Box mb={5} p="8px 0px">
            <Link to="/">
              <img src={Logo} alt="Logo de Labora" width="120px" />
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
                activeImage={isHere('trabajadores') ? people : null}
              />
          </Link>
          <Link to="/gestion">
              <MenuItem
                text="Gestión"
                image={settings}
                activeImage={isHere('gestion') ? settings : null}
              />
          </Link>
        </Box>
        <Link to="/empresa">
              <MenuItem
                text="Empresa"
                image={settings}
                activeImage={isHere('empresa') ? settings : null}
              />
          </Link>
      </Flex>
    </Flex>
  );
};

export default Menu;

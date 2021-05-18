import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import MenuItem from '../ui/MenuItem';
import offersActive from '../../assets/svg/offers-active.svg'
import offers from '../../assets/svg/offers.svg'
import people from '../../assets/svg/people.svg'
import settings from '../../assets/svg/settings.svg'

const Menu = () => {
  const currentLocation = useLocation();
  const isHere = pathname => currentLocation.pathname.includes(pathname);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Box position="fixed">
        <Link to="/ofertas">
          <MenuItem
            text="Ofertas"
            image={offers}
            activeImage={isHere('ofertas') ? offersActive : null}
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
        <Link to="/empresa">
            <MenuItem
              text="Empresa"
              image={settings}
              activeImage={isHere('empresa') ? settings : null}
            />
        </Link>
      </Box>
    </Flex>
  );
};

export default Menu;

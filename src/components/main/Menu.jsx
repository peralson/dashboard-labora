import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, GridItem } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import MenuItem from '../ui/MenuItem';

const Menu = () => {
  const currentLocation = useLocation();
  const isHere = pathname => currentLocation.pathname.includes(pathname);

  return (
    <GridItem colSpan="3">
      <Flex flexDirection="column" alignItems="center">
        <Link to="/ofertas">
          <MenuItem text="Ofertas" image="" activeImage={isHere("ofertas") ? "" : null} />
        </Link>
        <Link to="/trabajadores">
          <Flex pt={4} alignItems="center" flexDirection="column">
          <MenuItem text="Trabajadores" image="" activeImage={isHere("trabajadores") ? "" : null} />
          </Flex>
        </Link>
        <Link to="/gestion">
          <Flex pt={4} alignItems="center" flexDirection="column">
          <MenuItem text="Gestión" image="" activeImage={isHere("gestion") ? "" : null} />
          </Flex>
        </Link>
        <Link to="/empresa">
          <Flex pt={4} alignItems="center" flexDirection="column">
            <MenuItem text="Empresa" image="" activeImage={isHere("empresa") ? "" : null} />
          </Flex>
        </Link>
      </Flex>
    </GridItem>
  );
};

export default Menu;

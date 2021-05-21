import React from 'react'
import { Input, InputLeftAddon, InputGroup, Image } from '@chakra-ui/react'
import SearchIcon from '../../assets/svg/search.svg'

const SearchBar = ({ placeholder, onChange }) => (
    <InputGroup flex="3" borderRadius={8} borderColor="translucid" _hover={{ borderColor: 'none' }}>
        <InputLeftAddon bg="translucid" borderRight="none" marginEnd={0} p={2}>
            <Image w="20px" src={SearchIcon} alt="Barra de búsqueda"/>
        </InputLeftAddon>
        <Input
            _hover={{ borderColor: 'none' }}
            _focus={{ borderColor: 'none' }}
            borderLeft="none"
            placeholder={placeholder}
            onChange={onChange}
            bg="translucid"
            pl={0}
        />
    </InputGroup>
);

export default SearchBar

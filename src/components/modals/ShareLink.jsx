// React
import React, { useState } from 'react';
import { Flex, Text, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

// Actions
import { inviteWorker } from '../../store/actions/workers';

// Components
import MultipleSelectList from '../ui/MultipleSelectList';

// Calendar
import { Calendar } from 'react-multi-date-picker';
import '../../assets/css/calendar.css';

// Animation
import gsap from 'gsap';

// Icons
import { MdContentCopy } from 'react-icons/md';

const ShareLink = ({ categories, tags }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [calendarValue, setCalendarValue] = useState();
  const [link, setLink] = useState();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const tl = gsap.timeline();

  const handleCategories = (e) => {
    if (!selectedCategories.includes(e.target.name)) {
      setSelectedCategories([...selectedCategories, e.target.name]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== e.target.name)
      );
    }
  };

  const handleTags = (e) => {
    if (!selectedTags.includes(e.target.name)) {
      setSelectedTags([...selectedTags, e.target.name]);
    } else {
      setSelectedTags(selectedTags.filter((item) => item !== e.target.name));
    }
  };

  const handleCalendar = (d) => {
    setCalendarValue(d);
  };

  const handleLink = async () => {
    if (calendarValue && selectedCategories.length > 0) {
      try {
        setLoading(true);
        // const id = await inviteWorker({
        //   categories: selectedCategories,
        //   tags: selectedTags,
        //   expiration: new Date(
        //     `${calendarValue.year} ${calendarValue.month.number} ${calendarValue.day}`
        //   ).getTime(),
        // });
        const id = 'a';
        setLink(`http://localhost:3000/registro/${id}`);
        setLoading(false);
      } catch (err) {
        console.log('error:', err);
        setLoading(false);
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleClick = () => {
    const element = document.getElementById('msg');
    tl.to(element, {
      opacity: 1,
      duration: 1,
    });
    tl.to(
      element,
      {
        top: '-50px',
        duration: 2,
      },
      '-=1'
    );
    tl.to(element, {
      opacity: 0,
      duration: 1,
    }, '-=1');
    tl.to(element, {
      top: '0',
      duration: 0,
    });
    
    navigator.clipboard.writeText(link);
  };

  return (
    <Box>
      <Box>
        <Text mt={4} mb='10px'>
          Características de los trabajadores:
        </Text>
        <Flex flexDirection='row' mb={8}>
          <MultipleSelectList
            title='Categorias'
            flex='1'
            bg='dark'
            mr={4}
            current={selectedCategories}
            values={categories}
            onChange={handleCategories}
          />
          <MultipleSelectList
            title='Etiquetas'
            flex='1'
            bg='dark'
            current={selectedTags}
            values={tags}
            onChange={handleTags}
          />
        </Flex>
        <Text mb='10px'>Fecha de caducidad del enlace:</Text>
        <Calendar
          value={calendarValue}
          minDate={new Date()}
          weekDays={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
          months={[
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
          ]}
          weekStartDayIndex={0}
          className={'red bg-dark'}
          locale={'es'}
          onChange={handleCalendar}
        />
        <Flex
          _hover={{ cursor: 'pointer' }}
          bg={'accent'}
          borderRadius={8}
          fontWeight='bold'
          fontSize={16}
          mt={8}
          alignItems={'center'}
          justifyContent='center'
          px={4}
          py={2}
          onClick={handleLink}
        >
          {loading ? 'Creando enlace...' : 'Crear enlace'}
        </Flex>
        {link && (
          <Box mt={4}>
            <Button
              size='md'
              height='48px'
              width='100%'
              bg='translucid'
              color='grey'
              _focus={{ borderColor: 'none' }}
              onClick={handleClick}
            >
              <Flex
                w='100%'
                justifyContent='center'
                alignContent='center'
                position='relative'
              >
                <Text w='100%' fontSize={12}>
                  {link}
                </Text>
                <MdContentCopy />
                <Text position='absolute' id='msg' opacity={0} mt={2}>
                  Enlace copiado!
                </Text>
              </Flex>
            </Button>
          </Box>
        )}
        <AlertDialog isOpen={isOpen}>
          <AlertDialogOverlay>
            <AlertDialogContent bg='darkLight'>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Error
              </AlertDialogHeader>

              <AlertDialogBody>
                <Flex flexDirection='column'>
                  <Text>
                    {selectedCategories.length <= 0 &&
                      'Debes seleccionar al menos una categoría.'}
                  </Text>
                  <Text>
                    {!calendarValue &&
                      'Debes seleccionar una fecha de caducidad para el enlace.'}
                  </Text>
                </Flex>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button bg='translucid' onClick={() => setIsOpen(false)}>
                  Aceptar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Box>
  );
};

export default ShareLink;

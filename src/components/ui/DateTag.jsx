import React from 'react';
import { Text } from '@chakra-ui/layout';
import moment from 'moment'
import 'moment/locale/es'

const DateTag = ({ dates }) => (
  <Text
    px={2.5}
    py={2}
    fontWeight={"bold"}
    borderRadius={10}
    bg={"darkLight"}
    fontSize={12}
    textAlign='center'
  >
    {dates[0]._seconds === dates[dates.length - 1]._seconds
      ? moment(dates[0]._seconds * 1000).format("D MMMM")
      : `${moment(dates[0]._seconds * 1000).format("D MMMM")} - ${moment(
          dates[dates.length - 1]._seconds * 1000,
        ).format("D MMMM")}`}
  </Text>
);

export default DateTag

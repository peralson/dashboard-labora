import React from 'react';
import { Text } from '@chakra-ui/layout';
import moment from 'moment'
import 'moment/locale/es'

const DateTag = ({ dates }) => (
    <Text
        p='4px 8px'
        fontWeight="bold"
        borderRadius={4}
        bg="dark"
        fontSize="12px"
    >
        {dates[0]._seconds === dates[dates.length - 1]._seconds
        ? moment(dates[0]._seconds * 1000).format('D MMMM')
        : `${moment(dates[0]._seconds * 1000).format('D MMMM')} - ${moment(dates[dates.length - 1]._seconds * 1000).format('D MMMM')}`
        }
    </Text>
)

export default DateTag

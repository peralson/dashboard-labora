import React from 'react'
import { Image } from '@chakra-ui/image';
import noPicture from '../../assets/svg/noPicture.svg'

const CustomImg = props => (
    <Image {...props} src={props.image ? props.image : noPicture} />
)

export default CustomImg

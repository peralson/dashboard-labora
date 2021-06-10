import React from "react";
import { Text } from "@chakra-ui/layout";

const Remaining = (props) => (
  <>
    {props.alreadyassigned / props.qty === 1 ? ( 
      <Text bg={"accentLight"} lineHeight={1.2} color={"accent"} textAlign={"center"} {...props}>
        {props.success}
      </Text>
    ) : (
      <Text bg={"red.smooth"} fontWeight={"bold"} color={"red.full"} {...props}>
        {props.alreadyassigned} / {props.qty}
      </Text>
    )}
  </>
);

export default Remaining;

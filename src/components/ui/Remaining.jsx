import React from "react";
import { Text } from "@chakra-ui/layout";

const Remaining = (props) => (
  <>
    {props.alreadyAssigned / props.qty === 1 ? (
      <Text lineHeight={1} bg={"translucid"} {...props}>
        {props.success}
      </Text>
    ) : (
      <Text
        lineHeight={1}
        bg={"red.smooth"}
        fontWeight={"bold"}
        color={"red.full"}
        {...props}
      >
        {props.alreadyAssigned} / {props.qty}
      </Text>
    )}
  </>
);

export default Remaining;

import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

const CopyLinkBar = ({ id }) => {
  const [copied, setCopied] = useState(false);
  const link = `${window.location.origin}/gestion-de-proyecto/${id}`;

  const onCopiedHandler = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };

  return (
    <Flex
      alignItems={"center"}
      borderRadius={10}
      borderWidth={1}
      borderColor={"translucid"}
      overflow={"hidden"}
    >
      <Text
        flex={1}
        as={"a"}
        href={link}
        target={"_blank"}
        fontSize={14}
        color={"grey.dark"}
        px={3}
        isTruncated
      >
        {link}
      </Text>
      <Text
        color={"primary"}
        bg={"primaryLight"}
        fontSize={12}
        fontWeight={"bold"}
        py={2.5}
        px={3}
        cursor={"pointer"}
        onClick={onCopiedHandler}
      >
        {copied ? "🎉  ¡Ya lo tienes!  🎉" : "Copiar enlace de gestión"}
      </Text>
    </Flex>
  );
};

export default CopyLinkBar;

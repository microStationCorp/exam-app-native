import React from "react";
import { Link } from "expo-router";

const CustomLink = ({ url, text }: { url: string; text: string }) => {
  return (
    <Link href={url} style={{ color: "blue" }}>
      {text}
    </Link>
  );
};

export default CustomLink;

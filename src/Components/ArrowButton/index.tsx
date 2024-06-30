import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function ArrowButton({
  direction = "left",
  display = true,
  color = "#000",
  action=undefined,
}) {
  if (!display) {
    return <></>;
  }

  if (direction.toLowerCase() === "right") {
    return (
        <IoIosArrowForward fill={color} size={"20%"} onClick={action}/>
    );
  }

  return (
      <IoIosArrowBack fill={color} size={"20%"} onClick={action}/>
  );
}

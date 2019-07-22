import React from "react";
import styled, { keyframes } from "styled-components";
import { Logo } from "./Icons";

const Animation = keyframes`
  0%{
    opacity:0
  }
  50%{
    opacity:1
  }
  100%{
    opacity:0;
  }
`;

const Load = styled.div`
  animation: ${Animation} 2s linear infinite;
`;

export default () => (
  <Load>
    <Logo size={36} />
  </Load>
);

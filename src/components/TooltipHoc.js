/* eslint-disable */
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const TooltipHoc = ({ message, position, children }) => {
  return (
    <OverlayTrigger
      placement={position}
      overlay={<Tooltip id={`tooltip-${position}`}>{message}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default TooltipHoc;

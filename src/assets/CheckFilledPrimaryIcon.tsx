import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export function CheckFilledPrimaryIcon(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props} width="22" height="22" viewBox="0 0 22 22">
      <circle cx="11" cy="11" r="11" fill="#FFF5CA" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.9276 5.00523C15.7546 5.02496 15.5988 5.08674 15.4559 5.1923C15.3134 5.29761 15.469 5.06892 12.231 9.93314L9.2012 14.4847L7.88515 13.1561C6.98485 12.2473 6.55148 11.8157 6.51334 11.79C6.43078 11.7345 6.30538 11.6773 6.20864 11.6512C6.13142 11.6303 6.1079 11.628 5.96575 11.628C5.82143 11.628 5.80109 11.63 5.72091 11.6521C5.37443 11.7477 5.11482 12.0114 5.02415 12.3597C5.00074 12.4496 4.99227 12.6606 5.00808 12.7603C5.03207 12.9116 5.0987 13.0688 5.19075 13.1913C5.22273 13.2338 5.92634 13.9505 6.99479 15.0288C8.85329 16.9045 8.78591 16.8393 8.9394 16.9109C9.3406 17.0982 9.83427 16.9823 10.1049 16.6372C10.141 16.5913 16.4633 7.10114 16.7872 6.6068C16.9579 6.34631 16.9986 6.22834 16.9999 5.99004C17.0008 5.84075 16.9942 5.79367 16.9554 5.67198C16.8691 5.40123 16.6514 5.16794 16.39 5.0661C16.2516 5.01219 16.0729 4.98865 15.9276 5.00523Z"
        fill="#FFCF00"
      />
    </SvgIcon>
  );
}
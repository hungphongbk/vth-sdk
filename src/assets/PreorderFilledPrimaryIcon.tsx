import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { useFilledIconColor } from "../utils/useFilledIconColor";

export function PreorderFilledPrimaryIcon({
  color,
  ...props
}: SvgIconProps): JSX.Element {
  const [circleFill, pathFill] = useFilledIconColor(color);
  return (
    <SvgIcon {...props} viewBox="0 0 22 22">
      <circle cx="11" cy="11" r="11" fill={circleFill} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.19361 5.01586C6.13181 5.04099 6.02355 5.16856 6.00742 5.23529C6.00067 5.26329 5.99802 7.87794 6.00159 11.0456L6.00803 16.805L6.09473 16.8917C6.17095 16.9679 6.19799 16.9796 6.31837 16.9883L6.45531 16.9982L8.66331 15.8941L10.8713 14.7901L13.0793 15.8941L15.2873 16.9982L15.4227 16.9884C15.5252 16.981 15.5731 16.9647 15.6193 16.9215C15.7557 16.794 15.7463 17.2326 15.7463 10.9933C15.7463 4.7469 15.756 5.19272 15.6178 5.06356L15.555 5.00497L10.8987 5.00049C8.33774 4.99805 6.22045 5.00497 6.19361 5.01586ZM11.0072 7.29962C11.1223 7.35945 11.1693 7.43677 11.4802 8.07652L11.7884 8.7106L12.1795 8.76449C13.3306 8.92313 13.3636 8.93272 13.4394 9.13105C13.5129 9.32345 13.4917 9.35499 12.8949 9.94503L12.3652 10.4687L12.4875 11.1793C12.5631 11.6192 12.6043 11.9192 12.5954 11.9666C12.5777 12.0608 12.5063 12.1547 12.4173 12.2008C12.2752 12.2742 12.215 12.2536 11.5434 11.9015C11.1931 11.7178 10.8906 11.5675 10.8713 11.5675C10.852 11.5675 10.55 11.7178 10.2002 11.9015C9.52881 12.254 9.46832 12.2747 9.32535 12.2008C9.23634 12.1547 9.16492 12.0608 9.14723 11.9666C9.13834 11.9192 9.17948 11.6192 9.25513 11.1793L9.37741 10.4687L8.84772 9.94503C8.25088 9.35499 8.22977 9.32345 8.30324 9.13105C8.37461 8.94421 8.39676 8.93661 9.22087 8.81598L9.95533 8.70849L10.2635 8.07549C10.433 7.72733 10.589 7.4225 10.6102 7.3981C10.7169 7.27498 10.8815 7.23418 11.0072 7.29962Z"
        fill={pathFill}
      />
    </SvgIcon>
  );
}

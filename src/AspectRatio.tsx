import { Box, styled } from "@mui/material";
// import { AspectRatio as BaseAspectRatio } from 'react-aspect-ratio'

export type AspectRatioProps = { ratio?: string | number };
const AspectRatio = styled(Box)<AspectRatioProps>`
  position: relative;
  @supports (aspect-ratio: 1/1) {
    aspect-ratio: calc(${(props) => props.ratio});
  }
  > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  > img {
    height: auto;
  }
  ::before {
    content: "";
    display: block;
    width: 100%;
    @supports not (aspect-ratio: 1/1) {
      height: 0;
      padding-bottom: calc(100% / (${(props) => props.ratio}));
    }
    @supports (aspect-ratio: 1/1) {
      aspect-ratio: calc(${(props) => props.ratio});
    }
  }
`;

AspectRatio.defaultProps = {
  ratio: "1/1",
};

export default AspectRatio;

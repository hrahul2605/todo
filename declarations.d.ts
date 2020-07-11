declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "redux-logger";
declare module "./src/redux/ActionTypes.ts";
declare module "redux-persist";
declare module "react-redux";
declare module 'redux-persist/es/integration/react'
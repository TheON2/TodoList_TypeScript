import { IconContext } from "react-icons";
import {Button} from "./style";

const CustomButton = ({theme, children, icon , size, border , onClick}) => (
  <Button theme={theme} size={size} onClick={onClick} border={border}>
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      {icon} {children}
    </IconContext.Provider>
  </Button>
);

export default CustomButton;

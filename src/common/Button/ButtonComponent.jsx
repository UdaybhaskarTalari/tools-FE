/* eslint-disable react/prop-types */
import { Button, styled } from "@mui/material";
export const ButtonComponent = ({  status,variant,size,disable,type,label,clickFunction}) => {
 
  const StyledButton=styled(Button)(()=>({
    backgroundColor:"rgb(82, 82, 82)",
    textTransform:"capitalize",
    
  }))
  return (
<>
    {(status && status!="error")  && <StyledButton type={type} disabled={disable} variant={variant} size={size} onClick={clickFunction} >
      {label}
      </StyledButton>
  }

</>
  );
};

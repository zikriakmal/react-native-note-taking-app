import React, { Children } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ButtonTypes } from "./types";
import { getStyle } from "./styles";

const Button: React.FC<ButtonTypes> = (props) => {
    const { variant, children, style, ...rest } = props;
    const computedStyle = getStyle(props);
    return (
        <TouchableOpacity style={[style, computedStyle.container]} {...rest}>
            {children}
        </TouchableOpacity>
    )
}


export default Button;
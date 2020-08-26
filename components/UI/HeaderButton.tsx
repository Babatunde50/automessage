import React from 'react';
// import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeaderButton = (props: any) => {
    return (
        <HeaderButton {...props} IconComponent={Icon} iconSize={23} color="white" />
    )
}

export default CustomHeaderButton;
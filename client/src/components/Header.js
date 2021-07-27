import { Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Spacer, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from 'react-icons/fi';
import { useUser } from "./Auth/useUser";

const Header = () => {
    const colorMode = useColorMode();
    const user = useUser();
    console.log("user",user);
    return <Box p={4} shadow="md" d='flex'>
        <Heading>TodoX</Heading>
        <Spacer/>
        <Button leftIcon={colorMode.colorMode === 'dark'? <FiSun />:<FiMoon />} onClick={() => {
            if(colorMode.colorMode === 'dark'){
                colorMode.setColorMode('light');
            }else {
                colorMode.setColorMode("dark");
            }
        }}>Dark Mode</Button>
    </Box>
}

export default Header
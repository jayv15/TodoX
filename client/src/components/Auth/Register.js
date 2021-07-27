import { Box, Container, Stack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Input,Button, useToast } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormHelperText,
  } from "@chakra-ui/react"
import { useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Reg () {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const toast = useToast();

    const Register = () => {
        let name = nameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        axios.post('http://localhost:1337/auth/local/register',{
            username:name,
            email,
            password
        })
        .then(({data}) => {
            if(data.jwt){
                Cookies.set('jwt',data.jwt);
                toast({
                    status:"success",
                    title:"Successfully Registerd",
                });
                return
            }
            console.log(data);
        })
        .catch((err) => {
            toast({
                status:"error",
                title:"An error occured",
            });
            console.log(err.response);
        })

        console.log(email, password, name);
    };

    return <Box p={12}>
        <Container >
            
            <Box mt={12} borderWidth='1px' borderRadius='lg' p={8}>
            <Heading>Register</Heading>
                <Stack spacing={4} mt={4}>
                <FormControl >
                    <FormLabel>Name</FormLabel>
                    <Input ref={nameRef} type="text" />
                </FormControl> 

                <FormControl >
                    <FormLabel>Email </FormLabel>
                    <Input ref={emailRef} type="email" />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>

                <FormControl >
                    <FormLabel>Password</FormLabel>
                    <Input ref={passwordRef} type="password" />
                </FormControl>
                <Button onClick={Register}>Register</Button>
                <Button as='a' href='/login' variant="link">Already have an account?</Button>
                </Stack>
            </Box>
        </Container>
    </Box>
}
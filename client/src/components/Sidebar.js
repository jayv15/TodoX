import { Box, Heading, Center } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Link } from "react-router-dom";
import { useUser } from "./Auth/useUser";
import { Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import NewList from "./Auth/NewList";
import * as Icons from "react-icons/fi";

export default function Sidebar({ activeList, lists, onNewList }) {
    const defaultBg = useColorModeValue("white", "gray.800");
    const selectedBg = useColorModeValue("gray.100", "gray.400");
    const user = useUser();
    console.log(lists);
    return (
        <Box>
            {Object.keys(lists).map((key) => {
                const Lists = lists[key];
                console.log({
                    isSelected: activeList === key,
                    activeList,
                    key
                });
                const Icon = Icons[Lists.icon];
                return (
                    <Link to={key}>
                        <Box
                            bg={activeList === key ? selectedBg : defaultBg}
                            p={4}
                            css={{ userSelect: "none" }}
                            d="flex"
                            alignItems="center"
                            borderRadius="lg"
                            _hover={{
                                bg: (defaultBg, selectedBg),
                                cursor: "pointer"
                            }}
                        >
                            <Box mr={2}>{Icon && <Icon />}</Box>
                            <Heading size="md">{Lists.title}</Heading>
                        </Box>
                    </Link>
                );
            })}
            <NewList
                onSave={(item) => {
                    onNewList(item);
                }}
            />

            {!user.loading && (
                <Box position="fixed" bottom={10} w="20%">
                    <Center>
                        <Heading mb={2}>Hi, {user.username}</Heading>
                    </Center>
                    <Button
                        w="full"
                        onClick={() => {
                            window.location = "/";
                            Cookies.remove("user-data");
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            )}
        </Box>
    );
}

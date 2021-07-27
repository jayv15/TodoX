import { Box, Button, Stack, useDisclosure } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input
} from "@chakra-ui/react";
import { useRef } from "react";
import moment from "moment";

export default function Content({ lists, onItemAdd }) {
    const modal = useDisclosure();
    const input = useRef(null);

    return (
        <Box ml={2}>
            <Heading>{lists.title}</Heading>
            <Stack mt={4} spacing="2">
                {Object.keys(lists.items).map((key, index) => {
                    const item = lists.items[key];
                    return (
                        <Box d="flex">
                            {index + 1}
                            <Box ml={4}>
                                <Text fontWeight="bold" size="sm">
                                    {" "}
                                    {item.value}
                                </Text>
                                <Text>
                                    Added on {moment(key).format("LLL")}
                                </Text>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>

            <Button size="sm" colorScheme="teal" mt={10} onClick={modal.onOpen}>
                New Item
            </Button>

            <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input ref={input} placeholder="New Item" />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={() => {
                                onItemAdd(input.current.value);
                            }}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

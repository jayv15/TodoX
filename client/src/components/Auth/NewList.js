import { Button } from "@chakra-ui/button"; 
import { Box } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { useEffect, useRef, useState } from "react";
import { Stack } from "@chakra-ui/react";
import * as Icons from "react-icons/fi";
import { HStack } from "@chakra-ui/layout";

const IconList = Object.keys(Icons);
export default function NL({ onSave }) {
    const [entry, setEntry] = useState(false);
    const [iconQuery, setIconQuery] = useState("");
    const [SelectedIcon, setSelectedIcon] = useState([]);
    const [listName, setListName] = useState();

    // const [filteredIcons,setFilteredIcons] = useState([]);
    const IconGenerator = () => {
        const filtered = IconList.filter(
            (icon) => icon.toLocaleLowerCase().indexOf(iconQuery) > -1
        ).slice(0, 5);

        return (
            <HStack>
                {filtered.map((icon) => {
                    const Icon = Icons[icon];
                    return (
                        <Box
                            p={4}
                            onClick={() => setSelectedIcon(icon)}
                            _hover={{
                                bg: "teal",
                                textColor: "white",
                                cursor: "pointer"
                            }}
                            bg={SelectedIcon === icon ? "teal" : "white"}
                        >
                            <Icon />
                        </Box>
                    );
                })}
            </HStack>
        );
    };
    useEffect(IconGenerator, [iconQuery]);
    const Save = () => {
        onSave({
            title: listName,
            icon: SelectedIcon,
            items: []
        });
        setEntry(false);
    };

    return (
        <Box>
            {entry ? (
                <Stack mt={4}>
                    <Input
                        placeholder="Enter List Name"
                        onChange={(e) => setListName(e.target.value)}
                    />
                    <Input
                        placeholder="Search Icon"
                        size="sm"
                        onChange={(e) => setIconQuery(e.target.value)}
                    />
                    <Box>
                        <IconGenerator />
                    </Box>
                    <Button colorScheme="teal" onClick={Save}>
                        Save
                    </Button>
                </Stack>
            ) : null}
            <Button
                w="full"
                colorScheme={entry ? "red" : "teal"}
                mt={5}
                onClick={() => setEntry(!entry)}
            >
                {entry ? "Cancle" : "New List"}
            </Button>
        </Box>
    );
}

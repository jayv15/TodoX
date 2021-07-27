import { useEffect, useState } from "react";

import Header from "./components/Header";
import Content from "./components/Content";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import { Redirect } from "react-router-dom";
import { MakeGet, MakePost } from "./helper/Request";
import { useUser } from "./components/Auth/useUser";

function App({ match }, props) {
    const user = useUser();
    const activeList = match.params.list;

    const [Lists, setLists] = useState({
        all: {
            title: "All",
            icon: "FiBox",
            items: []
        }
    });

    useEffect(() => {
        MakeGet("lists").then((Response) => {
            console.log(Response);
            Response.forEach((item) => {
                debugger;
                setLists((prevList) => ({
                    ...prevList,
                    [item.title]: {
                        ...item,
                        id: item.id
                    }
                }));
            });
        });
    }, []);

    if (!Lists[activeList]) {
        return <Redirect to="/all" />;
    }

    return (
        <div>
            <Header />
            <Flex p={6}>
                <Box w="20%">
                    <Sidebar
                        onNewList={(data) => {
                            debugger;
                            MakePost("lists", {
                                ...data,
                                user: user.id
                            }).then((Response) => {
                                console.log(Response);
                            });
                            setLists({
                                ...Lists,
                                [data.title]: data
                            });
                        }}
                        activeList={activeList}
                        lists={Lists}
                    />
                </Box>
                <Box>
                    <Content
                        onItemAdd={(item) => {
                            const _list = Lists[activeList];
                            _list.items[new Date()] = {
                                value: item
                            };
                            setLists({
                                ...Lists,
                                [activeList]: _list
                            });
                        }}
                        lists={Lists[activeList]}
                    />
                </Box>
            </Flex>
        </div>
    );
}

export default App;

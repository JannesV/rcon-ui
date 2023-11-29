import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Tag,
} from "@chakra-ui/react";

import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import {
  ServerInfoDocument,
  useGetCommandsQuery,
  useGetServerInfoQuery,
  useLogSubscription,
  useSendCommandMutation,
} from "@dashboardarr/graphql";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdSend } from "react-icons/io";

export const MainPage: FC = () => {
  const [log, setLog] = useState("");
  const [command, setCommand] = useState("");
  const [workshopMapId, setWorkshopMapId] = useState("");
  const [mapName, setMapName] = useState("");

  const consoleRef = useRef<HTMLDivElement>(null);
  const { subscribeToMore, data: serverInfoData } = useGetServerInfoQuery({});
  const [sendCommand, { loading }] = useSendCommandMutation();

  const { data: { commands } = { commands: [] }, loading: commandsLoading } =
    useGetCommandsQuery({
      variables: { search: command.replace(/ .*/, "") },
      skip: !command,
      fetchPolicy: "no-cache",
    });

  const { data } = useLogSubscription({
    variables: {},
  });

  useEffect(() => {
    if (data) {
      setLog(log + data.log.text);

      setTimeout(() => {
        if (consoleRef.current) {
          consoleRef.current.scrollTop = consoleRef.current?.scrollHeight;
        }
      }, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    subscribeToMore({
      document: ServerInfoDocument,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData) {
          return prev;
        }

        return subscriptionData.data;
      },
    });
  }, [subscribeToMore]);

  const handleSend = useCallback(async () => {
    await sendCommand({ variables: { command } });
    setCommand("");
  }, [command, sendCommand]);

  const isValidCommand =
    commands.filter((c) => command.includes(c.command)).length === 1;

  return (
    <Center p={5}>
      <VStack maxW={1000} w="full">
        <Card w="full">
          <CardBody>
            <Flex w="full" gap={8}>
              <Stat>
                <StatLabel>Server</StatLabel>
                <StatNumber>{serverInfoData?.serverInfo.name}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Players</StatLabel>
                <StatNumber>
                  {serverInfoData?.serverInfo.currentPlayers}/
                  {serverInfoData?.serverInfo.maxPlayers}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Map</StatLabel>
                <StatNumber>{serverInfoData?.serverInfo.map}</StatNumber>
              </Stat>
            </Flex>
          </CardBody>
        </Card>

        <Card w="full">
          <CardHeader>
            <Heading>RCON Console</Heading>
          </CardHeader>
          <CardBody>
            <Box
              w="full"
              ref={consoleRef}
              whiteSpace="pre-wrap"
              borderWidth={1}
              borderColor={"gray.600"}
              color="white"
              p="3"
              borderRadius="md"
              fontFamily="monospace"
              fontSize="small"
              height={400}
              overflow="auto"
              mb={4}
            >
              {log}
            </Box>

            <AutoComplete
              onSelectOption={({ item }: any) => {
                setCommand(`${item.value}`);
              }}
              isLoading={commandsLoading}
              shouldRenderSuggestions={() => !isValidCommand || !command}
            >
              <InputGroup>
                <AutoCompleteInput
                  onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                    setCommand(ev.currentTarget.value)
                  }
                  placeholder="command..."
                  value={command}
                  fontFamily="monospace"
                  fontSize="small"
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (isValidCommand && e.key === "Enter") {
                      handleSend();
                    }
                  }}
                  flex={1}
                />
                <InputRightElement>
                  <IconButton
                    type="submit"
                    aria-label="send"
                    isLoading={loading}
                    onClick={handleSend}
                    icon={<IoMdSend />}
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>

              <AutoCompleteList>
                {commands.map((item) => (
                  <AutoCompleteItem
                    key={item!.command}
                    value={item!.command}
                    align="center"
                    gap={2}
                  >
                    <Text>{item?.command}</Text>
                    <Tag flexShrink={0} size="sm">
                      {item?.value}
                    </Tag>
                    <Text as="i" fontSize="small" opacity={0.8}>
                      {item?.description}
                    </Text>
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </AutoComplete>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading>Gamemode</Heading>
          </CardHeader>
          <CardBody>
            <Flex gap="4" flexWrap="wrap">
              <Button
                onClick={() =>
                  sendCommand({ variables: { command: "exec aim" } })
                }
              >
                Aim
              </Button>
              <Button
                onClick={() =>
                  sendCommand({ variables: { command: "exec live" } })
                }
              >
                Competetive 5v5
              </Button>
              <Button
                onClick={() =>
                  sendCommand({
                    variables: { command: "exec gamemode_competitive2v2" },
                  })
                }
              >
                Competetive 2v2
              </Button>
              <Button
                onClick={() =>
                  sendCommand({ variables: { command: "exec knife_he" } })
                }
              >
                Knife + HE
              </Button>
              <Button
                onClick={() =>
                  sendCommand({ variables: { command: "exec knife_taser_he" } })
                }
              >
                Knife + HE + Taser
              </Button>
              <Button
                onClick={() =>
                  sendCommand({ variables: { command: "exec knife_taser" } })
                }
              >
                Knife + Taser
              </Button>
              <Button
                onClick={() =>
                  sendCommand({ variables: { command: "exec live2" } })
                }
                colorScheme="red"
              >
                Reset Match
              </Button>
            </Flex>
          </CardBody>
        </Card>
        <Card w="full">
          <CardHeader>
            <Heading>Current Map</Heading>
          </CardHeader>
          <CardBody>
            <Flex mb={4} gap={4}>
              <Input
                value={workshopMapId}
                onChange={(ev) => setWorkshopMapId(ev.currentTarget.value)}
                placeholder="Workshop Map ID"
              />
              <Button
                isDisabled={!workshopMapId}
                flexShrink={0}
                onClick={() => {
                  sendCommand({
                    variables: {
                      command: `host_workshop_map ${workshopMapId}`,
                    },
                  });

                  setWorkshopMapId("");
                }}
                colorScheme="red"
              >
                Change Workshop Map
              </Button>
            </Flex>
            <Flex gap={4}>
              <Input
                value={mapName}
                onChange={(ev) => setMapName(ev.currentTarget.value)}
                placeholder="Mapname (ex. de_inferno)"
              />
              <Button
                isDisabled={!mapName}
                flexShrink={0}
                onClick={() => {
                  sendCommand({
                    variables: {
                      command: `changelevel ${mapName}`,
                    },
                  });

                  setWorkshopMapId("");
                }}
                colorScheme="red"
              >
                Change Level
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </VStack>
    </Center>
  );
};

import React from "react";
import {
  Badge,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Text,
  Box,
  Alert,
  AlertIcon,
  Grid,
  Button,
} from "@chakra-ui/react";
import Layout from "@components/Layout";
import { useQuery } from "react-query";
import { getMarketService } from "@services/market.service";
import { Market } from "@utils/types/market";
import { uFormatRupiah } from "@utils/index.utils";
import Percentage from "@components/Percentage";

export default function Home() {
  let [startNum, setStartNum] = React.useState(1);
  const [page, setPage] = React.useState(1);

  const {
    data: markets,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useQuery<Market[]>(["markets", page], () => getMarketService(page), {
    refetchInterval: 3000,
    staleTime: 3000,
    onSuccess: () => {
      setStartNum((page - 1) * 10 + 1);
    },
  });

  const nextPage = () => {
    setPage(prevState => prevState + 1);
  };
  const previousPage = () => {
    setPage(prevState => prevState - 1);
  };

  return (
    <Layout title="Crypto Market">
      <Box pb={16}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Coin</Th>
              <Th>Last Price</Th>
              <Th>24h % Change</Th>
              <Th isNumeric>Total Volume</Th>
              <Th isNumeric>Market Cap</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={6}>
                  <Text align={"center"}>Loading...</Text>
                </Td>
              </Tr>
            ) : null}
            {isError ? (
              <Tr>
                <Td colSpan={6}>
                  <Alert status="error" variant={"solid"}>
                    <AlertIcon />
                    <Text>There was an error processing your request</Text>
                  </Alert>
                </Td>
              </Tr>
            ) : null}
            {isSuccess &&
              markets?.map(m => {
                return (
                  <Tr>
                    <Td width="10px">
                      <Text pe={2}>{startNum++}</Text>
                    </Td>
                    <Td>
                      <Flex alignItems="center">
                        <Image
                          src={m.image}
                          boxSize="24px"
                          ignoreFallback={true}
                        />

                        <Text
                          pl={2}
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {m.name}
                        </Text>
                        <Badge ml={3}>{m.symbol}</Badge>
                      </Flex>
                    </Td>
                    <Td>{uFormatRupiah(m.current_price)}</Td>
                    <Td>
                      <Percentage percent={m.price_change_percentage_24h} />
                    </Td>
                    <Td isNumeric>{m.total_volume}</Td>
                    <Td isNumeric>{m.market_cap}</Td>
                  </Tr>
                );
              })}
            {/* <Tr>
            <Td>
              <Flex alignItems="center">
                <Image
                  src="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
                  boxSize="24px"
                  ignoreFallback={true}
                />

                <Text pl={2} fontWeight="bold" textTransform="capitalize">
                  Ethereum
                </Text>
                <Badge ml={3}>ETH</Badge>
              </Flex>
            </Td>
            <Td>16910000</Td>
            <Td>-1.45</Td>
            <Td isNumeric>539816863146117</Td>
            <Td isNumeric>2144364989936726</Td>
          </Tr> */}
          </Tbody>
        </Table>
        <Grid templateColumns="70% 1fr auto 1fr" gap={6} mt={10}>
          <div></div>
          <Button
            colorScheme="facebook"
            variant="outline"
            size="sm"
            onClick={previousPage}
            disabled={page === 1 ? true : false}
          >
            Previous
          </Button>
          <Text>{page}</Text>
          <Button
            colorScheme="facebook"
            variant="outline"
            size="sm"
            onClick={nextPage}
          >
            Next
          </Button>
        </Grid>
      </Box>
    </Layout>
  );
}

import Head from 'next/head'
import DatePicker from 'components/DatePicker'
import { AppState } from 'store/store';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getDevices } from 'store/reducers/devices';
import { getEntries } from 'store/reducers/entries';
import { useEffect, useState } from 'react';
import { Flex, Stack, HStack, Button, Box, Spacer, useColorMode } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';

export function Home() {

  const dispatch = useDispatch();
  const entries = useSelector((state: AppState) => state.entries.entries);

  useEffect(() => {
    dispatch(getEntries());
    dispatch(getDevices());
  }, []);

  const [type, setType] = useState('hourly');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { colorMode } = useColorMode();


  let labels;
  let labelCounts: number[] = [];
  let chartData: number[] = [];

  switch (type) {
    case 'hourly':
      labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      chartData = labels.map(() => 0);
      labelCounts = labels.map(() => 0);
      for (const entry of entries.filter((entry) => {
        if (fromDate && entry.timestamp < fromDate || endDate && entry.timestamp > endDate) {
          return false;
        }
        return true;
      })) {
        chartData[entry.timestamp.getHours()] += entry.value;
        labelCounts[entry.timestamp.getHours()]++;
      }
      break;
    case 'daily':
      labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      chartData = labels.map(() => 0);
      labelCounts = labels.map(() => 0);
      for (const entry of entries.filter((entry) => {
        if (fromDate && entry.timestamp < fromDate || endDate && entry.timestamp > endDate) {
          return false;
        }
        return true;
      })) {
        chartData[entry.timestamp.getDate() - 1] += entry.value;
        labelCounts[entry.timestamp.getDate() - 1]++;
      }
      break;
  }
  chartData = chartData.map((value, index) => {
    if (labelCounts[index] === 0) { return 0; }
    return 1905 - (value / labelCounts[index]);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'LDR',
        backgroundColor: (colorMode == 'dark' ? 'teal':'rgb(122, 201, 152)'),
        borderColor: (colorMode == 'dark' ? 'teal':'rgb(122, 201, 152)'),
        lineTension: 0.3,
        data: chartData
      }]
  };

  const chartOptions = {
    // layout: { padding: { top: 25, bottom: 75, left: 75, right: 75 } },
    maintainAspectRatio: false,
    elements: { point: { radius: 0 } }
  };

  return (
    <>
      <Head>
        <title>Sensorify</title>
        <meta name="description" content="A simple app to look at sensor information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justify="space-evenly" h="full" direction="column" >
        <Stack direction={["column", null, "row"]} mb={4}>
          <Stack direction={["column", "row", "row"]}>
            <DatePicker placeholderText="From date" value={fromDate?.toDateString()} onChange={(date: Date) => { setFromDate(date) }} />
            <DatePicker placeholderText="To date" value={endDate?.toDateString()} onChange={(date: Date) => { setEndDate(date) }} />
          </Stack>
          <Spacer />
          <HStack>
            <Button backgroundColor={type == 'hourly' ? (colorMode == 'dark' ? 'teal':'rgb(122, 201, 152)'):''} onClick={() => { setType('hourly') }}>
              Hourly
            </Button>
            <Button backgroundColor={type == 'daily' ? (colorMode == 'dark' ? 'teal':'rgb(122, 201, 152)') : ''} onClick={() => { setType('daily') }}>
              Daily
            </Button>
            <Button onClick={() => { setType('weekly') }} disabled={true}>
              Weekly
            </Button>
            <Button onClick={() => { setType('monthly') }} disabled={true}>
              Monthly
            </Button>
          </HStack>
        </Stack>
        <Box h={350} mt={5} w="full">
          <Line type="line" data={data} options={chartOptions} />
        </Box>
      </Flex>
    </>
  )
}

export default Home;

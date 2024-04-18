import React from 'react'
import { Grid, GridItem, Heading, Card, CardBody, Text } from '@chakra-ui/react';
import { BarChart, Bar, CartesianGrid } from 'recharts';
import styles from "../../assets/css/dashboard.module.css"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GraphsComponent = ({ graphsprops }) => {
    const { graphSize, netRevenue, revenue, dataCharts } = graphsprops
    console.log(graphSize)
    
    return (
        <div>   <Grid
            templateColumns="repeat(2, 1fr)"
            pt="5"
            gap={5}
            className={styles.row1}
        >
            <GridItem className={styles.inner}>
                <Card borderTop="4px solid #3366ff " width="100%">
                    <CardBody>
                        <Heading fontSize="lg" pb={4} px={4}>
                            Net Revenue
                        </Heading>
                        <BarChart width={graphSize} height={280} data={netRevenue} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="US$" stackId="a" fill="#00a3ff" />
                            <Bar dataKey="totalRoomsRented" stackId="a" fill="#71d2fe" />
                            <Bar dataKey="adrData" stackId="a" fill="#0671c6" />
                        </BarChart>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem className={styles.inner}>
                <Card borderTop="4px solid #3366ff " >
                    <CardBody>
                        <Heading fontSize="lg" pb={4} px={2}>
                            14 Day Outlook
                        </Heading>
                        <Grid templateColumns="repeat(12,1fr)" pt={1} pb={6}>
                            <GridItem w="100%" colSpan={3} px={4}>
                                <Heading fontSize="xl" color="#3366ff" fontWeight="500">
                                    {revenue?.outlook}%
                                </Heading>
                                <Text fontSize="xs" pt="2" fontWeight="500">
                                    14 DAY OCCUPANCY
                                </Text>
                            </GridItem>
                            <GridItem w="100%" colSpan={3}>
                                <Heading fontSize="xl" color="#3366ff" fontWeight="500">
                                    ${revenue?.total}
                                </Heading>
                                <Text fontSize="xs" pt="2" fontWeight="500">
                                    14 DAY REVENUE
                                </Text>
                            </GridItem>
                        </Grid>

                        <LineChart
                            width={graphSize}
                            height={200}
                            py={5}
                            data={dataCharts}
                            over
                        >
                            <Line type="monotone" dataKey="US$" stroke="#3366ff" />
                            <XAxis dataKey="name" fontSize={13} width={graphSize} />
                            <YAxis fontSize={13} />
                            <Tooltip />
                            <Legend />
                        </LineChart>
                    </CardBody>
                </Card>
            </GridItem>

        </Grid></div>
    )
}

export default GraphsComponent
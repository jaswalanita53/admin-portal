import React from 'react'
import { Grid, GridItem, Heading, Card, CardBody } from '@chakra-ui/react';
import { BarChart, Bar, CartesianGrid } from 'recharts';
import styles from "../../assets/css/dashboard.module.css"
import { XAxis, YAxis, Tooltip, Legend } from 'recharts';

const BarGraphs = ({ barGraphProps }) => {
  const { graphSize, data1, data2 } = barGraphProps
  return (
    <div>  <Grid
      templateColumns="repeat(2, 1fr)"
      pt="5"
      gap={5}
      className={styles.row1}
    >
      <GridItem className={styles.inner}>
        <Card borderTop="4px solid #3366ff" width="100%">
          <CardBody>
            <Heading fontSize="lg">OCCUPANCY</Heading>
            <BarChart width={graphSize} height={170} data={data1} layout="vertical"
              margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" layout="vertical" />
              <Tooltip />
              <Legend />
              <Bar dataKey="occupied" stackId="a" fill="#8884d8" unit="%" />
              <Bar dataKey="available" stackId="a" fill="#82ca9d" unit="%" />
              <Bar dataKey="undermaintenance" stackId="a" fill="#ffc658" unit="%" />
            </BarChart>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem className={styles.inner}>
        <Card borderTop="4px solid #3366ff" width="100%">
          <CardBody>
            <Heading fontSize="lg">HOUSE KEEPING</Heading>
            <BarChart width={graphSize} height={170}
              data={data2}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              {/* <Bar dataKey="percentage" fill="#8884d8" /> */}
              <Bar dataKey="clean" stackId="a" fill="#8884d8" unit="%" />
              <Bar dataKey="available" stackId="a" fill="#82ca9d" unit="%" />
              <Bar dataKey="undermaintenance" stackId="a" fill="#ffc658" unit="%" />
            </BarChart>
          </CardBody>
        </Card>
      </GridItem>
    </Grid></div>
  )
}

export default BarGraphs
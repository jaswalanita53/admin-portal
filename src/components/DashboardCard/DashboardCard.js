import { GridItem, Card, CardBody, Heading, Grid, Text, Box, Stack, HStack, Circle } from "@chakra-ui/react"
import { color } from 'framer-motion';
const DashboardCard = (props) => {
  const card = {
    flex: "10%",
    minWidth: "200px",
    display: "grid",
  }
  const badgeIcon = {
    float: 'right',
    position: 'absolute',
    top: '16px',
    right: '20px',
    fontSize: '30px',
    color: 'white'
  }
  const { text, subtext1, subtext2, total, icon, totalcolor, percentage, subtext1Val, subtext2Val, cardColor } = props
  return (
    <>
      <GridItem style={card}>
        <Card backgroundColor={cardColor}>
          <CardBody>
            <HStack spacing='0px'>
              <Box w='70%'>
                <Heading fontSize='2xl' fontWeight='500' color={totalcolor}>{total}</Heading>

              </Box>
              <Box w='70%' style={{ float: "right" }}>
                <div style={badgeIcon}>
                  {icon ? icon : <>

                    <Circle size='40px' backgroundColor="#f0f0f0" p='3'>
                      <Text fontSize="sm" fontWeight={"bold"} color='#000'>{percentage ? percentage.toFixed(2) + "%" : "0%"}</Text>
                    </Circle>
                  </>}
                </div>
              </Box>
            </HStack>
            <Text pt='4' color='#fff' fontWeight='500' fontSize='lg'>{text}</Text>
            <Text fontSize='md' pt='3' fontWeight='500' color='#fff'>
              <HStack spacing='0px'>
                <Box w='70%'>
                  {subtext1}
                </Box>
                <Box w='30%' style={{ textAlign: "right" }}>
                  {subtext1Val}
                </Box>
              </HStack>
            </Text>
            <Text fontSize='md' fontWeight='500' color='#fff'>
              <HStack spacing='0px'>
                <Box w='70%'>
                  {subtext2}
                </Box>
                <Box w='30%' style={{ textAlign: "right" }}>
                  {subtext2Val}
                </Box>
              </HStack>
            </Text>
          </CardBody>
        </Card>
      </GridItem>
    </>
  )
}
export default DashboardCard
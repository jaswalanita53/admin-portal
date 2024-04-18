import React from 'react';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header/Header';

const NotFound = () => {
  return (
    <>
    {/* <Header /> */}
    <Flex
      align="center"
      justify="center"
      h="100vh"
      direction="column"
      textAlign="center"
    >
      
      <Heading as="h1" size="2xl" mb={8}>
        404 - Page Not Found
      </Heading>
      <Button as={Link} to="/admin/dashboard" colorScheme="teal" size="lg">
        Go Back to Dashboard
      </Button>
    </Flex>
    </>
  );
};

export default NotFound;

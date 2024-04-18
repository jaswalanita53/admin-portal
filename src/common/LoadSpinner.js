import { Container, Grid } from "@chakra-ui/react";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
function LoadSpinner(props) {
    return (
        <>
            <Container maxW="container.xxl" backgroundColor="#ecf2f9">
                <Grid templateColumns="repeat(1, 1fr)" gap={6} background={'white'} display={'flex'} alignItems={'center'} justifyContent={'center'} py={40} >
                    <ClipLoader
                        color={"blue.500"}
                        loading={props.isLoading}
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </Grid>
            </Container>
        </>
    )
}

export default LoadSpinner;
// const override: CSSProperties = {
    const override ={
    display: "block",
    margin: "0px auto",
    width: '75px',
    height: '75px',
    borderColor: "blue",
};
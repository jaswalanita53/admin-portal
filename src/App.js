import * as React from 'react'
import { BrowserRouter} from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from './navigation';

const chakraTheme = extendTheme({
  textStyles: {
    heading: {
      fontSize: '28px',
      color: '#001238',
      lineHeight: '36px',
      fontWeight: 600
    },
    subHeading: {
      fontSize: '18px',
      color: '#001238',
      lineHeight: '24px'
    }
  },
})

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={chakraTheme}>
          <BrowserRouter >
            <Navigation />
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App

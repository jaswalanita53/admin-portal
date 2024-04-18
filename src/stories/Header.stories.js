// import { Header } from './Header';
import React from "react";
import Header from "../components/Header/Header";


export default {
  title: "Components/Header",
  component: Header,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: 'A custom header component for the website',
      },
    },
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
}


  export const Default = () => <Header />;

export const LoggedIn = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

// export const LoggedOut = {};

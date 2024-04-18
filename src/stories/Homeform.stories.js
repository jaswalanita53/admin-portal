import React from "react";
import HomeForm from "../components/Home/HomeForm";


const meta = {
  title: 'Components/LoginForm',
  component: HomeForm,
} 

// Define the Template component that will be used for each story
const Template = (args) => <HomeForm {...args} />;

// Define your stories
export const Default = Template.bind({});
Default.args = {
};

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
  emailstate: 'rahul@gmail.com',
  passwordstate:"787878"
};

export const WithOutInitialValuesAndLoginClicked = Template.bind({});
WithOutInitialValuesAndLoginClicked.args = {
  buttonClicked: "true",
};


export const LogInSuccess = Template.bind({});
LogInSuccess.args = {
  LogIn: true,
  emailstate: 'rightemail@gmail.com',
  passwordstate: "rightpassword"
};

export const LogInFailed = Template.bind({});
LogInFailed.args = {
  LogIn: false,
  emailstate: 'wrongemail@gmail.com',
  passwordstate: "wrongpassword"
};

export default meta;
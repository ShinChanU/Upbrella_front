import { Meta, StoryFn } from "@storybook/react";
import Footer from ".";

export default {
  title: "organisms/CardFooter",
  component: Footer,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = () => <Footer />;

export const Default = Template.bind({});
Default.args = {};

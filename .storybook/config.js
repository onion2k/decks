import { configure } from "@storybook/react";
import "../src/index.css";
import "../src/App.css";

const req = require.context("../src", true, /\.stories\.js$/);
configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);

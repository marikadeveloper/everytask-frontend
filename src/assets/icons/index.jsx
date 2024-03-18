// disable eslint check for this file for (import/no-unresolved)
/* eslint-disable import/no-unresolved */
import ArrowBackIcon from "./arrow-back-outline.svg?react";
import CloseIcon from "./close-outline.svg?react";
import CogIcon from "./cog-outline.svg?react";
import FlashIcon from "./flash-outline.svg?react";
import LeafIcon from "./leaf-outline.svg?react";
import ListCircleIcon from "./list-circle-outline.svg?react";
import RocketIcon from "./rocket-outline.svg?react";
import StopwatchIcon from "./stopwatch-outline.svg?react";

function ArrowBack() {
  return <ArrowBackIcon />;
}

function Cog() {
  return <CogIcon />;
}

function Close() {
  return <CloseIcon />;
}

function Flash() {
  return <FlashIcon />;
}

function Leaf() {
  return <LeafIcon />;
}

function ListCircle() {
  return <ListCircleIcon />;
}

function Rocket() {
  return <RocketIcon />;
}

function Stopwatch() {
  return <StopwatchIcon />;
}

export { ArrowBack, Close, Cog, Flash, Leaf, ListCircle, Rocket, Stopwatch };

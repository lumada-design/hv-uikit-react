import React from "react";
import SimpleGrid from "..";
import HvCard from '../../Card'

export default {
  title: "Foundation/SimpleGrid",
  parameters: {
    componentSubtitle: null,
    usage: 'import { SimpleGrid } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: SimpleGrid,
  argTypes: {
    spacing: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: {type: 'select'},
      default: 'sm'
    },
    cols: {
      control: {type: 'number'}
    }
  }
};


const Template = (args) => (
  <SimpleGrid
    cols={2}
    spacing="sm"
    breakpoints={[
      { maxWidth: 980, cols: 3, spacing: 'md' },
      { maxWidth: 755, cols: 2, spacing: 'sm' },
      { maxWidth: 600, cols: 1, spacing: 'sm' },
    ]}
    {...args}
  >
    <div style={{backgroundColor: 'lightblue'}}>1</div>
    <div style={{backgroundColor: 'lightblue'}}>2</div>
    <div style={{backgroundColor: 'lightblue'}}>3</div>
    <div style={{backgroundColor: 'lightblue'}}>4</div>
    <div style={{backgroundColor: 'lightblue'}}>5</div>
  </SimpleGrid>
)

const TemplateWithCards = (args) => (
  <SimpleGrid
    cols={2}
    spacing="sm"
    breakpoints={[
      { maxWidth: 980, cols: 3, spacing: 'md' },
      { maxWidth: 755, cols: 2, spacing: 'sm' },
      { maxWidth: 600, cols: 1, spacing: 'sm' },
    ]}
    {...args}
  >
    <HvCard>1</HvCard>
    <HvCard>2</HvCard>
    <HvCard>3</HvCard>
    <HvCard>4</HvCard>
    <HvCard>5</HvCard>
  </SimpleGrid>
)


export const Primary = Template.bind({});
export const Secondary = TemplateWithCards.bind({});
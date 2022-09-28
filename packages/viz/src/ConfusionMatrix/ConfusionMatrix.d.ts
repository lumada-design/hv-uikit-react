import { HvChartProps } from "../Chart";

export interface HvConfusionMatrixProps extends HvChartProps {
    /**
     * 
     */
    deltaMatrix?: number[][];
}

export default function HvConfusionMatrixProps(props: HvConfusionMatrixProps): JSX.Element | null;

import { Text } from "@chakra-ui/react";
import { uFormatPercent } from "@utils/index.utils";

const Percentage = ({ percent }: { percent: number }) => {
  const formatPercent = uFormatPercent(percent);

  let color = "black";
  if (percent > 0) {
    color = "green.500";
  } else if (percent < 0) {
    color = "red.500";
  }

  return <Text color={color}>{formatPercent}</Text>;
};

export default Percentage;

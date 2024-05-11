import { Box, Typography } from "@mui/material";

interface IProps {
  title: string;
  value: string;
  title2?: string;
  value2?: string | React.ReactNode;
}

const Card: React.FC<IProps> = ({ title, value, title2, value2 }) => {
  return (
    <Box className="relative grid shadow-md rounded-md h-40 p-5 overflow-hidden transition-all bg-white dark:bg-gray-800">
      <Typography className="font-semibold">{title}</Typography>
      <Typography className="font-bold text-2xl">{value}</Typography>

      {title2 && (
        <Box className="absolute top-0 right-0 grid p-5 bg-blue-500 cursor-pointer w-full h-full text-white [clip-path:circle(25%_at_100%_0%)] hover:[clip-path:circle(75%)] transition-[clip-path]">
          <Typography className="font-semibold">{title2}</Typography>
          <Typography className="font-bold text-2xl">{value2}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Card;

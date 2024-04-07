"use client";
import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

interface IProps {
  data: {
    label: string;
    component: React.ReactNode;
  }[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

const CustomTabs: React.FC<IProps> = ({ data }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        {data.map((tab, index) => (
          <Tab
            key={tab.label}
            label={tab.label}
            value={index}
            className={`font-semibold capitalize dark:text-gray-300 text-gray-600 ${
              value === index && "text-primary"
            }`}
          />
        ))}
      </Tabs>

      {data.map((tab, index) => (
        <CustomTabPanel key={tab.label} value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </>
  );
};

export default CustomTabs;

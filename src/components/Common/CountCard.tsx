import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import { Height } from "@styled-icons/material";

interface ItemProps {
  index: number;
  data: { title: string; count: any }[];
}

interface CountCardProps {
  data: { title: string; count: any }[];
  lgGrid?: number;
}

const Item = styled.div<ItemProps>(({ data }) => ({
  textAlign: "center",
  height: "80px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: "0",
  borderRadius: "16px",
  padding: `${data.length == 4 ? "0px 30px" : "0px 60px"}`,

  "@media (max-width: 1440px)": {
    padding: `${data.length == 4 ? "0px 15px" : "0px 30px"}`,
  },
}));

const CountCard: React.FC<CountCardProps> = ({ data, lgGrid }) => {
  function formatCountWithLeadingZero(count) {
    return count < 10 ? `0${count}` : count?.toString();
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {data &&
          data.map((item, index) => (
            <Grid item xs={12} md={6} lg={data.length == 4 ? 3 : 4} key={index}>
              <Item
                className={`card-${index + 1} countCard`}
                index={index}
                data={data}
              >
                <p
                  color="primary.light"
                  className={`font-bold text-white text-[1.5rem] ${
                    data.length == 4
                      ? "max-[1500px]:text-[1rem]"
                      : "max-[1500px]:text-[1.3rem]"
                  } `}
                >
                  {item.title}
                </p>
                <p
                  color="primary.light"
                  className={`font-black text-white text-[2.25rem] ${
                    data.length == 4
                      ? "max-[1500px]:text-[1.2rem]"
                      : "max-[1500px]:text-[1.8rem]"
                  } `}
                >
                  {formatCountWithLeadingZero(item.count) ?? "00"}
                </p>
              </Item>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default CountCard;

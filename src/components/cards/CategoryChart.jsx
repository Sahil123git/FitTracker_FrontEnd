import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";
import { EmptyChild } from "../../assets/icons";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const CenterComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CategoryChart = ({ data }) => {
  return (
    <Card>
      <Title>Workout Categories</Title>
      {!data?.pieChartData || data?.pieChartData?.length === 0 ? (
        <CenterComponent>
          <EmptyChild />
        </CenterComponent>
      ) : (
        <PieChart
          series={[
            {
              data: data?.pieChartData,
              innerRadius: 30,
              outerRadius: 120,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          height={300}
        />
      )}
    </Card>
  );
};

export default CategoryChart;

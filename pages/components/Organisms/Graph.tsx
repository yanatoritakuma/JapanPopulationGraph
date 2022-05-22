/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { TPopulations } from "../../../types/populationsType";

type TProps = {
  populations: TPopulations[];
};

export const Graph = (props: TProps) => {
  const { populations } = props;

  let series = [];
  let categories = [];

  for (let p of populations) {
    let data = [];

    for (let pd of p.data) {
      data.push(pd.value);
      categories.push(String(pd.year));
    }

    series.push({
      type: "line",
      name: p.name,
      data: data,
    });
  }

  const options = {
    title: {
      text: "総人口推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    // 都道府県を一つも選んでいない場合との分岐条件
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };

  return (
    <div css={graph}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

const graph = css`
  margin: 20px auto;
  width: 70%;
`;

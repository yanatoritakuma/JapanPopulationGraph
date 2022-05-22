/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from "react";
import { CheckBox } from "../Atoms/CheckBox";
import { Graph } from "../Organisms/Graph";
import { css } from "@emotion/react";
import { TPrefectures } from "../../../types/checkType";
import { TPopulations } from "../../../types/populationsType";

export const Top = () => {
  const [prefectures, setPrefectures] = useState<TPrefectures[]>([
    {
      prefCode: 0,
      prefName: "",
    },
  ]);

  const [populations, setPopulations] = useState<TPopulations[]>([]);

  // チェックイベントのboolean
  const [checkEvent, setCheckEvent] = useState({
    check: false,
    selected: 0,
  });

  // 初期化処理・都道府県checkBoxの情報取得
  useEffect(() => {
    const request = async () => {
      const res = await fetch(`/api/prefApi`);
      const data = await res.json();
      const checkBox = data.data.result.map((check: any) => {
        return { ...check, select: false };
      });
      setPrefectures(checkBox);
    };
    request();
  }, []);

  const selectedCheckArr = prefectures.filter(
    (v) => v.select === true && v.prefCode === checkEvent.selected + 1
  );

  useEffect(() => {
    if (checkEvent.check) {
      // チェックが追加された時の処理
      const encodeCheck = encodeURIComponent(selectedCheckArr[0]?.prefCode);
      const params = {
        check: encodeCheck,
      };
      const query = new URLSearchParams(params);
      const request = async () => {
        const res = await fetch(`/api/populationApi?${query}`);
        const data = await res.json();
        setPopulations([
          ...populations,
          {
            data: data.data.result?.data[0].data,
            name: prefectures[checkEvent.selected].prefName,
            code: selectedCheckArr[0]?.prefCode,
          },
        ]);
      };
      request();
    } else if (!checkEvent.check) {
      // チェックが外れた時の処理
      const newArr = populations.filter(
        (v) => v.code !== checkEvent.selected + 1
      );
      setPopulations(newArr);
    }
  }, [prefectures]);

  return (
    <section>
      <h1 css={title}>都道府県別の総人口推移グラフ</h1>
      <div css={prefecturesBox}>
        {prefectures.map(
          (v, i) =>
            v.select !== undefined && (
              <CheckBox
                key={v.prefCode}
                label={v.prefName}
                checked={v.select}
                onChange={(e: any) => {
                  const newCheck = [...prefectures];
                  newCheck[i].select = e.target.checked;
                  setPrefectures(newCheck);
                  setCheckEvent({
                    ...checkEvent,
                    check: e.target.checked,
                    selected: i,
                  });
                }}
              />
            )
        )}
      </div>

      {populations.length !== 0 && <Graph populations={populations} />}
    </section>
  );
};

const title = css`
  margin: 20px 0;
  text-align: center;
  font-size: 20px;
`;

const prefecturesBox = css`
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 80%;

  @media screen and (max-width: 768px) {
    width: 90%;
  }

  .checkBox {
    margin: 10px;
    display: flex;
    align-items: center;
  }
`;

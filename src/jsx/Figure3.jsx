import React, { useState, useEffect } from 'react';

// Load helpers.
import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLineFigure3.jsx';

import '../styles/styles.less';

function Figure3() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => val);
    const values = Object.values(el).map(val => parseFloat(val)).filter(val => !Number.isNaN(val));
    return ({
      data: values.map((val, j) => ({
        dataLabels: {
          y: (i === 0) ? -10 : 30
        },
        name: labels[j],
        y: val
      })),
      labels,
      lineWidth: 4,
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-global_trade_trends_2/' : './'}assets/data/2023-global_trade_trends_2_figure3.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(transpose(body)))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        idx="3"
        data={dataFigure}
        note="Geographic proximity is based on the average geodesic distance of global trade. Geopolitical closeness is measured by the similarity of foreign policy position based on voting patterns at the United Nations General Assembly. Trading partners’ diversification is based on the Herfindahl concentration index. All variables are normalized to 100 in Q1 2022."
        show_first_label
        source="UNCTAD secretariat calculations based on national data, UN voting data, and CEPII geographical data."
        subtitle="Index, Q1 2022 = 100"
        suffix=""
        title="Friend-shoring and increasing concentration for global trade"
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure3;

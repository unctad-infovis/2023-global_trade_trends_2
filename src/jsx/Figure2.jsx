import React, { useState, useEffect } from 'react';

// Load helpers.
import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLineFigure2.jsx';

import '../styles/styles.less';

function Figure2() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => val);
    const values = Object.values(el).map(val => parseFloat(val) * 100).filter(val => !Number.isNaN(val));
    return ({
      data: values.map((val, j) => ({
        dataLabels: {
          y: (i === 0) ? -10 : 30
        },
        name: labels[j],
        y: val
      })),
      labels,
      lineWidth: 5,
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-global_trade_trends_2/' : './'}assets/data/2023-global_trade_trends_2_figure2.csv`;
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
        idx="2"
        data={dataFigure}
        note="China exports dependence on the US is calculated as China exports to the US over total China exports. The United States imports dependence on China is calculated as US imports to China over total US imports. The overall trade dependence is calculated as bilateral trade (imports+exports) of US and China over the sum of total trade of the two countries."
        show_first_label
        source="UNCTAD secretariat calculations based on national data."
        subtitle="United States imports dependence declined more than China export dependence"
        suffix="%"
        title="United States-China trade dependence has been decreasing in 2022"
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure2;

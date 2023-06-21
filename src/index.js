import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';
import Figure2 from './jsx/Figure2.jsx';
import Figure3 from './jsx/Figure3.jsx';

const containerFigure1 = document.getElementById('app-root-2023-global_trade_trends_2_1');
if (containerFigure1) {
  const root = createRoot(containerFigure1);
  root.render(<Figure1 />);
}

const containerFigure2 = document.getElementById('app-root-2023-global_trade_trends_2_2');
if (containerFigure2) {
  const root = createRoot(containerFigure2);
  root.render(<Figure2 />);
}

const containerFigure3 = document.getElementById('app-root-2023-global_trade_trends_2_3');
if (containerFigure3) {
  const root = createRoot(containerFigure3);
  root.render(<Figure3 />);
}

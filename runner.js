import { initSales } from './modules/initSales';
import { initStock } from './modules/initStock';

const initModules = () => {
  initSales();
  initStock();
};

const runApp = () => {
  import('./App').then(({ default: App }) => {
    App();
  });
};

const run = () => {
  initModules();
  runApp();
};

run();

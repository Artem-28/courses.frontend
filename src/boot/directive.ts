import { boot } from 'quasar/wrappers';
import loading from 'src/directive/loading';

export default boot(({ app }) => {
  app.directive('loading', loading);
});

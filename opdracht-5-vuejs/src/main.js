import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import Home from './components/Home';
import BestPractices from './components/BestPractices';

Vue.use(VueRouter);

var router = new VueRouter();

router.map({
  '/': {
    component: Home
  },
  '/best-practices': {
    component: BestPractices
  }
});

router.start(App, 'app');

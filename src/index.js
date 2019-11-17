import "@babel/polyfill"; // アプリ（サイト）内一箇所にだけ、インポート文を記述
import './scss/style.scss';

import { test } from './js/test'; //拡張子は省略可能

const keyName = 'hei';

let params = {
  foo: 'foooooo',
  bar: 'baaaaa',
  baz: 'zzzzzz',

};

test(params);

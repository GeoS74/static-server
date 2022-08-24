const regexp = {
  title: {
    test: /^([-]\s+|\s+)?(#+)\s+/,
    tag: /#+\s+/
  },
  internalLink: /\[\[.+?\]\]/g,
  externalLink: /(\[[^[]+?\])(\(.+?\))/g,
  bold: /__/,
  longSpace: /\s+/g,
};

let str, res;


////////////////////////////////////////////////////titleTest
str = '- ### ubuntu';
res = str.match(regexp.title.test)
// console.log(res);

str = '-    ### ubuntu';
res = str.match(regexp.title.test)
// console.log(res);

str = '-    ### ubuntu #### test';
res = str.match(regexp.title.test)
// console.log(res);

str = '-###ubuntu';
res = str.match(regexp.title.test)
// console.log(res);

str = '-### ubuntu';
res = str.match(regexp.title.test)
// console.log(res);

str = '- ### ubuntu';
res = str.match(regexp.title.test)
// console.log(res);

str = ' ### ubuntu';
res = str.match(regexp.title.test)
// console.log(res);

str = ' asdas ### ubuntu';
res = str.match(regexp.title.test)
// console.log(res);


////////////////////////////////////////////////////externalLink
str = '[alias](http://example.com) and [hoolias](http://enebled.com)';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res);

str = '[alias] (http://example.com)';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res);

str = '[ali[as]( http://example.com )';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res);

str = '[m[a[n[ytext]( http://example.com )';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res);

str = '[ali]as]( http://example.com )';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res); //bad

str = '[ma[n]ytext]( http://example.com ) and [ww[z]www]( http://booggaa.com )';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res); //bad

str = '[m]a]n]ytext]( http://example.com )';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res); //bad

str = '[alias](http://exa(mple.com)';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res);

str = '[alias](http://exa)mple.com)';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res);

str = '[alias](http://exa(mpl)e.com)';
res = [...str.matchAll(regexp.externalLink)]
// console.log(res); //bad


////////////////////////////////////////////////////internalLink
str = '[[hello]] and [[world]] is my';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res);

str = '[[   hello]] and [[world   ]] is my';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res);

str = '[ [   hello]] and [[world   ] ] is my';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res);

str = '- [[hello]] and [[world   ] ] is my';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res);

str = '[[qw[e]rty]]';
res = [...str.matchAll(regexp.internalLink)];
// console.log(res);

str = '[[qw[e]]rty]]';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res);

str = '[[qw]e]]rty]]';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res);

str = '[[qw[[e]rty]]';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res); //bad

str = '[[qw[[e]]rty]] and [[qw[[w]]rty]]';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res); //bad
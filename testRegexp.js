const regexp = {
  title: /^([-]\s+|\s*)(#+)(\s+)(.*)/, //ok
  image: /!\[\[.+?\]\]/g, //ok
  internalLink: /(^|[^!])(\[\[.+?\]\])/g, //ok
  externalLink: /(\[[^[]*?\])(\(.+?\))/g, //ok
  bold: /(__|\*\*)([^_\*].*?)\1/g, //ok
  cursive: /(_|\*)([^_\*].*?)\1(\s|$)/g, //ok
  longSpace: /\s+/g, //ok
  list: /-\s+?(.*)/g,
  paragraph: /^\s*#?([\w\dа-яА-Я]|<[bia][\s>]|<small>)/, //ok
  hashtag: /#([\w\dа-яА-Я]+)/g,
};

let str, res;

////////////////////////////////////////////////////hashtag
str = 'foo #tag and #тег2';
res = [...str.matchAll(regexp.hashtag)]
// console.log(res);

////////////////////////////////////////////////////paragraph
str = '  ubuntu the best';
res = str.match(regexp.paragraph)
// console.log(res);

str = '<a>ubuntu the best';
res = str.match(regexp.paragraph)
// console.log(res);

str = '<b>ubuntu the best';
res = str.match(regexp.paragraph)
// console.log(res);

str = '<blockquote>ubuntu the best';
res = str.match(regexp.paragraph)
// console.log(res);

str = '<small>ubuntu the best';
res = str.match(regexp.paragraph)
// console.log(res);

str = '#ubuntu the best';
res = str.match(regexp.paragraph)
// console.log(res);

////////////////////////////////////////////////////list
str = `
- first
-  sec-ond
-threa - d
four
- 
d - space
`;
res = [...str.matchAll(regexp.list)]
// console.log(res);



////////////////////////////////////////////////////image
// str = '![[hello100]] and ![[world]] is my';
// res = [...str.matchAll(regexp.image)]
// console.log(res);

str = '![[hello]] and ![[world]] is my';
res = [...str.matchAll(regexp.image)]
// console.log(res);

str = '!![[hello]] and !![[world]] is my';
res = [...str.matchAll(regexp.image)]
// console.log(res);

str = '!![[hello]] and !![[world]] is my';
res = [...str.matchAll(regexp.image)]
// console.log(res);

str = '!![[he[llo]] and !![[wo]r]ld]] is my';
res = [...str.matchAll(regexp.image)]
// console.log(res);

str = '!![[he[[llo]] and !![[wo]]r]ld]] is my';
res = [...str.matchAll(regexp.image)]
// console.log(res); //bad



////////////////////////////////////////////////////cursive
str = 'lorem _ipsum_ dolor _sit_ amet';
res = [...str.matchAll(regexp.cursive)]
// console.log(res);

str = 'lorem __ipsum__ dolor _sit_ amet';
res = [...str.matchAll(regexp.cursive)]
// console.log(res);

str = 'lorem _ips_um_ dolor sit amet';
res = [...str.matchAll(regexp.cursive)]
// console.log(res);

str = '_lorem_  _ips_';
res = [...str.matchAll(regexp.cursive)]
// console.log(res);

str = '_lorem__ips_';
res = [...str.matchAll(regexp.cursive)]
// console.log(res);

str = '_f_g_h_ _a_bg_c_';
res = [...str.matchAll(regexp.cursive)]
// console.log(res);

str = '_f_g_h _ d';
res = [...str.matchAll(regexp.cursive)]
// console.log(res);

str = '_f_g_h _d';
res = [...str.matchAll(regexp.cursive)]
// console.log(res);


////////////////////////////////////////////////////bold
str = '**lorem__ ipsum** dolor__ sit** amet__';
res = [...str.matchAll(regexp.bold)]
// console.log(res);

str = 'lorem __ips _u__m__ dolor __sit__ amet';
res = [...str.matchAll(regexp.bold)]
// console.log(res);

str = 'text  __b_o_ld__ text';
res = [...str.matchAll(regexp.bold)]
// console.log(res);

str = 'text__b____o_ld__ text';
res = [...str.matchAll(regexp.bold)]
// console.log(res); //bad

str = '***text*** font';
res = [...str.matchAll(regexp.bold)]
// console.log(res);

str = '****text**** font';
res = [...str.matchAll(regexp.bold)]
// console.log(res);

str = '*****text***** font';
res = [...str.matchAll(regexp.bold)]
// console.log(res);

str = '**te*xt**';
res = [...str.matchAll(regexp.bold)]
// console.log(res);

str = '**te**xt**';
res = [...str.matchAll(regexp.bold)]
// console.log(res);

str = '****';
res = [...str.matchAll(regexp.bold)]
// console.log(res);

str = '**te**xt** *  **foo**  *';
res = [...str.matchAll(regexp.bold)]
// console.log(res);


////////////////////////////////////////////////////title
str = '### ubuntu the best';
res = str.match(regexp.title)
// console.log(res);

str = ' ### ubuntu the best';
res = str.match(regexp.title)
// console.log(res);

str = '- ### ubuntu ## the best';
res = str.match(regexp.title)
// console.log(res);

str = '-    ### ubuntu';
res = str.match(regexp.title)
// console.log(res);

str = '-    ### ubuntu #### test';
res = str.match(regexp.title)
// console.log(res);

str = '-###ubuntu';
res = str.match(regexp.title)
// console.log(res);

str = '-### ubuntu';
res = str.match(regexp.title)
// console.log(res);

str = '- ### ubuntu';
res = str.match(regexp.title)
// console.log(res);

str = ' asdas ### ubuntu';
res = str.match(regexp.title)
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
str = ' [[hello]] and [[world]] is my';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res);

str = '[[   hello]] and [[world   ]] is my';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res);

str = '[ [   hello]] and [[world   ] ] is my';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res);

str = '[[   hello] ] and [ [world   ]] is my';
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

str = '![[pic]] and [[link]]';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res); 

str = '[[link]] and ![[pic]]';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res); 

str = '[[link]] and [[post]] and ![[pic]]';
res = [...str.matchAll(regexp.internalLink)]
// console.log(res); 

import { IConverter } from './IConverter';

export class Converter implements IConverter {
  private regexp = {
    title: /^([-]\s+|\d[).]\s+|\s*)(#+)(\s+)(.*)/, // ok
    image: /!\[\[.+?\]\]/g, // ok
    internalLink: /(^|[^!])(\[\[.+?\]\])/g, // ok
    externalLink: /(\[[^[]*?\])(\(.+?\))/g, // ok
    bold: /(__|\*\*)([^_*].*?)\1/g, // ok
    cursive: /(_|\*)([^_*].*?)\1(\s|$)/g, // ok
    longSpace: /\s+/g, // ok
    ul: /^-\s+(.*)/,
    ol: /^(\d)[.)]\s+(.*)/,
    code: /^\s*?```|\n\s*?```\s*?/,
    shortcode: /`(.*?)`/g,
    paragraph: /^\s*#?([\w\dа-яА-Я]|<[bia][\s>]|<small>|<code>)/, // ok
    blockquote: /^\s*>\s*(.*)/,
    hashtag: /#([\w\dа-яА-Я]+)/g,
    ecsapetag: /<(Buffer.*?)>/g,
  };

  private codeBlock = false;

  private tag: {
    type?: string,
    open?: string,
    close?: string,
  } = {};

  markdownToHTML(markdown: string): string {
    this.codeBlock = false;
    this.setTag();
    return markdown
      .split('\n')
      .map((line: string): string => this.linePipe(line))
      .join('\n')
      .split(this.regexp.code)
      .map((block: string, i: number): string => ((i % 2) ? this.code(block) : block))
      .join('\n') + (this.tag.close || '');
  }

  private setTag(tag?: string, start?: number): void {
    switch (tag) {
      case 'ul':
        this.tag = {
          type: 'ul',
          open: '<ul>',
          close: '</li></ul>',
        };
        break;
      case 'ol':
        this.tag = {
          type: 'ol',
          open: `<ol start="${start || 1}">`,
          close: '</li></ol>',
        };
        break;
      case 'blockquote':
        this.tag = {
          type: 'blockquote',
          open: '<blockquote>',
          close: '</p></blockquote>',
        };
        break;
      default:
        this.tag = {};
    }
  }

  private list(line: string): string {
    let matched: RegExpMatchArray | null = line.match(this.regexp.ul);
    if (matched) {
      if (this.tag.type !== 'ul') {
        let tags: string = this.tag.close || '';
        this.setTag('ul');
        tags += this.tag.open;
        return `${tags}<li>${matched[1]}`;
      }
      return `</li><li>${matched[1]}`;
    }

    matched = line.match(this.regexp.ol);
    if (matched) {
      if (this.tag.type !== 'ol') {
        let tags: string = this.tag.close || '';
        this.setTag('ol', Number.parseInt(matched[1], 10));
        tags += this.tag.open;
        return `${tags}<li>${matched[2]}`;
      }
      return `</li><li>${matched[2]}`;
    }

    return line;
  }

  private code(block: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = block.matchAll(this.regexp.ecsapetag);
    const matched: RegExpMatchArray[] = [...iterator];

    if (matched.length) {
      for (const chunk of matched) {
        block = block.replace(chunk[0], chunk[1]);
      }
    }
    return `<pre><code>${block}</code></pre>`;
  }

  private paragraph(line: string): string {
    if (!this.regexp.paragraph.test(line) || this.tag.type) {
      return line;
    }
    return `<p>${line}</p>`;
  }

  // bold -> cursive
  private linePipe(line: string): string {
    if (this.isCodeBlock(line)) {
      if (this.tag.close) {
        line = `${this.tag.close}\n${line}`;
        this.setTag();
      }
      return line;
    }

    line = line.replace(this.regexp.longSpace, ' ');

    if (!line.trim()) {
      line = (this.tag.close || '') + line;
      this.setTag();
      return line;
    }
    line = this.internalLink(line);
    line = this.externalLink(line);
    line = this.title(line);
    line = this.bold(line);
    line = this.cursive(line);
    line = this.image(line);
    line = this.list(line);
    line = this.hashtag(line);
    line = this.blockquote(line);
    line = this.shortcode(line);
    line = this.paragraph(line);
    return line;
  }

  private shortcode(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.shortcode);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      line = line.replace(chunk[0], `<code>${chunk[1]}</code>`);
    }
    return line;
  }

  private hashtag(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.hashtag);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      line = line.replace(chunk[0], `<small>${chunk[0]}</small>`);
    }
    return line;
  }

  private blockquote(line: string): string {
    const matched: RegExpMatchArray | null = line.match(this.regexp.blockquote);
    if (matched) {
      if (!matched[1].trim()) {
        return '';
      }
      if (this.tag.type !== 'blockquote') {
        let tags: string = this.tag.close || '';
        this.setTag('blockquote');
        tags += this.tag.open;
        return `${tags}<p>${matched[1]}`;
      }
      return `</p><p>${matched[1]}`;
    }
    return line;
  }

  private isCodeBlock(line: string): boolean {
    if (this.regexp.code.test(line)) {
      this.codeBlock = !this.codeBlock;
      return true;
    }
    return this.codeBlock;
  }

  private bold(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.bold);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      line = line.replace(chunk[0], `<b>${chunk[2]}</b>`);
    }
    return line;
  }

  private cursive(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.cursive);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      line = line.replace(chunk[0], `<i>${chunk[2]}</i>${chunk[3]}`);
    }
    return line;
  }

  private image(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.image);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      const link: string[] = chunk[0]
        .slice(3, -2)
        .split('|');

      const url: string = link[0].trim();
      const alias: string = link.length > 1 ? link.slice(1).join('|').trim() : url;

      line = line.replace(chunk[0], `<img src="/${url}" alt="${alias}"/>`);
    }
    return line;
  }

  private internalLink(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.internalLink);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      const link: string[] = chunk[2]
        .slice(2, -2)
        .replace(/#/g, '>')
        .split('|');

      const url: string = link[0].trim();
      const alias: string = link.length > 1 ? link.slice(1).join('|').trim() : url;

      line = line.replace(chunk[2], `<a href="/${url}">${alias}</a>`);
    }
    return line;
  }

  private externalLink(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.externalLink);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      const alias: string = chunk[1].slice(1, -1).trim();
      const url: string | null = this.getUrl(chunk[2].slice(1, -1).trim());

      const newLink = url ? `<a href="${url}" target="blank">${alias}</a>` : `[${alias}]${chunk[2]}`;
      line = line.replace(chunk[0], newLink);
    }
    return line;
  }

  private title(line: string): string {
    const matched: RegExpMatchArray | null = line.match(this.regexp.title);

    if (!matched) {
      return line;
    }
    return `${matched[1]}<h${matched[2].length}>${matched[4]}</h${matched[2].length}>`;
  }

  private getUrl(url: string): string | null {
    try {
      return new URL(url).href;
    } catch (error) {
      return null;
    }
  }
}

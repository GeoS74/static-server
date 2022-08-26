// import * as os from 'os';
import { IConverter } from "./IConverter";

export class Converter implements IConverter {
  regexp = {
    title: /^([-]\s+|\s*)(#+)(\s+)(.*)/, //ok
    image: /!\[\[.+?\]\]/g,
    internalLink: /(^|[^!])(\[\[.+?\]\])/g, //ok
    externalLink: /(\[[^[]*?\])(\(.+?\))/g, //ok
    bold: /[^_]*(__[^_]+?__)[^_]*/g,
    cursive: /[^_]*(_[^_]+?_)[^_]*/g,
    longSpace: /\s+/g, //ok
    list: /-\s+?(.*)/g,
    code: /^\s*?```|\n\s*?```\s*?/,
  };
  blockCode: boolean = false;

  markdownToHTML(markdown: string): string {
    const divs: string[] = [];

    for (const block of markdown.split(`\n\n`)) {
      const lines: string[] = [];

      for (const line of block.split(`\n`)) {
        if (line.length) {
          lines.push(this.linePipe(line));
        }
      }

      const div: string = lines.join('\n');
      if (div.length) {
        divs.push(this.divPipe(div));
      }
    }
    return divs.join('\n');
  }

  private divPipe(div: string): string {
    return div;
    // console.log(div)
    // console.log(div.match(this.regexp.code))
    // console.log('---------------------------')

    // div = this.list(div);
    // return `<div>${div}</div>`;
  }

  // bold -> cursive
  private linePipe(line: string): string {
    if (this.isBlockCode(line)) {
      return line;
    }

    line = line.replace(this.regexp.longSpace, ' ');

    line = this.internalLink(line);
    line = this.externalLink(line);
    line = this.title(line);
    // line = this.bold(line);
    // line = this.cursive(line);
    // line = this.image(line);
    return line;
    // return `<p>${line}</p>`;
  }

  private isBlockCode(line: string): boolean {
    if (this.regexp.code.test(line)) {
      this.blockCode = !this.blockCode;
      return true;
    }
    return this.blockCode;
  }

  private list(div: string): string {

    return div;
  }

  private bold(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.bold);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      const bold: string = chunk[1].slice(2, -2);
      line = line.replace(chunk[1], `<b>${bold}</b>`);
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
      console.log(chunk)
      const cursive: string = chunk[1].slice(1, -1);
      line = line.replace(chunk[1], `<i>${cursive}</i>`);
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

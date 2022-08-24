// import * as os from 'os';
import { IConverter } from "./IConverter";

export class Converter implements IConverter {
  regexp = {
    title: /^([-]\s+|\s+)?(#+)\s+/,
    internalLink: /\[\[.+?\]\]/g,
    externalLink: /(\[[^[]+?\])(\(.+?\))/g,
    bold: /__.+?__/g,
    longSpace: /\s+/g,
  };

  markdownToHTML(markdown: string): string {
    const html: string[] = [];

    for (const block of markdown.split(`\n\n`)) {
      const divs: string[] = [];

      for (const line of block.split(`\n`)) {
        divs.push(this.lineProcessing(line));
      }
      html.push(divs.join('\n'));
    }
    return html.join('\n\n');
  }

  private lineProcessing(line: string): string {
    line = line.replace(this.regexp.longSpace, ' ');

    line = this.internalLink(line);
    line = this.externalLink(line);
    line = this.title(line);
    line = this.bold(line);
    return line;
  }

  private bold(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.bold);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      const bold: string = chunk[0].slice(2, -2);
      line = line.replace(chunk[0], `<b>${bold}</b>`);
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
      const link: string[] = chunk[0]
        .slice(2, -2)
        .replace(/#/g, '>')
        .split('|');

      const url: string = link[0].trim();
      const alias: string = link.length > 1 ? link.slice(1).join('|').trim() : url;

      line = line.replace(chunk[0], `<a href="/${url}">${alias}</a>`);
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
    return line.replace(matched[0], `<h${matched[2].length}>`) + `</h${matched[2].length}>`;
  }

  private getUrl(url: string): string | null {
    try {
      return new URL(url).href;
    } catch (error) {
      return null;
    }
  }
}

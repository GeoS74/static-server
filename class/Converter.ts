// import * as os from 'os';
import { IConverter } from "./IConverter";

export class Converter implements IConverter {
  regexp = {
    title: {
      test: /^([-\d]\s+)?#+\s/,
      tag: /#+\s+/
    },
    internalLink: /\[\[[^\[\]]+\]\]/g,
    externalLink: /(\[.*\])(\(.*\))/g,
    bold: /__/,
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
    line = this.internalLink(line);
    line = this.externalLink(line);
    line = this.title(line);
    return line;
  }

  private bold(line: string): string {
    return line;
  }

  private internalLink(line: string): string {
    const iterator: IterableIterator<RegExpMatchArray> = line.matchAll(this.regexp.internalLink);
    const matched: RegExpMatchArray[] = [...iterator];

    if (!matched.length) {
      return line;
    }

    for (const chunk of matched) {
      const currLink: string = chunk[0]
        .slice(2, -2)
        .replace(this.regexp.longSpace, ' ')
        .replace(/#/g, '');

      const link: string[] = currLink.split('|');
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

    for (const title of matched) {

      const newTitle: string = title[1].slice(1, -1);
      const url = new URL(title[2].slice(1, -1))
      console.log(newTitle)
      console.log(url)
      // const newTitle: string = title[0]
      //   .slice(2, -2)
      //   .replace(/#/g, '')
      //   .replace(/\s+/g, ' ')
      //   .trim();
      // const link: string = `<a href="/${newTitle}">${newTitle}</a>`;
      // line = line.replace(title[0], link);
    }

    return line;
  }

  private title(line: string): string {
    if (!this.regexp.title.test.test(line)) {
      return line;
    }

    const matched: RegExpMatchArray | null = line.match(this.regexp.title.tag);

    if (!matched) {
      return line;
    }

    matched[0] = matched[0].replace(/\s+/, '');

    return line.replace(this.regexp.title.tag, `<h${matched[0].length}>`) + `</h${matched[0].length}>`;
  }
}

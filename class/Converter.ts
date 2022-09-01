// import * as os from 'os';
import { IConverter } from "./IConverter";

export class Converter implements IConverter {
  regexp = {
    title: /^([-]\s+|\s*)(#+)(\s+)(.*)/, //ok
    image: /!\[\[.+?\]\]/g, //ok
    internalLink: /(^|[^!])(\[\[.+?\]\])/g, //ok
    externalLink: /(\[[^[]*?\])(\(.+?\))/g, //ok
    bold: /(__|\*\*)([^_\*].*?)\1/g, //ok
    cursive: /(_|\*)([^_\*].*?)\1(\s|$)/g, //ok
    longSpace: /\s+/g, //ok
    ul: /^-\s+(.*)/,
    code: /^\s*?```|\n\s*?```\s*?/,
  };
  codeBlock: boolean = false;
  ulBlock: boolean = false;

  markdownToHTML(markdown: string): string {
    return markdown
      .split('\n')
      .map((line: string): string => this.linePipe(line))
      .join(`\n`)
      .split(this.regexp.code)
      .map((block: string, i: number): string => {
        if (i % 2) {
          return this.code(block)
        }
        return block;
      })
      .join(`\n`);
  }

  private code(block: string): string {
    return `<pre><code>${block}</code></pre>`
  }

  // bold -> cursive
  private linePipe(line: string): string {
    if (this.isCodeBlock(line)) {
      return line;
    }

    line = line.replace(this.regexp.longSpace, ' ');

    line = this.internalLink(line);
    line = this.externalLink(line);
    line = this.title(line);
    line = this.bold(line);
    line = this.cursive(line);
    line = this.image(line);
    line = this.ul(line);
    return line;
  }

  private ul(line: string): string {
    const matched: RegExpMatchArray | null = line.match(this.regexp.ul);

    if (!matched) {
      line = this.ulBlock ? `</ul>${line}` : line;
      this.ulBlock = false;
    }
    else {
      line = this.ulBlock ? `<li>${matched[1]}</li>` : `<ul><li>${matched[1]}</li>`;
      this.ulBlock = true;
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

// import * as os from 'os';

export class Converter {
  regexp: {
    title: RegExp,
    internalLink: RegExp,
    bold: RegExp,
  } = {
      title: /#+\s/,
      internalLink: /\[\[[^\[\]]+\]\]/g,
      bold: /__/,
    };

  markdownToHTML(markdown: string): string {
    const html: string[] = [];

    for(const block of markdown.split(`\n\n`)){
      const divs: string[] = [];

      for(const line of block.split(`\n`)){
        divs.push(this.lineProcessing(line));
      }
      html.push(divs.join('\n'));
    }
    return html.join('\n\n');
  }

  private lineProcessing(line: string): string {
    line = this.internalLink(line);
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
    
    for(const title of matched){
      const newTitle = title[0].slice(2, -2);
      const link = `<a href="/${newTitle}">${newTitle}</a>`;
      line = line.replace(title[0], link);

      console.log(line);
    console.log(title[0]);
    console.log(link);
    }

     

    return line;
  }

  private externalLink(line: string): string {
    return line;
  }

  private title(line: string): string {
    const matched: RegExpMatchArray = line.match(this.regexp.title) || [];

    if (!matched.length) {
      return line;
    }
    return line.replace(matched[0], `<h${matched[0].length-1}>`) + `</h${matched[0].length-1}>`;
  }

  // private breakText(text: string, separator: string): string[] {
  //   return text.split(separator);
  // }

  // private glueText(text: string[], separator: string): string {
  //   return text.join(separator);
  // }
}

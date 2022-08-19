// import * as os from 'os';

export class Converter {
  regexp: {
    title: RegExp,
    bold: RegExp,
  } = {
      title: /#+\s/,
      bold: /__/,
    };

  markdownToHTML(markdown: string): string {
    const html: string[] = [];
    
    for(const block in markdown.split(`\n\n`)){
      const divs: string[] = [];

      for(const line of markdown.split(`\n`)){
        divs.push(this.lineProcessing(line));
      }
      html.push(divs.join('\n'));
    }

    return html.join('\n\n');
  }

  private lineProcessing(line: string): string {
    line = this.title(line);
    return line;
  }

  private bold(block: string): string {
    const matched: RegExpMatchArray = block.match(this.regexp.bold) || [];

    if (!matched?.input) {
      return block;
    }
    console.log(matched);

    return block;
  }

  private title(line: string): string {
    const matched: RegExpMatchArray = line.match(this.regexp.title) || [];

    if (!matched?.input) {
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

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
    for(const block in this.textNewLine(markdown, '\n', 1)){
      for(const line of this.textNewLine(block, '\n', 1)){
        console.log(line);
      }
    }

    return html.join('');

    // const blocks: string[] = this.textNewLine(markdown, '\n', 2);
    // this.addTagsHTML(blocks);

    // console.log(blocks);

    // return this.getHTML(blocks);
  }

  // private addTagsHTML(blocks: string[]): void {
  //   for (const k in blocks) {
  //     blocks[k] = this.title(blocks[k]);
  //     // blocks[k] = this.bold(blocks[k]);
  //     break;
  //   }
  // }

  private bold(block: string): string {
    const matched: RegExpMatchArray = block.match(this.regexp.bold) || [];

    if (!matched?.input) {
      return block;
    }
    console.log(matched);

    return block;
  }

  private title(block: string): string {
    const matched = block.match(this.regexp.title) || [];

    // if (!matched?.input) {
    //   return block;
    // }

    // console.log(this.textNewLine(block, 1))
    return '';
    // const str: string = matched.input.slice(matched[0].length);
    // return `<h${matched[0].length - 1}>${str}</h${matched[0].length - 1}>`;
  }

  private getHTML(blocks: string[]): string {
    return blocks.join('\n\n');
  }

  private textNewLine(text: string, separator: string, countNewLine: number): string[] {
    return text.split(new Array(countNewLine).fill(separator).join(''));
  }
}

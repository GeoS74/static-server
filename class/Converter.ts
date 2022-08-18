export class Converter {
  regexp: {
    title: RegExp,
    bold: RegExp,
  } = {
      title: /#+\s/,
      bold: /__/,
    };

  markdownToHTML(markdown: string): string {
    const blocks: string[] = this.parse(markdown);
    this.addTagsHTML(blocks);

    console.log(blocks);

    return this.getHTML(blocks);
  }

  private addTagsHTML(blocks: string[]): void {
    for (const k in blocks) {
      blocks[k] = this.title(blocks[k]);
      blocks[k] = this.bold(blocks[k]);
    }
  }

  private bold(block: string): string {
    const matched: RegExpMatchArray = block.match(this.regexp.bold) || [];

    if (!matched?.input) {
      return block;
    }
    console.log(matched);

    return block;
  }

  private title(block: string): string {
    const matched: RegExpMatchArray = block.match(this.regexp.title) || [];

    if (!matched?.input) {
      return block;
    }

    const str: string = matched.input.slice(matched[0].length);
    return `<h${matched[0].length - 1}>${str}</h${matched[0].length - 1}>`;
  }

  private getHTML(blocks: string[]): string {
    return blocks.join('\n\n');
  }

  private parse(markdown: string): string[] {
    return markdown.split('\n\n');
  }
}

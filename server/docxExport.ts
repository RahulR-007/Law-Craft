import {
    Document as DocxDocument,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    BorderStyle,
    PageBorderDisplay,
    PageBorderOffsetFrom,
} from 'docx'

export async function renderDocx(
    title: string,
    content: string
): Promise<Buffer> {
    const paragraphs = content
        .split(/\n{2,}/g)
        .map((block) => block.trim())
        .filter(Boolean)
        .map((block) =>
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 200, line: 300 },
                children: [
                    new TextRun({
                        text: block,
                        font: 'Times New Roman',
                        size: 24, // 12pt
                    }),
                ],
            })
        )

    const doc = new DocxDocument({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 1440, // 1 inch
                            right: 1440,
                            bottom: 1440,
                            left: 1440,
                        },
                        borders: {
                            pageBorders: {
                                display: PageBorderDisplay.ALL_PAGES,
                                offsetFrom: PageBorderOffsetFrom.PAGE,
                            },
                            pageBorderTop: { style: BorderStyle.SINGLE, size: 6, color: '000000' },
                            pageBorderRight: { style: BorderStyle.SINGLE, size: 6, color: '000000' },
                            pageBorderBottom: { style: BorderStyle.SINGLE, size: 6, color: '000000' },
                            pageBorderLeft: { style: BorderStyle.SINGLE, size: 6, color: '000000' },
                        }
                    },
                },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 },
                        children: [
                            new TextRun({
                                text: title,
                                bold: true,
                                font: 'Times New Roman',
                                size: 32,
                            }),
                        ],
                    }),
                    ...paragraphs,
                ],
            },
        ],
    })

    const arrayBuffer = await Packer.toBuffer(doc)
    return Buffer.from(arrayBuffer)
}

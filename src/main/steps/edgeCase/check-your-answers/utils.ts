/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageContent } from '../../../app/controller/GetController';
import * as Urls from '../../../steps/urls';

interface GovUkNunjucksSummary {
  key: {
    text?: string;
    html?: string;
    classes?: string;
  };
  value: {
    text?: string;
    html?: string;
  };
  actions?: {
    items?: [
      {
        href: string;
        text: string;
        visuallyHiddenText: string;
      }
    ];
  };
  classes?: string;
}

interface SummaryListRow {
  key?: string;
  keyHtml?: string;
  value?: string;
  valueHtml?: string;
  changeUrl?: string;
  classes?: string;
}

interface SummaryList {
  title: string;
  rows: GovUkNunjucksSummary[];
}

type SummaryListContent = PageContent & {
  keys: Record<string, string>;
  language?: string;
};

const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {}), ...(item.keyHtml ? { html: item.keyHtml } : {}) },
      value: { ...(item.value ? { text: item.value } : {}), ...(item.valueHtml ? { html: item.valueHtml } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl, //
                  text: content.change as string,
                  visuallyHiddenText: `${item.key}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

/* eslint-disable import/namespace */
export const UploadFormSummary = (
  { keys, ...content }: SummaryListContent,
  uploadedDocuments: Partial<any>,
  caseInformation: string
): SummaryList | undefined => {
  const extraCaseInformation = {
    key: 'Information',
    value: caseInformation,
    changeUrl: Urls['UPLOAD_DOCUMENT'],
  };

  const documentInformation = uploadedDocuments.map(document => {
    return {
      keyHtml: keys.fileName + '<br><br>' + keys.description,
      valueHtml: document.fileName + '<br><br>' + document.description,
      changeUrl: Urls['UPLOAD_DOCUMENT'],
    };
  });

  const summaryData = [extraCaseInformation, ...documentInformation].filter(item => item);

  return {
    title: 'List of documents uploaded ',
    rows: getSectionSummaryList(summaryData, content),
  };
};

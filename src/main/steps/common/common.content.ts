import { capitalize } from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { PageContent, TranslationFn } from '../../app/controller/GetController';
import { CASE_SEARCH_URL } from '../../steps/urls';

const en = {
  phase: 'Beta',
  applyForChildArrangements: 'DSS Update Case',
  applyForDissolution: 'DSS Update Case',
  dss_updateServiceName: 'DSS Update Case',
  feedback:
    'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="#" target="_blank">feedback</a> will help us to improve it.',
  languageToggle: '<a href="?lng=cy" class="govuk-link language">Cymraeg</a>',
  govUk: 'GOV.UK',
  back: 'Back',
  continue: 'Save and continue',
  next: 'Next',
  change: 'Change',
  upload: 'Upload',
  download: 'Download',
  delete: 'Delete',
  warning: 'Warning',
  required: 'You have not answered the question. You need to select an answer before continuing.',
  notAnswered: 'You have not answered the question.',
  errorSaving: 'Sorry, we’re having technical problems saving your application. Please try again in a few minutes.',
  errorSendingInvite:
    'Sorry, we’re having technical problems sending your application for review. Please try again in a few minutes.',
  ogl: 'All content is available under the <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated',
  errorSummaryHeading: 'There is a problem on this page',
  saveAndSignOut: 'Save and sign out',
  saveAndComeLater: 'Save and come back later',
  goBack: 'Go back',
  saveAsDraft: 'Save as draft',
  onlyContinue: 'Continue',
  onlycontinue: 'Continue',
  cancel: 'Cancel',
  signOut: 'Sign out',
  signIn: 'Sign in',
  startNow: 'Start now',
  accessibility: 'Accessibility statement',
  cookies: 'Cookies',
  privacyPolicy: 'Privacy policy',
  termsAndConditions: 'Terms and conditions',
  marriage: 'marriage',
  divorce: 'divorce',
  civilPartnership: 'civil partnership',
  endingCivilPartnership: 'ending a civil partnership',
  husband: 'husband',
  wife: 'wife',
  partner: 'partner',
  civilPartner: 'civil partner',
  withHim: 'with him',
  withHer: 'with her',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
  yes: 'Yes',
  no: 'No',
  notSure: 'Not sure',
  english: 'English',
  welsh: 'Welsh',
  contactUsForHelp: 'Contact us for help',
  webChat: 'Web chat',
  webChatDetails: 'Ask a question or get any help in any language',
  sendUsAMessage: 'Telephone',
  sendUsAMessageDetails: 'We aim to get back to you within 5 days.',
  telephone: 'Telephone',
  telephoneNumber: '0300 303 0742',
  telephoneDetails: 'Monday to Friday, 8am to 8pm, Saturday 8am to 2pm.',
  findOutCharges: 'Find out about call charges',
  openNewWindow: 'opens in a new window',
  habitualResidentHelpText1:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  habitualResidentHelpText2:
    'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
  cookiesHeading: 'Cookies on',
  cookiesLine1: 'We use some essential cookies to make this service work.',
  cookiesLine2:
    'We’d also like to use analytics cookies so we can understand how you use the service and make improvements.',
  acceptAnalyticsCookies: 'Accept analytics cookies',
  rejectAnalyticsCookies: 'Reject analytics cookies',
  viewCookies: 'View cookies',
  hideMessage: 'Hide this message',
  cookiesConfirmationMessage:
    '<p>You can <a class="govuk-link" href="/cookies">change your cookie settings</a> at any time.</p>',
  changeCookiesHeading: 'Change your cookie settings',
  allowAnalyticsCookies: 'Allow cookies that measure website use?',
  useAnalyticsCookies: 'Use cookies that measure my website use',
  doNotUseAnalyticsCookies: 'Do not use cookies that measure my website use',
  save: 'Save',
  cookiesSaved: 'Your cookie settings were saved',
  additionalCookies:
    'Government services may set additional cookies and, if so, will have their own cookie policy and banner.',
  goToHomepage: 'Go to homepage',
  apmCookiesHeadings: 'Allow cookies that measure website application performance monitoring?',
  useApmCookies: 'Use cookies that measure website application performance monitoring',
  doNotUseApmCookies: 'Do not use cookies that measure website application performance monitoring',
  divider: 'or',
};

const cy: typeof en = {
  ...en, // @TODO delete me to get a list of missing translations
  phase: 'Beta',
  applyForChildArrangements: 'DSS Update Case" (in welsh)',
  applyForDissolution: 'DSS Update Case"(in welsh)',
  dss_updateServiceName: 'DSS Update Case',
  feedback:
    'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="#" target="_blank">feedback</a> will help us to improve it.(in welsh)',
  languageToggle: '<a href="?lng=en" class="govuk-link language">English</a>',
  govUk: 'GOV.UK',
  back: 'Yn ôl',
  continue: 'Save and continue (in welsh)',
  change: 'Change  (in welsh)',
  upload: 'Uwchlwytho',
  download: 'Llwytho i lawr',
  delete: 'Dileu',
  warning: 'Rhybudd',
  required: 'Nid ydych wedi ateb y cwestiwn. Rhaid ichi ddewis ateb cyn symud ymlaen.',
  notAnswered: 'Nid ydych wedi ateb y cwestiwn.',
  errorSaving:
    "Mae'n ddrwg gennym, rydym yn cael problemau technegol wrth geisio cadw eich cais. Rhowch gynnig arall arni mewn ychydig funudau.",
  ogl: 'Mae’r holl gynnwys ar gael o dan <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license" >Drwydded Agored y Llywodraeth f3.0</a>, oni nodir fel arall',
  errorSummaryHeading: 'Mae yna broblem',
  saveAndSignOut: 'Cadw ac allgofnodi',
  saveAndComeLater: 'Cadw’r cais a dychwelyd ato yn hwyrach ymlaen',
  goBack: 'Go back - welsh',
  saveAsDraft: 'Save as draft (in welsh)',
  signOut: 'Sign out (in welsh)',
  signIn: 'Sign in (in welsh)',
  accessibility: 'Accessibility statement(in welsh)',
  cookies: 'Cookies (in welsh)',
  privacyPolicy: 'Privacy policy (in welsh)',
  termsAndConditions: 'Terms and conditions (in welsh)',
  marriage: 'priodas',
  divorce: 'ysgariad',
  endingCivilPartnership: 'dod â phartneriaeth sifil i ben',
  civilPartnership: 'partneriaeth sifil',
  husband: 'gŵr',
  wife: 'gwraig',
  partner: 'partner',
  civilPartner: 'partner sifil',
  withHim: 'gydag ef',
  withHer: 'gyda hi',
  months: [
    'Ionawr',
    'Chwefror',
    'Mawrth',
    'Ebrill',
    'Mai',
    'Mehefin',
    'Gorffennaf',
    'Awst',
    'Medi',
    'Hydref',
    'Tachwedd',
    'Rhagfyr',
  ],
  dateFormat: {
    day: 'Diwrnod',
    month: 'Mis',
    year: 'Blwyddyn',
  },
  yes: 'Yes (in welsh)',
  no: 'No (in welsh)',
  notSure: 'Not sure (in welsh)',
  english: 'Saesneg',
  welsh: 'Cymraeg',
  contactUsForHelp: 'Cysylltwch â ni am gymorth',
  webChat: 'Sgwrsio dros y we',
  webChatDetails:
    "Mae ein holl asiantau sgwrsio dros y we yn brysur yn helpu pobl eraill. Dewch yn ôl nes ymlaen neu cysylltwch â ni trwy un o'r dulliau uchod.",
  sendUsAMessage: 'Anfonwch neges atom',
  sendUsAMessageDetails: 'Byddwn yn ymdrechu i ymateb o fewn 5 diwrnod.',
  findOutCharges: 'Rhagor o wybodaeth am gostau galwadau',
  openNewWindow: 'yn agor mewn ffenestr newydd',
  telephone: 'Ffoniwch',
  telephoneNumber: '0300 303 0742',
  telephoneDetails: 'Dydd Llun i Ddydd Gwener, 8.30am - 5pm.',
  onlyContinue: 'Continue (in welsh)',
  onlycontinue: 'Parhau',
  divider: 'neu',
};

export const generatePageContent = ({
  language,
  pageContent,
  userCase,
  userEmail,
  userCaseList,
  caption,
  name,
  byApplicant,
  document_type,
  addresses = [],
  userIdamId,
  additionalData,
  userId,
}: // eligibility,
// fee,
{
  language: Language;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  userEmail?: string;
  caption?: string;
  document_type?: string;
  userCaseList?: Partial<CaseWithId>[];
  addresses?: [];
  name?: string;
  byApplicant?: string;
  userIdamId?: string;
  additionalData?: CommonContentAdditionalData;
  userId?: string | undefined;
  // eligibility?: Eligibility;
  // fee?: Fee;
}): PageContent => {
  const commonTranslations: typeof en = language === 'en' ? en : cy;
  const serviceName = getServiceName(additionalData, commonTranslations);

  const content: CommonContent = {
    ...commonTranslations,
    serviceName,
    language,
    userCase,
    userEmail,
    name,
    userCaseList,
    addresses,
    caption,
    document_type,
    userIdamId,
    byApplicant,
    // contactEmail,
    additionalData,
    userId,
    // eligibility,
    // fee,
  };

  if (pageContent !== null && pageContent !== undefined) {
    Object.assign(content, pageContent(content));
  }

  return content;
};

const getServiceName = (addtionalReqData: CommonContentAdditionalData | undefined, translations: typeof en): string => {
  let serviceName = translations.applyForChildArrangements;
  if (addtionalReqData?.req?.path?.startsWith(CASE_SEARCH_URL)) {
    serviceName = translations.dss_updateServiceName;
  }
  return capitalize(serviceName);
};

type CommonContentAdditionalData = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type CommonContent = typeof en & {
  language: Language;
  serviceName: string;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  userEmail?: string;
  userCaseList?: Partial<CaseWithId>[];
  name?: string;
  caption?: string;
  document_type?: string;

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  addresses?: any[];
  byApplicant?: string;
  additionalData?: CommonContentAdditionalData;
  userId?: string | undefined;
  // eligibility?: Eligibility;
  // fee?: Fee;
  userIdamId?: string;
};

export type Language = 'en' | 'cy';

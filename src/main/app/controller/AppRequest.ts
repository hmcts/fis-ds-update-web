/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { Session } from 'express-session';
import type { LoggerInstance } from 'winston';

import { Case, CaseWithId } from '../case/case';
import { FormError } from '../form/Form';

export interface AppRequest<T = Partial<Case>> extends Request {
  session: AppSession;
  locals: {
    env: string;
    lang: string;
    logger: LoggerInstance;
  };
  body: T;
}

export interface AppSession extends Session {
  submissionError: boolean;
  user: UserDetails;
  userCase: CaseWithId;
  userCaseList: CaseWithId[];
  eligibility: Eligibility;
  lang: string | undefined;
  errors: FormError[] | undefined;
  addresses: [];
  // eslint-disable-next-line @typescript-eslint/ban-types
  verificationData: {};
  tempValidationData?: {};
  returnUrl?: string;
  accessCodeLoginIn: boolean;
  c100RebuildLdFlag: boolean;
  isDataVerified: boolean;
  loggedInSystemUserType: string;
}
export interface UserDetails {
  accessToken: string;
  id: string;
  email: string;
  givenName: string;
  familyName: string;
}

export interface Eligibility {
  under18Eligible?: string;
  marriedEligible?: string;
  livedUKEligible?: string;
  under21Eligible?: string;
}

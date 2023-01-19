import { Request } from 'express';
import { Session } from 'express-session';
import type { LoggerInstance } from 'winston';

import { Case, CaseWithId } from '../case/case';
import { FormError } from '../form/Form';

export interface AppRequest<T = Partial<Case>> extends Request {
  session: AppSession;
  locals: {
    C100Api: any;
    env: string;
    lang: string;
    logger: LoggerInstance;
  };
  body: T;
}

export interface AppSession extends Session {
  paymentError: boolean;
  user: UserDetails;
  userCase: CaseWithId;
  userCaseList: CaseWithId[];
  eligibility: Eligibility;
  lang: string | undefined;
  errors: FormError[] | undefined;
  addresses: [];
  returnUrl?: string;
  accessCodeLoginIn: boolean;
  c100RebuildLdFlag: boolean;
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

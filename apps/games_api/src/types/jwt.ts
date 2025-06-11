export type TJwtPayload = {
  sub: string;
  email: string;
};

export type TFullJwtPayload = TJwtPayload & {
  iat: number;
  exp: number;
};

export type TJwtPayloadForActivateAccount = {
  sub: string;
  verificationToken: string;
};

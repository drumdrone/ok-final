/**
 * Placeholder — nahradí se automaticky při `npx convex dev`.
 * Zachovává type-checking, dokud není Convex inicializovaný.
 */
import type { FunctionReference } from "convex/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyFn = FunctionReference<any, any, any, any>;
type ApiModule = Record<string, AnyFn>;

export declare const api: {
  inquiries: {
    create: AnyFn;
    list: AnyFn;
    setStatus: AnyFn;
    get: AnyFn;
    generateUploadUrl: AnyFn;
    counts: AnyFn;
  };
  jobs: {
    listActive: AnyFn;
    listAll: AnyFn;
    bySlug: AnyFn;
    upsert: AnyFn;
    remove: AnyFn;
  };
  contacts: {
    list: AnyFn;
    upsert: AnyFn;
  };
  ratelimits: {
    check: AnyFn;
  };
  [key: string]: ApiModule | AnyFn;
};

export declare const internal: {
  email: {
    sendInquiryMail: AnyFn;
  };
  inquiries: {
    get: AnyFn;
    _internalCreate: AnyFn;
  };
  [key: string]: ApiModule | AnyFn;
};

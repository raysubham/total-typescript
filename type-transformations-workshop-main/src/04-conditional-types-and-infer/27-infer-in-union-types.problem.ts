import { Equal, Expect } from "../helpers/type-utils";

const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

// type GetParserResult<T> = T extends { parse: () => infer TParse1Fn }
//   ? TParse1Fn
//   : T extends () => infer TParse2Return
//   ? TParse2Return
//   : T extends { extract: () => infer T3Return }
//   ? T3Return
//   : never;

type GetParserResult<T> = T extends
  | { parse: () => infer TResult }
  | (() => infer TResult)
  | { extract: () => infer TResult }
  ? TResult
  : never;

// Both Solutions Work

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];

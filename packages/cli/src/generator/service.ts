import path from "path";

interface GenerateOptions {
  output: string;
}

export const generateService = async (options: GenerateOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { generateApi } = require("swagger-typescript-api");
  await generateApi({
    ...options,
    url: "https://petstore.swagger.io/v2/swagger.json",
    templates: path.join(__dirname, "../../templates"),
    httpClientType: "axios",
    generateClient: false,
    generateResponses: true,
    generateRouteTypes: true,
    generateUnionEnums: true,
    cleanOutput: true,
    unwrapResponseData: true,
    modular: true,
    moduleNameIndex: 0,
    extractRequestBody: true,
    extractRequestParams: true,
    primitiveTypeConstructs: (constructs: any) => ({
      ...constructs,
      string: {
        "date-time": "Date",
      },
    }),
  });
};

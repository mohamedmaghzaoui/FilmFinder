export const dataSource = process.env.DATA_SOURCE || "mock";

export const isMock = dataSource === "mock";
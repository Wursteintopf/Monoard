export interface CSVState {
  parsedData: Array<Record<string, string>>
}

export const defaultCSVState: CSVState = {
  parsedData: [],
}

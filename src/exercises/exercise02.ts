export function updateData(currentObject: { [key: string]: any }, newDataObject: { [key: string]: any }): { [key: string]: any } {
  const result: { [key: string]: any } = {};
  for (const key of Object.keys(currentObject)) {
    result[key] = key in newDataObject ? newDataObject[key] : currentObject[key]
  }
  return result;
}
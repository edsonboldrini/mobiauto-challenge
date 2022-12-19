export function updateData(currentObject: { [key: string]: any }, newDataObject: { [key: string]: any }): { [key: string]: any } {
  const result: { [key: string]: any } = {};
  Object.keys(currentObject)
    .forEach(k => result[k] = (k in newDataObject ? newDataObject[k] : currentObject[k]));
  return result;
}
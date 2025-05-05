async function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}

export async function JSONToFormData(data) {
  const formData = new FormData();
  await buildFormData(formData, data, parent);
  return formData;
}

export function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export const DownloadURL = (url) => {
  fetch(`${url}`).then((response) => {
    response.blob().then((blob) => {
      // Creating new object of PDF file
      const fileURL = window.URL.createObjectURL(blob);
      // Setting various property values
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = url.split("/").pop();
      alink.click();
    });
  });
};

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function findValueInObject(obj: any, keyToFind: any, defaultValue: any) {
  if (typeof obj !== "object" || obj === null) {
    return defaultValue;
  }

  if (obj[keyToFind]) {
    return obj[keyToFind];
  }

  for (const key in obj) {
    const result = findValueInObject(obj[key], keyToFind, defaultValue);
    if (result !== defaultValue) {
      return result;
    }
  }

  return defaultValue;
}

export function calculateTotalSize(objectsArray) {
  let totalSize = 0;

  objectsArray.forEach((object) => {
    totalSize += object.size;
  });

  return totalSize;
}


export function downloadURI(uri: string, name: string) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}



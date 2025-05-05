import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { SESSION } from "./Enums";
import { toast } from 'react-hot-toast';
import { SessionDataType } from "./TYPES";

// Define types for the data objects used in the functions
interface FormDataObject {
  [key: string]: any;
}

interface ResultData {
  status_code?: number;
  status?: string;
  message?: string;
  data?: any; // Modify this based on the actual structure of the result data
}

export const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || "";

let SessionData: SessionDataType;

export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export async function POST(url: string, data?: FormDataObject): Promise<any> {
  console.log(`POST request to URL: ${url} with data:`, data);
  try {
    SessionData = JSON.parse(localStorage.getItem(SESSION) || "{}");

    let config: AxiosRequestConfig = {
      auth: {
        password: SessionData.password,
        username: SessionData.username,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    return await axios
      .post(url, data, config)
      .then((result: AxiosResponse<ResultData>) => {
        if (result?.data?.status_code && result.data.status_code !== 200 && result.data.status_code !== 202) {
          throw { hasError: true, message: result.data?.message };
        } else {
          return result.data;
        }
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 504) {
          toast.error("Server is not connected to the App");
        }
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

export const GET = async (url: string,data?:any): Promise<any> => {
  console.log(`GET request to URL: ${url}`);
  const SessionData: SessionDataType = JSON.parse(
    localStorage.getItem(SESSION) || "{}"
  );

  const config: any = {
    auth: {
      password: SessionData.password,
      username: SessionData.username,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        SessionData.username + ":" + SessionData.password
      ).toString("base64")} `,
    },
    
  };

  const response: Response = await fetch(url, config);

  if (!response) {
    throw new Error("Data could not be fetched!");
  } else {
    if (response.url.toLowerCase().includes("download")) {
      return response;
    }
    return response.json();
  }
};

export async function PUT(url: string, data: FormDataObject): Promise<any> {
  try {
    SessionData = JSON.parse(localStorage.getItem(SESSION) || "{}");

    let config: AxiosRequestConfig = {
      auth: {
        password: SessionData.password,
        username: SessionData.username,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    return await axios
      .put(url, data, config)
      .then((result: AxiosResponse<ResultData>) => {
        if (
          (result?.data?.status_code && result?.data?.status_code !== 200) ||
          (result?.data?.status && result?.data?.status !== "SUCCESS")
        ) {
          throw { hasError: true, message: result.data?.message };
        } else {
          return result.data;
        }
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

export async function DELETE(url: string, data?: any): Promise<any> {
  try {
    SessionData = JSON.parse(localStorage.getItem(SESSION) || "{}");

    let config: AxiosRequestConfig = {
      auth: {
        password: SessionData.password,
        username: SessionData.username,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
      withCredentials: true,
    };

    return await axios
      .delete(url, config)
      .then((result: AxiosResponse<ResultData>) => {
        if (
          (result?.data?.status_code && result?.data?.status_code !== 200) ||
          (result?.data?.status && result?.data?.status !== "SUCCESS")
        ) {
          throw { hasError: true, message: result.data?.message };
        } else {
          return result.data;
        }
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

export const fetchImageURL = async (imageUrl) => {
  try {
    const SessionData = JSON.parse(localStorage.getItem(SESSION) || "{}");
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Basic ${btoa(
          `${SessionData.username}:${SessionData.password}`
        )}`,
      },
    };

    const response = await fetch(imageUrl, requestOptions);
    if (response.ok) {
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      return objectURL; // Return the image URL after a successful fetch
    } else {
      console.error('Failed to fetch image:', response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error fetching image:", error);
  }

  // Return null or another suitable value in case of an error
  return null;
};

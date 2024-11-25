import axios from "axios";


export const BASE_URL = "http://10.0.2.2:8080/api/v1";

export const configHeaders = () => {
  return {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzQxMWU3MDNjOWEwM2ZlNmYzNjQ4YmUiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzMyMzIxMTM3LCJleHAiOjE4MzIzMjExMzd9.nuMQV1FpOEPEiZ9Ww4HxrdiGgCWuIxV65JxY_Q2d9KQ`,
    "Content-Type": "application/json",
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaders(),
});

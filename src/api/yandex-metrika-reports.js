import axios from "axios";
const server = "https://api-metrica.yandex.net/stat/v1";

export async function getPageViewsAnalytics() {
  try {
    const res = await axios.get(
      "https://api-metrica.yandex.net/stat/v1/data?id=44147844&metrics=ym:s:avgPageViews&dimensions=ym:s:operatingSystem&limit=5"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDevicesAnalytics() {
  try {
    const res = await axios({
      method: "GET",
      url: `${server}/data`,
      headers: {
        Authorization: "OAuth 05dd3dd84ff948fdae2bc4fb91f13e22bb1f289ceef0037",
        "Content-Type": "application/x-yametrika+json",
        "Content-Length": 123,
      },
      params: {
        id: "f21fd47bb7fb4f1494e8bc4bff13371c",
        metrics: "ym:s:avgPageViews",
        dimensions: "ym:s:operatingSystem",
        limit: 7,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

import http from "k6/http";
import { sleep } from "k6";

import { Trend, Rate } from "k6/metrics";

const myFailRate = new Rate("failed requests");

export let options = {
  discardResponseBodies: true,
  scenarios: {
    rps_100: {
      executor: "constant-arrival-rate",
      exec: "getCommentsApi",
      rate: 100,
      timeUnit: "4s",
      duration: "30s",
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
    rps_500: {
      executor: "constant-arrival-rate",
      exec: "getCommentsApi",
      rate: 500,
      timeUnit: "4s",
      duration: "30s",
      startTime: "30s",
      preAllocatedVUs: 500,
      maxVUs: 1000,
    },
    rps_750: {
      executor: "constant-arrival-rate",
      exec: "getCommentsApi",
      rate: 750,
      timeUnit: "4s",
      duration: "30s",
      startTime: "1m",
      preAllocatedVUs: 1000,
      maxVUs: 2000,
    },
    rps_1000: {
      executor: "constant-arrival-rate",
      exec: "getCommentsApi",
      rate: 1000,
      timeUnit: "4s",
      duration: "30s",
      startTime: "1m30s",
      preAllocatedVUs: 1500,
      maxVUs: 3000,
    },
    rps_1500: {
      executor: "constant-arrival-rate",
      exec: "getCommentsApi",
      rate: 1500,
      timeUnit: "4s",
      duration: "30s",
      startTime: "2m",
      preAllocatedVUs: 2000,
      maxVUs: 3000,
    },
  },
  thresholds: {
    // threshold on a custom metric: 2% or less of requests return a 400 response (error / invalid request)
    "failed requests": [{ threshold: "rate<0.02", abortOnFail: true }],
    // threshold on standard metric: 90% of requests must finish within 500ms, 95% within 800, and 99.9% within 1.5s.
    http_req_duration: [
      {
        threshold: "p(90) < 500",
        abortOnFail: true,
      },
      {
        threshold: "p(95) < 800",
        abortOnFail: true,
      },
      {
        threshold: "p(99.9) < 2000",
        abortOnFail: true,
      },
      {
        threshold: "avg < 700",
        abortOnFail: true,
      },
    ],
  },
};

// threshold: [
//   "p(90) < 500",
//   "p(95) < 800",
//   "p(99.9) < 2000",
//   "avg < 700",
// ],

export function getCommentsApi() {
  const commentId = Math.ceil(Math.random() * 100000000);
  const resCommentQuery = http.get(
    `http://localhost:4000/api/comments/${commentId}`
  );
  myFailRate.add(resCommentQuery.status !== 200);

  const userId = Math.floor(Math.random() * 10000000) + 1;
  const resUserQuery = http.get(
    `http://localhost:4000/api/comments?user_id=${userId}`
  );
  myFailRate.add(resUserQuery.status !== 200 && resUserQuery.status !== 404);

  const songId = Math.ceil(Math.random() * 10000000);
  const resSongQuery = http.get(
    `http://localhost:4000/api/comments?song_id=${songId}`
  );
  myFailRate.add(resSongQuery.status !== 200 && resSongQuery.status !== 404);

  const content = encodeURIComponent("Lorem ad aliquip et minim.");
  const resContentQuery = http.get(
    `http://localhost:4000/api/comments?content=${content}`
  );
  myFailRate.add(resContentQuery.status !== 200);
}

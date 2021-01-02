import http from "k6/http";
import { sleep } from "k6";

import { Trend, Rate } from "k6/metrics";

const myFailRate = new Rate("failed requests");

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 400,
      timeUnit: '4s',
      duration: '10s',
      preAllocatedVUs: 1000,
      maxVUs: 2000,
    },
  },
  // stages: [
  //   { duration: '30s', target: 100 },
  //   { duration: '30s', target: 100 },
  //   { duration: '30s', target: 500 },
  //   { duration: '30s', target: 500 }, // ~500 rps, around the breaking point
  //   { duration: '30s', target: 800 },
  //   { duration: '30s', target: 800 }, // ~570 rps, beyond the breaking point (maybe???)
  //   { duration: '30s', target: 1000 },
  //   { duration: '30s', target: 1000 },
  //   { duration: '30s', target: 1200 },
  //   { duration: '30s', target: 1200 },
  // ],
  thresholds: {
    // threshold on a custom metric: 2% or less of requests return a 400 response (error / invalid request)
    "failed requests": ["rate<0.02"],
    // threshold on standard metric: 90% of requests must finish within 500ms, 95% within 800, and 99.9% within 1.5s.
    http_req_duration: [
      "p(90) < 500",
      "p(95) < 800",
      "p(99.9) < 2000",
      "avg < 700",
    ],
  },
};

export default function () {
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
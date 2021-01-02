import http from "k6/http";
import { sleep } from "k6";

import { Trend, Rate } from "k6/metrics";

const myFailRate = new Rate("failed requests");
const TrendRTT = new Trend("RTT");

export let options = {
  stages: [
    // { duration: "2m", target: 100, rps: 100 },
    // { duration: '2m', target: 100, rps },
    // { duration: '2m', target: 200, rps },
    // { duration: '2m', target: 300, rps },
    // { duration: '2m', target: 400, rps },
    // { duration: '4m', target: 0, rps },
    { duration: "30s", target: 500, rps: 500 },
    // { duration: "30s", target: 500, rps: 500 },
    // { duration: "2m", target: 1000, rps: 1000 },
  ],
  thresholds: {
    // threshold on a custom metric: 10% or less of requests return anything other than a 200-response
    "failed requests": ["rate<0.1"],
    // threshold on standard metric: 90% of requests must finish within 300ms, 95% within 500, and 99.9% within 1.5s.
    http_req_duration: [
      "p(90) < 500",
      "p(95) < 800",
      "p(99.9) < 2000",
      "avg < 700",
    ],
    // http_req_duration: ['p(90)<500', 'avg<700']
    //      http_req_duration: ['p(90)<500', 'avg<700']
    // A custom trend metrics that is fed with response time samples, and which has the following threshold criteria:
    // 99th percentile response time must be below 300 ms
    // 70th percentile response time must be below 250 ms
    // Average response time must be below 200 ms
    // Median response time must be below 150 ms
    // Minimum response time must be below 100 ms
    // RTT: ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
  },
};

/*
// get comments by comment id
http://localhost:4000/api/comments/100000000
// get comments by song id
http://localhost:4000/api/comments/100000000
// get comments by song id
http://localhost:4000/api/comments/100000000
// get comments by song id
http://localhost:4000/api/comments/100000000

user_id, song_id, content
http://localhost:4000/api/comments?user_id=7640571

http://localhost:4000/api/comments?song_id=738114

http://localhost:4000/api/comments?content=Labore exercitation voluptate consectetur reprehenderit.
*/

export default function () {
  const commentId = Math.ceil(Math.random() * 100000000);
  const resCommentQuery = http.get(
    `http://localhost:4000/api/comments/${commentId}`
  );
  myFailRate.add(resCommentQuery.status !== 200);
  sleep(1);

  const userId = Math.ceil(Math.random() * 10000000);
  const resUserQuery = http.get(
    `http://localhost:4000/api/comments?user_id=${7640571}`
  );
  myFailRate.add(resUserQuery.status !== 200);
  sleep(1);

  // const songId = Math.ceil(Math.random() * 10000000);
  // const resSongQuery = http.get(
  //   `http://localhost:4000/api/comments?song_id=${songId}`
  // );
  // myFailRate.add(resSongQuery.status !== 200);
  // sleep(1);

  // const content = "Labore exercitation voluptate consectetur reprehenderit.";
  // const resContentQuery = http.get(
  //   `http://localhost:4000/api/comments?content=${content}`
  // );
  // myFailRate.add(resContentQuery.status !== 200);
  // sleep(1);

  // TrendRTT.add(res.timings.duration);
  // myFailRate.add(res.status !== 200);
  // sleep(1);
}

// export let options = {
//   vus: 1000,
//   duration: '30s',
// };
// export default function () {
//   http.get('http://localhost:4000/api/comments/50000');
//   sleep(1);
// }

// export default function () {
//   const productId = Math.floor(Math.random() * 10000000);
//   const res = http.get(`http://localhost:3004/api/products/${productId}`);
//   myFailRate.add(res.status !== 200);
// }

// import http from 'k6/http';
// import { check, sleep } from 'k6';
// export let options = {
//   stages: [
//     { duration: '30s', target: 20 },
//     { duration: '1m30s', target: 10 },
//     { duration: '20s', target: 0 },
//   ],
// };
// export default function () {
//   let res = http.get('https://httpbin.org/');
//   check(res, { 'status was 200': (r) => r.status == 200 });
//   sleep(1);
// }

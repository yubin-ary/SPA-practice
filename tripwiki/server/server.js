const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

//현재 탐색기에 위치한 폴더들에 서버가 접근할 수 있도록 하는 코드
//join 안에 경로 작성
app.use(express.static(path.join(__dirname, "..")));

//어떤 경로의 요청이 오던지 항상 동일한 index.html 파일을 반환할 수 있도록 코드 작성
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

//우리가 설정한 포트번호에서 서버가 항상 요청을 듣고 있을 수 있도록 하는 코드.
app.listen(PORT, () => {
  console.log("START SERVER");
});

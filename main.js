let currentBgm = null;

// 🔊 BGM 재생 함수
function playBgm(src) {
  if (currentBgm) {
    currentBgm.pause();       // 기존 BGM 일시정지
    currentBgm.currentTime = 0; // 재생 위치 초기화
  }
  currentBgm = new Audio(src); // 새 오디오 객체 생성
  currentBgm.loop = true;      // 반복 재생 설정
  currentBgm.volume = 0.5;     // 볼륨 설정 (0~1)
  currentBgm.play();           // BGM 재생
}

// 🎮 게임 시작 시 호출되는 함수
function startGame() {
  // 스타트 화면 숨기기
  document.getElementById("start-screen").style.display = "none";

  // 게임 캔버스 초기화
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // 🎵 일반 전투 BGM 재생
  playBgm("assets/audio/cyberpunk-305315.mp3");

  // 👾 간단한 애니메이션 예시
  let x = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "cyan";
    ctx.fillRect(x, 100, 50, 50);
    x += 2;

    if (x < canvas.width) {
      requestAnimationFrame(draw); // 다음 프레임 요청
    } else {
      endGame(); // 끝에 도달하면 게임 종료 처리
    }
  }

  draw(); // 애니메이션 시작
}

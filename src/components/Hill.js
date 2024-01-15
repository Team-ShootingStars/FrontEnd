export default class Hill {
  constructor(color, speed, total, minHeight, maxHeight) {
    this.color = color;
    this.speed = speed;
    this.total = total;
    this.points = []; // this.points 초기화
    this.prevStageWidth = 0; // 이전 스테이지 너비 초기화
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    if (this.points.length > 0) {
      const scale = stageWidth / this.prevStageWidth; // 너비에 따른 스케일 계산
      this.points.forEach((point) => {
        point.x *= scale; // 각 포인트의 x 좌표를 조정
      });
    } else {
      // 처음 로딩 시 포인트 배열을 초기화합니다.
      this.points = [];
      this.gap = Math.ceil(this.stageWidth / (this.total - 2));

      for (let i = 0; i < this.total; i++) {
        this.points.push({
          x: i * this.gap,
          y: this.getY(),
        });
      }
    }

    this.prevStageWidth = stageWidth; // 이전 스테이지 너비 업데이트
    this.minHeight = this.minHeight || this.stageHeight / 4;
    this.maxHeight = this.maxHeight || this.stageHeight / 2;
  }

  draw(ctx) {
    if (!this.points || this.points.length === 0) {
      return; // points 배열이 없거나 비어있으면 그리기를 중단
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();

    let cur = this.points[0];
    let prev = cur;

    let dots = [];
    // x 좌표를 감소시켜 왼쪽으로 이동
    cur.x += this.speed;

    // 화면 왼쪽 끝에 도달했을 때 새 포인트 추가
    if (cur.x > -this.gap) {
      this.points.unshift({
        // 가장 오래된 포인트 제거
        x: -(this.gap * 2),
        y: this.getY(),
      });
    } else if (cur.x > this.stageWidth + this.gap) {
      this.points.splice(-1);
    }

    ctx.moveTo(cur.x, cur.y);

    let prevCx = cur.x;
    let prevCy = cur.y;

    for (let i = 1; i < this.points.length; i++) {
      cur = this.points[i];
      cur.x += this.speed;

      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      });

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();

    return dots;
  }

  getY() {
    // const min = this.stageHeight / 8;
    // const max = this.stageHeight - min;
    return (
      this.stageHeight -
      (this.minHeight + Math.random() * (this.maxHeight - this.minHeight))
    );
  }
}

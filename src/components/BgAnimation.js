import React from "react";
import Hill from "./Hill";
import "../styles/BgAnimationStyles.css";

export default class BgAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.hills = [
      new Hill(
        "#b652ff",
        0.1,
        5,
        0.4 * window.innerHeight,
        0.8 * window.innerHeight
      ),
      new Hill(
        "#9400FF",
        0.7,
        4,
        0.2 * window.innerHeight,
        0.5 * window.innerHeight
      ),
      new Hill(
        "#6b02b8 ",
        5,
        3,
        0 * window.innerHeight,
        0.1 * window.innerHeight
      ),
    ];
  }

  componentDidMount() {
    this.canvas.current.width = window.innerWidth * 2;
    this.canvas.current.height = window.innerHeight * 2;
    this.ctx = this.canvas.current.getContext("2d");
    this.ctx.scale(2, 2);

    window.addEventListener("resize", this.resize.bind(this));

    // setTimeout을 사용하여 resize 호출을 지연시킵니다.
    setTimeout(() => {
      this.resize();
    }, 0);

    // 애니메이션 루프를 시작합니다.
    requestAnimationFrame(this.animate.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  resize = () => {
    // 캔버스 요소가 마운트되었는지 확인
    if (!this.canvas.current) {
      return; // 캔버스 요소가 아직 마운트되지 않았으면 함수를 종료합니다.
    }

    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.current.width = this.stageWidth * 2;
    this.canvas.current.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    // 각 언덕의 새 차원을 업데이트
    this.hills.forEach((hill) =>
      hill.resize(this.stageWidth, this.stageHeight)
    );
  };

  animate = (t) => {
    requestAnimationFrame(this.animate);

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // 각 언덕을 그리기
    this.hills.forEach((hill) => hill.draw(this.ctx));
  };

  render() {
    return <canvas ref={this.canvas} />;
  }
}

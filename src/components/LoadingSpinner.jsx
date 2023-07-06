"use client";
import { useEffect, useRef } from "react";
import { Spinner } from "spin.js";

const options = {
  lines: 12,
  length: 14,
  width: 0.5,
  radius: 7,
  // scale: 3.0,
  corners: 1,
  color: '#4D6266',
  fadeColor: 'transparent',
  animation: 'spinner-line-fade-default',
  rotate: 10,
  direction: 1,
  speed: 1,
  zIndex: 2e9,
  className: 'spinner',
  top: '50%',
  left: '50%',
  shadow: '0 0 1px transparent',
  position: 'absolute',
};

export const LoadingSpinner = ({type}) => {
  const spinnerRef = useRef(null);

  useEffect(() => {
    const spinner = new Spinner(options).spin(spinnerRef.current);
    // 컴포넌트가 언마운트될 때 스피너를 정리합니다.
    return () => {
      spinner.stop();
    };
  }, []);

  function setTypeText(){
    if(type === "data"){
      return (<span className="desc loading-text">데이터를 불러오는 중입니다.<br/>잠시만 기다려주세요.</span>)
    }else if(type === "loading"){
      return (<span className="desc loading-text">화면을 불러오는 중입니다.<br/>잠시만 기다려주세요.</span>)
    }


  }


  return <div ref={spinnerRef}>{setTypeText()}</div>;
};

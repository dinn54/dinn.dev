'use client'

export const detectMobile = () =>{
  let isMobile = false;
  const userAgent = navigator.userAgent
  if ("maxTouchPoints" in navigator) {
    isMobile = navigator.maxTouchPoints > 0;
  } else if ("matchMedia" in window) {
    const mq = window.matchMedia("(pointer:coarse)");
    if (mq && mq.media === "(pointer:coarse)") {
      isMobile = mq.matches;
    }
  } else {
    // 마지막 수단으로 User Agent 확인
    isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(userAgent);
  }
  
  return isMobile;
}
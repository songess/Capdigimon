'use client';

const BackgroundContent = () => {
  return (
    <div className="fixed flex justify-center w-screen h-screen pointer-events-none -z-10 overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-white" />

      {/* 애니메이션 도형들 */}
      <div className="relative w-full h-full">
        {/* 큰 원형 */}
        <div className="absolute top-1/4 -right-1/4 w-[80vh] h-[80vh] rounded-full bg-blue-200 animate-gdsc-spin" />

        {/* 작은 원형 */}
        <div className="absolute bottom-1/4 -left-1/4 w-[60vh] h-[60vh] rounded-full bg-purple-200 animate-gdsc-spin-slow" />

        {/* 중간 크기 원형 */}
        <div className="absolute top-1/3 left-1/3 w-[40vh] h-[40vh] rounded-full bg-cyan-200 animate-gdsc-spin-reverse" />

        {/* 움직이는 도형들 */}
        <div className="absolute top-1/4 right-1/4 w-[30vh] h-[30vh] bg-blue-100 rounded-3xl animate-gdsc-float" />
        <div className="absolute bottom-1/3 left-1/4 w-[25vh] h-[25vh] bg-purple-100 rounded-3xl animate-gdsc-float-slow" />

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
      </div>
    </div>
  );
};

export default BackgroundContent;

import PageWrapper from '@/components/LandingPage/PageWrapper';
import ContentLayout from '@/components/LandingPage/ContentLayout';
import { SCROLL_CONTENT_LIST } from '@/components/LandingPage/ScrollContent';
import BackgroundContent from '@/components/LandingPage/BackgroundContent';

// SSG
// export const dynamic = 'force-static';
// export const revalidate = 3600;

export default function Home() {
  return (
    <main className="flex flex-col h-dvh overflow-x-hidden overflow-y-auto snap-y snap-mandatory">
      {SCROLL_CONTENT_LIST.map(
        ({ type, title, subtitle, isDoubleBtn, btn1, btn2, btn3, btnClickLink, body, btnText, hoverColor }) => (
          <PageWrapper key={type} className="relative flex justify-center items-center">
            {isDoubleBtn ? (
              <ContentLayout title={title} subtitle={subtitle} isDoubleBtn btn1={btn1} btn2={btn2} btn3={btn3}>
                {body}
              </ContentLayout>
            ) : (
              <ContentLayout
                title={title}
                subtitle={subtitle}
                isDoubleBtn={false}
                btnBoldText={btnText!}
                btnClickLink={btnClickLink!}
                hoverColor={hoverColor!}
              >
                {body}
              </ContentLayout>
            )}
          </PageWrapper>
        ),
      )}
      <BackgroundContent />
    </main>
  );
}

import PageWrapper from "@/components/Page/PageWrapper";
import BasicInfo from "./BasicInfo";

export default function User() {
  return (
    <PageWrapper>
      <div className="h-1000px">
        <BasicInfo />
      </div>
    </PageWrapper>
  );
}

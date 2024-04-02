import { Suspense } from "react";
import loadable from "@loadable/component";
const modules = import.meta.glob("@/pages/**/*.tsx");
function LazyLoad(url: string) {
  const ComponentNode = loadable(async () => {
    return modules[`/src/pages${url}.tsx`]();
  });
  return (
    <Suspense>
      <ComponentNode></ComponentNode>
    </Suspense>
  );
}
